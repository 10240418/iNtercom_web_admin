<template>
  <el-dialog v-model="dialogVisible" title="楼栋详情" width="800px" class="app-dialog">
    <div class="building-detail">
      <!-- 基本信息 -->
      <div class="detail-section">
        <h3>基本信息</h3>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="ID">
            <el-tag>{{ buildingData.id }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="楼栋名称">
            <el-tag type="primary">{{ buildingData.building_name }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="楼栋编码">
            <el-tag>{{ buildingData.building_code }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="状态">
            <el-tag :type="getStatusTagType(buildingData.status)">
              {{ getStatusLabel(buildingData.status) }}
            </el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="地址信息" :span="2">
            {{ buildingData.address }}
          </el-descriptions-item>

          <el-descriptions-item label="创建时间">
            {{ formatDateTime(buildingData.created_at) }}
          </el-descriptions-item>

          <el-descriptions-item label="最后更新">
            {{ formatDateTime(buildingData.updated_at) }}
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <!-- 关联设备 -->
      <div class="detail-section" v-if="buildingData.id">
        <h3>关联设备</h3>
        <el-table v-loading="devicesLoading" :data="devicesList" style="width: 100%">
          <el-table-column prop="id" label="设备ID" width="80" />
          <el-table-column prop="device_name" label="设备名称" min-width="120" />
          <el-table-column prop="serial_number" label="序列号" min-width="120" />
          <el-table-column prop="location" label="位置" min-width="100" />
          <el-table-column prop="status" label="状态" min-width="80">
            <template #default="{ row }">
              <el-tag :type="getDeviceStatusType(row.status)">
                {{ getDeviceStatusLabel(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="devicesList.length === 0 && !devicesLoading" class="empty-tip">暂无关联设备</div>
      </div>

      <!-- 户号生成与预览 -->
      <div class="detail-section" v-if="buildingData.id">
        <h3>户号管理</h3>
        <HouseholdGeneratorPanel :building-data="buildingData" />
      </div>
    </div>

    <template #footer>
      <el-button class="app-button app-button-secondary" @click="handleClose">关闭</el-button>
      <el-button class="app-button app-button-primary" @click="handleEdit">编辑</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { formatDateTime } from '@/utils/index.js'
import {
  BUILDING_STATUS_LABELS,
  BUILDING_STATUS_COLORS,
  DEVICE_STATUS_LABELS,
  DEVICE_STATUS_COLORS,
} from '@/constants/index.js'
import { buildingAPI } from '@/api/building.js'
import HouseholdGeneratorPanel from './HouseholdGeneratorPanel.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  buildingData: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:visible', 'edit'])

// 弹窗显示状态
const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
})

// 关联数据
const devicesList = ref([])
const devicesLoading = ref(false)

/**
 * 获取楼栋下的设备列表
 */
const getBuildingDevices = async (buildingId) => {
  try {
    devicesLoading.value = true
    const response = await buildingAPI.getBuildingDevices(buildingId)
    devicesList.value = response.data || []
  } catch (error) {
    console.error('获取楼栋设备失败:', error)
    devicesList.value = []
  } finally {
    devicesLoading.value = false
  }
}

/**
 * 监听楼栋数据变化，加载关联数据
 */
watch(
  () => props.buildingData.id,
  (buildingId) => {
    if (buildingId && props.visible) {
      getBuildingDevices(buildingId)
    }
  },
  { immediate: true },
)

/**
 * 监听弹窗显示状态
 */
watch(
  () => props.visible,
  (visible) => {
    if (visible && props.buildingData.id) {
      getBuildingDevices(props.buildingData.id)
    }
  },
)

/**
 * 获取状态标签
 */
const getStatusLabel = (status) => {
  return BUILDING_STATUS_LABELS[status] || status
}

/**
 * 获取状态标签类型
 */
const getStatusTagType = (status) => {
  return BUILDING_STATUS_COLORS[status] || 'info'
}

/**
 * 获取设备状态标签
 */
const getDeviceStatusLabel = (status) => {
  return DEVICE_STATUS_LABELS[status] || status
}

/**
 * 获取设备状态标签类型
 */
const getDeviceStatusType = (status) => {
  return DEVICE_STATUS_COLORS[status] || 'info'
}

/**
 * 关闭弹窗
 */
const handleClose = () => {
  emit('update:visible', false)
}

/**
 * 编辑楼栋
 */
const handleEdit = () => {
  emit('edit', props.buildingData)
  handleClose()
}
</script>

<style scoped>
.building-detail {
  padding: 20px 0;
}

.detail-section {
  margin-bottom: 30px;
}

.detail-section h3 {
  font-size: 16px;
  font-weight: bold;
  color: var(--c-text-primary);
  margin: 0 0 16px 0;
  border-left: 4px solid var(--c-primary);
  padding-left: 12px;
}

.empty-tip {
  text-align: center;
  color: var(--c-text-secondary);
  padding: 20px;
  font-size: 14px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
