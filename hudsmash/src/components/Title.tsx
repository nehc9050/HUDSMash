/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

const titleStyle = css`
  #title {
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap');
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #E23432;
    padding-top: 10px;
    margin-top: 0px;
  }
`;

const hudsStyle = css`
  color: white;
`;
const mashStyle = css`
  color: black;
`;

function Title() {
  return (
    <div css={titleStyle}>
      <h3 id='title'>
        <span css={hudsStyle}>HUDS</span>
        <span css={mashStyle}>Mash</span>
      </h3>
    </div>
  )
}

export default Title;
