<template>
  <div class="admin-list-container app-page">
    <div class="page-header app-page-header">
      <div class="header-content app-page-header-content">
        <div class="title-section app-page-heading">
          <h1>
            <el-icon class="title-icon app-title-icon"><UserFilled /></el-icon>
            管理员管理
          </h1>
          <p>管理系统管理员账户信息</p>
        </div>
      </div>
    </div>

    <div class="toolbar app-toolbar">
      <TableActionButtons
        add-label="新增管理员"
        delete-label="批量删除"
        :selected-count="selectedIds.length"
        :add-icon="Plus"
        :delete-icon="Delete"
        @add="handleAdd"
        @batch-delete="handleBatchDelete"
      />
    </div>

    <el-card class="table-card app-table-card" shadow="never">
      <template #header>
        <ListCardHeader
          title="管理员列表"
          :summary="`共 ${adminStore.pagination.total} 条记录`"
        />
      </template>
      <el-table
        v-loading="adminStore.loading"
        :data="adminStore.adminList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        table-layout="fixed"
        stripe
        :header-cell-style="{ background: 'var(--c-primary-bg)', color: 'var(--c-text-secondary)' }"
      >
        <el-table-column type="selection" width="56" />

        <el-table-column prop="id" label="ID" width="80" align="center" />

        <el-table-column prop="username" label="用户名" min-width="160" show-overflow-tooltip>
          <template #default="{ row }">{{ row.username || '-' }}</template>
        </el-table-column>

        <el-table-column prop="email" label="邮箱" min-width="160" show-overflow-tooltip />

        <el-table-column prop="phone" label="电话" min-width="160" show-overflow-tooltip />

        <el-table-column prop="role" label="角色" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">
            <el-tag :type="getRoleTagType(row.role)">
              {{ getRoleLabel(row.role) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="created_at" label="创建时间" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">{{ formatDateTime(row.created_at) }}</template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <div class="table-op-buttons">
              <el-button size="small" type="primary" @click="handleEdit(row)" :icon="Edit" plain>
                编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row)" :icon="Delete" plain>
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 空状态 -->
      <div v-if="!adminStore.loading && !adminStore.hasAdmins" class="empty-state">
        <el-empty description="暂无管理员数据">
          <el-button type="primary" @click="handleAdd">新增第一个管理员</el-button>
        </el-empty>
      </div>
    </el-card>

    <!-- 分页组件 -->
    <TablePagination
      v-if="adminStore.hasAdmins"
      v-model:current-page="adminStore.pagination.page"
      v-model:page-size="adminStore.pagination.pageSize"
      :total="adminStore.pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 新增/编辑弹窗 -->
    <AdminFormDialog
      v-model:visible="dialogVisible"
      :form-data="currentAdmin"
      :is-edit="isEdit"
      @success="handleFormSuccess"
    />

    <!-- 详情弹窗 -->
    <AdminDetailDialog v-model:visible="detailVisible" :admin-data="currentAdmin" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Plus,
  Delete,
  Edit,
  UserFilled,
} from '@element-plus/icons-vue'
import { useAdminStore } from '@/stores/admin.js'
import { formatDateTime } from '@/utils/index.js'
import { USER_ROLE_LABELS } from '@/constants/index.js'
import { TableActionButtons, TablePagination } from '@/components/table'
import ListCardHeader from '@/page/button/ListCardHeader.vue'
import AdminFormDialog from './components/AdminFormDialog.vue'
import AdminDetailDialog from './components/AdminDetailDialog.vue'

// 使用 Pinia Store
const adminStore = useAdminStore()

// 选中的行
const selectedIds = ref([])

// 弹窗控制
const dialogVisible = ref(false)
const detailVisible = ref(false)
const isEdit = ref(false)
const currentAdmin = ref({})

/**
 * 新增管理员
 */
const handleAdd = () => {
  currentAdmin.value = {}
  isEdit.value = false
  dialogVisible.value = true
}

/**
 * 编辑管理员
 */
const handleEdit = (row) => {
  currentAdmin.value = { ...row }
  isEdit.value = true
  dialogVisible.value = true
}

/**
 * 删除管理员
 */
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确认删除管理员 "${row.username}" 吗？`, '删除确认', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await adminStore.deleteAdmin(row.id)
    ElMessage.success('删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

/**
 * 批量删除
 */
const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请选择要删除的管理员')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确认删除选中的 ${selectedIds.value.length} 个管理员吗？`,
      '批量删除确认',
      {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )

    await adminStore.batchDeleteAdmins(selectedIds.value)
    ElMessage.success('批量删除成功')
    selectedIds.value = []
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('批量删除失败')
    }
  }
}

/**
 * 表格选择变化
 */
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map((item) => item.id)
}

/**
 * 分页大小变化
 */
const handleSizeChange = async (pageSize) => {
  try {
    await adminStore.changePage(1, pageSize)
  } catch (error) {
    ElMessage.error('切换页面大小失败')
  }
}

/**
 * 当前页变化
 */
const handleCurrentChange = async (page) => {
  try {
    await adminStore.changePage(page)
  } catch (error) {
    ElMessage.error('切换页面失败')
  }
}

/**
 * 表单提交成功
 */
const handleFormSuccess = () => {
  dialogVisible.value = false
}

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
    admin: 'danger',
    manager: 'warning',
    operator: 'success',
  }
  return typeMap[role] || 'info'
}

// 组件挂载时获取数据
onMounted(async () => {
  try {
    await adminStore.fetchAdminList()
  } catch (error) {
    ElMessage.error('获取管理员列表失败')
  }
})
</script>

<style scoped>
.admin-list-container {
  padding: 24px;
}

.toolbar {
  margin-bottom: 20px;
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .admin-list-container {
    padding: 16px;
  }
}
</style>
