<template>
  <div class="whole-screen">
    <!-- 头部 -->
    <Headerc />
    <div style="display: flex;width:100%;height:calc(100vh - 50px);">
      <!-- 侧边栏 -->
      <!-- <Asidec /> -->
      <!-- 内容区域 -->
      <router-view style="width:100%;height:100%;"/>
      <!-- <Chatc style="flex-grow: 1" /> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import Headerc from '@/components/Headerc.vue'
import Asidec from '@/components/Asidec.vue'
import Chatc from '@/components/Chatc.vue'
</script>

<style scoped>
.whole-screen {
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  border: 0px;
}
</style>
