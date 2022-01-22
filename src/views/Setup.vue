<template>
  <div class="setup">
    <div class="head">
      <span>围住神经猫</span>
    </div>
    <div class="main">
      <div class="row">
        <span>障碍物数量:</span>&nbsp;
        <el-input class="input" v-model.number="gameConfig.obstacleCnt" type="number"/>
      </div>
      <div class="row">
        <span>棋盘大小:</span>&nbsp;
        <span>高:</span>
        <el-input v-model.number="gameConfig.boardHeight" type="number"/>
        <span>宽:</span>
        <el-input v-model.number="gameConfig.boardWidth" type="number"/>
      </div>
      <div class="row">
        <span>猫的位置:</span>&nbsp;
        <span>行:</span>
        <el-input v-model.number="gameConfig.catPosition.row" type="number"/>
        <span>列:</span>
        <el-input v-model.number="gameConfig.catPosition.col" type="number"/>
      </div>
      <div class="row">
        <el-button type="success" @click="handleConfirmClicked">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {ElMessage} from 'element-plus';
import router from "@/router";
import {useStore} from "vuex";
import {storeKey} from "@/symbols";

const gameConfig = reactive({
  obstacleCnt: 15,
  boardHeight: 15,
  boardWidth: 9,
  catPosition: {
    row: 8,
    col: 5
  }
})

const store = useStore(storeKey);

const handleConfirmClicked = () => {
  const maxObstacleCnt = gameConfig.boardHeight * gameConfig.boardWidth - 1;
  if (gameConfig.obstacleCnt > maxObstacleCnt) {
    ElMessage.error('障碍物数量超出棋盘所能容纳的最大值!');
    return;
  }
  if (gameConfig.catPosition.row < 1 || gameConfig.catPosition.row > gameConfig.boardHeight
    || gameConfig.catPosition.col < 1 || gameConfig.catPosition.col > gameConfig.boardWidth) {
    ElMessage.error('猫的位置非法!');
    return;
  }
  store.commit('setGameConfig', gameConfig);
  router.push('/game');
}



</script>

<style scoped>
.setup {
  width: 100vw;
  height: 100vh;
  text-align: center;
}

.head {
  position: relative;
  top: 20px;
  font-size: 30px;
  color: green;
}

.main {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 80%;
  height: 50%;
  border: 2px solid lightseagreen;
  border-radius: 20px;
  background-color: ghostwhite;
}

.el-input {
  width: 20% !important;
  margin: 10px;
}

.el-button {
  margin: 10px !important;
}
</style>
