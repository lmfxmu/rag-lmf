<template>
  <div class="zhuti">
    <div class="tubiao">
      <div class="tubiaoin">图标</div>
    </div>
    <div class="wenda">知识问答</div>
    <div class="wenda">智能写作</div>
    <div class="wenda">ppt创作</div>
    <div style="flex: 1"></div>
    <div>
      <el-icon color="#57606f" :size="30" style="margin-top: 10px"
        ><Notebook
      /></el-icon>
    </div>
    <div class="zhishiku">我的知识库</div>
    <div class="yonghu">
      <el-dropdown class="yonghuicon">
        <span class="el-dropdown-link">
          用户名
          <el-icon class="el-icon--right">
            <Arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
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

.zhuti {
  height: 50px;
  width: 100%;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
}
.wenda {
  width: 100px;
  padding-left: 30px;
  font-weight: bold;
  color: dodgerblue;
}
.tubiao {
  width: 100px;
  padding-left: 30px;
  font-weight: bold;
}
.tubiaoin {
  width: 80%;
  height: 80%;
  padding-left: 10px;
  margin-top: 5px;
  border: 1px dashed #000;
}
.yonghu {
  width: 100px;
  padding-right: 30px;
}
.yonghuicon {
  width: 70px;
  margin-top: 20px;
}
.zhishiku {
  width: 100px;
  font-weight: bold;
  color: rgb(23, 19, 6);
}
</style>

<script setup name="Header">
// import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { Notebook } from '@element-plus/icons-vue'
</script>
