<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    :title="`住户 ${householdData?.household_number || ''} 的居民管理`"
    width="800px"
  >
    <div class="household-residents" v-if="householdData">
      <!-- 住户基本信息 -->
      <el-card class="household-info-card" shadow="never">
        <template #header>
          <span>住户信息</span>
        </template>
        <el-descriptions :column="3" size="small">
          <el-descriptions-item label="住户号">
            <el-tag type="primary">{{ householdData.household_number }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="楼栋ID">
            <el-tag>{{ householdData.building_id }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="householdData.status === 'active' ? 'success' : 'info'">
              {{ householdData.status === 'active' ? '正常' : '停用' }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <!-- 居民列表 -->
      <el-card class="residents-list-card" shadow="never">
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span>居民列表 ({{ filteredResidents.length }}人)</span>
            <el-button type="primary" size="small" @click="refreshResidents">
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </div>
        </template>

        <div v-if="loading" style="text-align: center; padding: 40px">
          <el-icon class="is-loading" style="font-size: 24px"><Loading /></el-icon>
          <p>正在加载居民数据...</p>
        </div>

        <el-table
          v-else-if="filteredResidents.length > 0"
          :data="filteredResidents"
          style="width: 100%"
          size="small"
        >
          <el-table-column prop="id" label="ID" width="60" align="center">
            <template #default="{ row }">
              <el-tag size="small" type="info">{{ row.id }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="姓名" width="120">
            <template #default="{ row }">
              <div style="display: flex; align-items: center; gap: 8px">
                <el-avatar :size="24" style="background: linear-gradient(135deg, #3498db, #2980b9)">
                  <el-icon><UserFilled /></el-icon>
                </el-avatar>
                <span>{{ row.name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="phone" label="手机号" width="140" />

          <el-table-column prop="email" label="邮箱" min-width="180" show-overflow-tooltip>
            <template #default="{ row }">
              {{ row.email || '未填写' }}
            </template>
          </el-table-column>

          <el-table-column prop="created_at" label="加入时间" width="160">
            <template #default="{ row }">
              {{ formatDateTime(row.created_at) }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="120" fixed="right">
            <template #default="{ row }">
              <el-button size="small" type="primary" @click="handleViewResident(row)" plain>
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div v-else style="text-align: center; padding: 40px">
          <el-empty description="该住户暂无居民" />
        </div>
      </el-card>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">关闭</el-button>
      </span>
    </template>

    <!-- 居民详情弹窗 -->
    <ResidentDetailDialog
      v-model:visible="residentDetailVisible"
      :resident-data="currentResident"
    />
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Refresh, Loading, UserFilled } from '@element-plus/icons-vue'
import { useHouseholdStore } from '@/stores/household.js'
import { formatDateTime } from '@/utils/index.js'
import ResidentDetailDialog from './ResidentDetailDialog.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  householdData: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:visible', 'refresh'])

const householdStore = useHouseholdStore()
const loading = ref(false)
const residentDetailVisible = ref(false)
const currentResident = ref({})

// 过滤出当前住户的居民
const filteredResidents = computed(() => {
  if (!props.householdData?.id) return []
  return householdStore.residentList.filter(
    (resident) => resident.household_id === props.householdData.id,
  )
})

// 监听弹窗显示状态
watch(
  () => props.visible,
  (visible) => {
    if (visible && props.householdData?.id) {
      refreshResidents()
    }
  },
)

/**
 * 刷新居民数据
 */
const refreshResidents = async () => {
  try {
    loading.value = true
    await householdStore.fetchResidentList({
      household_id: props.householdData?.id,
    })
    emit('refresh')
  } catch (error) {
    console.error('刷新居民数据失败:', error)
  } finally {
    loading.value = false
  }
}

/**
 * 查看居民详情
 */
const handleViewResident = (row) => {
  currentResident.value = row
  residentDetailVisible.value = true
}
</script>

<style scoped>
.household-residents {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.household-info-card,
.residents-list-card {
  border: 1px solid #ebeef5;
  border-radius: 8px;
}

.household-info-card :deep(.el-card__body) {
  padding: 16px;
}

.residents-list-card :deep(.el-card__body) {
  padding: 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
