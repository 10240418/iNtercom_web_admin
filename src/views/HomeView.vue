<script setup>
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  User,
  OfficeBuilding,
  Monitor,
  House,
  ArrowRight,
  Bell,
  Setting,
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user.js'
import { ref, onMounted } from 'vue'

const router = useRouter()
const userStore = useUserStore()

const title = 'iLock设备管理端'
const currentTime = ref(new Date())

// 更新当前时间
onMounted(() => {
  const timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)

  return () => clearInterval(timer)
})

// 格式化时间
const formatTime = (date) => {
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

// 格式化日期
const formatDate = (date) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
}

/**
 * 导航到指定页面
 */
const navigateTo = (path) => {
  router.push(path)
}

/**
 * 退出登录
 */
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确认退出登录吗？', '退出确认', {
      confirmButtonText: '确认退出',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await userStore.logout()
    ElMessage.success('已退出登录')
    router.push('/login')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('退出登录失败:', error)
    }
  }
}

// 快速操作卡片数据
const quickActions = [
  {
    id: 'admin',
    title: '管理员管理',
    description: '管理系统管理员账户',
    icon: User,
    path: '/admin/list',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'building',
    title: '楼栋管理',
    description: '管理小区楼栋信息',
    icon: OfficeBuilding,
    path: '/building/list',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'device',
    title: '设备管理',
    description: '管理门禁设备',
    icon: Monitor,
    path: '/device/list',
    color: 'from-violet-500 to-violet-600',
  },
  {
    id: 'household',
    title: '住户管理',
    description: '管理住户信息',
    icon: House,
    path: '/household/list',
    color: 'from-orange-500 to-orange-600',
  },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br max-w-full from-slate-50 via-blue-50 to-indigo-100">
    <!-- 背景装饰 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-2xl"
      ></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-4">
      <!-- 顶部导航栏 -->
      <header class="mb-8">
        <div
          class="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-gray-900/10 p-6 lg:p-8"
        >
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <!-- 左侧标题和时间 -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-6">
              <div>
                <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                  {{ title }}
                </h1>
                <p class="text-sm text-gray-500 mt-2">
                  {{ formatDate(currentTime) }}
                </p>
              </div>
              <!-- 实时时间 -->
              <div
                class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl px-6 py-3 border border-gray-100"
              >
                <p class="text-xl font-mono font-semibold text-gray-700">
                  {{ formatTime(currentTime) }}
                </p>
              </div>
            </div>

            <!-- 右侧用户信息和操作 -->
            <div class="flex items-center gap-4">
              <!-- 通知按钮 -->
              <button
                class="relative p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-2xl transition-all duration-200 hover:scale-105"
              >
                <el-icon class="w-6 h-6"><Bell /></el-icon>
                <span
                  class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <span class="w-2 h-2 bg-white rounded-full"></span>
                </span>
              </button>

              <!-- 设置按钮 -->
              <button
                class="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-2xl transition-all duration-200 hover:scale-105"
              >
                <el-icon class="w-6 h-6"><Setting /></el-icon>
              </button>

              <!-- 用户信息 -->
              <div
                class="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl px-6 py-3 border border-gray-100"
              >
                <div
                  class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span class="text-white text-sm font-bold">
                    {{ userStore.username?.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <div class="hidden sm:block">
                  <p class="text-sm font-semibold text-gray-900">欢迎，{{ userStore.username }}</p>
                  <p class="text-xs text-gray-500">系统管理员</p>
                </div>
              </div>

              <!-- 退出登录按钮 -->
              <button
                @click="handleLogout"
                class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 active:scale-95"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- 主要内容区域 -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- 左侧：快速操作 -->
        <div class="xl:col-span-2 space-y-8">
          <div
            class="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-gray-900/10 p-6 lg:p-8"
          >
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-bold text-gray-900">快速操作</h2>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div
                  class="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                ></div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="action in quickActions"
                :key="action.id"
                @click="navigateTo(action.path)"
                class="group relative bg-white rounded-3xl p-8 shadow-lg shadow-gray-900/5 border border-gray-100/50 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/15 hover:-translate-y-2 active:scale-95"
              >
                <!-- 渐变背景 -->
                <div
                  :class="`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`"
                ></div>

                <div class="relative">
                  <!-- 图标 -->
                  <div
                    :class="`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`"
                  >
                    <el-icon class="w-8 h-8 text-white">
                      <component :is="action.icon" />
                    </el-icon>
                  </div>

                  <!-- 内容 -->
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <h3 class="text-lg font-bold text-gray-900 group-hover:text-gray-800">
                        {{ action.title }}
                      </h3>
                      <el-icon
                        class="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200"
                      >
                        <ArrowRight />
                      </el-icon>
                    </div>
                    <p class="text-sm text-gray-600 leading-relaxed">{{ action.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 右侧：系统概览 -->
        <div class="space-y-8">
          <div
            class="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-gray-900/10 p-6 lg:p-8"
          >
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-xl font-bold text-gray-900">系统概览</h2>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-xs text-green-600 font-medium">在线</span>
              </div>
            </div>

            <div class="space-y-6">
              <div
                class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:from-green-100 hover:to-emerald-100 transition-colors duration-300"
              >
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-semibold text-green-800">系统状态</h3>
                  <span class="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                    >正常</span
                  >
                </div>
                <p class="text-3xl font-bold text-green-900">运行中</p>
              </div>

              <div
                class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-colors duration-300"
              >
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-semibold text-blue-800">最后更新</h3>
                </div>
                <p class="text-lg font-bold text-blue-900">{{ formatTime(currentTime) }}</p>
              </div>
            </div>
          </div>

          <!-- 快捷导航 -->
          <div
            class="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-gray-900/10 p-6 lg:p-8"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-6">快捷导航</h3>
            <div class="space-y-4">
              <button
                @click="navigateTo('/admin/list')"
                class="w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl transition-all duration-200 border border-blue-100 hover:border-blue-200 group"
              >
                <span class="text-sm font-semibold text-blue-800">管理员列表</span>
                <el-icon
                  class="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-200"
                  ><ArrowRight
                /></el-icon>
              </button>
              <button
                @click="navigateTo('/device/list')"
                class="w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 rounded-2xl transition-all duration-200 border border-purple-100 hover:border-purple-200 group"
              >
                <span class="text-sm font-semibold text-purple-800">设备列表</span>
                <el-icon
                  class="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform duration-200"
                  ><ArrowRight
                /></el-icon>
              </button>
              <button
                @click="navigateTo('/household/list')"
                class="w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-2xl transition-all duration-200 border border-orange-100 hover:border-orange-200 group"
              >
                <span class="text-sm font-semibold text-orange-800">住户列表</span>
                <el-icon
                  class="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform duration-200"
                  ><ArrowRight
                /></el-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 确保实时时间的字体是等宽的 */
.font-mono {
  font-family:
    ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
}

/* 容器最大宽度控制 */
.container {
  max-width: 1440px;
}

/* 自定义动画 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes glow {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* 增强hover效果 */
.group:hover .animate-float {
  animation-play-state: paused;
  transform: translateY(-5px);
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #94a3b8, #64748b);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #64748b, #475569);
}

/* 响应式优化 */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 768px) {
  .grid {
    gap: 1.5rem;
  }

  .rounded-3xl {
    border-radius: 1.5rem;
  }

  .p-8 {
    padding: 1.5rem;
  }

  .lg\:p-8 {
    padding: 1.5rem;
  }
}

/* 打印样式优化 */
@media print {
  .fixed,
  .animate-pulse,
  .animate-float,
  .animate-glow {
    display: none !important;
  }

  .bg-gradient-to-br,
  .bg-gradient-to-r {
    background: white !important;
    color: black !important;
  }

  .shadow-2xl,
  .shadow-xl,
  .shadow-lg {
    box-shadow: none !important;
    border: 1px solid #e5e7eb !important;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .bg-white\/90 {
    background-color: white;
  }

  .text-gray-500 {
    color: #374151;
  }

  .border-white\/20 {
    border-color: #d1d5db;
  }
}

/* 减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .transition-colors,
  .transition-transform,
  .transition-opacity {
    transition: none !important;
  }

  .animate-pulse,
  .animate-float,
  .animate-glow {
    animation: none !important;
  }

  .hover\:-translate-y-1:hover,
  .hover\:-translate-y-2:hover,
  .group-hover\:translate-x-1,
  .group-hover\:scale-110 {
    transform: none !important;
  }
}

/* 焦点可见性增强 */
button:focus-visible,
[role='button']:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* 加载状态动画 */
.loading-shimmer {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
