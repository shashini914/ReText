from ..models import Book
from .. import db

def add_book(title, author, price, condition, course_code, description, owner_id):
    new_book = Book(title=title, author=author, price=price, 
                   condition=condition, course_code=course_code, 
                   description=description, owner_id=owner_id)
    db.session.add(new_book)
    db.session.commit()
    return new_book

def get_all_books():
    return Book.query.all()

def update_book(book_id, data):
    book = Book.query.get(book_id)
    if book:
        for key, value in data.items():
            setattr(book, key, value)
        db.session.commit()
        return book
    return None

def delete_book(book_id):
    book = Book.query.get(book_id)
    if book:
        db.session.delete(book)
        db.session.commit()
        return True
    return False
