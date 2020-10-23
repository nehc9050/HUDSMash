from flask import Flask, g
import logging
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
DATABASE = './foods.db'
logger = logging.getLogger(__name__)


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
    food1 = \
    {
        "name": "Sassage",
        "link": "https://i.pinimg.com/originals/79/a8/1a/79a81abcc2bc902343f16bb8cc83057b.png",
        "elo": 500,
    }
    food2 = \
    {
        "name": "Apple pie",
        "link": "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/2/26/Apple_pie.png",
        "elo": 500,
    }
    return {
        "food1": food1,
        "food2": food2
    }

# Will need to make it so that people can't spam this request
@app.route('/updateMatch')
def update_match():
    logger.info("received a matchup")
    return
