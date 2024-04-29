<template>
  <div>
    <!-- 头部 -->
    <Headerm />
    <!-- 主体 -->
    <div style="display: flex">
      <!-- 侧边栏 -->
      <Asidem />
      <!-- 内容区域 -->
      <router-view style="height:calc(100vh - 50px);width:100%" />
    </div>
  </div>
</template>
<script>
import Headerm from '@/components/Headerm.vue'
import Asidem from '@/components/Asidem.vue'
export default {
  name: 'Manage',
  components: {
    Headerm,
    Asidem
  }
}
</script>
