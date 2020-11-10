import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/user/layout'),
    children: [
      {
        path: '', // 默认理由可以不用写路径，但只能有一个
        name: 'home',
        component: () => import('@/views/user/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/user/qa/index.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/user/video/index.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/user/my/index.vue')
      }
    ]
  },
  {
    path: '/serch',
    name: 'serch',
    component: () => import('@/views/user/serch')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/user/article'),
    props: true
  },
  {
    path: '/my/userProfile',
    name: 'userProfile',
    component: () => import('@/views/user/my/components/user-profile'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
