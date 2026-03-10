<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- 背景装饰 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 -right-32 w-80 h-80 bg-gradient-to-bl from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-1/3 -left-32 w-96 h-96 bg-gradient-to-tr from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 返回按钮 -->
      <div class="mb-8">
        <button
          @click="$router.go(-1)"
          class="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-xl transition-all duration-200"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          返回
        </button>
      </div>

      <!-- 头部区域 -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-xl shadow-blue-500/25 mb-6"
        >
          <svg
            class="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1
          class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
        >
          iNtercom管理端
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          基于现代技术栈构建的智能社区门禁对讲管理平台，提供安全、可靠、高效的一体化管理能力
        </p>
        <div
          class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-xl font-medium"
        >
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          系统运行正常
        </div>
      </div>

      <!-- 系统信息卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- 系统信息 -->
        <div
          class="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-gray-900/5 p-6"
        >
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">系统信息</h3>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">系统状态</span>
              <span class="font-semibold text-green-600">运行正常</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">部署环境</span>
              <span class="font-semibold text-gray-900">生产环境</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">最后检查</span>
              <span class="font-semibold text-gray-900">刚刚</span>
            </div>
          </div>
        </div>

        <!-- 技术栈 -->
        <div
          class="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-gray-900/5 p-6"
        >
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">技术栈</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-lg"
            >Vue 3</span>
            <span
              class="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-lg"
            >TailwindCSS</span>
            <span
              class="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-lg"
            >Element Plus</span>
            <span
              class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-lg"
            >Vite</span>
            <span
              class="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-lg"
            >Pinia</span>
            <span
              class="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-lg"
            >Vue Router</span>
          </div>
        </div>

        <!-- 系统状态 -->
        <div
          class="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-gray-900/5 p-6"
        >
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">运行状态</h3>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">服务状态</span>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-sm font-semibold text-green-600">正常</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">数据库连接</span>
              <span class="text-sm font-semibold text-green-600">已连接</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">网络状态</span>
              <span class="text-sm font-semibold text-green-600">良好</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能特性 -->
      <div
        class="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-gray-900/5 p-8 mb-12"
      >
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">核心功能</h2>
          <p class="text-gray-600">为您提供全面的门禁设备管理解决方案</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">管理员管理</h3>
            <p class="text-sm text-gray-600">灵活的管理员权限控制和账户管理</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">楼栋管理</h3>
            <p class="text-sm text-gray-600">完善的楼栋信息管理和组织架构</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">设备管理</h3>
            <p class="text-sm text-gray-600">智能设备监控、配置和维护管理</p>
          </div>

          <div class="text-center group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">住户管理</h3>
            <p class="text-sm text-gray-600">住户信息管理和权限分配系统</p>
          </div>
        </div>
      </div>

      <!-- 联系信息和更多 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 支持信息 -->
        <div
          class="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-gray-900/5 p-6"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-4">技术支持</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">技术支持邮箱</p>
                <p class="text-sm text-gray-600">support@ilock.com</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">技术热线</p>
                <p class="text-sm text-gray-600">400-888-8888</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 版权信息 -->
        <div
          class="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-gray-900/5 p-6"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-4">版权信息</h3>
          <div class="space-y-3 text-sm text-gray-600">
            <p>© 2024 iLock智能科技有限公司</p>
            <p>本系统受知识产权法保护，未经授权不得复制或传播。</p>
            <p class="text-xs">
              <span class="text-gray-900 font-medium">许可证：</span>
              MIT License
            </p>
            <div class="flex items-center gap-4 pt-2">
              <a
                href="#"
                class="text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >隐私政策</a>
              <a
                href="#"
                class="text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >服务条款</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这里可以添加一些动态获取版本信息或系统状态的逻辑
</script>

<style scoped>
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

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
