<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="住户详情"
    width="600px"
  >
    <div class="household-detail" v-if="householdData">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="住户ID">
          <el-tag>{{ householdData.id }}</el-tag>
        </el-descriptions-item>

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

        <el-descriptions-item label="创建时间" span="2">
          {{ formatDateTime(householdData.created_at) }}
        </el-descriptions-item>

        <el-descriptions-item label="更新时间" span="2">
          {{ formatDateTime(householdData.updated_at) }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { formatDateTime } from '@/utils/index.js'

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  householdData: {
    type: Object,
    default: () => ({}),
  },
})

defineEmits(['update:visible'])
</script>

<style scoped>
.household-detail {
  padding: 20px 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
