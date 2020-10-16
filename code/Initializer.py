import random
import elote as elo


class Initializer:

    def __init__(self, foods, mu=500, sigma=40):
        for food in foods:
            food.elo_competitor = elo.EloCompetitor(initial_rating=random.gauss(mu, sigma))
            food.rating = food.elo_competitor.rating

        self.foods = foods

    def __str__(self):
        return f"{[food.__str__() for food in self.foods]}"