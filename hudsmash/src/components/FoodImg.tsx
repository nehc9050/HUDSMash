
/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';

interface IProps {
  src: string;
  rounded: number;
}

interface IState {
  src: string;
  errored: boolean;

}

export class FoodImg extends React.Component<IProps, IState> {
  getImgStyle = () => {
    return css`
      position: relative;
      background-image: url(${this.state.src});
      width: 474px;
      height: 386px;
      background-size: cover;
      border: 4px solid #A50A0E;
      box-sizing: border-box;
      ${this.props.rounded === 0 && `
        border-radius: 10px 10px 0px 0px;
        border-bottom: 2px;
      `}
      ${this.props.rounded === 1 && `
        border-radius: 0px 10px 10px 0px;
        border-left: 2px;
      `}
      ${this.props.rounded === 2 && `
        border-radius: 0px 0px 10px 10px;
        border-top: 2px;
      `}
      ${this.props.rounded === 3 && `
        border-radius: 10px 0px 0px 10px;
        border-right: 2px;
      `}
  `;
  }

  getTextStyle = () => {
    return css`
      background-color: black;
      height: 20px;
      width: 200px;
      position: absolute;
    `;
  }

  constructor(props: {src: string, rounded: number}) {
    super(props);
    this.state = {
      src: props.src,
      errored: false,
    }
  }

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: "https://en.meming.world/images/en/b/bc/Mike_Wazowski-Sulley_Face_Swap.jpg",
        errored: true,
      });
    }
  }

  render() {
        // <img
        //   src={this.state.src}
        //   alt={this.state.src}
        //   className='foodimg'
        //   onError={() => this.onError()}
        // />
    return (
      <div
        css={this.getImgStyle()}
      >
        <div css={this.getTextStyle()}>
        </div>
      </div>
    )
  }
}
