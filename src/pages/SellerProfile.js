// src/pages/SellerProfile.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SellerProfile.css';

function SellerProfile() {
    const { id } = useParams(); // seller_id
    const [seller, setSeller] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/books/seller/${id}`)
            .then(res => res.json())
            .then(data => setSeller(data));
    }, [id]);

    if (!seller) return <p>Loading seller profile...</p>;

    return (
        <div className="seller-profile-page">
            <h2>📘 Seller Profile</h2>
            <div className="seller-profile-card">
                <p><strong>Name:</strong> {seller.first_name} {seller.last_name}</p>
                <p><strong>Email:</strong> {seller.email}</p>
                <p><strong>College:</strong> {seller.college}</p>
                <p><strong>⭐ Average Rating:</strong> {seller.avg_rating ? seller.avg_rating.toFixed(1) : 'No ratings yet'}</p>
            </div>
            {seller.ratings && seller.ratings.length > 0 && (
                <div className="ratings-section">
                    <h3>🗨️ Seller Reviews</h3>
                    {seller.ratings.map((r, idx) => (
                        <div key={idx} className="rating-card">
                            <p>{r.rater_name} rated ⭐ {r.rating}/5</p>
                            <p className="comment">“{r.comment}”</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SellerProfile;
