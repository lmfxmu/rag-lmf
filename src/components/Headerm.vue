<template>
  <div
    style="
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      display: flex;
    "
  >
    <div
      style="
        width: 200px;
        padding-left: 30px;
        font-weight: bold;
        color: dodgerblue;
      "
    >
      个人版应用管理后台
    </div>
    <div style="flex: 1"></div>
    <div style="width: 100px">
      <el-dropdown style="margin: 10px; margin-top: 20px">
        <span class="el-dropdown-link">
          用户
          <el-icon class="el-icon--right">
            <Arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userStore.setUser()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>

<script>
export default {
  name: 'Headerm'
}
</script>
<script setup>
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
</script>
