/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

const titleStyle = css`
  @font-face {
    font-family: 'Palanquin', sans-serif;
    src: url(./../fonts/Palanquin-Regular.ttf) format('truetype');
    weight: 700;
  }
  @font-face {
    font-family:
    src: url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
  }
  #title {
    font-family: 'Courier Prime', monospace;
    font-size: 40px;
    font-weight: 400;
    color: white;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(226, 52, 50);
    padding-top: 10px;
    margin-top: 0px;
  }
`;

function Title() {
  return (
    <div css={titleStyle}>
      <h3 id='title'>HUDSMash</h3>
    </div>
  )
}

export default Title;
