<template>
  <div class="household-list-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="header-content">
        <div class="title-section">
          <h1>
            <el-icon class="title-icon"><House /></el-icon>
            住户管理
          </h1>
          <p>管理小区住户信息和居民关系，共 {{ householdStore.householdCount }} 个住户</p>
        </div>
        <div class="header-stats">
          <el-card class="stat-card" shadow="hover">
            <div class="stat-content">
              <el-icon class="stat-icon"><House /></el-icon>
              <div class="stat-info">
                <span class="stat-number">{{ householdStore.householdCount }}</span>
                <span class="stat-label">住户总数</span>
              </div>
            </div>
          </el-card>
          <el-card class="stat-card active" shadow="hover">
            <div class="stat-content">
              <el-icon class="stat-icon"><UserFilled /></el-icon>
              <div class="stat-info">
                <span class="stat-number">{{ householdStore.residentCount }}</span>
                <span class="stat-label">居民总数</span>
              </div>
            </div>
          </el-card>
          <el-card class="stat-card secondary" shadow="hover">
            <div class="stat-content">
              <el-icon class="stat-icon"><Select /></el-icon>
              <div class="stat-info">
                <span class="stat-number">{{ householdStore.activeHouseholds.length }}</span>
                <span class="stat-label">活跃住户</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!-- 操作工具栏 -->
    <div class="toolbar">
      <div class="search-section">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索住户号、楼栋信息"
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
        <el-button
          type="primary"
          @click="handleSearch"
          :loading="householdStore.loading"
          icon="Search"
        >
          搜索
        </el-button>
      </div>

      <div class="action-section">
        <el-button
          type="primary"
          @click="handleAddHousehold"
          :icon="Plus"
          class="action-btn primary"
        >
          新增住户
        </el-button>
        <el-button
          type="success"
          @click="handleAddResident"
          :icon="UserFilled"
          class="action-btn success"
        >
          新增居民
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

    <!-- 标签页切换 -->
    <el-tabs v-model="activeTab" class="main-tabs" @tab-change="handleTabChange">
      <!-- 住户列表标签页 -->
      <el-tab-pane label="住户列表" name="households">
        <el-card class="table-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>住户列表</span>
              <el-button
                type="text"
                @click="refreshHouseholdData"
                :loading="householdStore.loading"
              >
                <el-icon><Refresh /></el-icon>
                刷新
              </el-button>
            </div>
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
            stripe
            :header-cell-style="{ background: '#fafafa', color: '#606266' }"
          >
            <el-table-column type="selection" width="55" />

            <el-table-column prop="id" label="ID" width="80" align="center">
              <template #default="{ row }">
                <el-tag size="small" type="info">{{ row.id }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="household_number" label="住户信息" min-width="180">
              <template #default="{ row }">
                <div class="household-info">
                  <el-avatar :size="36" class="household-avatar">
                    <el-icon><House /></el-icon>
                  </el-avatar>
                  <div class="household-details">
                    <el-tag type="primary" class="household-number-tag">{{
                      row.household_number
                    }}</el-tag>
                    <span class="building-info">楼栋: {{ getBuildingName(row.building_id) }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="居民数量" width="120" align="center">
              <template #default="{ row }">
                <el-tag type="success" class="resident-count-tag">
                  <el-icon><UserFilled /></el-icon>
                  {{ getResidentCount(row.id) }}人
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag
                  :type="getStatusTagType(row.status)"
                  class="status-tag"
                  :class="{ 'status-active': row.status === 'active' }"
                >
                  <el-icon class="status-icon">
                    <component :is="getStatusIcon(row.status)" />
                  </el-icon>
                  {{ getStatusLabel(row.status) }}
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

            <el-table-column label="操作" fixed="right" width="280">
              <template #default="{ row }">
                <div class="action-buttons">
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

          <!-- 空状态 -->
          <div v-else class="empty-state">
            <el-empty description="暂无住户数据">
              <el-button type="primary" @click="handleAddHousehold">新增第一个住户</el-button>
            </el-empty>
          </div>

          <!-- 分页组件 -->
          <div class="pagination-container" v-if="householdStore.hasHouseholds">
            <el-pagination
              v-model:current-page="householdStore.pagination.page"
              v-model:page-size="householdStore.pagination.pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="householdStore.pagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleHouseholdSizeChange"
              @current-change="handleHouseholdCurrentChange"
              background
            />
          </div>
        </el-card>
      </el-tab-pane>

      <!-- 居民列表标签页 -->
      <el-tab-pane label="居民列表" name="residents">
        <el-card class="table-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span>居民列表</span>
              <el-button
                type="text"
                @click="refreshResidentData"
                :loading="householdStore.residentLoading"
              >
                <el-icon><Refresh /></el-icon>
                刷新
              </el-button>
            </div>
          </template>

          <div v-if="householdStore.residentLoading" class="loading-container">
            <el-icon class="is-loading" style="font-size: 24px"><Loading /></el-icon>
            <p>正在加载居民数据...</p>
          </div>

          <el-table
            v-else-if="householdStore.residentList.length > 0"
            :data="householdStore.residentList"
            style="width: 100%"
            stripe
            :header-cell-style="{ background: '#fafafa', color: '#606266' }"
          >
            <el-table-column prop="id" label="ID" width="80" align="center">
              <template #default="{ row }">
                <el-tag size="small" type="info">{{ row.id }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="name" label="居民信息" min-width="160">
              <template #default="{ row }">
                <div class="resident-info">
                  <el-avatar :size="36" class="resident-avatar">
                    <el-icon><UserFilled /></el-icon>
                  </el-avatar>
                  <div class="resident-details">
                    <span class="resident-name">{{ row.name }}</span>
                    <span class="resident-phone">{{ row.phone }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="email" label="邮箱" min-width="180" show-overflow-tooltip />

            <el-table-column prop="household_id" label="所属住户" width="120">
              <template #default="{ row }">
                <el-tag type="primary">{{ getHouseholdNumber(row.household_id) }}</el-tag>
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

            <el-table-column label="操作" fixed="right" width="200">
              <template #default="{ row }">
                <div class="action-buttons">
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

          <!-- 空状态 -->
          <div v-else class="empty-state">
            <el-empty description="暂无居民数据">
              <el-button type="primary" @click="handleAddResident">新增第一个居民</el-button>
            </el-empty>
          </div>

          <!-- 分页组件 -->
          <div class="pagination-container" v-if="householdStore.hasResidents">
            <el-pagination
              v-model:current-page="householdStore.residentPagination.page"
              v-model:page-size="householdStore.residentPagination.pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="householdStore.residentPagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleResidentSizeChange"
              @current-change="handleResidentCurrentChange"
              background
            />
          </div>
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
import { ref, onMounted, watch, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Search,
  Plus,
  Delete,
  Edit,
  View,
  House,
  UserFilled,
  Select,
  Clock,
  Loading,
  Refresh,
  Check,
  Close,
} from '@element-plus/icons-vue'
import { useHouseholdStore } from '@/stores/household.js'
import { useBuildingStore } from '@/stores/building.js'
import { formatDateTime } from '@/utils/index.js'
import { COMMON_STATUS_LABELS, COMMON_STATUS_COLORS } from '@/constants/index.js'
import HouseholdFormDialog from './components/HouseholdFormDialog.vue'
import ResidentFormDialog from './components/ResidentFormDialog.vue'
import HouseholdDetailDialog from './components/HouseholdDetailDialog.vue'
import ResidentDetailDialog from './components/ResidentDetailDialog.vue'
import HouseholdResidentsDialog from './components/HouseholdResidentsDialog.vue'

// 使用 Pinia Store
const householdStore = useHouseholdStore()
const buildingStore = useBuildingStore()

// 搜索关键词
const searchKeyword = ref('')

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

// 监听搜索关键词变化
watch(searchKeyword, (newVal) => {
  householdStore.searchKeyword = newVal
})

/**
 * 搜索
 */
const handleSearch = async () => {
  try {
    if (activeTab.value === 'households') {
      await householdStore.searchHouseholds(searchKeyword.value)
    } else {
      await householdStore.searchResidents(searchKeyword.value)
    }
  } catch (error) {
    ElMessage.error('搜索失败')
  }
}

/**
 * 标签页切换
 */
const handleTabChange = (tabName) => {
  activeTab.value = tabName
  searchKeyword.value = ''

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

/**
 * 获取状态图标
 */
const getStatusIcon = (status) => {
  const iconMap = {
    active: Check,
    inactive: Close,
  }
  return iconMap[status] || Check
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
  color: #f39c12;
  font-size: 32px;
}

.title-section p {
  color: #909399;
  margin: 0;
  font-size: 14px;
}

.header-stats {
  flex-shrink: 0;
  display: flex;
  gap: 16px;
}

.stat-card {
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  color: white;
  min-width: 140px;
}

.stat-card.active {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
}

.stat-card.secondary {
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
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
  box-shadow: 0 0 0 1px #f39c12;
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
  background: linear-gradient(135deg, #f39c12, #e67e22);
  border: none;
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
}

.action-btn.success {
  background: linear-gradient(135deg, #27ae60, #229954);
  border: none;
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
}

.action-btn.danger {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border: none;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.main-tabs {
  margin-bottom: 0;
}

.main-tabs :deep(.el-tabs__header) {
  margin: 0 0 20px 0;
  background: white;
  border-radius: 12px;
  padding: 20px 20px 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading-container {
  text-align: center;
  padding: 50px;
  color: #909399;
}

.household-info,
.resident-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.household-avatar {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
  font-size: 18px;
}

.resident-avatar {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  font-size: 18px;
}

.household-details,
.resident-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.household-number-tag {
  font-weight: 500;
}

.building-info {
  font-size: 12px;
  color: #909399;
}

.resident-name {
  font-weight: 500;
  color: #2c3e50;
}

.resident-phone {
  font-size: 12px;
  color: #909399;
}

.resident-count-tag {
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-tag {
  font-weight: 500;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
}

.status-tag.status-active {
  background: linear-gradient(135deg, #27ae60, #229954);
  border: none;
  color: white;
}

.status-icon {
  font-size: 12px;
}

.time-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
}

.time-icon {
  color: #909399;
  font-size: 14px;
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

.pagination-container {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  background: #fafafa;
  border-radius: 0 0 12px 12px;
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
  .household-list-container {
    padding: 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 16px;
  }

  .header-stats {
    flex-direction: column;
    width: 100%;
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
