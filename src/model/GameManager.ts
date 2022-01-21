import { Board } from "./Board";
import { Cat } from "./Cat";

enum Decision {
  LEFT_UP, RIGHT_UP, RIGHT, RIGHT_DOWN, LEFT_DOWN, LEFT
}

export enum Status {
  DOING, WIN, FAIL
}

const mapper = [Decision.LEFT_UP, Decision.RIGHT_UP, Decision.RIGHT, Decision.RIGHT_DOWN, Decision.LEFT_DOWN, Decision.LEFT];

const dxForOdd = [-1, -1, 0, 1, 1, 0];
const dyForOdd = [-1, 0, 1, 0, -1, -1];
const dxForEven = [-1, -1, 0, 1, 1, 0];
const dyForEven = [0, 1, 1, 1, 0, -1];

type TNote = [number, Decision | null];

export class GameManager {
  private board;
  private cat;
  private obstacleCnt;
  private vis: Array<Array<boolean>> = [];
  private note: Array<Array<TNote | null>> = [];

  constructor(board: Board, cat: Cat, obstacleCnt = 6) {
    this.board = board;
    this.cat = cat;
    this.obstacleCnt = obstacleCnt;
    for (let i = 0; i < this.board.row; i++) this.vis[i] = [];
    for (let i = 0; i < this.board.row; i++) this.note[i] = [];
    this.initBoard();
  }

  setObstacleCnt(obstacleCnt: number): void {
    this.obstacleCnt = obstacleCnt;
    this.initBoard();
  }

  resetGame(): void {
    this.initBoard();
    this.cat.resetPosition();
  }

  private initBoard(): void {
    for (let i = 0; i < this.board.row; i++) {
      for (let j = 0; j < this.board.col; j++) {
        this.board.map[i][j] = 0;
      }
    }
    const max = this.board.row * this.board.col;
    if (this.obstacleCnt >= max) throw new Error("障碍物数量大于棋盘所能容纳量!");
    const hashMap = new Map<number, boolean>();
    while (hashMap.size < this.obstacleCnt) {
      const rand = Math.floor(Math.random() * max);
      const x = Math.floor(rand / this.board.col);
      const y = Math.floor(rand % this.board.col);
      if (x + 1 === this.cat.position.row && y + 1 === this.cat.position.col) continue;
      this.board.map[x][y] = 1;
      hashMap.set(rand, true);
    }
  }

  response(): Status {
    for (let i = 0; i < this.board.row; i++) {
      for (let j = 0; j < this.board.col; j++) {
        this.vis[i][j] = false;
        this.note[i][j] = null;
      }
    }

    const res = this.solve(this.cat.position.row - 1, this.cat.position.col - 1);
    const dist = res[0];
    const decision = res[1];

    if (decision === null) {
      return Status.WIN;
    }
    if (dist === 0) {
      return Status.FAIL;
    }
    switch (decision as Decision) {
      case Decision.LEFT: this.cat.leftMove();
        break;
      case Decision.LEFT_DOWN: this.cat.leftDownMove();
        break;
      case Decision.LEFT_UP: this.cat.leftUpMove();
        break;
      case Decision.RIGHT: this.cat.rightMove();
        break;
      case Decision.RIGHT_DOWN: this.cat.rightDownMove();
        break;
      case Decision.RIGHT_UP: this.cat.rightUpMove();
    }
    return Status.DOING;
  }

  private solve(x: number, y: number): TNote {
    if (this.note[x][y]) return this.note[x][y] as TNote;
    let min = Number.MAX_VALUE;
    let res: Decision | null = null;
    this.vis[x][y] = true;
    for (let i = 0; i < 6; i++) {
      let nx: number, ny: number;
      if (x & 1) {
        nx = x + dxForEven[i];
        ny = y + dyForEven[i];
      } else {
        nx = x + dxForOdd[i];
        ny = y + dyForOdd[i];
      }
      if (nx < 0 || nx >= this.board.row || ny < 0 || ny >= this.board.col) return this.note[x][y] = [0, mapper[i]];
      if (this.vis[nx][ny]) continue;

      if (this.board.map[nx][ny]) continue;
      this.vis[nx][ny] = true;
      let distance = this.solve(nx, ny)[0];
      distance = distance < Number.MAX_VALUE ? distance + 1 : distance;
      if (distance < min) {
        min = distance;
        res = mapper[i];
      }
      this.vis[nx][ny] = false;
    }

    return this.note[x][y] = [min, res];
  }

}