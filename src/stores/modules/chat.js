import { defineStore } from 'pinia'
import { ref } from 'vue'
// import request from '@/utils/request'

// 用户模块 token setToken removeToken
export const useChatnewStore = defineStore(
  'chatnew',
  () => {
    const token = ref('')
    const chatList = ref([])

    const activeChatId = ref(Number())
    activeChatId.value = 0
    const messageList = ref([])
    const intro = ref(0)
    const getactiveChatId  = (newToken) => {
      activeChatId.value = newToken
    }

    return {
      token,
      chatList,
      activeChatId,
      messageList,
      intro,
      getactiveChatId
    }
  },
  {
    persist: true
  }
)
