<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="emit('update:visible', $event)"
    title="设备详情"
    width="760px"
    class="app-dialog"
  >
    <div
      v-loading="loading"
      class="device-detail-container"
    >
      <el-empty
        v-if="!loading && !detail.id"
        description="暂无设备详情数据"
      />

      <template v-else>
        <el-descriptions
          :column="2"
          border
        >
          <el-descriptions-item
            label="设备ID">{{ detail.id || '-' }}</el-descriptions-item>
          <el-descriptions-item
            label="设备名称">{{ detail.name || '-' }}</el-descriptions-item>
          <el-descriptions-item
            label="设备序列号">{{ detail.serial_number || '-' }}</el-descriptions-item>
          <el-descriptions-item label="设备状态">
            <el-tag :type="statusTagType">{{ statusLabel }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label="安装位置">{{ detail.location || '-' }}</el-descriptions-item>
          <el-descriptions-item
            label="所属楼栋">{{ detail.building?.building_name || '-' }}</el-descriptions-item>
          <el-descriptions-item
            label="关联住户">{{ detail.household?.household_number || '-' }}</el-descriptions-item>
          <el-descriptions-item
            label="创建时间">{{ formatDateTime(detail.created_at) || '-' }}</el-descriptions-item>
          <el-descriptions-item
            label="更新时间">{{ formatDateTime(detail.updated_at) || '-' }}</el-descriptions-item>
        </el-descriptions>
      </template>
    </div>

    <template #footer>
      <el-button
        class="app-button app-button-secondary"
        @click="emit('update:visible', false)"
      >关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { deviceAPI } from '@/api/device.js'
import { formatDateTime } from '@/utils/index.js'
import { DEVICE_STATUS_LABELS, DEVICE_STATUS_COLORS } from '@/constants/index.js'

const props = defineProps({
  visible: { type: Boolean, default: false },
  deviceData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:visible'])

const loading = ref(false)
const detail = reactive({})

const statusLabel = computed(() => {
  const status = detail.status
  return DEVICE_STATUS_LABELS[status] || status || '未知'
})

const statusTagType = computed(() => {
  const status = detail.status
  return DEVICE_STATUS_COLORS[status] || 'info'
})

const applyDetail = (source) => {
  Object.keys(detail).forEach((key) => delete detail[key])
  Object.assign(detail, source || {})
}

const fetchDetail = async (id) => {
  if (!id) {
    applyDetail(props.deviceData)
    return
  }

  try {
    loading.value = true
    const response = await deviceAPI.getDeviceDetail(id)
    applyDetail(response?.data || props.deviceData)
  } catch (error) {
    console.error('获取设备详情失败:', error)
    applyDetail(props.deviceData)
  } finally {
    loading.value = false
  }
}

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      fetchDetail(props.deviceData?.id)
    } else {
      applyDetail({})
    }
  },
)

watch(
  () => props.deviceData,
  (newData) => {
    if (!props.visible) return
    if (!loading.value) {
      applyDetail(newData)
    }
  },
  { deep: true },
)
</script>

<style scoped>
.device-detail-container {
  min-height: 180px;
}
</style>
