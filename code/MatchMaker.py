import elote as elo
from Initializer import Initializer
import random
import math
import Food

class MatchMaker:

    def __init__(self, foods, delta=150):
        if len(foods) % 2 != 0:
            raise Exception("Cannot match up an odd number of foods")
        
        if len(list(filter(lambda x: not x.rating, foods))) != 0:
            foods = Initializer(foods).foods

        self.foods = foods
        self.delta = delta
        self.match()
        

    def match(self):
        self.matchups = []
        
        foods_sorted = self.foods.copy()
        foods_sorted.sort(key=lambda x: x.rating)

        while len(foods_sorted) > 0:
            food = foods_sorted[0]
            potential_opponents = []

            for potential_opponent in foods_sorted[1:]:
                potential_opponents += [potential_opponent]

                if math.fabs(food.rating - potential_opponent.rating) >= self.delta:
                    break
            
            if len(potential_opponents) > 1:
                potential_opponents = potential_opponents[:-1]

            opponent_index = random.randrange(len(potential_opponents))
            opponent = potential_opponents[opponent_index]
            self.matchups += [[food, opponent]]

            foods_sorted = foods_sorted[1:opponent_index+1] + foods_sorted[opponent_index+2:]
    

    def __str__(self):
        return f"{[(matchup[0].name, matchup[1].name) for matchup in self.matchups]}"



    