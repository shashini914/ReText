import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaUserCircle, FaBookOpen, FaSignOutAlt } from 'react-icons/fa';

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [myBooks, setMyBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  let user = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      user = {
        id: payload.sub,
        email: payload.email,
        college: payload.college,
        first_name: payload.first_name
      };
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToSellPage = () => {
    navigate("/sell");
  };

  const markAsSold = async (bookId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/books/mark-sold/${bookId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setMyBooks(prev => prev.map(b => b.id === bookId ? { ...b, is_sold: true } : b));
        setSelectedBook(null);
        alert(data.message);
      } else {
        alert(data.error || 'Failed to mark as sold');
      }
    } catch (err) {
      console.error(err);
      alert('Error marking book as sold');
    }
  };

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:5000/api/books/my-books', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMyBooks(data);
        } else {
          setMyBooks([]);
          console.warn("Unexpected response format:", data);
        }
      })
      .catch(err => console.error('Failed to fetch user books', err));
  }, [token]);

  if (!user) {
    return <div className="profile-wrapper">Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-modern-layout">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <div className="avatar"><FaUserCircle size={100} /></div>
        <h2>{user.first_name}</h2>
        <p className="user-email">{user.email}</p>
        <p className="user-college">{user.college}</p>
        <div className="profile-nav">
          <p className="active">Profile</p>
          <p>My Books</p>
          <p>Settings</p>
        </div>
      </div>

      {/* Main Panel */}
      <div className="profile-main">
        <h3>Hello, {user.first_name} 👋</h3>

        <div className="profile-cards">
          <div className="card"><h4>Name</h4><p>{user.first_name} {user.last_name}</p></div>
          <div className="card"><h4>Email</h4><p>{user.email}</p></div>
          <div className="card"><h4>College</h4><p>{user.college}</p></div>
        </div>

        <div className="profile-buttons">
          <button onClick={goToSellPage}><FaBookOpen /> Sell Book</button>
          <button className="logout" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        </div>

        {/* My Listings Section */}
        <div className="my-books-section">
          <h3>📚 My Listings</h3>
          {myBooks.length === 0 ? (
            <p>You haven’t listed any books yet.</p>
          ) : (
            <div className="book-grid">
              {myBooks.map(book => (
                <div key={book.id} className="book-card" onClick={() => setSelectedBook(book)}>
                  <h4>{book.title}</h4>
                  <p><strong>Price:</strong> ${book.price}</p>
                  {book.photos && book.photos.map((photo, index) => (
                    photo && (
                      <img
                        key={index}
                        src={`http://localhost:5000${photo}`}
                        alt={`Book ${index + 1}`}
                        className="book-image"
                      />
                    )
                  ))}
                  {book.is_sold && <span className="sold-badge">Sold</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Book Details */}
      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-icon" onClick={() => setSelectedBook(null)}>×</span>

            <div className="modal-flex">
              <div className="carousel">
                {selectedBook.photos?.[0] && (
                  <img
                    src={`http://localhost:5000${selectedBook.photos[0]}`}
                    alt="cover"
                    className="carousel-img"
                  />
                )}
              </div>

              <div className="book-info">
                <h2>{selectedBook.title}</h2>
                <p><strong>Course:</strong> {selectedBook.course_code}</p>
                <p><strong>Description:</strong> {selectedBook.description}</p>
                <p><strong>Price:</strong> ${selectedBook.price}</p>
                <p><strong>Contact:</strong> {selectedBook.contact_method}</p>
                {selectedBook.is_sold ? (
                  <span className="sold-badge">Sold</span>
                ) : (
                  <button onClick={() => markAsSold(selectedBook.id)} className="sold-button">
                    Mark as Sold
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
