/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

interface IProps {
  text: String;
}

const buttonStyle = css`
  @font-face {
    font-family: 'Roboto Mono', monospace;
    src: url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
  }

  button {
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Roboto Mono', monospace;
    background-color: white;
    padding: 5px;
    border: none;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.24), 0 1px 1px 0 rgba(0,0,0,0.19);
    cursor: pointer;
    transition-duration: 0.3s;
    max-width: 200px;
    min-width: 50px;
  }

  button:hover {
    cursor: pointer;
    transition-duration: 0.3s;
    box-shadow: 0 6px 8px 0 rgba(0,0,0,0.24), 0 3px 3px 0 rgba(0,0,0,0.19);
    background: rgb(226, 52, 50);
    color: white;
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
