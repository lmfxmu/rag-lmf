// 引入defineStore用于创建store
import { defineStore } from 'pinia'
import type { ChatMessage } from "@/types";
import {ref} from 'vue'
// 定义并暴露一个store
export const useTalkStore = defineStore('talk', {
  // 动作
  
  // 状态
  state() {
    const talkList = [
      { id: 15, title:"聊天测试1" ,messageList: ref<ChatMessage[]>([
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
          test
          testtest
          test
          testtest
          test
          test`,
        }
      ])
      }
      ,
      { id: 1, title:"聊天测试2" ,messageList: ref<ChatMessage[]>([
        // 核心对话
        {
          role: "system",
          content: "你是 ChatGPT，OpenAI 训练的大型语言模型，尽可能简洁地回答。",
        },
        {
          role: "assistant",
          content: "测试信息```cpp\nhelloworld\n```测试信息",
        },
        {
          role: "user",
          content: `test
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
          testtest
          test
          testtest
          test
          test`,
        }
      ])
      },
      { id: 7544,title:"聊天3" , messageList: ref<ChatMessage[]>([
        // 核心对话
        {
          role: "system",
          content: "你是 ChatGPT，OpenAI 训练的大型语言模型，尽可能简洁地回答。",
        },
        {
          role: "assistant",
          content: `测试3
          你好，我是  AI助手，我可以提供以下常见服务和信息选项：
        1:  &nbsp; 翻译服务：我可以帮你进行中英文互译，还可以处理其他语言，如法语、日语、西班牙语等。
        2:  &nbsp; 咨询支持：如果你有任何问题需要咨询，无论是健康、法律、投资还是其他领域，我会尽力提供帮助和建议。
        3:  &nbsp; 闲聊陪伴：如果你感到孤独或无聊，我们可以聊一些有趣的话题，以减轻你的压力和寂寞感。
        请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。`,
        },
        
        {
          role: "user",
          content: `test
          test
          testtest
          test
          testtest
          test
          test`,
        }
      ])
      }
      
    ]

    return {
      talkList,
      activeChatId: talkList[0].id
    }
  },
  // 计算
  actions: {
    // 添加多个聊天信息
    test(){
      console.log('测试信息')
    },
    addChats(newChats) {
      newChats.forEach(chat => {
        // 检查该聊天是否已存在于talkList中
        const existingTalk = this.talkList.find(talk => talk.id === chat.id);
        if (!existingTalk) {
          // 如果不存在，则创建一个新的聊天对象
          const newTalk = {
            id: chat.id,
            title: chat.title,
            messageList: ref<ChatMessage[]>([]) // 初始化为空数组
          };
          // 将新的聊天对象添加到talkList中
          this.talkList.push(newTalk);
        }
      });
    },
    // 向指定id的聊天中添加message
    addMessageToChat(chatId, message) {
      // 找到对应id的聊天对象
      const talk = this.talkList.find(talk => talk.id === chatId);
      if (talk) {
        // 向messageList中添加新消息
        talk.messageList.push(message);
      } else {
        console.error('找不到对应的聊天对象');
      }
    }
  },
  getters: {}
})
