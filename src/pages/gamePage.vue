<template>
  <div>
    开始游戏
    <div class="level-board">
      123
    </div>
  </div>
</template>

<script setup lang="ts">
import useGame from "@/core/game";
import { easyGameConfig } from "@/core/gameConfig";
import { useglobalStore } from "@/store";
import { onMounted } from "@vue/runtime-core";

const { initGame } = useGame()
onMounted(()=>{
  console.log(initGame());
  const { setGameConfig } = useglobalStore()
  setGameConfig(easyGameConfig)
})


</script>

<style scoped>

</style>>
