import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let user = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      user = payload.sub;
    } catch (e) {
      console.error("Invalid token");
    }
  }

  const toggleSearch = () => setShowSearch(prev => !prev);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/all-books?search=${encodeURIComponent(query.trim())}`);
      setShowSearch(false);
      setQuery('');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">ReText</Link>
      </div>

      <nav className="navbar-center">
        <Link to="/about">About Us</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/categories">Categories</Link>
        <FaSearch className="search-icon" onClick={toggleSearch} />
      </nav>

      <div className="navbar-right">
        {user ? (
          <Link to="/profile" title="Profile">
            <FaUserCircle className="profile-icon" size={24} />
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>

      {showSearch && (
        <form className="navbar-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by title or course code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit"><FaSearch /></button>
        </form>
      )}
    </header>
  );
}

export default Navbar;
