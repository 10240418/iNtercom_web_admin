<template>
  <div class="admin-list-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="header-content">
        <div class="title-section">
          <h1>
            <el-icon class="title-icon"><UserFilled /></el-icon>
            管理员管理
          </h1>
          <p>管理系统管理员账户信息，共 {{ adminStore.adminCount }} 个管理员</p>
        </div>
        <div class="header-stats">
          <el-card class="stat-card" shadow="hover">
            <div class="stat-content">
              <el-icon class="stat-icon"><User /></el-icon>
              <div class="stat-info">
                <span class="stat-number">{{ adminStore.adminCount }}</span>
                <span class="stat-label">管理员总数</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!-- 搜索和操作栏 -->
    <div class="toolbar">
      <div class="search-section">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索用户名、电话或邮箱"
          style="width: 320px"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="handleSearch" :loading="adminStore.loading" icon="Search">
          搜索
        </el-button>
      </div>

      <div class="action-section">
        <el-button type="primary" @click="handleAdd" :icon="Plus" class="action-btn primary">
          新增管理员
        </el-button>
        <el-button
          type="danger"
          :disabled="selectedIds.length === 0"
          @click="handleBatchDelete"
          :icon="Delete"
          class="action-btn danger"
        >
          批量删除 ({{ selectedIds.length }})
        </el-button>
      </div>
    </div>

    <!-- 调试面板 -->
    <el-card v-if="showDebug" class="debug-panel" shadow="never">
      <template #header>
        <div style="display: flex; justify-content: between; align-items: center">
          <span>调试信息</span>
          <el-button size="small" @click="showDebug = false">关闭</el-button>
        </div>
      </template>
      <div class="debug-content">
        <p><strong>Store状态：</strong></p>
        <pre>{{
          JSON.stringify(
            {
              adminList: adminStore.adminList,
              adminCount: adminStore.adminCount,
              hasAdmins: adminStore.hasAdmins,
              loading: adminStore.loading,
              pagination: adminStore.pagination,
            },
            null,
            2,
          )
        }}</pre>

        <p><strong>Token信息：</strong></p>
        <pre>{{ userStore.token ? userStore.token.substring(0, 50) + '...' : '无Token' }}</pre>

        <p><strong>用户信息：</strong></p>
        <pre>{{ JSON.stringify(userStore.userInfo, null, 2) }}</pre>

        <el-button type="primary" @click="testApiDirect" size="small">直接测试API</el-button>
        <el-button type="success" @click="refreshData" size="small">刷新数据</el-button>
      </div>
    </el-card>

    <!-- 管理员列表表格 -->
    <el-card class="table-card" shadow="never">
      <!-- 添加调试按钮 -->
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>管理员列表</span>
          <el-button size="small" @click="showDebug = !showDebug">
            {{ showDebug ? '隐藏' : '显示' }}调试
          </el-button>
        </div>
      </template>
      <el-table
        v-loading="adminStore.loading"
        :data="adminStore.adminList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        stripe
        :header-cell-style="{ background: '#fafafa', color: '#606266' }"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column prop="id" label="ID" width="80" align="center">
          <template #default="{ row }">
            <el-tag size="small" type="info">{{ row.id }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="username" label="用户名" min-width="140">
          <template #default="{ row }">
            <div class="user-info">
              <el-avatar :size="32" class="user-avatar">
                {{ row.username.charAt(0).toUpperCase() }}
              </el-avatar>
              <div class="user-details">
                <el-tag type="primary" class="username-tag">{{ row.username }}</el-tag>
                <span class="user-role">{{ getRoleLabel(row.role) }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="email" label="邮箱" min-width="200">
          <template #default="{ row }">
            <div class="contact-info">
              <el-icon class="contact-icon"><Message /></el-icon>
              <span>{{ row.email }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="电话" min-width="150">
          <template #default="{ row }">
            <div class="contact-info">
              <el-icon class="contact-icon"><Phone /></el-icon>
              <span>{{ row.phone }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="role" label="角色" min-width="100">
          <template #default="{ row }">
            <el-tag :type="getRoleTagType(row.role)" class="role-tag">
              {{ getRoleLabel(row.role) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="created_at" label="创建时间" min-width="180">
          <template #default="{ row }">
            <div class="time-info">
              <el-icon class="time-icon"><Clock /></el-icon>
              <span>{{ formatDateTime(row.created_at) }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="220">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button size="small" @click="handleView(row)" :icon="View" type="info" plain>
                查看
              </el-button>
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
    <div class="pagination-container" v-if="adminStore.hasAdmins">
      <el-pagination
        v-model:current-page="adminStore.pagination.page"
        v-model:page-size="adminStore.pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="adminStore.pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
      />
    </div>

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
import { ref, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Search,
  Plus,
  Delete,
  Edit,
  View,
  UserFilled,
  User,
  Message,
  Phone,
  Clock,
} from '@element-plus/icons-vue'
import { useAdminStore } from '@/stores/admin.js'
import { useUserStore } from '@/stores/user.js'
import { formatDateTime } from '@/utils/index.js'
import { USER_ROLE_LABELS } from '@/constants/index.js'
import { adminAPI } from '@/api/admin.js'
import AdminFormDialog from './components/AdminFormDialog.vue'
import AdminDetailDialog from './components/AdminDetailDialog.vue'

// 使用 Pinia Store
const adminStore = useAdminStore()
const userStore = useUserStore()

// 搜索关键词
const searchKeyword = ref('')

// 选中的行
const selectedIds = ref([])

// 弹窗控制
const dialogVisible = ref(false)
const detailVisible = ref(false)
const isEdit = ref(false)
const currentAdmin = ref({})

// 调试控制
const showDebug = ref(false)

// 监听搜索关键词变化，同步到store
watch(searchKeyword, (newVal) => {
  adminStore.searchKeyword = newVal
})

/**
 * 搜索
 */
const handleSearch = async () => {
  try {
    await adminStore.searchAdmins(searchKeyword.value)
  } catch (error) {
    ElMessage.error('搜索失败')
  }
}

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
 * 查看管理员详情
 */
const handleView = (row) => {
  currentAdmin.value = row
  detailVisible.value = true
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

/**
 * 测试直接API
 */
const testApiDirect = async () => {
  try {
    console.log('直接测试API调用')
    const response = await adminAPI.getAdminList()
    console.log('直接API响应:', response)
    ElMessage.success('直接API调用成功，请查看控制台')
  } catch (error) {
    console.error('直接API调用失败:', error)
    ElMessage.error(`直接API调用失败: ${error.message}`)
  }
}

/**
 * 刷新数据
 */
const refreshData = async () => {
  try {
    console.log('手动刷新数据')
    await adminStore.fetchAdminList()
    ElMessage.success('数据刷新成功')
  } catch (error) {
    console.error('数据刷新失败:', error)
    ElMessage.error('数据刷新失败')
  }
}

// 组件挂载时获取数据
onMounted(async () => {
  console.log('AdminListView组件挂载，开始获取数据')
  console.log('adminStore初始状态:', {
    adminList: adminStore.adminList,
    adminCount: adminStore.adminCount,
    loading: adminStore.loading,
  })

  try {
    console.log('调用adminStore.fetchAdminList()')
    const result = await adminStore.fetchAdminList()
    console.log('fetchAdminList返回结果:', result)
    console.log('adminStore数据更新后状态:', {
      adminList: adminStore.adminList,
      adminCount: adminStore.adminCount,
      hasAdmins: adminStore.hasAdmins,
      loading: adminStore.loading,
    })
  } catch (error) {
    console.error('获取管理员列表失败，详细错误:', error)
    ElMessage.error('获取管理员列表失败')
  }
})
</script>

<style scoped>
.admin-list-container {
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.title-section h1 {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  color: #409eff;
  font-size: 32px;
}

.title-section p {
  color: #909399;
  margin: 0;
  font-size: 14px;
}

.header-stats {
  flex-shrink: 0;
}

.stat-card {
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-card :deep(.el-card__body) {
  padding: 20px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  font-size: 32px;
  opacity: 0.8;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  opacity: 0.8;
  margin-top: 4px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-section {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  border-radius: 8px;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-input :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #409eff;
}

.action-section {
  display: flex;
  gap: 12px;
}

.action-btn {
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(135deg, #409eff, #66b6ff);
  border: none;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.4);
}

.action-btn.danger {
  background: linear-gradient(135deg, #f56c6c, #ff8a8a);
  border: none;
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
}

.action-btn.danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(245, 108, 108, 0.4);
}

.table-card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table-card :deep(.el-card__body) {
  padding: 0;
}

.table-card :deep(.el-table) {
  border-radius: 12px;
}

.table-card :deep(.el-table th) {
  font-weight: 600;
  font-size: 14px;
}

.table-card :deep(.el-table td) {
  padding: 16px 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  background: linear-gradient(135deg, #409eff, #66b6ff);
  color: white;
  font-weight: bold;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.username-tag {
  font-weight: 500;
}

.user-role {
  font-size: 12px;
  color: #909399;
}

.contact-info,
.time-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
}

.contact-icon,
.time-icon {
  color: #909399;
  font-size: 14px;
}

.role-tag {
  font-weight: 500;
  border-radius: 6px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-buttons .el-button {
  border-radius: 6px;
  transition: all 0.3s ease;
}

.action-buttons .el-button:hover {
  transform: translateY(-1px);
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
}

.debug-panel {
  margin-bottom: 20px;
  border: 2px dashed #409eff;
}

.debug-content {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.debug-content pre {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
  max-height: 200px;
}

.debug-content p {
  margin: 12px 0 8px 0;
  font-weight: bold;
}

.pagination-container {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pagination-container :deep(.el-pagination) {
  gap: 8px;
}

.pagination-container :deep(.el-pagination .el-pager li) {
  border-radius: 6px;
  transition: all 0.3s ease;
}

.pagination-container :deep(.el-pagination .el-pager li:hover) {
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-list-container {
    padding: 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 16px;
  }

  .toolbar {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .search-section,
  .action-section {
    justify-content: center;
  }

  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }

  .pagination-container {
    justify-content: center;
  }
}
</style>
