<template>
  <div>
    <!-- <el-row class="tac">
      <el-col :span="12"> -->
    <el-menu
      style="width: 200px; min-height: calc(100vh - 50px)"
      default-active="/manage"
      router
    >

      <el-menu-item index="/manage/user">
        <el-icon><UserFilled /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/manage/prompt">
        <el-icon><MagicStick /></el-icon>
        <span>提示词管理</span>
      </el-menu-item>
      <el-menu-item index="/manage/knowledgebase">
        <el-icon><Document /></el-icon>
        <span>知识库管理</span>
      </el-menu-item>
      <el-menu-item index="/manage/model">
        <el-icon><Printer /></el-icon>
        <span>模型管理</span>
      </el-menu-item>
      <!-- <el-menu-item index="User">
        <el-icon><icon-menu /></el-icon>
        <span>用户数据库</span>
      </el-menu-item> -->
      
    </el-menu>
    <!-- </el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  name: 'Asidem'
}
</script>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  UserFilled,
  MagicStick,
  Printer
} from '@element-plus/icons-vue'
</script>

<style scoped></style>
