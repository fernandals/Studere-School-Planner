from flask import Flask # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://studyapp_user:senha@localhost/studyapp_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db = SQLAlchemy(app)

class AppUser(db.Model):
    __tablename__ = 'app_user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('app_user.id'), nullable=False)

class Assignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    due_date = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('app_user.id'), nullable=False)

@app.route('/')
def hello():
    return "Hello, World!"

if __name__ == "__main__":
    app.run(debug=True)
