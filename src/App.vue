<template>
  <div id="container">
    <router-link to="/game">开始游戏</router-link>
    <br/>
    <router-link to="/custom">自定义配置</router-link>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>

<style scoped>
  #container{
    background: linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.1)), url("@/assets/bg.jpg") no-repeat center/cover;
    width: 540px;
    min-height: 100vh;
    padding: 15px;
    margin: 0 auto;
  }
  .content{
    width: 420px;
    margin: 0 auto;
  }

</style>
