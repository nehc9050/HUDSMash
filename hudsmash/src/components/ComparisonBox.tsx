/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import { LeaderBoard } from './LeaderBoard';
import { GenericButton } from './GenericButton';

// TODO: "Skip current matchup" button

interface IState {
  timesSubmitted: number;
  food1: foodObject;
  food2: foodObject;
  rankings: ReadonlyArray<foodObject>;
}

export interface foodObject {
  score: number;
  displayName: string;
  leaderboardHelper?: number;
  name: string;
  image?: string;
  locked?: boolean;
}

const comparisonBoxStyle = css`
  padding-top: 50px;
  .foods {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .food {
    margin: 25px;
  }
  .foodimg {
    height: 200px;
    width: auto;
    border-radius: 10px;
    margin: 10px;
  }
  .column {
    flex-direction: column;
    flex-wrap: wrap;
    width: 50%;
  }
`;

export class ComparisonBox extends React.Component<{}, IState> {
  async getRankings():Promise<any> {
    await(fetch("https://uu9smuiu4d.execute-api.us-east-1.amazonaws.com/demo/getleaderboard", {
      method:  'POST',
      mode: 'cors',
    })).then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({rankings: data});
    });
  }

  async submitFood(winner: string, loser: string):Promise<any> {
    await(fetch("https://uu9smuiu4d.execute-api.us-east-1.amazonaws.com/demo/beats", {
        method:  'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({winner: winner, loser: loser}),
      })
      .then(() => this.setState({timesSubmitted: this.state.timesSubmitted + 1}))
      .then(() => console.log(this.state))
      .then(() => {
        this.getMatch();
        // this.getRankings();
    }));
  };

  async getMatch() {
    try {
      await(fetch("https://uu9smuiu4d.execute-api.us-east-1.amazonaws.com/demo/getfoodpair",
        {
          method:  'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => res.json()).then(data => {
          console.log(data);
          this.setState(
            {
              food1: data.first,
              food2: data.second
            }
          );
        }));
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    this.getMatch();
    this.getRankings();
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      timesSubmitted: 0,
      food1: {
        displayName: '',
        image: '',
        name: '',
        score: 500,
      },
      food2: {
        displayName: '',
        image: '',
        name: '',
        score: 500,
      },
      rankings: [
        {'displayName': 'Sassage', 'name': 'sassage', 'score': 500},
        {'displayName': 'Apple pie', 'name': 'applePie', 'score': 500}
      ],
    }
  }

  render() {
    return (
      <div css={comparisonBoxStyle}>
        <div className="foods">
          <div className="row">
            <div className="food">
              <img
                src={this.state.food1.image}
                alt={this.state.food1.displayName}
                className='foodimg'
              />
              <div>
                <div
                  onClick={(event: any) => {
                    this.submitFood(this.state.food1.name, this.state.food2.name)
                  }}
                >
                  <GenericButton text={this.state.food1.displayName}/>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="food">
              <img
                src={this.state.food2.image}
                alt={this.state.food2.image}
                className='foodimg'
              />
              <div>
                <div
                  onClick={(event: any) => {
                    this.submitFood(this.state.food2.name, this.state.food1.name)
                  }}
                >
                  <GenericButton text={this.state.food2.displayName}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={(event: any) => {this.getMatch()}}
        >
          <GenericButton text="Skip this matchup"/>
        </div>
        <LeaderBoard
          {...{rankings: this.state.rankings}}
        />
        <div
          onClick={(event: any) => {this.getRankings()}}
        >
          <GenericButton text="Refresh rankings"/>
        </div>
      </div>
    )
  }
}
