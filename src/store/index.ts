import {createStore} from "vuex";
import {IState} from "@/types";


export default createStore<IState>({
  state: {
    gameConfig: {
      obstacleCnt: 15,
      boardHeight: 15,
      boardWidth: 9,
      catPosition: {
        row: 8,
        col: 5
      }
    }
  },
  mutations: {
    setGameConfig(state, config) {
      state.gameConfig = config;
    }
  }
})