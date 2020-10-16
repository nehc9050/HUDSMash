import random


class Initializer:
    foods = None

    def __init__(self, foods):
        self.foods = foods

        for food in self.foods:
            