export type TPosition = {
  row: number,
  col: number
}

export interface IGameConfig {
  obstacleCnt: number;
  boardHeight: number;
  boardWidth: number;
  catPosition: TPosition;
}

export interface IState {
  gameConfig: IGameConfig
}

