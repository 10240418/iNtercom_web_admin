import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import LoginView from '../views/auth/LoginView.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'

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
      name: 'root',
      component: AdminLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          redirect: '/dashboard',
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
          meta: {
            title: '仪表盘',
            requiresAuth: true,
            showInNav: true,
            icon: 'dashboard',
          },
        },
        {
          path: 'admin/list',
          name: 'adminList',
          component: () => import('../views/admin/AdminListView.vue'),
          meta: {
            title: '管理员管理',
            requiresAuth: true,
            showInNav: true,
            icon: 'admin',
          },
        },
        {
          path: 'building/list',
          name: 'buildingList',
          component: () => import('../views/building/BuildingListView.vue'),
          meta: {
            title: '楼栋管理',
            requiresAuth: true,
            showInNav: true,
            icon: 'building',
          },
        },
        {
          path: 'device/list',
          name: 'deviceList',
          component: () => import('../views/device/DeviceListView.vue'),
          meta: {
            title: '设备管理',
            requiresAuth: true,
            showInNav: true,
            icon: 'device',
          },
        },
        {
          path: 'household/list',
          name: 'householdList',
          component: () => import('../views/household/HouseholdListView.vue'),
          meta: {
            title: '住户管理',
            requiresAuth: true,
            showInNav: true,
            icon: 'household',
          },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: {
            title: '关于',
            requiresAuth: true,
            showInNav: true,
            icon: 'about',
          },
        },
        {
          path: 'call/test',
          name: 'callTest',
          component: () => import('../views/call/CallTestView.vue'),
          meta: {
            title: '通话流程测试',
            requiresAuth: true,
            showInNav: true,
            icon: 'calltest',
          },
        },
      ],
    },
    {
      path: '/admin',
      redirect: '/admin/list',
    },
    {
      path: '/building',
      redirect: '/building/list',
    },
    {
      path: '/device',
      redirect: '/device/list',
    },
    {
      path: '/household',
      redirect: '/household/list',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard',
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 设置页面标题
  if (to.meta?.title) {
    document.title = `${to.meta.title} - iNtercom管理端`
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
      next({ name: 'dashboard' })
    } else {
      next()
    }
  }
})

export default router
