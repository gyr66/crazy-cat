<template>
  <div class="home">
    <div class="head">
      <span>障碍物数量:</span>
      <el-select v-model="pots" size="small" style="width: 20%">
        <el-option
          v-for="item in potCnt"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        type="success"
        @click="gameManager.setObstacleCnt(pots)"
        size="small"
        >确定</el-button>
    </div>
    <div class="wrap">
      <div class="row" v-for="row in board.row" :key="row">
        <div
          class="pot"
          v-for="col in board.col"
          :key="col"
          :class="{
            indent: !(row & 1),
            hasCat: row === cat.position.row && col === cat.position.col,
            isObstacle: board.map[row - 1][col - 1] === 1,
          }"
          @click="handleClick(row, col)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { Cat } from "@/model/Cat";
import { Board } from "@/model/Board";
import { GameManager, Status } from "@/model/GameManager";
import { ElMessage, ElMessageBox } from "element-plus";

const cat = reactive<Cat>(new Cat());
const board = reactive<Board>(new Board());
let pots = ref(15);
const gameManager = new GameManager(board, cat, pots.value);
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
const audio = new Audio("click.mp3");
const potCnt: number[] = [];
for (let i = 5; i <= 25; i += 5) potCnt.push(i);
onMounted(() => {
  const potEles = document.getElementsByClassName("pot");
  for (let i = 0; i < potEles.length; i++) {
    let width = getComputedStyle(potEles[i], null).getPropertyValue("width");
    potEles[i].style.height = width;
    let widthVal = Number.parseInt(width.substring(0, width.length - 2));
    potEles[i].style.borderRadius = widthVal / 2 + "px";
  }
});
</script>

<style scoped>
.pot {
  background-color: gainsboro;
  width: 8.51%;
  display: inline-block;
  margin: 1%;
  position: relative;
}

.indent {
  left: 5%;
}

.hasCat {
  background-color: blue;
}

.isObstacle {
  background-color: red;
}

.head {
  margin-bottom: 30px;
  text-align: center;
}
</style>