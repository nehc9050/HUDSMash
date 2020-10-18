from flask import Flask, g
import sqlite3

app = Flask(__name__)
DATABASE = './foods.db'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/getMatch')
def get_match():
    # These will be replaced with calls to an sql db
    food1 =
    {
        "name": "Sassage",
        "elo": 500,
        "picture": "https://i.pinimg.com/originals/79/a8/1a/79a81abcc2bc902343f16bb8cc83057b.png",
    }
    food2 =
    {
        "name": "Apple pie",
        "elo": 500,
        "picture": "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/2/26/Apple_pie.png",
    }
    return {
        food1,
        food2
    }

# Will need to make it so that people can't spam this request
@app.route('/updateMatch')
def update_match():
    return
