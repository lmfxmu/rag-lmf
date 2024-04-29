<template>
  <div
    style="
      height: calc(100vh - 50px);
      width: 200px;
      border-right: 1px solid var(--el-border-color);
      display: block;
    "
  >
  <div style="height: calc(100% - 100px);overflow-y: auto;
      overflow-x: hidden;">
    <!-- <el-row class="tac">
      <el-col :span="12"> -->
    <el-button
      style="margin-left: 10%; margin-top: 20px; width: 80%; font-size: 18px;margin-bottom: 10px;"
      type="success"
      plain
      @click="createNewChat"
      ><Plus
        theme="outline"
        size="20"
        fill="#649e22"
        strokeLinejoin="bevel"
      />新建聊天</el-button>
    <el-menu style="width: 200px; flex: 1">
      <el-menu-item
        v-for="chat in chatnewStore.chatList.value"
        :key="chat.id"
        class="chat-menu"
        @click="switchChat(chat.id)"
      >
      <div style="border:1px;margin-left:-10px;width:108%;height: 80%;border: 1px dashed #a7d391;
          border-radius: 5px;display: flex; align-items: center;">
        <!-- 虚线框 -->
        <el-icon :size="22" style="margin-left: 5px;"><ChatDotRound /></el-icon>
        <div class="menu-content">
          <span class="menu-text">{{ chat.title }}</span>
          <el-icon
            :key="`edit-${chat.id}`"
            style="color: #a8a8a8;margin-right:-5px;"
            icon="el-icon-close"
            @click="changetitle(chat.id)"
            :size="18"
            ><Edit
          /></el-icon>
          <el-icon
            class="delete-icon"
            @click="deleteChat(chat.id)"
            :key="`delete-${chat.id}`"
            icon="el-icon-close"
            :size="18"
            ><Delete
          /></el-icon>
        </div>
      </div>
      </el-menu-item>
    </el-menu>

  </div>
  <!-- <div style="height:50px;border-top:1px solid var(--el-border-color);
  display: flex;align-items: center; /* 垂直居中 */">
    <img src="../assets/usericon.png" style="margin-top: 5px;margin-left:20px;height:40px;width:auto;">
  <div style="width:100px;margin-left: 10px;color:#2d3436;">username</div>
  <el-dropdown style="margin-left:0px" class="el-dropdown">
    <span class="el-dropdown-link">
      <el-icon :size="23" style="color:#343a40"><Setting /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="userStore.setUser()">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </div> -->
  <div style="height:50px;border-top:1px solid var(--el-border-color);
  display: flex;align-items: center;">
    <el-select
      v-model="value1"
      placeholder="模型"
      size="small"
      style="width:30%;margin-left:10px;"
    >
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="value2"
      placeholder="提示词"
      size="small"
      style="width:50%;margin-left:20px;"
    >
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>

  <div style="height:50px;border-top:1px solid var(--el-border-color);
  display: flex;align-items: center;">
    <el-select
      v-model="value3"
      placeholder="知识库"
      size="small"
      style="width:50%;margin-left:10px;"
    >
      <el-option
        v-for="item in options3"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

  </div>

  </div>
  
</template>

<script setup lang="ts" name="Asidec">
import { ChatDotRound, Delete,Edit,Setting } from '@element-plus/icons-vue'
import { Plus } from '@icon-park/vue-next'
import { ElMessage, ElMessageBox } from 'element-plus'
import {ref,onMounted} from 'vue'
import { request } from '@/utils/request';
import { md } from "@/libs/markdown";

import { useTalkStore } from '@/stores/Chatid'
import { useUserStore } from '@/stores'
import { useChatnewStore } from '@/stores/modules/chat'

// import type { ChatMessage } from "@/types";

// const talkStore = useTalkStore()
const userStore = useUserStore()
const chatnewStore = useChatnewStore()

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const options1 = [
  {
    value: 1,
    label: 'GLM3',
  },
  {
    value: 2,
    label: 'GLM4',
  },
  {
    value: 0,
    label: '模型',
  }



]
const options2 = [
  {
    value: 1,
    label: '英语助手',
  },
  {
    value: 2,
    label: '数学建模比赛',
  },
  {
    value: 0,
    label: '提示词',
  }

]
const options3 = [
  {
    value: 1,
    label: 'rag技术',
  },
  {
    value: 2,
    label: '厦门',
  },
  {
    value: 0,
    label: '知识库',
  }
]




const createNewChat = async () => {
  // // 创建新导航
  // const newId = generateNewId()
  const newtitle = '新建聊天'
  const sendform={
    title:newtitle,
    userId:userStore.user
    
}
  try{
      await request.post("/chat",sendform).then(res => {
        // console.log(res.data);
        ElMessage.success('创建成功')
        chatnewStore.chatList.value = res.data;
        // console.log(chatnewStore.chatList.value,'仓库');
      })
    }
    catch(error)
    {
      ElMessage.error(error.response.data.errMsg)

    }
    load();

}

// const chatIds = ref<string[]>([]);

const deleteChat = async(chatId) => {

  ElMessageBox.confirm('确定删除该聊天吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    
   try{
       request.delete("/chat/"+chatId).then(res => {
        ElMessage.success('删除成功')
        load();
      })
    }
    catch(error)
    {
      ElMessage.error(error.response.data.errMsg)
    }
  })
  .catch(() => {
      ElMessage({
        type: 'info',
        message: '输入取消',
      });
    });
    
}

const load = async() => {
      // console.log('与后端交互前');
      // const id =1;
      try{
      await request.get("/chatList/"+userStore.user).then(res => {
        // console.log(res.data);
        chatnewStore.chatList.value = res.data;
        // console.log(chatnewStore.chatList.value,'仓库');
      })
    }
    catch(error)
    {
      ElMessage.error(error.response.data.errMsg)

    }
}

onMounted(() => {
  load();
});

const switchChat = async (chatid) => {
      try{
        
        await request.get("/message/"+chatid).then(res => {
        // const chatidin = chatid.value;
        chatnewStore.activeChatId = chatid;
        chatnewStore.messageList.value = res.data;
        // console.log('chatid为',chatid,'仓库里的为',chatnewStore.activeChatId);
        //仓库的数字竟然不用.value??  这个bug找了估计有一个多小时
        console.log(res.data)
        if (res.data.length === 0)
        {
          chatnewStore.intro=1;
        }
        else
        {
          chatnewStore.intro=0;
        }
        console.log('介绍',chatnewStore.intro);

        chatnewStore.messageList.value.forEach((item) => {
          if (item.content) {
            item.content = md.render(item.content);
            }
        });
        console.log(chatnewStore.messageList.value);
      })
    }
    catch(error)
    {
      chatnewStore.intro=1;
      ElMessage.error(error.response.data.errMsg)
    }
}



const changetitle = async (chatId) => {
  ElMessageBox.prompt('您要将聊天名称设置为', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputErrorMessage: '标题不合法',
  })
    .then(({ value }) => {
      // chat.title = value;
      const sendform = {
        id: chatId,
        title: value,
        userId: userStore.user,
      };

      request.put("/chat", sendform)
        .then(res => {
          // 成功处理
          ElMessage({
            type: 'success',
            message: `已修改聊天标题为:${value}`,
          });
          load();
        })
        .catch(error => {
          // 错误处理
          ElMessage.error(error.response.data.errMsg);
        });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '输入取消',
      });
    });
};




</script>

<style scoped>
.chat-menu {
  color: #529b2e;
  width: 100%;
  /* border-top: 0.5px dashed #a7d391; 
  border-bottom: 0.5px dashed #a7d391;  */
  
}

.menu-content {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 10px;
}

.menu-text {
  width: 120px;
  margin-left: -10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}


.delete-icon {
  cursor: pointer;
  margin-right: -5px;
  color: #a8a8a8;
}



.el-dropdown .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>
