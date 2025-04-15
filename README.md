# ReText - Campus Textbook Exchange Platform

ReText is a web-based platform that allows students to **buy and sell secondhand textbooks** within their college community. Designed for simplicity and convenience, ReText connects students, helps reduce textbook costs, and promotes sustainability.

---

## Features

- **List textbooks** with course codes, descriptions, prices, and photos
- **Browse recently listed books** from students in your college
- **User authentication** with JWT and college email validation
- **Seller ratings & reviews** after successful transactions
- **Search** by book title or course code
- **Seller profile pages** with average ratings and contact info
- **Image carousel** for each book's listing
-  **Rate the seller** with star-based feedback after purchase

---

## Tech Stack

### Frontend
- React.js
- React Router
- CSS Modules
- Font Awesome & React Icons

### Backend
- Python Flask (REST API)
- Flask-JWT-Extended
- SQLAlchemy ORM
- PostgreSQL

---

## Installation & Setup

1. **Clone the repo**

```bash
git clone https://github.com/shashini914/ReText.git
cd retext
```
2. **Backend Setup**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
flask db init
flask db migrate
flask db upgrade
python backend/app.py
```
3. **Frontend Setup**

```bash
npm install
npm start
```
