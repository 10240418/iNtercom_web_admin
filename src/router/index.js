import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const LoginView = () => import('../views/auth/LoginView.vue')
const AdminLayout = () => import('@/components/layout/AdminLayout.vue')

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
        theme: 'default',
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
          redirect: '/building/list',
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
            theme: 'default',
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
            theme: 'default',
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
            theme: 'default',
          },
        },
        {
          path: 'household/list',
          name: 'householdList',
          component: () => import('../views/household/HouseholdListView.vue'),
          meta: {
            title: '住户管理',
            requiresAuth: true,
            showInNav: false,
            icon: 'household',
            theme: 'default',
          },
        },
        {
          path: 'staff/list',
          name: 'staffList',
          component: () => import('../views/staff/StaffListView.vue'),
          meta: {
            title: '物业员工管理',
            requiresAuth: true,
            showInNav: true,
            icon: 'staff',
            theme: 'default',
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
            theme: 'default',
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
      path: '/staff',
      redirect: '/staff/list',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/building/list',
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

  // 切换主题：将 data-theme 写入 <html>，CSS 变量随之生效
  document.documentElement.dataset.theme = to.meta?.theme ?? 'default'

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
      next({ name: 'buildingList' })
    } else {
      next()
    }
  }
})

export default router
