from Initializer import Initializer
from Food import Food
from MatchMaker import MatchMaker

def main():
    raw_foods = [
        Food("ganja"), 
        Food("reefer"),
        Food("devil's lettuce"),
        Food("marijuana"),
        Food("the green stuff"),
        Food("crack cocaine")
    ]

    processed_foods = Initializer(raw_foods).foods
    print(processed_foods)
    matchups = MatchMaker(processed_foods, 40).matchups

    print(matchups)