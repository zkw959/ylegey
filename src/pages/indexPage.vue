<template>
  <div class="indexPage">
    <h1>歪了个歪</h1>
    <div>仿羊了个羊小游戏，随便通关</div>
    <a-button block="true" shape="round" @click="toGamePage(config)">简单模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage(config)">中等模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage(config)">困难模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage(config)">地狱模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage(config)">上天模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage(config)">羊了个羊模式</a-button>
    <a-button block="true" shape="round" @click="toGamePage(config)">自定义模式</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import '@/core/type'

const router = useRouter();

const toGamePage = (config:GameConfigType) => {
  if(config){
    router.push('/game')
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
