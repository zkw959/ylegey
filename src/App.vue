<template>
  <div id="container">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>

<style scoped>
  #container{
    padding: 0 15px;
    margin: 0 auto;
  }
  .content{
    background: linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.1)), url("@/assets/bg.jpg") no-repeat center/cover;
    min-height: 100vh;
    max-width: 480px;
    margin: 0 auto;
    padding: 16px 16px 50px;
  }

</style>
<style>

</style>
