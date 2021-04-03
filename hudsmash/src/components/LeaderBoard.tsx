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
    font-family: 'Roboto Mono', monospace;
    font-size: 14px;
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
              <li key={food.displayName}> {food.displayName} (elo: {Math.round(food.score)}) </li>
            );
          })}
          </ol>
        </div>
      </div>
    );
  }
}
