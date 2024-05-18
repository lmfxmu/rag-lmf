import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
// import request from '@/utils/request'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref('')
    const manager = ref(1)
    const getUser  = (newToken) => {
      user.value = newToken
    }
    // const getUser = async () => {
    //   const res = await request.get('/message') // 请求获取数据
    //   user.value = res.code
    // }
    const setUser = () => {
      user.value = ''
      router.push({ name: 'Login' })
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      manager,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
