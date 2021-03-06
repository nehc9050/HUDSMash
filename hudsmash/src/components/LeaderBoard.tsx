/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import { foodObject } from './ComparisonBox';

interface IProps {
  rankings: ReadonlyArray<foodObject>;
}

const leaderBoardStyle = css`
  #ranklist {
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }
  .rankings {
    display: flex;
    align-items: center;
  }
`;

export class LeaderBoard extends React.Component<IProps, {}> {
  render() {
    return (
      <div css={leaderBoardStyle}>
        <div className='rankings'>
          <ol id='ranklist'>
          {this.props.rankings.map((food: foodObject) => {
            return (
              <li key={food.name}> {food.name} (elo: {Math.round(food.elo)}) </li>
            );
          })}
          </ol>
        </div>
      </div>
    );
  }
}
