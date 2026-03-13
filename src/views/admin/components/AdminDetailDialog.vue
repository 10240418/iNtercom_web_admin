<template>
  <el-dialog v-model="dialogVisible" title="管理员详情" width="500px" class="app-dialog">
    <div class="admin-detail">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="ID">
          <el-tag>{{ adminData.id }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="用户名">
          <el-tag type="primary">{{ adminData.username }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="邮箱">
          {{ adminData.email }}
        </el-descriptions-item>

        <el-descriptions-item label="电话">
          {{ adminData.phone }}
        </el-descriptions-item>

        <el-descriptions-item label="角色">
          <el-tag :type="getRoleTagType(adminData.role)">
            {{ getRoleLabel(adminData.role) }}
          </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="创建时间">
          {{ formatDateTime(adminData.created_at) }}
        </el-descriptions-item>

        <el-descriptions-item label="最后更新">
          {{ formatDateTime(adminData.updated_at) }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <template #footer>
      <el-button class="app-button app-button-secondary" @click="handleClose">关闭</el-button>
      <el-button class="app-button app-button-primary" @click="handleEdit">编辑</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { formatDateTime } from '@/utils/index.js'
import { USER_ROLE_LABELS } from '@/constants/index.js'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  adminData: {
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

/**
 * 获取角色标签
 */
const getRoleLabel = (role) => {
  return USER_ROLE_LABELS[role] || role
}

/**
 * 获取角色标签类型
 */
const getRoleTagType = (role) => {
  const typeMap = {
    admin: '',
    manager: 'success',
    operator: 'info',
  }
  return typeMap[role] || 'info'
}

/**
 * 关闭弹窗
 */
const handleClose = () => {
  emit('update:visible', false)
}

/**
 * 编辑管理员
 */
const handleEdit = () => {
  emit('edit', props.adminData)
  handleClose()
}
</script>

<style scoped>
.admin-detail {
  padding: 20px 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
