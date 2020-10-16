from Food import Food
from MatchMaker import MatchMaker
from Initializer import Initializer
import random

def matchups_to_foods(matchups):
    res = []
    for matchup in matchups:
        res += matchup
    return res


def main():
    foods_file = open("foods.txt", "r")
    unrated_foods = []

    while True:
        name = foods_file.readline()
        if not name:
            break
        unrated_foods += [Food(name)]
    
    foods_file.close()
    foods = Initializer(unrated_foods).foods

    while True:
        matchups = MatchMaker(foods).matchups
        matchup = random.choice(matchups)

        print(f"[0] {matchup[0].name} or [1] {matchup[1].name}")

        try:
            win_index = int(input())
            matchup[win_index].beats(matchup[1-win_index])
            print(f"{matchup[0].name} rating: {matchup[0].rating}\n{matchup[1].name} rating: {matchup[1].rating}\n")
            foods = matchups_to_foods(matchups)
        except:
            print("SOMETHING BROKE\n")
            break


if __name__ == '__main__':
    main()