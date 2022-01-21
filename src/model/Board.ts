export class Board {
  row: number;
  col: number;
  map: Array<Array<number>>;

  constructor(row = 15, col = 9) {
    this.row = row;
    this.col = col;
    this.map = new Array<Array<number>>();
    for (let i = 0; i < row; i++) {
      this.map[i] = [];
    }
  }
}