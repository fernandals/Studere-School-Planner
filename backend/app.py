from flask import Flask # type: ignore
from models import db
from routes import init_routes

## Flask & SQLite 

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///studyapp.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

init_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
