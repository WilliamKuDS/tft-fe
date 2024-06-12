import React from 'react';
import Hex from './tft_hex';
import { Hex as HexLib, Grid, HexOrientation } from './hexLib';

interface HexGridProps {
  rows: number;
  cols: number;
  size?: number;
}

export default function HexGrid({ rows, cols, size = 30 }: HexGridProps) {
  const grid = new Grid(HexOrientation.Pointy, size, rows, cols);

  const hexHeight = size * 2;
  const hexWidth = Math.sqrt(3) * size;
  const width = hexWidth * cols;
  const height = hexHeight * (3 / 4) * (rows - 1) + hexHeight;

  const paddingX = hexWidth / 2; // Horizontal padding
  const extraLeftPadding = hexWidth / 2; // Extra padding for left due to staggered rows
  const paddingY = hexHeight / 2; // Vertical padding

  return (
    <div className="items-center">
      <svg 
        width={width + paddingX * 2 + extraLeftPadding} 
        height={height + paddingY} 
        viewBox={`-${paddingX + extraLeftPadding} -${paddingY} ${width + paddingX * 2 + extraLeftPadding} ${height + paddingY}`}
      >
        {grid.hexes.map((hex, index) => (
          <Hex key={index} hex={hex} size={size} />
        ))}
      </svg>
    </div>
  );
}
