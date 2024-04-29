<template>
  <div
    style="
      height: calc(100vh - 50px);
      width: 200px;
      border-right: 1px solid var(--el-border-color);
      display: block;
    "
  >
  <div style="height: calc(100% - 50px);overflow-y: auto;
      overflow-x: hidden;">
    <!-- <el-row class="tac">
      <el-col :span="12"> -->
    <el-button
      style="margin-left: 25px; margin-top: 20px; width: 150px; font-size: 18px"
      type="success"
      plain
      @click="createNewChat"
      ><Plus
        theme="outline"
        size="20"
        fill="#649e22"
        strokeLinejoin="bevel"
      />新建聊天</el-button
    >
    <el-menu style="width: 200px; flex: 1">
      <el-menu-item
        v-for="chat in talkStore.talkList"
        :key="chat.id"
        class="chat-menu"
        @click="switchChat(chat.id)"
      >
        <el-icon :size="22"><ChatDotRound /></el-icon>
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
      </el-menu-item>
      <el-button @click="test">测试</el-button>
    </el-menu>

  </div>
  <div style="height:50px;border-top:1px solid var(--el-border-color);
  display: flex;align-items: center; /* 垂直居中 */">
    <img src="../assets/usericon.png" style="margin-top: 5px;margin-left:20px;height:40px;width:auto;">
  <div style="width:50px;margin-left: 20px;color:#2d3436;">user</div>
  <el-icon :size="23" style="margin-left:20px;"><Setting /></el-icon>
  </div>
  </div>
  
</template>

<script setup lang="ts" name="Aside">
import { ChatDotRound, Delete,Edit,Setting } from '@element-plus/icons-vue'
import { Plus } from '@icon-park/vue-next'
import { ElMessage, ElMessageBox } from 'element-plus'
import {ref,onMounted} from 'vue'
import { request } from '@/utils/request';

import { useTalkStore } from '@/stores/Chatid'
import { useUserStore } from '@/stores'
import { useChatnewStore } from '@/stores/modules/chat'

import type { ChatMessage } from "@/types";

const talkStore = useTalkStore()
const userStore = useUserStore()
const chatnewStore = useChatnewStore()

const createNewChat = () => {
  // 创建新导航
  const newId = generateNewId()
  const newtitle = '新建聊天'
  // 创建新导航
  const newChat = { id: newId, title:newtitle,messageList: ref<ChatMessage[]>([
        // 核心对话
        {
          role: "system",
          content: "你是 ChatGPT，OpenAI 训练的大型语言模型，尽可能简洁地回答。",
        },
        {
          role: "assistant",
          content: `你好，我是  AI助手，我可以提供以下常见服务和信息选项：
        1:  &nbsp; 翻译服务：我可以帮你进行中英文互译，还可以处理其他语言，如法语、日语、西班牙语等。
        2:  &nbsp; 咨询支持：如果你有任何问题需要咨询，无论是健康、法律、投资还是其他领域，我会尽力提供帮助和建议。
        3:  &nbsp; 闲聊陪伴：如果你感到孤独或无聊，我们可以聊一些有趣的话题，以减轻你的压力和寂寞感。
        请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。`,
        }
      ]) }
  talkStore.talkList.push(newChat)
  console.log(talkStore.talkList)
  // 更新当前活跃的 chatid
  // talkStore.activeChatId = newChat.id
}

const chatIds = ref<string[]>([]);

const deleteChat = (chatId) => {
  const index = talkStore.talkList.findIndex((chat) => chat.id === chatId)
  if (index !== -1) {
    talkStore.talkList.splice(index, 1)
  }
}

const test = () => {
      console.log('与后端交互前');
      // const id =1;
      try{
      request.get("/chatList/"+userStore.user).then(res => {
        console.log(res.data);
        chatnewStore.chatList = res.data;
        // talkStore.addChats(res.data);
        // talkStore.test(); // 调用测试方法
      // 向指定id的聊天中添加message
      // const newMessage = {
      //   role: 'user',
      //   content: '这是一个新消息'
      // };
      // talkStore.addMessageToChat(3, newMessage); // 假设我们向id为'15'的聊天添加新消息

      })
    }
    catch(error)
    {
      ElMessage.error(error.response.data.errMsg)

    }
}

const changetitle = (chatId) => {
  ElMessageBox.prompt('您要将聊天名称设置为', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputErrorMessage: '标题不合法',
  })
    .then(({ value }) => {
      const chat = talkStore.talkList.find(t => t.id === chatId);
      chat.title = value;
      ElMessage({
        type: 'success',
        message: `Your email is:${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}


const generateNewId = () => {
  // 找到当前仓库中最大的ID
  const maxId = Math.max(...talkStore.talkList.map((chat) => chat.id), 0)
  // 生成新的ID为最大ID + 1
  return maxId + 1
}

const switchChat = (chatId) => {
  talkStore.activeChatId = chatId
  console.log(talkStore.activeChatId)
}


onMounted(() => {
      // talkStore.test(); // 调用测试方法
      // talkStore.addChats(yourNewChatsArray); // 调用添加聊天信息的方法
    });

</script>

<style scoped>
.chat-menu {
  color: #529b2e;
  width: 100%;
  /* margin-left: 0px; */
}

.menu-content {
  display: flex;
  align-items: center;
  overflow: hidden;
  /* padding: 0 10px; */
}

.menu-text {
  width: 120px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.delete-icon {
  cursor: pointer;
  margin-right: -5px;
  /* margin-right: 0px; */
  color: #a8a8a8;
}
</style>
