import os

DB_NAME = 'postgres'
DB_USER = 'retext_user'
DB_PASSWORD = '1919'
DB_HOST = 'localhost'

SQLALCHEMY_DATABASE_URI = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = 'super-secret'
JWT_SECRET_KEY = 'jwt-super-secret'
