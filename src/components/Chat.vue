<template>
  <el-container class="chat-zhuti">
    <div class="chat-main">
      <div class="chat-list" ref="chatListDom" >
        <el-button @click="test1function">打印信息</el-button>
        <div v-for="item of messageList.filter((v) => v.role !== 'system')">
          <!-- 过滤问答中的system回答 -->
          <div 
          v-if="item.role === 'assistant'"
          class="chat-role">
            <robot theme="outline" size="26" fill="#4a90e2 "/>
            <div style="margin-left:5px">{{ roleAlias[item.role] }}:</div>
            <div style="flex-grow: 1"></div>
            <Copy style="margin-right: 0px;color:#7f8c8d;font-size: 16px;
            margin-right: 25px;
            margin-top: 20px;
            /* padding-bottom: 0px; */
            " 
            :content="item.content" />
          </div>
          <div v-else class="chat-role1">
            <div style="flex-grow: 1"></div>
            <div style="margin-right:5px">{{ roleAlias[item.role] }}
              <User theme="outline" size="30" fill="#4a90e2" :strokeWidth="5"/>
            </div>
          </div>

          <div v-if="item.role === 'assistant'">
          <div
            class="chat-content"
            v-if="item.content"
            v-html="md.render(item.content)"
          >
          </div>
          <Loding v-else />
        </div>
        <div v-else style="display: flex;">
          <div style="flex-grow: 1;"></div>
          <div
            class="chat-content1"
            v-if="item.content"
            v-html="md.render(item.content)"
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
            @keydown.enter="isTalking || sendOrSave()"
          />
          <div style="width: 50px;"></div>
          <!-- <el-button :disabled="isTalking" @click="sendOrSave()"> -->
            <el-button :disabled="isTalking" type="primary" plain
            style="margin-right:10px;font-size:18px;height:35px;"
            @click="sendOrSave()" 
            >
              {{"发送" }}<ArrowUp theme="outline" size="22" fill="#4a90e2" strokeLinejoin="bevel"/>
            
          </el-button>
        </div>
      
      </div>

    </div>
  </el-container>
</template>

<script setup lang="ts" name="Chat">

import type { ChatMessage } from "@/types";
//限制类型
import { ref, watch, nextTick, onMounted, toRef,toRefs } from "vue";

import { chat } from "@/libs/gpt";

import cryptoJS from "crypto-js";
// 加密apikey
import Loding from "@/components/Loding.vue";
import Copy from "@/components/Copy.vue";
import { md } from "@/libs/markdown";

import { Search,Top } from '@element-plus/icons-vue'

import {Robot,User,ArrowUp } from "@icon-park/vue-next"
import { request } from '@/utils/request';
import { useTalkStore } from '@/stores/Chatid'
import { storeToRefs } from 'pinia'
const talkstore = useTalkStore()
const {talkList,activeChatId} = storeToRefs(talkstore)


const markdownString = "测试信息```cpp\nhelloworld\n```测试信息";
const renderedHtml = md.render(markdownString);

//
let apiKey = "sk-1s3ZwHWeQFt2IwluA6943911F9Fb42F29b7fE2967a11998d";
const getSecretKey = () => "lvmingfeng";
//

let isConfig = ref(false);
let isTalking = ref(false);
//是否正在对话

let messageContent = ref("");
//最下方输入框内容
const chatListDom = ref<HTMLDivElement>();
const decoder = new TextDecoder("utf-8");
const roleAlias = { user: "ME", assistant: "ChatGPT", system: "System" };
//身份设置


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
  console.log(talkList.value.find(chat => chat.id === activeChatId.value));
  console.log(messageList.value);
  // console.log(mid);
 
}
  function changemessage() {
  const messageListt = toRef(talkList.value.find(chat => chat.id === activeChatId.value))
  const messageListtt = toRef(messageListt.value?.messageList)
  messageList.value = messageListtt.value
  console.log(messageList.value);
}
  // const {id,message}= toRefs(messageListt.value)

    // const messageList = ref<ChatMessage[]>()

    // const messageList = toRef<ChatMessage[]>(getCurrentChatMessages)

const messageList = ref<ChatMessage[]>([
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
  ,
  {
    role: "user",
    content: `test
    hellohellohello   hellohellohello  hellohellohello
    testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
    testtest
    test
    testtest
    test
    testtest
    test
    testtest
    test
    testtest
    test
    testtest
    test
    testtest
    test
    test`,
  },
  {
    role: "user",
    content: `test
    test
    test
    testtest
    test
    testtest
    test
    testtest
    test
    testtest
    test
    testtest
    test
    testtest
    test
    testtest
    test
    test`,
  }
]);

onMounted(() => {
  // getAPIKey();
  console.log('挂载前设置apikey成功',apiKey);
});
// 挂载前设置apikey

const sendChatMessage = async (content: string = messageContent.value) => {
  try {
    isTalking.value = true;
    if (messageList.value.length === 2) {
      messageList.value.pop();
    }
    //限制消息列表长度
    messageList.value.push({ role: "user", content });
    clearMessageContent();
    messageList.value.push({ role: "assistant", content: "" });
  //输入用户文本
    const { body, status } = await chat(messageList.value, getAPIKey());
    if (body) {
      const reader = body.getReader();
      await readStream(reader, status);
    }
  } catch (error: any) {
    appendLastMessageContent(error);
  } finally {
    isTalking.value = false;
  }
};

//逐步读取流的数据并进行处理
const readStream = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  status: number
) => {
  let partialLine = "";

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done } = await reader.read();
    if (done) break;

    const decodedText = decoder.decode(value, { stream: true });

    if (status !== 200) {
      const json = JSON.parse(decodedText); // start with "data: "
      const content = json.error.message ?? decodedText;
      appendLastMessageContent(content);
      return;
    }

    const chunk = partialLine + decodedText;
    const newLines = chunk.split(/\r?\n/);

    partialLine = newLines.pop() ?? "";

    for (const line of newLines) {
      if (line.length === 0) continue; // ignore empty message
      if (line.startsWith(":")) continue; // ignore sse comment message
      if (line === "data: [DONE]") return; //

      const json = JSON.parse(line.substring(6)); // start with "data: "
      const content =
        status === 200
          ? json.choices[0].delta.content ?? ""
          : json.error.message;
      appendLastMessageContent(content);
    }
  }
};

//不断增长信息
const appendLastMessageContent = (content: string) =>
  (messageList.value[messageList.value.length - 1].content += content);


  //发送信息还是保存信息
const sendOrSave = () => {
  if (!messageContent.value.length) return;
  //无文本不操作
  sendChatMessage();
  //谈话
};

const getAPIKey = () => {
  apiKey = "sk-1s3ZwHWeQFt2IwluA6943911F9Fb42F29b7fE2967a11998d";
  // const aesAPIKey = cryptoJS.AES.encrypt(apiKey, getSecretKey()).toString();
  // // 从本地存储中获得apikey并空值合并防止报错
  // apiKey = cryptoJS.AES.decrypt(aesAPIKey, getSecretKey()).toString(
  //   cryptoJS.enc.Utf8
  // );
  //解密apikey
  return apiKey;
};

const clearMessageContent = () => (messageContent.value = "");
//清除文本框信息


const scrollToBottom = () => {
  if (!chatListDom.value) return;
  scrollTo(0, chatListDom.value.scrollHeight);
};
//自动滚动到聊天框最低端

watch(messageList.value, () => nextTick(() => scrollToBottom()));

watch(activeChatId, (newActiveChatId, oldActiveChatId) => {
  // 在 activechatid 变化时调用另一个函数
  changemessage();
});

</script>

<style scoped>
.chat-zhuti {
  display: flex;
  justify-content: center;
}
.chat-main {
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
}
.chat-list {
  /* display: block; */
  width: 100%;
  max-height: calc(100vh - 150px); /* 设置最大高度 */
  flex-grow: 1;
  overflow-y: auto;
}



.chat-role {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center; 
  /* text-align: center; */
  white-space: nowrap;
  font-size: 21px; /* 使用像素值 */
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
  /* background-color: #f2f2f2; */
  background-color: #f3f3f3;
  font-size: 20px; /* 使用像素值 */
  line-height: 1.5; /* 使用无单位值，表示相对于字体大小的倍数 */
  padding: 10px;
  width: 98%;
  word-break: break-all;
  border-radius: 10px;
}

.chat-content1 {
  background-color: #f2f2f2;
  font-size: 20px; /* 使用像素值 */
  color:black;
  line-height: 1.5; /* 使用无单位值，表示相对于字体大小的倍数 */
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


/* ::v-deep .chat-input .el-input__inner
{
        margin-bottom: 10px;
          font-size: 16px;max-height: 90px;
          color:red;
          border-color: red !important;
          background-color: #f00b0b !important;
          width:100%;
    background-color: #e8e8e8;
    text-align: center;
    border-color: #c0c4cc;
    color:#000
} */

.chat-input{

  /* border-radius:3px; */
  font-size: 18px;

}

::v-deep .chat-input .el-textarea__inner{
  /* color:#d61616; */
  color:#090a09;
  background-color: white;
  border-radius:10px;
  /* border: 2px solid red;  */
  /* border:50px !important; */
  /* border-width:50px !important; */
  
}


</style>

