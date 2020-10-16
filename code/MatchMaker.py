import elote as elo
import random
import math
import Food

class Matchup:

    def __init__(self, foods, delta):
        if len(foods) % 2 != 0:
            raise Exception("Cannot match up an odd number of foods")
            
        self.foods = foods
        self.delta = delta
        self.match()
        

    def match(self):
        self.matchups = []
        
        foods_sorted = self.foods.sort(key=lambda x: x.rating)

        while foods_sorted:
            food = foods_sorted[0]
            potential_matchups = []

            for j in range(len(foods_sorted)):
                potential_matchups += [foods_sorted[j]]

                if not math.fabs(food.rating - foods_sorted[j].rating) < self.delta:
                    break
            
            if len(potential_matchups) > 1:
                potential_matchups = potential_matchups[:-1]

            opponent_index = random.randrange(len(potential_matchups))
            opponent = potential_matchups[opponent_index]
            self.matchups += [[food, opponent]]

            foods_sorted = foods_sorted[1:opponent_index] + foods_sorted[opponent_index+1:]
                



    