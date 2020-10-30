/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import { foodObject } from './ComparisonBox';

interface IState {
  rankings: ReadonlyArray<foodObject>;
}

const leaderBoardStyle = css`
  .rankings {
  }
`;

export class LeaderBoard extends React.Component<{}, IState> {
  async getRankings():Promise<any> {
    await(fetch("http://localhost:5000/getRankings")).then(res => res.json())
    .then(data => {
      this.setState({rankings: data});
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
        <ol>
        {this.state.rankings.map((food: foodObject) => {
          return (
            <li> {food.name} (elo: {food.elo}) </li>
          );
        })}
        </ol>
      </div>
    );
  }
}
