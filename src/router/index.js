import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: '登录',
        requiresAuth: false,
      },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页',
        requiresAuth: true,
      },
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/list',
    },
    {
      path: '/admin/list',
      name: 'adminList',
      component: () => import('../views/admin/AdminListView.vue'),
      meta: {
        title: '管理员管理',
        requiresAuth: true,
      },
    },
    {
      path: '/building',
      name: 'building',
      redirect: '/building/list',
    },
    {
      path: '/building/list',
      name: 'buildingList',
      component: () => import('../views/building/BuildingListView.vue'),
      meta: {
        title: '楼栋管理',
        requiresAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: '关于',
        requiresAuth: true,
      },
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 设置页面标题
  if (to.meta?.title) {
    document.title = `${to.meta.title} - iLock设备管理端`
  }

  // 检查是否需要登录
  if (to.meta?.requiresAuth) {
    if (userStore.isLoggedIn) {
      next()
    } else {
      // 未登录，跳转到登录页面
      next({
        name: 'login',
        query: { redirect: to.fullPath },
      })
    }
  } else {
    // 如果已登录用户访问登录页面，跳转到首页
    if (to.name === 'login' && userStore.isLoggedIn) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

export default router
