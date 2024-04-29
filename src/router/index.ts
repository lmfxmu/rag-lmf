import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', 
      name: 'Login',
      component: () => import('@/views/login/LoginPage.vue') }, // 登录页
    {
      path: '/layout',
      name: 'Layout',
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: '/layout/chat',
          name: 'Chatc',
          component: () => import('@/views/chatc/Chatc.vue')
        },
        {
          path: '/layout/prompt',
          name: 'Promptc',
          component: () => import('@/views/prompt/Promptc.vue')
        },
        {
          path: '/layout/knowledgebase',
          name: 'Knowledgebasec',
          component: () => import('@/views/knowledgebase/Knowledgebasec.vue')
        },
        {
          path: '/layout/paint',
          name: 'Paintc',
          component: () => import('@/views/paint/Paintc.vue')
        }
      ]

    },
    {
      path: '/',
      name: 'vuehome',
      redirect: '/layout'
    },
    {
      path: '/manage',
      name: 'Manage',
      component: () => import('@/views/manage/Manage.vue'),
      children: [
        {
          path: '/manage/user',
          name: 'User',
          component: () => import('@/views/user/User.vue')
        },
        {
          path: '/manage/prompt',
          name: 'Prompt',
          component: () => import('@/views/prompt/Prompt.vue')
        },
        {
          path: '/manage/knowledgebase',
          name: 'Knowledgebase',
          component: () => import('@/views/knowledgebase/Knowledgebase.vue')
        },
        {
          path: '/manage/model',
          name: 'Model',
          component: () => import('@/views/model/Model.vue')
        }
      ]
    }
    
  ]
})
// 登录访问拦截 => 默认是直接放行的
// 根据返回值决定，是放行还是拦截
// 返回值：
// 1. undefined / true  直接放行
// 2. false 拦回from的地址页面
// 3. 具体路径 或 路径对象  拦截到对应的地址
//    '/login'   { name: 'login' }
router.beforeEach((to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useUserStore()
  if (useStore.user==='' && to.path !== '/login') return '/login'
})


export default router
