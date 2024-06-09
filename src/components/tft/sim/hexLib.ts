// components/hexLib.ts
export class Hex {
  q: number;
  r: number;
  s: number;
  x: number;
  y: number;

  constructor(q = 0, r = 0, s = 0, size = 30, orientation = HexOrientation.Pointy) {
    this.q = q;
    this.r = r;
    this.s = s;
    const { x, y } = hexToPixel(this, size, orientation);
    this.x = x;
    this.y = y;
  }

  static directions = [
    new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1),
    new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1),
  ];

  static direction(direction: number) {
    return Hex.directions[direction];
  }

  static add(a: Hex, b: Hex) {
    return new Hex(a.q + b.q, a.r + b.r, a.s + b.s);
  }

  neighbors() {
    return Hex.directions.map((direction) => Hex.add(this, direction));
  }

  corners(size: number) {
    const angle = Math.PI / 3;
    return Array.from({ length: 6 }, (_, i) => {
      const x = size * Math.cos(angle * i + Math.PI / 2);
      const y = size * Math.sin(angle * i + Math.PI / 2);
      return { x, y };
    });
  }
}

export class Grid {
  hexes: Hex[];

  constructor(orientation: HexOrientation, size: number, rows: number, cols: number) {
    this.hexes = [];
    const hexHeight = size * 2;
    const hexWidth = Math.sqrt(3) * size;

    for (let r = 0; r < rows; r++) {
      for (let q = 0; q < cols; q++) {
        const x = hexWidth * q + (hexWidth / 2) * (r % 2);
        const y = hexHeight * (3 / 4) * r;
        const hex = new Hex(q - Math.floor(r / 2), r, -q + Math.floor(r / 2) - r, size, orientation);
        hex.x = x;
        hex.y = y;
        this.hexes.push(hex);
      }
    }
  }
}

export enum HexOrientation {
  Pointy = 'pointy',
  Flat = 'flat',
}

function hexToPixel(hex: Hex, size: number, orientation: HexOrientation) {
  const x = size * (Math.sqrt(3) * hex.q + (Math.sqrt(3) / 2) * hex.r);
  const y = size * ((3 / 2) * hex.r);
  return { x, y };
}
