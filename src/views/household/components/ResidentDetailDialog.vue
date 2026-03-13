<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="居民详情"
    class="app-dialog"
    width="600px"
  >
    <div class="resident-detail" v-if="residentData">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="居民ID">
          <el-tag>{{ residentData.id }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="姓名">
          <el-tag type="primary">{{ residentData.name }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="手机号">
          {{ residentData.phone }}
        </el-descriptions-item>

        <el-descriptions-item label="邮箱">
          {{ residentData.email || '未填写' }}
        </el-descriptions-item>

        <el-descriptions-item label="所属住户ID">
          <el-tag>{{ residentData.household_id }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="创建时间">
          {{ formatDateTime(residentData.created_at) }}
        </el-descriptions-item>

        <el-descriptions-item label="更新时间" span="2">
          {{ formatDateTime(residentData.updated_at) }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <template #footer>
      <el-button class="app-button app-button-secondary" @click="$emit('update:visible', false)">关闭</el-button>
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
  residentData: {
    type: Object,
    default: () => ({}),
  },
})

defineEmits(['update:visible'])
</script>

<style scoped>
.resident-detail {
  padding: 20px 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
