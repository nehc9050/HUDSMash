HUDSMash
==================
This repository contains a very rudimentary mock-up of HUDSMash, a website
inspired by the Zucc's facemash while he was at Harvard, but with Harvard
dishes.
<h2>TODO</h2>
<h4>Scraper</h4>

* Update scraper to update database.
* Consider saving google image links instead of saving the actual image file.

<h4>Frontend</h4>

* Add a component for leaderboard/rankings.
* Add error reporting functionality (especially for bad images)
* Comment everything

<h4>Backend</h4>

* Change the call that queries for a food match to actually query a db/endpoint.
* Change the call that updates food matchups to actually query a db/endpoint.
* AWS stuff idk
* `requirements.txt`

<h3>Scraping</h3>
The  [scraper.ipynb][scraper.ipynb]  notebook handles scraping HUDS foods.
Currently loads a csv of all the Harvard foods into pandas dataframe, prunes it
so no duplicates are left.

<h3>Frontend</h3>
Runs on `http://localhost:3000/`. To start, run `npm start` in the `hudsmash` 
directory. Be sure to run `npm -i` first to install the relevant packages. The 
frontend is done in react and typescript and `create-react-app`. Currently, it's 
a single page with a single component, `ComparisonBox`. This component is the 
component that both requests for food matchups and sends POST requests back to 
the server with the winners of each matchup.

<h3>Backend</h3>
Runs on  `http://localhost:5000/`. First run

```
export FLASK_APP=api.py
export FLASK_ENV=development
```

In your terminal, then run `flask run` in the `hudsmash/backend` directory. Make
sure you have the relevant packages install (sorry, no requirements.txt yet,
just look at the imports in `api.py` for now). The backend is very simple. It
simply has two calls: `getMatch` and `updateMatch`. The first returns a pair
of foods, and the second takes also a pair of foods (labelled winner and loser).
Example of a `getMatch` result:

```
{
  "food1":
  {
    "name": "Sassage",
    "link": "https://i.pinimg.com/originals/79/a8/1a/79a81abcc2bc902343f16bb8cc83057b.png",
    "elo": 500,
  },
  "food2":
  {
    "name": "Apple pie",
    "link": "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/2/26/Apple_pie.png",
    "elo": 500,
  }
}
```

Example of a `updateMatch` POST request:

```
{
  "winner": "Apple pie",
  "loser": "Sassage",
}
```
