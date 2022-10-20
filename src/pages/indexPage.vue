<template>
  <div class="indexPage">
    <h1>歪了个歪</h1>
    <div>仿羊了个羊小游戏，随便通关</div>
    <a-button block="true" shape="round" @click="toGamePage(easyGameConfig)">简单模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage(easyGameConfig)">中等模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage(hardGameConfig)">困难模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage(lunaticGameConfig)">地狱模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage(skyGameConfig)">上天模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage(yangGameConfig)">羊了个羊模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage()">自定义模式</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import {
  easyGameConfig,
  middleGameConfig,
  hardGameConfig,
  lunaticGameConfig,
  skyGameConfig,
  yangGameConfig
  
} from "@/core/gameConfig"
import { useglobalStore } from "@/store";

const router = useRouter();

const { setGameConfig } = useglobalStore()

const toGamePage = (config:GameConfigType) => {
  if(config){
    
    setGameConfig(config)
    router.push('/game')
  }else{
    router.push('/config')
  }
  
}
</script>

<style scoped>
.indexPage{
  text-align: center;
  font-size: 16px;
  color: azure;
}
h1{
  color: rgb(243, 247, 17);
}
.indexPage > *{
  margin-bottom: 24px;
}

</style>
