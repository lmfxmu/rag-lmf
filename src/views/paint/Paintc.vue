<template>
  <el-watermark :font="font" :content="['RAG-powered AI Service']" >
  <el-container class="chat-zhuti">
    <div class="chat-main">
      <div class="chat-list" ref="chatListDom" >
        <!-- <div v-if=" chatnewStore.intro " class="introduction">
          <el-row>
          <el-col :span="8" justify="center">
            <el-row justify="center" class='icon1'>
              <el-icon size=30><Flag /></el-icon></el-row>
              <el-row justify="center" class='span1'>疑难解答</el-row>
              <el-row><div class="int1">{{question1}}</div></el-row>
              <el-row><div class="int1">{{question2}}</div></el-row>
              <el-row><div class="int1">{{question3}}</div></el-row>
            </el-col>
            <el-col :span="8" justify="center">
              <el-row justify="center" class='icon2'><el-icon size=30><Document /></el-icon></el-row>
              <el-row justify="center" class='span2'>问题资讯</el-row>
              <el-row><div class="int2">{{question4}}</div></el-row>
              <el-row><div class="int2">{{question5}}</div></el-row>
              <el-row><div class="int2">{{question6}}</div></el-row>
            </el-col>
            <el-col :span="8" justify="center">
              <el-row justify="center" class='icon3'><el-icon size=30><Fire /></el-icon></el-row>
              <el-row justify="center" class='span3'>创意灵感</el-row>
              <el-row><div class="int3">{{question7}}</div></el-row>
              <el-row><div class="int3">{{question8}}</div></el-row>
              <el-row><div class="int3">{{question9}}</div></el-row>
            </el-col>
          </el-row>

        </div> -->
         
          <div v-for="item in messageList"  :key="item.content">
          <div 
          v-if="item.role != 2"
          class="chat-role">
            <robot theme="outline" size="26" fill="#9c36b5 "/>
            <div style="margin-left:5px;color:#9c36b5;">{{ 'draw ai' }}:</div>
            <div style="flex-grow: 1"></div>
          </div>
          <div v-else class="chat-role1">
            <div style="flex-grow: 1"></div>
            <div style="margin-right:5px">{{ 'ME' }}
              <User theme="outline" size="25" fill="#4a90e2" :strokeWidth="5"/>
            </div>
          </div>

          <div v-if="item.role != 2">
            <div
              class="chat-content"
              style="width:30%;height:auto"
              v-if="item.role != 2 && item.content"
              v-html="getItemContentHtml(item.content)"
              ></div>
          <Loding v-else />
        </div>
        <div v-else style="display: flex;">
          <div style="flex-grow: 1;"></div>
          <div
            class="chat-content1"
            v-if="item.content"
            v-html="item.content"
          >
        </div>
          <Loding v-else />
        </div>
        </div> 
      
      </div>

      
      <div class="chat-send">  <!-- 发送板块 -->
        <div style="width:100%;display: flex;">
          <el-input
            class="chat-input"
            :type=" 'textarea'"
            :autosize="{ minRows: 1, maxRows: 2 }"
            placeholder='请输入'
            :prefix-icon="Search"
            maxlength="1000"
            resize="none"
            show-word-limit
            v-model="messageContent"
            @keydown.enter="isTalking || sendgpt()"
          />
          <div style="width: 50px;"></div>
          <!-- <el-button :disabled="isTalking" @click="sendgpt()"> -->
            <el-button :disabled="isTalking" type="primary" plain
            style="margin-right:10px;font-size:18px;height:35px;"
            @click="sendgpt()" 
            >
              {{"发送" }}<ArrowUp theme="outline" size="22" fill="#4a90e2" strokeLinejoin="bevel"/>
            
          </el-button>
        </div>
      
      </div>

    </div>
  </el-container>
</el-watermark>
</template>

<script setup lang="ts" name="Paintc">
import { Flag,Document } from '@element-plus/icons-vue'
import type { ChatMessage } from "@/types";
//限制类型
import { ref, watch, nextTick, onMounted, toRef,toRefs } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { chat } from "@/libs/gpt";

import cryptoJS from "crypto-js";
// 加密apikey
import Loding from "@/components/Loding.vue";
import Copy from "@/components/Copy.vue";
import { md } from "@/libs/markdown";

import { Search,Top } from '@element-plus/icons-vue'

import {Robot,User,ArrowUp,Fire } from "@icon-park/vue-next"
import { request } from '@/utils/request';
import { useTalkStore } from '@/stores/Chatid'
import { storeToRefs } from 'pinia'
import { useChatnewStore } from '@/stores/modules/chat'
import { reactive} from 'vue'
// import { isDark } from '~/composables/dark'


const font = reactive({
  color: 'rgba(0, 0, 0, .10)',
  fontWeight: 10,
  fontSize:16,
})

const question1='如何使用 Python 编写一个能够计算斐波那契数列的函数？'
const question2= '如何在家庭生活中平衡工作和个人需求？'
const question3= '解释一下人工智能的发展历程和应用领域。'
const question4= '如何通过设计和布局改善网页的用户体验？'
const question5= '解释一下区块链技术的工作原理和它对金融行业的影响。'
const question6= '科技创新对环境保护有哪些积极的影响？'
const question7= '如何通过设计和布局改善网页的用户体验？'
const question8= '如何获得绘画作品创作灵感？'
const question9= '如何在团队合作中有效沟通和解决冲突？'

// watch(
//   isDark,
//   () => {
//     font.color = isDark.value
//       ? 'rgba(255, 255, 255, .15)'
//       : 'rgba(0, 0, 0, .15)'
//   },
//   {
//     immediate: true,
//   }
// )



const talkstore = useTalkStore()
const {talkList,activeChatId} = storeToRefs(talkstore)
const chatnewStore = useChatnewStore()

const markdownString = "测试信息```cpp\nhelloworld\n```测试信息";
const renderedHtml = md.render(markdownString);



let isConfig = ref(false);
let isTalking = ref(false);
//是否正在对话

let messageContent = ref("");
//最下方输入框内容
const chatListDom = ref<HTMLDivElement>();
const decoder = new TextDecoder("utf-8");
const roleAlias = { user: "ME", assistant: "ChatGPT", system: "System" };
//身份设置



const messageList=[

  {
    role:2,
    content:"请你帮我画一张可爱的小猫图片"
  },
  {
    role:1,
    content:"https://sfile.chatglm.cn/testpath/11da6aaf-1cc4-54df-aad8-5bed9b531ca3_0.png"
  },

]

const isImageUrl = (url) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/.test(url);
};

const getItemContentHtml = (content) => {
  if (isImageUrl(content)) {
    return `<img src="${content}" alt="消息图片" style="max-width: 100%; height: auto;">`;
  } else {
    return content;
  }
};

const messages = ref<{ role: number; content: string }[]>([]);

const fetchMessages = async () => {
      try {
        const res = await request.get("/message");
        if (res.errMsg === "成功") {
          // 提取 data 数组中的 content 属性
          messages.value = res.data;
        } else {
          console.error("Error fetching messages:", res.errMsg);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }

}

  function test1function()
{
  console.log(chatnewStore.messageList.value,'打印信息');
}

// const messageList = ref<ChatMessage[]>([
//   // 核心对话
// ]);

onMounted(() => {

});


const sendgpt = async() => {
  if (!messageContent.value.length) 
  {
    ElMessage.error('请输入文本');
    return;
  }
  //无文本不操作
  try {
    isTalking.value = true;
    // console.log('仓库里的为',chatnewStore.activeChatId);
    const myform ={
      role: 2,
      content: messageContent.value,
      chatId: chatnewStore.activeChatId
    }
    console.log(myform);

    const form2 ={
      role: 2,
      content: messageContent.value
    }

    chatnewStore.messageList.value.push(form2)
    await request.post("/message",myform).then(res => {
        console.log(res.data);
        ElMessage.success('发送成功');
        const form2 ={
        role: 1,
        content: res.data.content
        }
        chatnewStore.messageList.value.push(form2)
      })
  } catch (error) {
    console.log(error);
    ElMessage.error(error.response.data.errMsg);
  } finally {
    isTalking.value = false;
  }
  //谈话
};



const scrollToBottom = () => {
  if (!chatListDom.value) return;
  scrollTo(0, chatListDom.value.scrollHeight);
};
//自动滚动到聊天框最低端

// watch(messageList.value, () => nextTick(() => scrollToBottom()));

// watch(activeChatId, (newActiveChatId, oldActiveChatId) => {
  // 在 activechatid 变化时调用另一个函数
  // changemessage();
// });

</script>

<style scoped>
.chat-zhuti {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.chat-main {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
}
.chat-list {
  /* display: block; */
  width: 100%;
  max-height: calc(100vh - 150px); /* 设置最大高度 */
  flex-grow: 1;
  overflow-y: auto;
  
}

.introduction{
  width:80%;
  height:100%;
  justify-content: center;
  margin-left:10%;
}

.icon1
{
  margin-top:30px;
  color: #7c3497;
}

.span1{
  margin-top:10px;
  color: #7c3497;
  font-size: 20px; 
  font-weight: 600;
}

.icon2
{
  margin-top:30px;
  color: #3062a6;
}

.span2{
  margin-top:10px;
  color: #3062a6;
  font-size: 20px; 
  font-weight: 600;
}
.icon3
{
  margin-top:30px;
  color: #ce423a;
}

.span3{
  margin-top:10px;
  color: #ce423a;
  font-size: 20px; 
  font-weight: 600;
}

.int1{

  background-color: #f3f3f3;
  color: #7c3497;
  font-size: 16px; /* 使用像素值 */
  line-height: 1.3; /* 使用无单位值，表示相对于字体大小的倍数 */
  padding: 10px;
  width: 98%;
  word-break: break-all;
  border-radius: 10px;
  margin-top:15px;
  margin-left:20px;
  margin-right:20px;
}

.int2{

color: #3062a6;
background-color: #f3f3f3;
font-size: 16px; /* 使用像素值 */
line-height: 1.3; /* 使用无单位值，表示相对于字体大小的倍数 */
padding: 10px;
word-break: break-all;
border-radius: 10px;
margin-top:20px;
margin-left:20px;
margin-right:20px;
}

.int3{
  color: #ce423a;
background-color: #f3f3f3;
font-size: 16px; /* 使用像素值 */
line-height: 1.3; /* 使用无单位值，表示相对于字体大小的倍数 */
padding: 10px;
word-break: break-all;
border-radius: 10px;
margin-top:20px;
margin-left:20px;
margin-right:20px;
}

.chat-role {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center; 
  /* text-align: center; */
  white-space: nowrap;
  font-size: 20px; /* 使用像素值 */
  margin-top:10px;
  color: #4834d4;
}
.chat-role1 {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center; 
  /* text-align: center; */
  white-space: nowrap;
  font-size: 17px; /* 使用像素值 */
  margin-top:10px;
  color: #042701;
}

.chat-content {
  display: block;
  background-color: #f3f3f3;
  font-size: 18px; /* 使用像素值 */
  line-height: 1.3; /* 使用无单位值，表示相对于字体大小的倍数 */
  padding: 10px;
  width: 98%;
  word-break: break-all;
  border-radius: 10px;
}

.chat-content1 {
  font-size: 18px; /* 使用像素值 */
  color:black;
  line-height: 1.3; /* 使用无单位值，表示相对于字体大小的倍数 */
  max-width: 70%;
  margin-right: 10px;
  padding-left: 20px;
  padding: 10px;
  word-break: break-all;
  display:block;
  /* background-color: #DAF8D4; */
  background-color: #9bdb8f;
  border-radius: 10px;
}

.chat-send{

width: 100%;
height: 100px;
margin-bottom: 0px;
display: flex;
align-items: center;
justify-content: center;
/* border-top: 1px solid #000;  */
}



.chat-input{

  /* border-radius:3px; */
  font-size: 18px;

}

.chat-input :deep(.el-textarea__inner){

  color:#090a09;
  background-color: #eef5fe;
  border-radius:10px;

  
}
 .chat-input :deep(.el-input__count)
{
  background-color: #eef5fe;
}


</style>

