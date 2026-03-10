<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User, OfficeBuilding, House, Monitor } from '@element-plus/icons-vue'
import { useAdminStore } from '@/stores/admin.js'
import { useBuildingStore } from '@/stores/building.js'
import { useHouseholdStore } from '@/stores/household.js'

const router = useRouter()
const adminStore = useAdminStore()
const buildingStore = useBuildingStore()
const householdStore = useHouseholdStore()

const stats = computed(() => [
  {
    key: 'admin',
    title: '管理员',
    value: adminStore.pagination.total,
    icon: User,
    path: '/admin/list',
  },
  {
    key: 'building',
    title: '楼栋',
    value: buildingStore.pagination.total,
    icon: OfficeBuilding,
    path: '/building/list',
  },
  {
    key: 'household',
    title: '户号',
    value: householdStore.pagination.total,
    icon: House,
    path: '/household/list',
  },
  {
    key: 'device',
    title: '设备',
    value: '-',
    icon: Monitor,
    path: '/device/list',
  },
])

onMounted(async () => {
  // 仅获取首页统计所需最小数据，避免 dashboard 首屏请求过重。
  await Promise.allSettled([
    adminStore.fetchAdminList({ page: 1, pageSize: 1 }),
    buildingStore.fetchBuildingList({ page: 1, pageSize: 1 }),
    householdStore.fetchHouseholdList({ page: 1, pageSize: 1 }),
  ])
})

const quickEntries = [
  { title: '管理员管理', desc: '账户与权限', path: '/admin/list' },
  { title: '楼栋管理', desc: '楼栋与关联', path: '/building/list' },
  { title: '设备管理', desc: '门禁设备状态', path: '/device/list' },
  { title: '户号管理', desc: '户号与居民', path: '/household/list' },
]
</script>

<template>
  <div class="space-y-6">
    <section class="rounded-xl border border-slate-200 bg-white p-5">
      <h2 class="text-lg font-semibold">仪表盘</h2>
      <p class="mt-1 text-sm text-slate-500">统一导航与模块化页面入口，便于后续快速扩展新业务页面。</p>
    </section>

    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <button
        v-for="item in stats"
        :key="item.key"
        type="button"
        class="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-300 hover:shadow-sm"
        @click="router.push(item.path)"
      >
        <div class="flex items-center justify-between">
          <p class="text-sm text-slate-500">{{ item.title }}</p>
          <el-icon class="text-slate-400">
            <component :is="item.icon" />
          </el-icon>
        </div>
        <p class="mt-3 text-2xl font-semibold">{{ item.value }}</p>
      </button>
    </section>

    <section class="rounded-xl border border-slate-200 bg-white p-5">
      <h3 class="text-base font-semibold">快速入口</h3>
      <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <button
          v-for="entry in quickEntries"
          :key="entry.path"
          type="button"
          class="rounded-lg border border-slate-200 px-4 py-3 text-left hover:border-emerald-300 hover:bg-emerald-50"
          @click="router.push(entry.path)"
        >
          <p class="text-sm font-medium">{{ entry.title }}</p>
          <p class="mt-1 text-xs text-slate-500">{{ entry.desc }}</p>
        </button>
      </div>
    </section>
  </div>
</template>
