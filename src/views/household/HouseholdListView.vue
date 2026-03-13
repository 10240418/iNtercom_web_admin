<template>
  <div class="household-list-container app-page">
    <div class="page-header app-page-header">
      <div class="header-content app-page-header-content">
        <div class="title-section app-page-heading">
          <h1>
            <el-icon class="title-icon app-title-icon"><House /></el-icon>
            住户管理
          </h1>
          <p>管理小区住户信息和居民关系</p>
        </div>
      </div>
    </div>

    <div class="toolbar app-toolbar">
      <TableActionButtons
        add-label="新增住户"
        delete-label="批量删除"
        :selected-count="selectedIds.length"
        :add-icon="Plus"
        :delete-icon="Delete"
        @add="handleAddHousehold"
        @batch-delete="handleBatchDelete"
      >
        <template #extra>
          <el-button class="app-button app-button-success" @click="handleAddResident" :icon="UserFilled">
            新增居民
          </el-button>
        </template>
      </TableActionButtons>
    </div>

    <el-tabs v-model="activeTab" class="main-tabs" @tab-change="handleTabChange">
      <!-- 住户列表标签页 -->
      <el-tab-pane label="住户列表" name="households">
        <el-card class="table-card app-table-card" shadow="never">
          <template #header>
            <ListCardHeader
              title="住户列表"
              :show-refresh="true"
              :refresh-loading="householdStore.loading"
              @refresh="refreshHouseholdData"
            />
          </template>

          <div v-if="householdStore.loading" class="loading-container">
            <el-icon class="is-loading" style="font-size: 24px"><Loading /></el-icon>
            <p>正在加载住户数据...</p>
          </div>

          <el-table
            v-else-if="householdStore.householdList.length > 0"
            :data="householdStore.householdList"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            table-layout="fixed"
            stripe
            :header-cell-style="{ background: 'var(--c-primary-bg)', color: 'var(--c-text-secondary)' }"
          >
            <el-table-column type="selection" width="55" />

            <el-table-column prop="id" label="ID" width="80" align="center" />

            <el-table-column prop="household_number" label="住户号" min-width="140" show-overflow-tooltip />

            <el-table-column prop="building_id" label="所属楼栋" min-width="140" show-overflow-tooltip>
              <template #default="{ row }">{{ getBuildingName(row.building_id) }}</template>
            </el-table-column>

            <el-table-column label="居民数量" width="100" align="center">
              <template #default="{ row }">
                <el-tag type="success">{{ getResidentCount(row.id) }}人</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="getStatusTagType(row.status)">{{ getStatusLabel(row.status) }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="created_at" label="创建时间" min-width="180" show-overflow-tooltip>
              <template #default="{ row }">{{ formatDateTime(row.created_at) }}</template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="280">
              <template #default="{ row }">
                <div class="action-buttons table-op-buttons">
                  <el-button
                    size="small"
                    @click="handleViewHousehold(row)"
                    :icon="View"
                    type="info"
                    plain
                  >
                    查看
                  </el-button>
                  <el-button
                    size="small"
                    @click="handleViewResidents(row)"
                    :icon="UserFilled"
                    type="success"
                    plain
                  >
                    居民
                  </el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="handleEditHousehold(row)"
                    :icon="Edit"
                    plain
                  >
                    编辑
                  </el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDeleteHousehold(row)"
                    :icon="Delete"
                    plain
                  >
                    删除
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div v-else class="empty-state">
            <el-empty description="暂无住户数据">
              <el-button type="primary" @click="handleAddHousehold">新增第一个住户</el-button>
            </el-empty>
          </div>

          <TablePagination
            v-if="householdStore.hasHouseholds"
            v-model:current-page="householdStore.pagination.page"
            v-model:page-size="householdStore.pagination.pageSize"
            :total="householdStore.pagination.total"
            @size-change="handleHouseholdSizeChange"
            @current-change="handleHouseholdCurrentChange"
          />
        </el-card>
      </el-tab-pane>

      <!-- 居民列表标签页 -->
      <el-tab-pane label="居民列表" name="residents">
        <el-card class="table-card app-table-card" shadow="never">
          <template #header>
            <ListCardHeader
              title="居民列表"
              :show-refresh="true"
              :refresh-loading="householdStore.residentLoading"
              @refresh="refreshResidentData"
            />
          </template>

          <div v-if="householdStore.residentLoading" class="loading-container">
            <el-icon class="is-loading" style="font-size: 24px"><Loading /></el-icon>
            <p>正在加载居民数据...</p>
          </div>

          <el-table
            v-else-if="householdStore.residentList.length > 0"
            :data="householdStore.residentList"
            style="width: 100%"
            table-layout="fixed"
            stripe
            :header-cell-style="{ background: 'var(--c-primary-bg)', color: 'var(--c-text-secondary)' }"
          >
            <el-table-column prop="id" label="ID" width="80" align="center" />

            <el-table-column prop="name" label="姓名" min-width="120" show-overflow-tooltip />

            <el-table-column prop="phone" label="电话" min-width="140" show-overflow-tooltip />

            <el-table-column prop="email" label="邮箱" min-width="180" show-overflow-tooltip />

            <el-table-column prop="household_id" label="所属住户" min-width="120">
              <template #default="{ row }">
                <el-tag type="primary">{{ getHouseholdNumber(row.household_id) }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="created_at" label="创建时间" min-width="180" show-overflow-tooltip>
              <template #default="{ row }">{{ formatDateTime(row.created_at) }}</template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="200">
              <template #default="{ row }">
                <div class="action-buttons table-op-buttons">
                  <el-button
                    size="small"
                    @click="handleViewResident(row)"
                    :icon="View"
                    type="info"
                    plain
                  >
                    查看
                  </el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="handleEditResident(row)"
                    :icon="Edit"
                    plain
                  >
                    编辑
                  </el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDeleteResident(row)"
                    :icon="Delete"
                    plain
                  >
                    删除
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div v-else class="empty-state">
            <el-empty description="暂无居民数据">
              <el-button type="primary" @click="handleAddResident">新增第一个居民</el-button>
            </el-empty>
          </div>

          <TablePagination
            v-if="householdStore.hasResidents"
            v-model:current-page="householdStore.residentPagination.page"
            v-model:page-size="householdStore.residentPagination.pageSize"
            :total="householdStore.residentPagination.total"
            @size-change="handleResidentSizeChange"
            @current-change="handleResidentCurrentChange"
          />
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <!-- 住户表单弹窗 -->
    <HouseholdFormDialog
      v-model:visible="householdDialogVisible"
      :form-data="currentHousehold"
      :is-edit="isEditHousehold"
      @success="handleHouseholdFormSuccess"
    />

    <!-- 居民表单弹窗 -->
    <ResidentFormDialog
      v-model:visible="residentDialogVisible"
      :form-data="currentResident"
      :is-edit="isEditResident"
      @success="handleResidentFormSuccess"
    />

    <!-- 住户详情弹窗 -->
    <HouseholdDetailDialog
      v-model:visible="householdDetailVisible"
      :household-data="currentHousehold"
    />

    <!-- 居民详情弹窗 -->
    <ResidentDetailDialog
      v-model:visible="residentDetailVisible"
      :resident-data="currentResident"
    />

    <!-- 住户居民管理弹窗 -->
    <HouseholdResidentsDialog
      v-model:visible="householdResidentsVisible"
      :household-data="currentHousehold"
      @refresh="refreshResidentData"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Plus,
  Delete,
  Edit,
  View,
  House,
  UserFilled,
  Loading,
} from '@element-plus/icons-vue'
import { useHouseholdStore } from '@/stores/household.js'
import { useBuildingStore } from '@/stores/building.js'
import { formatDateTime } from '@/utils/index.js'
import { COMMON_STATUS_LABELS, COMMON_STATUS_COLORS } from '@/constants/index.js'
import { TableActionButtons, TablePagination } from '@/components/table'
import ListCardHeader from '@/page/button/ListCardHeader.vue'
import HouseholdFormDialog from './components/HouseholdFormDialog.vue'
import ResidentFormDialog from './components/ResidentFormDialog.vue'
import HouseholdDetailDialog from './components/HouseholdDetailDialog.vue'
import ResidentDetailDialog from './components/ResidentDetailDialog.vue'
import HouseholdResidentsDialog from './components/HouseholdResidentsDialog.vue'

// 使用 Pinia Store
const householdStore = useHouseholdStore()
const buildingStore = useBuildingStore()

// 选中的行
const selectedIds = ref([])

// 当前活跃的标签页
const activeTab = ref('households')

// 弹窗控制
const householdDialogVisible = ref(false)
const residentDialogVisible = ref(false)
const householdDetailVisible = ref(false)
const residentDetailVisible = ref(false)
const householdResidentsVisible = ref(false)

const isEditHousehold = ref(false)
const isEditResident = ref(false)

const currentHousehold = ref({})
const currentResident = ref({})

/**
 * 标签页切换
 */
const handleTabChange = (tabName) => {
  activeTab.value = tabName

  if (tabName === 'households') {
    refreshHouseholdData()
  } else {
    refreshResidentData()
  }
}

/**
 * 新增住户
 */
const handleAddHousehold = () => {
  currentHousehold.value = {}
  isEditHousehold.value = false
  householdDialogVisible.value = true
}

/**
 * 新增居民
 */
const handleAddResident = () => {
  currentResident.value = {}
  isEditResident.value = false
  residentDialogVisible.value = true
}

/**
 * 编辑住户
 */
const handleEditHousehold = (row) => {
  currentHousehold.value = { ...row }
  isEditHousehold.value = true
  householdDialogVisible.value = true
}

/**
 * 编辑居民
 */
const handleEditResident = (row) => {
  currentResident.value = { ...row }
  isEditResident.value = true
  residentDialogVisible.value = true
}

/**
 * 查看住户详情
 */
const handleViewHousehold = (row) => {
  currentHousehold.value = row
  householdDetailVisible.value = true
}

/**
 * 查看居民详情
 */
const handleViewResident = (row) => {
  currentResident.value = row
  residentDetailVisible.value = true
}

/**
 * 查看住户的居民
 */
const handleViewResidents = (row) => {
  currentHousehold.value = row
  householdResidentsVisible.value = true
}

/**
 * 删除住户
 */
const handleDeleteHousehold = async (row) => {
  try {
    await ElMessageBox.confirm(`确认删除住户 "${row.household_number}" 吗？`, '删除确认', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await householdStore.deleteHousehold(row.id)
    ElMessage.success('删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

/**
 * 删除居民
 */
const handleDeleteResident = async (row) => {
  try {
    await ElMessageBox.confirm(`确认删除居民 "${row.name}" 吗？`, '删除确认', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await householdStore.deleteResident(row.id)
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
    ElMessage.warning('请选择要删除的住户')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确认删除选中的 ${selectedIds.value.length} 个住户吗？`,
      '批量删除确认',
      {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )

    // 批量删除住户
    for (const id of selectedIds.value) {
      await householdStore.deleteHousehold(id)
    }

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
 * 住户分页大小变化
 */
const handleHouseholdSizeChange = async (pageSize) => {
  try {
    await householdStore.changeHouseholdPage(1, pageSize)
  } catch (error) {
    ElMessage.error('切换页面大小失败')
  }
}

/**
 * 住户当前页变化
 */
const handleHouseholdCurrentChange = async (page) => {
  try {
    await householdStore.changeHouseholdPage(page)
  } catch (error) {
    ElMessage.error('切换页面失败')
  }
}

/**
 * 居民分页大小变化
 */
const handleResidentSizeChange = async (pageSize) => {
  try {
    await householdStore.changeResidentPage(1, pageSize)
  } catch (error) {
    ElMessage.error('切换页面大小失败')
  }
}

/**
 * 居民当前页变化
 */
const handleResidentCurrentChange = async (page) => {
  try {
    await householdStore.changeResidentPage(page)
  } catch (error) {
    ElMessage.error('切换页面失败')
  }
}

/**
 * 住户表单提交成功
 */
const handleHouseholdFormSuccess = () => {
  householdDialogVisible.value = false
  refreshHouseholdData()
}

/**
 * 居民表单提交成功
 */
const handleResidentFormSuccess = () => {
  residentDialogVisible.value = false
  refreshResidentData()
}

/**
 * 刷新住户数据
 */
const refreshHouseholdData = async () => {
  try {
    await householdStore.fetchHouseholdList()
  } catch (error) {
    ElMessage.error('刷新住户数据失败')
  }
}

/**
 * 刷新居民数据
 */
const refreshResidentData = async () => {
  try {
    await householdStore.fetchResidentList()
  } catch (error) {
    ElMessage.error('刷新居民数据失败')
  }
}

/**
 * 获取楼栋名称
 */
const getBuildingName = (buildingId) => {
  const building = buildingStore.buildingList.find((b) => b.id === buildingId)
  return building ? building.building_name : `楼栋${buildingId}`
}

/**
 * 获取住户号
 */
const getHouseholdNumber = (householdId) => {
  const household = householdStore.householdList.find((h) => h.id === householdId)
  return household ? household.household_number : `住户${householdId}`
}

/**
 * 获取居民数量（简化版本）
 */
const getResidentCount = (householdId) => {
  // 这里可以根据实际需求优化，比如缓存居民数据
  return householdStore.residentList.filter((r) => r.household_id === householdId).length
}

/**
 * 获取状态标签
 */
const getStatusLabel = (status) => {
  return COMMON_STATUS_LABELS[status] || status
}

/**
 * 获取状态标签类型
 */
const getStatusTagType = (status) => {
  return COMMON_STATUS_COLORS[status] || 'info'
}

// 组件挂载时获取数据
onMounted(async () => {
  try {
    // 同时获取楼栋和住户数据
    await Promise.all([
      buildingStore.fetchBuildingList(),
      householdStore.fetchHouseholdList(),
      householdStore.fetchResidentList(),
    ])
  } catch (error) {
    ElMessage.error('获取数据失败')
  }
})
</script>

<style scoped>
.household-list-container {
  padding: 24px;
}

.toolbar {
  margin-bottom: 20px;
}

.action-section {
  display: flex;
  gap: 12px;
}

.main-tabs {
  margin-bottom: 0;
}

.main-tabs :deep(.el-tabs__header) {
  margin: 0 0 20px 0;
  background: var(--c-card-bg);
  border: 1px solid var(--c-border);
  border-radius: 16px;
  padding: 20px 20px 0 20px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading-container {
  text-align: center;
  padding: 50px;
  color: var(--c-text-secondary);
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
}

.pagination-container {
  margin-top: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .household-list-container {
    padding: 16px;
  }

  .toolbar {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
}
</style>
