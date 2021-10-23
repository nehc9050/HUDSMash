/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import { foodObject } from './ComparisonBox';

interface IProps {
  rankings: ReadonlyArray<foodObject>;
}

const leaderBoardStyle = css`
  #ranklist {
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    font-family: 'Poppins';
    font-size: 16px;
    line-height: 28px;
  }
  .rankings {
    display: flex;
    flex-direction: column;
    max-width: 550px;
    border: 5px solid #A50A0E;
    box-sizing: border-box;
    border-radius: 10px 10px 0px 0px;
    margin-top: 20px;
  }
  #rankingsTitle {
    color: white;
    background-color: #E23432;
    height: 50px;
    font-family: 'Poppins';
    font-weight: 700;
    font-size: 32px;
    border-radius: 5px 5px 0px 0px;
  }
`;

export class LeaderBoard extends React.Component<IProps, {}> {
  render() {
    return (
      <div css={leaderBoardStyle}>
        <div className='rankings'>
          <div id='rankingsTitle'>
            RANKINGS
          </div>
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
