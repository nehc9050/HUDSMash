import sqlite3
import csv

foodb = sqlite3.connect("foods.db")
foods = set()

with open("./data/menu.csv") as food_csv:
    foodreader = csv.reader(food_csv)
    for row in foodreader:
        foods.add(row[2])
    print(len(foods))

foodb.execute("")
foodb.close()
