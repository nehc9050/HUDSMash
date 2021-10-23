/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

interface IProps {
  text: String;
}

const buttonStyle = css`
  button {
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
    font-size: 36px;
    font-family: Poppins;
    background-color: #E23432;
    height: 58px;
    line-height: 58px;
    width: 410px;
    color: white;
    border: 5px solid #A50A0E;
    border-radius: 10px;
    box-sizing: border-box;
    cursor: pointer;
    transition-duration: 0.3s;

    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  button:hover {
    cursor: pointer;
    transition-duration: 0.3s;
    background: white;
    color: black;
  }
`;

export class GenericButton extends React.Component<IProps, {}> {
  render() {
    return (
      <div id='button' css={buttonStyle}>
        <button>
        {this.props.text}
        </button>
      </div>
    )
  }
}
