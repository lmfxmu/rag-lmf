<template>
  <el-row class="zhuti">
    <el-menu
    :default-active="activeIndex"
    class="el-menu"
    mode="horizontal"
    @select="handleSelect"
    router
  >

    <el-menu-item class="item1" style="width:120px;" index="/layout/chat">    
      <el-icon><Sunrise /></el-icon>
      <span>聊天问答</span>
    </el-menu-item>
    <el-menu-item class="item2" style="width:120px;" index="/layout/paint" >    
      <el-icon><Brush /></el-icon>
      <span>文生图</span>
    </el-menu-item>
    <el-menu-item class="item3" style="width:150px;" index="/layout/prompt" >    
      <el-icon><MagicStick /></el-icon>
      <span>提示词配置</span>
    </el-menu-item>
    <el-menu-item class="item4" style="width:150px;" index="/layout/knowledgebase" >    
      <el-icon><Document /></el-icon>
      <span>知识库配置</span>
    </el-menu-item>

  </el-menu>
    <div style="flex: 1"></div>
    <!-- <div>
      <el-icon color="#57606f" :size="30" style="margin-top: 10px"
        ><Notebook
      /></el-icon>
    </div>
    <div class="zhishiku">我的知识库</div> -->
    <div class="yonghu">
      <el-dropdown class="el-dropdown-link">
        <span>
          用户
          <el-icon >
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
  </el-row>
</template>

<style scoped>
.el-menu{
  height: 50px;
  width: 700px;
  background-color: #eef5fe;

  /* color:#5a9cf8;  */
}

/* .el-menu :deep(.is-active) {
    border-bottom: 2px solid var(--el-menu-active-color);
    color: #ce5210 !important;
    background-color: #c0d09d ;
} */


.item1 {
  color: var(--el-color-primary);

}

.item1.is-active {
    border-bottom: 2px solid var(--el-menu-active-color);
    /* color: #ce5210 !important; */
    background-color: #dee9f7 ;
    font-weight: bold ;
    color: #5f3dc4 !important;
}




.item2 {
  color: var(--el-color-primary);
}

.item2.is-active {
    border-bottom: 2px solid var(--el-menu-active-color);
    /* color: #ce5210 !important; */
    background-color: #dee9f7 ;
    font-weight: bold ;
    color: #5f3dc4 !important;
}

.item3 {
  color: var(--el-color-primary);
}

.item3.is-active {
    border-bottom: 2px solid var(--el-menu-active-color);
    /* color: #ce5210 !important; */
    background-color: #dee9f7 ;
    font-weight: bold ;
    color: #5f3dc4 !important;
}

.item4 {
  color: var(--el-color-primary);
}

.item4.is-active {
    border-bottom: 2px solid var(--el-menu-active-color);
    /* color: #ce5210 !important; */
    background-color: #dee9f7 ;
    font-weight: bold ;
    color: #5f3dc4 !important;
}


.zhuti {
  height: 50px;
  width: 100%;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  background-color: #eef5fe;
  /* background-color: #e9ecef ; */
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
  width: 60px;
  height: 50px;
  /* padding-right: 0px; */
  display: flex;
  align-items: center;
  margin-right: 10px;
}
/* .yonghuicon {
  width: 50px;
  margin-top: 20px;
  padding-right: 10px;
} */
.zhishiku {
  width: 100px;
  font-weight: bold;
  color: rgb(23, 19, 6);
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  padding-right: 0px;
}

</style>

<script setup name="Headerc">
// import { ElMessage } from 'element-plus'
import { ArrowDown,Sunrise,Brush,MagicStick,Document } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()

</script>
