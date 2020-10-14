import elote as elo

class Food:

    elo_competitor = None
    name = None
    rating = None

    def __init__(self, elo_competitor, name):
        self.elo_competitor = elo_competitor
        self.name = name
        self.rating = rating


    def beats(self, other_food):
        self.elo_competitor.beat(other_food.elo_competitor)
        self.rating = self.elo_competitor.rating
        other_food.rating = other_food.elo_competitor.rating
        return {self.name: self.rating, other_food.name: other_food.rating}

    
    def win_prob_vs(self, other_food):
        return self.elo_competitor.expected_score(other_food.elo_competitor)


