import '@/assets/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import persist from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
// const pinia = createPinia()
// app.use(pinia)

app.use(createPinia().use(persist))

app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
