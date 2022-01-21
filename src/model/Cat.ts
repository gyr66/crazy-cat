
export type TPosition = {
  row: number,
  col: number
}
/**
 * 猫的移动
 * 如果是在奇数行，左减少，右不动
 * 如果是偶数行，左不动，右增加
 */
export class Cat {
  position: TPosition;
  initX: number;
  initY: number;

  constructor(position: TPosition = {
    row: 8,
    col: 5
  }) {
    this.position = position;
    this.initX = position.row;
    this.initY = position.col;
  }

  resetPosition(): void {
    this.position.row = this.initX;
    this.position.col = this.initY;
  }

  leftMove(): void {
    this.position.col--;
  }

  rightMove(): void {
    this.position.col++;
  }

  leftUpMove(): void {
    if (this.position.row & 1) {
      this.position.col--;
    }
    this.position.row--;
  }

  rightUpMove(): void {
    if (!(this.position.row & 1)) {
      this.position.col++;
    }
    this.position.row--;
  }

  leftDownMove(): void {
    if (this.position.row & 1) {
      this.position.col--;
    }
    this.position.row++;
  }

  rightDownMove(): void {
    if (!(this.position.row & 1)) {
      this.position.col++;
    }
    this.position.row++;
  }
}