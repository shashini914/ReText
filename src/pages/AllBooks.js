import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './AllBooks.css';

function AllBooks() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    useEffect(() => {
        fetch('http://localhost:5000/api/books/all')
            .then(res => res.json())
            .then(data => setBooks(data));
    }, []);

    const closeModal = () => {
        setSelectedBook(null);
        setShowRatingModal(false);
        setRating(0);
        setComment('');
    };

    const submitRating = async () => {
        await fetch("http://localhost:5000/api/books/rate-seller", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                seller_id: selectedBook.user_id,
                rating,
                comment
            })
        });
        alert("Thanks for your feedback!");
        setShowRatingModal(false);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery) ||
        book.course_code.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="book-grid-container">
            <h2 className="section-title">
                📚 <span style={{ fontWeight: 700 }}>All Book Listings</span>
            </h2>

            <div className="book-grid">
                {filteredBooks.length === 0 ? (
                    <p>No books found.</p>
                ) : (
                    filteredBooks.map((book, idx) => (
                        <div key={idx} className="book-card" onClick={() => setSelectedBook(book)}>
                            {book.photos[0] && (
                                <img
                                    src={`http://localhost:5000${book.photos[0]}`}
                                    alt="cover"
                                    className="book-image"
                                />
                            )}
                            <h3>{book.title}</h3>
                            <p><strong>Course:</strong> {book.course_code}</p>
                            <p><strong>Price:</strong> ${book.price}</p>
                            {book.is_sold && <span className="sold-badge">Sold</span>}
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {selectedBook && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-icon" onClick={closeModal}>×</span>
                        <div className="modal-body">
                            {/* Left: Image */}
                            <div className="modal-carousel">
                                <img
                                    src={`http://localhost:5000${selectedBook.photos[carouselIndex]}`}
                                    alt={`Book ${carouselIndex + 1}`}
                                    className="carousel-image"
                                />
                                {selectedBook.photos.length > 1 && (
                                    <div className="carousel-controls">
                                        <button onClick={() =>
                                            setCarouselIndex((carouselIndex - 1 + selectedBook.photos.length) % selectedBook.photos.length)
                                        }>‹</button>
                                        <button onClick={() =>
                                            setCarouselIndex((carouselIndex + 1) % selectedBook.photos.length)
                                        }>›</button>
                                    </div>
                                )}
                            </div>

                            {/* Right: Info */}
                            <div className="modal-info">
                                <h2>{selectedBook.title}</h2>
                                <p><strong>Course:</strong> {selectedBook.course_code}</p>
                                <p><strong>Description:</strong> {selectedBook.description}</p>
                                <p><strong>Price:</strong> ${selectedBook.price}</p>
                                <p><strong>Contact:</strong> {selectedBook.contact_method}</p>

                                {selectedBook.is_sold && (
                                    <>
                                        <div className="book-status-actions">
                                            <span className="sold-badge">Sold</span>
                                            {!showRatingModal && (
                                                <button className="rate-seller-btn" onClick={() => setShowRatingModal(true)}>
                                                    Rate Seller
                                                </button>
                                            )}
                                        </div>

                                        {showRatingModal && (
                                            <div className="rating-modal">
                                                <h3>Rate the Seller</h3>

                                                {/* Star Rating */}
                                                <div className="star-rating">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            key={star}
                                                            className={star <= rating ? "filled" : "empty"}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>

                                                <textarea
                                                    placeholder="Write a comment..."
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                                <button onClick={submitRating}>Submit</button>
                                            </div>
                                        )}
                                    </>
                                )}
                                <p>
                                    <Link to={`/seller/${selectedBook.user_id}`} className="seller-link">
                                        🔗 View Seller Profile
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllBooks;
