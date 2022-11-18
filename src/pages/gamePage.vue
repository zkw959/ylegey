<template>
  <div class="gamePage">
    <a-row class="music">
      音乐 
      <a-switch v-model:checked="checked" @change="checkedChange"/>
      <audio :src="gamePageMusic" loop ref="gameMusic"></audio>
    </a-row>
    <a-row align="space-between">
      <a-button style="margin-bottom: 8px" @click="router.go(-1)"> 返回</a-button>
      <a-button>块数：{{ clearBlockNum }} / {{ totalBlockNum }}</a-button>
    </a-row>
    <!-- 胜利 -->
    <a-row align="center">
    </a-row>
    <!-- 叠卡区 -->
    <a-row align="center">
      <div v-show="gameStatus > 0" class="level-board">
        <div v-for="(block, index) in levelBlocksVal" :key="index">
          <a-row 
            v-if="block.status === 0" 
            class="block level-block"
            :class="{ disabled: block.lowerThanBlocks.length > 0}"
            :data-id="block.id"
            :style="{
              zIndex: 99 + block.level,
              left: block.x * widthUnit + 'px',
              top: block.y * heightUnit + 'px'
            }"
            @click="doClickBlock(block)">
            <span>{{block.type}}</span>
          </a-row>
        </div>
      </div>
    </a-row>
    
    <!-- 随机区 -->
    <a-row align="space-between" class="random-board">
      <div 
        v-for="(randomBlock, index) in randomBlocksVal" 
        :key="index"
        class="random-area">

        <div 
          v-if="randomBlock.length > 0"
          :data-id="randomBlock[0].id"
          class="block"
          @click="doClickBlock(randomBlock[0], index)">
          <span>{{ randomBlock[0].type }}</span>
        </div>
        <!-- 隐藏 -->
        <div 
          v-for="num in Math.max(randomBlock.length - 1, 0)" 
          :key="num"
          class="block disabled"
        >
          <span v-show="false">{{randomBlock[num].type}}</span>
          
        </div>
      </div>
    </a-row>
    <!-- 插槽区 -->
    <a-row v-if="slotAreaVal.length > 0" align="center" class="slot-board">
      <div v-for="(slotBlock, index) in slotAreaVal" :key="index" class="block">
        {{ slotBlock?.type }}
      </div>
    </a-row>
    <!-- 技能区 -->
    <div class="skill-board">
      <a-space>
        <a-button size="small" @click="doRevert">撤回</a-button>
        <a-button size="small" @click="doRemove">移出</a-button>
        <a-button size="small" @click="doShuffle">洗牌</a-button>
        <a-button size="small" @click="doBroke">破坏</a-button>
      </a-space>
      
    </div>
    <!-- 游戏失败 -->
    <div  v-if="gameStatus === 2" class="game-failed">
      <img src="../assets/failed.gif" alt="">
      <p>小黑芝，你输了😹</p>
      <a-button @click="reStart">重新开始</a-button>
    </div>
    <!-- 游戏胜利 -->
    <div v-if="gameStatus === 3" class="game-success">
      <img src="../assets/success.gif" alt="">
      <p>赢了也改变不了 小黑芝的身份👻</p>
      <a-button @click="reStart">再来一次</a-button>
    </div>
    <!-- 遮罩 -->
    <div v-if="gameStatus === 2 || gameStatus === 3" class="mask"></div>
   
  </div>
</template>

<script setup lang="ts">
import useGame from "@/core/game";
import { useglobalStore } from "@/store";
import { onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import gamePageMusic from "@/assets/gamePage.mp3";

const router = useRouter();

const{ 
  gameStatus,
    levelBlocksVal,
    randomBlocksVal,
    slotAreaVal,
    widthUnit,
    heightUnit,
    currSlotNum,
    opHistory,
    totalBlockNum,
    clearBlockNum,
    doStart,
    doClickBlock,
    doShuffle,
    doBroke,
    doRevert,
    doRemove,
} = useGame();

onMounted(()=>{
  doStart();
})
// 重新开始
const reStart = () => {
  window.location.reload();
};
// 开关
const checked = ref<boolean>(false);

// 音乐标签
const gameMusic = ref();
// 开关变化时
const checkedChange = (checked : boolean) =>{
  const music = gameMusic.value;

  // 开启状态且音乐是暂停的
  if(checked && music.paused){
    // 开启状态且暂停时
      music.play();
  }else if(!checked && !music.paused){
    // 开启状态且播放时
    music.pause();
  }
}



</script>

<style scoped>
.music{
  margin-bottom: 20px;
  color: #fff;
}
.level-board {
  position: relative;
}
.level-block {
  position: absolute;
  user-select: none;
}
.random-board {
  margin-top: 8px;
}

.random-area {
  margin-top: 8px;
  display: flex;
  flex-flow: row wrap;
}
.slot-board {
  border: 0.5rem outset #e67e22;
  margin: 16px auto;
  width: fit-content;
}
.skill-board {
  text-align: center;
}
.block {
  display: inline-block;
  width: 42px;
  height: 42px;
  text-align: center;
  line-height: 42px;
  background-color: #fff;
  border: 1px solid #ecf0f1;
  font-size: 28px;
}
.disabled {
  background-color: #777;
  cursor: not-allowed;
}
.game-failed,
.game-success{
  width: 320px;
  height: 40vh;
  position: fixed;
  background-color: #fff;
  top: 50%;
  left: 50%;
  z-index: 10000;
  transform: translate(-160px, -20vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.game-failed > img{
  max-width: 200px;
}
.game-success > img{
  max-width: 280px;
}

.game-failed p {
  margin: 5px 0;
  font-size: 16px;
  color: #696969;
}
.game-success p {
  margin: 10px 0;
  font-size: 16px;
  color: #696969;
}

.mask{
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin: auto;
  background-color: rgba(0,0,0,0.4);
  z-index: 9999;
}
</style>>
