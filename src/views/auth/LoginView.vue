<template>
  <div
    class="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,var(--c-primary-bg),transparent_35%),radial-gradient(circle_at_bottom_right,var(--c-primary-light),transparent_25%)] bg-page-bg p-4 text-text-primary"
  >
    <!-- 背景装饰 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-primary opacity-20 blur-3xl"
      ></div>
      <div
        class="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-primary-light opacity-30 blur-3xl"
      ></div>
      <div
        class="absolute left-1/4 top-3/4 h-64 w-64 rounded-full bg-primary-dark opacity-10 blur-3xl"
      ></div>
    </div>

    <!-- 登录卡片 -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo区域 -->
      <div class="text-center mb-8">
        <div
          class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--c-primary),var(--c-primary-dark))] shadow-lg"
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 class="mb-2 text-3xl font-bold text-text-primary">欢迎回来</h1>
        <p class="text-text-secondary">请登录您的账户</p>
      </div>

      <!-- 登录表单卡片 -->
      <div class="app-surface rounded-3xl p-8 shadow-xl shadow-black/5 backdrop-blur-xl">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          label-width="0"
          size="large"
          @keyup.enter="handleLogin"
          class="space-y-6"
        >
          <!-- 用户名输入框 -->
          <el-form-item prop="username">
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-text-muted"
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
              <input
                v-model="loginForm.username"
                type="text"
                placeholder="请输入用户名"
                class="w-full rounded-2xl border border-border bg-page-bg py-4 pl-12 pr-4 text-text-primary placeholder-text-muted transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </el-form-item>

          <!-- 密码输入框 -->
          <el-form-item prop="password">
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-text-muted"
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
              <input
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入密码"
                class="w-full rounded-2xl border border-border bg-page-bg py-4 pl-12 pr-12 text-text-primary placeholder-text-muted transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-text-muted transition-colors duration-200 hover:text-text-primary"
              >
                <svg
                  v-if="showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </el-form-item>

          <!-- 记住密码选项 -->
          <div class="flex items-center justify-between">
            <label class="flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only"
                v-model="rememberMe"
              />
              <div class="relative">
                <div :class="[
                    'w-5 h-5 rounded border-2 transition-all duration-200',
                    rememberMe ? 'bg-primary border-primary' : 'bg-card border-border',
                  ]">
                  <svg
                    v-if="rememberMe"
                    class="w-3 h-3 text-white absolute top-0.5 left-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <span class="ml-3 text-sm text-text-primary">记住我</span>
            </label>
            <a
              href="#"
              class="text-sm text-primary transition-colors duration-200 hover:text-primary-dark"
            >忘记密码？</a>
          </div>

          <!-- 登录按钮 -->
          <el-form-item>
            <button
              type="button"
              @click="handleLogin"
              :disabled="loading"
              class="app-button app-button-primary w-full rounded-2xl py-4 disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none"
            >
              <span
                v-if="loading"
                class="flex items-center justify-center"
              >
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                登录中...
              </span>
              <span v-else>登录</span>
            </button>
          </el-form-item>
        </el-form>

        <!-- 测试账户提示 -->
        <div class="app-inline-card mt-6 border-primary bg-primary-bg p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg
                class="mt-0.5 h-5 w-5 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="text-sm font-medium text-primary-dark">测试账户</h4>
              <p class="text-sm text-primary">用户名：admin，密码：admin123</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部文本 -->
      <div class="mt-8 text-center">
        <p class="text-sm text-text-secondary">
          © 2024 iNtercom管理端.
          <span class="text-text-primary">安全 · 可靠 · 高效</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user.js'

const router = useRouter()
const userStore = useUserStore()

// 表单引用
const loginFormRef = ref()

// 状态
const loading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)

// 登录表单数据
const loginForm = reactive({
  username: 'admin',
  password: 'admin123',
})

// 表单验证规则
const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
  ],
}

/**
 * 处理登录
 */
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    // 验证表单
    await loginFormRef.value.validate()

    loading.value = true

    // 调用登录接口
    await userStore.login(loginForm)

    ElMessage.success('登录成功')

    // 跳转到首页或原来要访问的页面
    const redirect = router.currentRoute.value.query.redirect || '/'
    router.push(redirect)
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请检查用户名和密码')
  } finally {
    loading.value = false
  }
}

// 组件挂载时检查登录状态
onMounted(() => {
  if (userStore.isLoggedIn) {
    router.push('/')
  }
})
</script>

<style scoped>
/* 自定义输入框样式以确保一致性 */
input:focus {
  outline: none;
}

/* 自定义旋转动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 禁用Chrome的自动填充背景色 */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 30px rgba(249, 250, 251, 0.8) inset !important;
  -webkit-text-fill-color: #111827 !important;
}
</style>
