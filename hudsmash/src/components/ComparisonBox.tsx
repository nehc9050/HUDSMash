/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import { LeaderBoard } from './LeaderBoard';
import { GenericButton } from './GenericButton';
import { FoodImg } from './FoodImg';
import ReactLoading from 'react-loading';

interface IState {
  timesSubmitted: number;
  foods: Array<foodGroup>;
  food1_list: Array<foodObject>;
  food2_list: Array<foodObject>;
  rankings: ReadonlyArray<foodObject>;
  loading: boolean;
  loadingRanks: boolean;
  requestIds: Array<string>;
}

export interface foodObject {
  score: number;
  displayName: string;
  leaderboardHelper?: number;
  name: string;
  image: string;
  locked?: boolean;
}

export interface foodGroup {
  first: foodObject;
  second: foodObject;
  requestId: string;
}

const comparisonBoxStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
  justify-content: center;
  .foods {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 25px;
  }
  .food {
  }
  .column {
    flex-direction: column;
    flex-wrap: wrap;
    width: 50%;
  }
  .loading {
    margin: 130px;
  }
  .loadingRanks {
    margin-left: 48%;
    margin-right: 48%;
    margin-top: 84px;
    margin-bottom: 84px;
  }
  #skipButton {
    align-self: center;
  }
`;

export class ComparisonBox extends React.Component<{}, IState> {
  async getRankings():Promise<any> {
    try {
      this.setState({ loadingRanks: true });
      await(fetch("https://j4ldrj5h4f.execute-api.us-east-2.amazonaws.com/prod/getleaderboard", {
        method:  'POST',
        mode: 'cors',
      })).then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ rankings: data });
        this.setState({ loadingRanks: false });
      });
    } catch (error) {
      this.setState({ loadingRanks: false });
      console.log("Error on getRankings encountered");
    }
  }

  async submitFood(firstWon: boolean):Promise<any> {
    try {
      await(fetch("https://j4ldrj5h4f.execute-api.us-east-2.amazonaws.com/prod/beats", {
          method:  'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            winner: this.state.foods[0][(firstWon ? "first" : "second")].name,
            loser: this.state.foods[0][(firstWon ? "second" : "first")].name,
            requestId: this.state.foods[0].requestId
          }),
        })
        .then(() => {
          this.skip();
          this.getRankings();
      }));
    } catch (error) {
      console.log("Error on submitFood encountered, moving to next food");
      this.skip();
      this.getRankings();
    }
  };

  async getMatch() {
    try {
      if (this.state.foods.length === 0) {
        this.setState({ loading: true });
      }
      while (this.state.foods.length < 10) {
        await(fetch("https://j4ldrj5h4f.execute-api.us-east-2.amazonaws.com/prod/getfoodpair",
        // await(fetch("http://127.0.0.1:5000/getMatch",
          {
            method:  'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(res => res.json()).then(data => {
            // console.log(data);
            this.setState(
              {
                foods: [...this.state.foods, data],
                loading: false
              }
            );
          }));
        console.log(this.state.foods);
      }
    } catch (error) {
      console.log("Error on getMatch encountered");
      // console.log(error);
      this.getMatch();
    }
  }

  async componentDidMount() {
    this.getMatch();
    this.getRankings();
  }

  skip() {
    this.setState(
      {
        foods: this.state.foods.slice(1),
        loading: false
      }
    );
    this.getMatch();
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      timesSubmitted: 0,
      food1_list: [],
      food2_list: [],
      foods: [],
      rankings: [],
      loading: true,
      loadingRanks: false,
      requestIds: [],
    }
  }

  render() {
    /*
      <div>
        <div
          onClick={(event: any) => {
            this.submitFood(true);
          }}
        >
          <GenericButton text={this.state.foods[0].first.displayName}/>
        </div>
      </div>
     */
    return (
      <div css={comparisonBoxStyle}>
        <div className="foods">
          <div className="row">
            {
              this.state.loading ?
                <div className="loading">
                  <ReactLoading type={"bubbles"} color={"rgb(226, 52, 50)"} height={50} width={50}/>
                </div> :
                <div className="food">
                  <FoodImg
                    src={this.state.foods[0].first.image}
                    rounded={3}
                    key={this.state.foods[0].first.image}
                  />
                </div>
            }
          </div>

          <div className="row">
            {
              this.state.loading ?
                <div className="loading">
                  <ReactLoading type={"bubbles"} color={"rgb(226, 52, 50)"} height={50} width={50}/>
                </div> :
                <div className="food">
                  <FoodImg
                    src={this.state.foods[0].second.image}
                    rounded={1}
                    key={this.state.foods[0].second.image}
                  />
                </div>
            }
          </div>
        </div>
        <div id="skipButton" onClick={(event: any) => {this.skip()}}>
          <GenericButton text="Skip this matchup"/>
        </div>
        {
          this.state.loadingRanks ?
            <div className="loadingRanks">
              <ReactLoading type={"bubbles"} color={"rgb(226, 52, 50)"} height={50} width={50}/>
            </div> :
            <LeaderBoard
              {...{rankings: this.state.rankings}}
            />
        }
      </div>
    )
  }
}
