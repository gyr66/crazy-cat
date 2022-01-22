<template>
  <div class="game">
    <div class="head">
      <span>红色圆点代表障碍物</span> <br/>
      <span>蓝色圆点代表猫</span> <br/>
      <span>不断设置障碍物，防止猫跑出边界</span>
    </div>
    <div class="main">
      <div v-for="row in board.row" :key="row" class="row">
        <div
          v-for="col in board.col"
          :key="col"
          :class="{
            indent: !(row & 1),
            hasCat: row === cat.position.row && col === cat.position.col,
            isObstacle: board.map[row - 1][col - 1] === 1,
          }"
          class="pot"
          @click="handleClick(row, col)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import {Cat} from "@/model/Cat";
import {Board} from "@/model/Board";
import {GameManager, Status} from "@/model/GameManager";
import {ElMessage, ElMessageBox} from "element-plus";
import {useStore} from 'vuex'
import {storeKey} from "@/symbols";


const store = useStore(storeKey);

const gameConfig = store.state.gameConfig;
const audio = new Audio("click.mp3");
const cat = reactive(new Cat(gameConfig.catPosition));
const board = reactive(new Board(gameConfig.boardHeight, gameConfig.boardWidth));
const gameManager = new GameManager(board, cat, gameConfig.obstacleCnt);
const handleClick = (row: number, col: number) => {
  audio.play();
  if (board.map[row - 1][col - 1]) return;
  if (cat.position.row === row && cat.position.col === col) return;
  board.map[row - 1][col - 1] = 1;
  const status = gameManager.response();
  if (status === Status.WIN)
    ElMessageBox.alert("成功", "提示", {
      confirmButtonText: "OK",
      center: true,
      callback: () => {
        gameManager.resetGame();
        ElMessage({
          message: "刷新棋盘",
          type: "success",
        });
      },
    });
  else if (status === Status.FAIL)
    ElMessageBox.alert("失败", "提示", {
      confirmButtonText: "OK",
      center: true,
      callback: () => {
        gameManager.resetGame();
        ElMessage({
          message: "刷新棋盘",
          type: "success",
        });
      },
    });
};
onMounted(() => {
  const pots = document.querySelectorAll(".pot");
  const oddPots = document.querySelectorAll(".indent");
  const widthStr = getComputedStyle(document.querySelector('.main') as Element, null).getPropertyValue('width');
  const wholeWidth = Number.parseInt(widthStr.substring(0, widthStr.length - 2));
  let width = 2 * wholeWidth / (3 * gameConfig.boardWidth + 1);
  pots.forEach(value => {
    (value as HTMLElement).style.width = width + 'px';
    (value as HTMLElement).style.height = width + 'px';
    (value as HTMLElement).style.borderRadius = width + 'px';
    (value as HTMLElement).style.margin = width / 4 + 'px';
  });
  oddPots.forEach(value => {
    (value as HTMLElement).style.left = width / 2 + 'px';
  });
});
</script>

<style scoped>
.game {
  margin: 8px;
}

.head {
  font-size: 20px;
  margin-bottom: 20px;
  color: green;
  text-align: center;
}

.pot {
  background-color: gainsboro;
  display: inline-block;
  position: relative;
}

.hasCat {
  background-color: blue;
}

.isObstacle {
  background-color: red;
}
</style>