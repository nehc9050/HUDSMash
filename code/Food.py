import elote as elo

class Food:

    def __init__(self, name, elo_competitor=None):
        self.name = name

        if elo_competitor:
            self.elo_competitor = elo_competitor
            self.rating = elo_competitor.rating


    def beats(self, other):
        if not self.elo_competitor or not other.elo_competitor:
            raise Exception("Attempted contest with uninitialized competitor")

        self.elo_competitor.beat(other.elo_competitor)
        self.rating = self.elo_competitor.rating
        other.rating = other.elo_competitor.rating
        return {self.name: self.rating, other.name: other.rating}

    
    def win_prob_vs(self, other):
        if not self.elo_competitor or not other.elo_competitor:
            raise Exception("Attempted calculation with uninitialized competitor")

        return self.elo_competitor.expected_score(other.elo_competitor)


