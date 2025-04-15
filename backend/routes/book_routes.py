from flask import Blueprint, request, jsonify
from extensions import db
from models import BookListing, SellerRating, User
import os
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity

book_bp = Blueprint('books', __name__)
UPLOAD_FOLDER = 'backend/static/uploads'

@book_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_book():
    user_id = int(get_jwt_identity()) 
    data = request.form
    files = request.files
    photos = []

    for i in range(1, 4):
        file = files.get(f'photo_{i}')
        if file:
            filename = secure_filename(file.filename)
            path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(path)
            photos.append(f"/static/uploads/{filename}")
        else:
            photos.append(None)

    listing = BookListing(
        title=data.get('title'),
        course_code=data.get('course_code'),
        description=data.get('description'),
        price=float(data.get('price')),
        contact_method=data.get('contact_method'),
        photo_1=photos[0],
        photo_2=photos[1],
        photo_3=photos[2],
        user_id=user_id
    )

    db.session.add(listing)
    db.session.commit()

    return jsonify({"message": "Book listed successfully"}), 201

@book_bp.route("/all", methods=["GET"])
def get_all_books():
    listings = BookListing.query.order_by(BookListing.created_at.desc()).all()
    data = []
    for book in listings:
        data.append({
            "id": book.id,
            "title": book.title,
            "course_code": book.course_code,
            "description": book.description,
            "price": book.price,
            "contact_method": book.contact_method,
            "photos": [book.photo_1, book.photo_2, book.photo_3],
            "is_sold": book.is_sold,
            "user_id": book.user_id
        })
    return jsonify(data)

@book_bp.route("/my-books", methods=["GET"])
@jwt_required()
def my_books():
    user_id = int(get_jwt_identity())

    books = BookListing.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            "id": b.id,
            "title": b.title,
            "course_code": b.course_code,
            "description": b.description, 
            "price": b.price,
            "contact_method": b.contact_method, 
            "is_sold": b.is_sold,
            "photos": [b.photo_1, b.photo_2, b.photo_3]
        } for b in books
    ])

@book_bp.route("/mark-sold/<int:book_id>", methods=["PATCH"])
@jwt_required()
def mark_sold(book_id):
    user_id = int(get_jwt_identity())
    book = BookListing.query.get(book_id)
    if not book or book.user_id != user_id:
        return jsonify({"error": "Unauthorized or not found"}), 403

    book.is_sold = True
    db.session.commit()
    return jsonify({"message": "Marked as sold!"})

@book_bp.route("/rate-seller", methods=["POST"])
@jwt_required()
def rate_seller():
    user_id = int(get_jwt_identity())
    data = request.json
    rating = SellerRating(
        seller_id=data.get("seller_id"),
        rating=data.get("rating"),
        comment=data.get("comment"),
        rater_id=user_id
    )
    db.session.add(rating)
    db.session.commit()
    return jsonify({"message": "Rating submitted"}), 201

@book_bp.route("/seller/<int:seller_id>", methods=["GET"])
def get_seller_profile(seller_id):
    seller = User.query.get(seller_id)
    if not seller:
        return jsonify({"error": "Seller not found"}), 404

    # Calculate average rating
    ratings = SellerRating.query.filter_by(seller_id=seller_id).all()
    avg_rating = round(sum(r.rating for r in ratings) / len(ratings), 1) if ratings else None

    rating_data = []
    for r in ratings:
        rater = User.query.get(r.rater_id) if hasattr(r, 'rater_id') else None
        rating_data.append({
            "rating": r.rating,
            "comment": r.comment,
            "rater_name": f"{rater.first_name}" if rater else "Anonymous"
        })

    return jsonify({
        "first_name": seller.first_name,
        "last_name": seller.last_name,
        "email": seller.email,
        "college": seller.college,
        "avg_rating": avg_rating,
        "ratings": rating_data
    })