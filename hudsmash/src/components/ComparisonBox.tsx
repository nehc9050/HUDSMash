/** @jsx jsx */

import React from 'react';
import { jsx } from '@emotion/core';

interface foodObject {
  name: string;
  link: string;
  elo: number;
}

interface ComparisonProps {
  food1: foodObject;
  food2: foodObject;
}

export function ComparisonBox(props: ComparisonProps) {
  return (
    <React.Fragment>
      <img src={props.food1.link} alt={props.food1.name}/>
      <img src={props.food1.link} alt={props.food1.name}/>
    </React.Fragment>
  );
}
