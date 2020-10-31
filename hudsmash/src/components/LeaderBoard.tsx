/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import { foodObject } from './ComparisonBox';

interface IState {
  rankings: ReadonlyArray<foodObject>;
}

const leaderBoardStyle = css`
  .rankings {
    display: flex;
    align-items: center;
  }
  #ranklist {
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }
`;

export class LeaderBoard extends React.Component<{}, IState> {
  async getRankings():Promise<any> {
    await(fetch("http://localhost:5000/getRankings")).then(res => res.json())
    .then(data => {
      this.setState({rankings: data.foods});
    });
  }

  async componentDidMount() {
    this.getRankings();
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      rankings: [
        {'name': 'Sassage', 'elo': 500},
        {'name': 'Apple pie', 'elo': 500}
      ],
    }
  }

  render() {
    return (
      <div css={leaderBoardStyle}>
        <div className='rankings'>
          <ol id='ranklist'>
          {this.state.rankings.map((food: foodObject) => {
            return (
              <li key={food.name}> {food.name} (elo: {Math.round(food.elo)}) </li>
            );
          })}
          </ol>
        </div>
        <button
          onClick={(event: any) => {this.getRankings()}}
        >
          Refresh rankings
        </button>
      </div>
    );
  }
}
