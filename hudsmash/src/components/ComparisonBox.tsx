/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';

// TODO: "Skip current matchup" button

interface IState {
  timesSubmitted: number;
  food1: foodObject;
  food2: foodObject;
}

export interface foodObject {
  name: string;
  link?: string;
  elo: number;
}

const comparisonBoxStyle = css`
  .foods {
    display: flex;
    margin: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .foodimg {
    height: 200px;
    width: auto;
    margin: 15px;
  }
`;

export class ComparisonBox extends React.Component<{}, IState> {
  async submitFood(winner: string, loser: string):Promise<any> {
    fetch("http://localhost:5000/updateMatch", {
      method:  'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({winner: winner, loser: loser}),
    })
      .then(() => this.setState({timesSubmitted: this.state.timesSubmitted + 1}))
      .then(() => console.log(this.state))
      .then(() => this.getMatch())
  };

  async getMatch() {
    try {
      fetch("http://localhost:5000/getMatch").then(res => res.json()).then(data => {
        this.setState({food1: data.food1, food2: data.food2});
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    this.getMatch();
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
            <button
              onClick={(event: any) => {
                this.submitFood(this.state.food1.name, this.state.food2.name)
              }}
            >
              Choose {this.state.food1.name}
            </button>
          </div>
          <div className="food">
            <img
              src={this.state.food2.link}
              alt={this.state.food2.name}
              className='foodimg'
            />
            <br/>
            <button
              onClick={(event: any) => {
                this.submitFood(this.state.food2.name, this.state.food1.name)
              }}
            >
              Choose {this.state.food2.name}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
