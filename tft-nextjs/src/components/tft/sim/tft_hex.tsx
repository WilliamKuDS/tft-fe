import React from 'react';
import { Hex as HexLib } from './hexLib';

interface HexProps {
  hex: HexLib;
  size: number;
}

export default function Hex({ hex, size }: HexProps) {
  const corners = hex.corners(size).map(corner => `${corner.x},${corner.y}`).join(' ');

  return (
    <polygon
      points={corners}
      stroke="black"
      strokeWidth="1"
      fill="lightgrey"
      transform={`translate(${hex.x},${hex.y})`}
    />
  );
}
