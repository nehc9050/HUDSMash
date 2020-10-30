from flask import Flask, g, request, jsonify, redirect, url_for
import logging
import sqlite3
from pandas import read_csv
from flask_cors import CORS
from constructs.Initializer import Initializer
from constructs.MatchMaker import MatchMaker
from constructs.Food import Food
import random

app = Flask(__name__)
CORS(app)
DATABASE = './foods.db'
logger = logging.getLogger(__name__)

foods = []
current_matchup = []
matchups = []

isFirstRequest = True


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


def init_foods():
    global foods 

    df = read_csv('../../data/menu.csv', names = ['Date', 'Meal', 'Food'])
    foods = Initializer([Food(food) for food in df.Food.tolist()[1:]]).foods


def set_foods_from_matchups(mtchps):
    global matchups, foods

    res = []
    for matchup in matchups:
        res += matchup
    foods = res


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/')
@app.route('/getMatch')
def get_match():
    global matchups, foods, current_matchup, isFirstRequest

    if isFirstRequest:
        init_foods()
        isFirstRequest = False

    # Generate list of matchups
    matchups = MatchMaker(foods).matchups
    matchup_index = random.randint(0, len(matchups) - 1)

    # Get competitors
    current_matchup = matchups[matchup_index]
    food_1 = current_matchup[0]
    food_2 = current_matchup[1]

    # Remove current matchup from matchups for update purposes
    matchups = matchups[:matchup_index] + matchups[matchup_index+1:]

    # Generate food JSOs
    food1 = \
    {
        "name": food_1.name,
        "link": "https://i.pinimg.com/originals/79/a8/1a/79a81abcc2bc902343f16bb8cc83057b.png",
        "elo": food_1.rating,
    }
    food2 = \
    {
        "name": food_2.name,
        "link": "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/2/26/Apple_pie.png",
        "elo": food_2.rating,
    }
    return {
        "food1": food1,
        "food2": food2
    }

# Will need to make it so that people can't spam this request
@app.route('/updateMatch', methods=['POST'])
def update_match():
    global matchups, current_matchup

    winner = request.json['winner']
    loser = request.json['loser']

    if current_matchup[0].name == winner:
        current_matchup[0].beats(current_matchup[1])
    else:
        current_matchup[1].beats(current_matchup[0])
    
    matchups += [current_matchup]
    set_foods_from_matchups(matchups)

    logger.warning(f"Winner: {winner}")
    logger.warning(f"Loser: {loser}")
    return redirect(url_for('get_match'))
