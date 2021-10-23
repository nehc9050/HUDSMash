
/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';

interface IProps {
  src: string;
}

interface IState {
  src: string;
  errored: boolean;
}

const foodImgStyle = css`
  .foodimg {
    height: 300px;
    width: 300px;
    object-fit: cover;
  }
`;

export class FoodImg extends React.Component<IProps, IState> {
  constructor(props: {src: string}) {
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
    return (
      <div
        css={foodImgStyle}
      >
      <img
        src={this.state.src}
        alt={this.state.src}
        className='foodimg'
        onError={() => this.onError()}
      />
      </div>
    )
  }
}
