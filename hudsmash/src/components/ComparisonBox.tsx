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
  name: string;
  link?: string;
  elo: number;
}

const comparisonBoxStyle = css`
  padding-top: 50px;
  .foods {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .food{
    margin: 25px;
  }
  .foodimg {
    height: 200px;
    width: auto;
    margin: 10px;
  }
`;

export class ComparisonBox extends React.Component<{}, IState> {
  async getRankings():Promise<any> {
    await(fetch("https://c8wf5rsmie.execute-api.us-east-1.amazonaws.com/demo/getleaderboard", {
      method:  'POST',
      mode: 'cors',
    })).then(res => res.json())
    .then(data => {
      this.setState({rankings: data.foods});
    });
  }

  async submitFood(winner: string, loser: string):Promise<any> {
    fetch("https://c8wf5rsmie.execute-api.us-east-1.amazonaws.com/demo/beats", {
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
        this.getRankings();
      })
  };

  async getMatch() {
    try {
      fetch("https://c8wf5rsmie.execute-api.us-east-1.amazonaws.com/demo/getfoodpair",
        {
          method:  'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => res.json()).then(data => {
          this.setState({food1: data.food1, food2: data.food2});
        });
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
        name: '',
        link: '',
        elo: 500,
      },
      food2: {
        name: '',
        link: '',
        elo: 500,
      },
      rankings: [
        {'name': 'Sassage', 'elo': 500},
        {'name': 'Apple pie', 'elo': 500}
      ],
    }
  }

  render() {
    return (
      <div css={comparisonBoxStyle}>
        <div className="foods">
          <div className="food">
            <img
              src={this.state.food1.link}
              alt={this.state.food1.name}
              className='foodimg'
            />
            <br/>
            <div
              onClick={(event: any) => {
                this.submitFood(this.state.food1.name, this.state.food2.name)
              }}
            >
              <GenericButton text={this.state.food1.name}/>
            </div>
          </div>
          <div className="food">
            <img
              src={this.state.food2.link}
              alt={this.state.food2.name}
              className='foodimg'
            />
            <br/>
            <div
              onClick={(event: any) => {
                this.submitFood(this.state.food2.name, this.state.food1.name)
              }}
            >
              <GenericButton text={this.state.food2.name}/>
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
