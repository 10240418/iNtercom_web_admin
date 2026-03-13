<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  House,
  User,
  OfficeBuilding,
  Monitor,
  ChatDotRound,
  Fold,
  Expand,
  SwitchButton,
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const iconMap = {
  admin: User,
  staff: User,
  building: OfficeBuilding,
  device: Monitor,
  household: House,
  calltest: ChatDotRound,
}

const collapsed = computed(() => route.query.nav === 'collapsed')

const navigationRoutes = computed(() => {
  const root = router.options.routes.find((item) => item.name === 'root')
  const children = root?.children || []
  return children.filter((item) => item.meta?.showInNav)
})

const pageTitle = computed(() => route.meta?.title || '管理后台')

const toggleNav = () => {
  const nextQuery = { ...route.query }
  if (collapsed.value) {
    delete nextQuery.nav
  } else {
    nextQuery.nav = 'collapsed'
  }
  router.replace({ query: nextQuery })
}

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
</script>

<template>
  <div class="min-h-screen bg-page-bg text-text-primary transition-colors duration-300">
    <div class="flex min-h-screen">
      <aside :class="[
          'border-r border-border bg-sidebar-bg text-sidebar-text transition-all duration-300',
          collapsed ? 'w-18' : 'w-64',
        ]">
        <div class="flex h-16 items-center border-b border-white/10 px-4">
          <div class="flex items-center gap-3 overflow-hidden">
            <div
              :class="collapsed ? 'w-full text-center' : 'min-w-0'"
            >
              <p class="truncate text-sm font-semibold text-white">iNtercom管理端</p>
              <p
                v-if="!collapsed"
                class="truncate text-xs text-sidebar-text opacity-70"
              >
                Device Console
              </p>
            </div>
          </div>
        </div>

        <nav class="px-2 py-3">
          <RouterLink
            v-for="nav in navigationRoutes"
            :key="nav.name || nav.path"
            :to="{ name: nav.name }"
            class="mb-1 flex items-center rounded-lg px-3 py-2 text-sm transition-colors"
            :class="
              route.name === nav.name
                ? 'text-white [background:color-mix(in_srgb,var(--c-primary)_16%,transparent)] [box-shadow:inset_0_0_0_1px_color-mix(in_srgb,var(--c-primary)_28%,transparent)]'
                : 'text-sidebar-text hover:bg-white/8 hover:text-white'
            "
          >
            <el-icon class="text-base">
              <component :is="iconMap[nav.meta?.icon] || OfficeBuilding" />
            </el-icon>
            <span
              v-if="!collapsed"
              class="ml-3 truncate"
            >{{ nav.meta?.title }}</span>
          </RouterLink>
        </nav>
      </aside>

      <div class="flex min-w-0 flex-1 flex-col">
        <header
          class="flex h-16 items-center justify-between border-b border-border bg-header px-4 md:px-6"
        >
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="rounded-md p-2 text-text-secondary hover:bg-primary-bg hover:text-primary"
              @click="toggleNav"
            >
              <el-icon>
                <component :is="collapsed ? Expand : Fold" />
              </el-icon>
            </button>
            <div>
              <h1 class="text-base font-semibold text-text-primary">{{ pageTitle }}</h1>
              <p class="text-xs text-text-secondary">iNtercom 管理后台</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="hidden text-right md:block">
              <p class="text-sm font-medium text-text-primary">{{ userStore.username || 'admin' }}
              </p>
              <p class="text-xs text-text-secondary">系统管理员</p>
            </div>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-text-primary hover:border-primary hover:bg-primary-bg"
              @click="handleLogout"
            >
              <el-icon>
                <SwitchButton />
              </el-icon>
              退出
            </button>
          </div>
        </header>

        <main class="flex-1 bg-page-bg p-4 transition-colors duration-300 md:p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
