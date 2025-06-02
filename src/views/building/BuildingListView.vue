<template>
  <div class="building-list-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>楼栋管理</h1>
      <p>管理小区楼栋信息和关联关系</p>
    </div>

    <!-- 搜索和操作栏 -->
    <div class="toolbar">
      <div class="search-section">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索楼栋名称、编码、地址"
          style="width: 300px"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="handleSearch" :loading="loading"> 搜索 </el-button>
      </div>

      <div class="action-section">
        <el-button type="primary" @click="handleAdd" :icon="Plus"> 新增楼栋 </el-button>
        <el-button
          type="danger"
          :disabled="selectedIds.length === 0"
          @click="handleBatchDelete"
          :icon="Delete"
        >
          批量删除
        </el-button>
      </div>
    </div>

    <!-- 楼栋列表表格 -->
    <el-table
      v-loading="loading"
      :data="buildingList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />

      <el-table-column prop="id" label="ID" width="80" />

      <el-table-column prop="building_name" label="楼栋名称" min-width="150">
        <template #default="{ row }">
          <el-tag type="primary">{{ row.building_name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="building_code" label="楼栋编码" min-width="120">
        <template #default="{ row }">
          <el-tag>{{ row.building_code }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="地址" min-width="200" show-overflow-tooltip />

      <el-table-column prop="status" label="状态" min-width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.status)">
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="创建时间" min-width="170">
        <template #default="{ row }">
          {{ formatDateTime(row.created_at) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" width="250">
        <template #default="{ row }">
          <el-button size="small" @click="handleView(row)" :icon="View"> 查看 </el-button>
          <el-button size="small" type="primary" @click="handleEdit(row)" :icon="Edit">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)" :icon="Delete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增/编辑弹窗 -->
    <BuildingFormDialog
      v-model:visible="dialogVisible"
      :form-data="currentBuilding"
      :is-edit="isEdit"
      @success="handleFormSuccess"
    />

    <!-- 详情弹窗 -->
    <BuildingDetailDialog v-model:visible="detailVisible" :building-data="currentBuilding" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Delete, Edit, View } from '@element-plus/icons-vue'
import { buildingAPI } from '@/api/building.js'
import { formatDateTime } from '@/utils/index.js'
import { BUILDING_STATUS_LABELS, BUILDING_STATUS_COLORS } from '@/constants/index.js'
import BuildingFormDialog from './components/BuildingFormDialog.vue'
import BuildingDetailDialog from './components/BuildingDetailDialog.vue'

// 搜索关键词
const searchKeyword = ref('')

// 加载状态
const loading = ref(false)

// 楼栋列表
const buildingList = ref([])

// 选中的行
const selectedIds = ref([])

// 分页信息
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

// 弹窗控制
const dialogVisible = ref(false)
const detailVisible = ref(false)
const isEdit = ref(false)
const currentBuilding = ref({})

/**
 * 获取楼栋列表
 */
const getBuildingList = async () => {
  try {
    loading.value = true
    const params = {
      page: pagination.page,
      page_size: pagination.pageSize,
      search: searchKeyword.value || undefined,
    }

    const response = await buildingAPI.getBuildingList(params)
    buildingList.value = response.data || []
    pagination.total = response.total || response.data?.length || 0
  } catch (error) {
    console.error('获取楼栋列表失败:', error)
  } finally {
    loading.value = false
  }
}

/**
 * 搜索
 */
const handleSearch = () => {
  pagination.page = 1
  getBuildingList()
}

/**
 * 新增楼栋
 */
const handleAdd = () => {
  currentBuilding.value = {}
  isEdit.value = false
  dialogVisible.value = true
}

/**
 * 编辑楼栋
 */
const handleEdit = (row) => {
  currentBuilding.value = { ...row }
  isEdit.value = true
  dialogVisible.value = true
}

/**
 * 查看楼栋详情
 */
const handleView = (row) => {
  currentBuilding.value = row
  detailVisible.value = true
}

/**
 * 删除楼栋
 */
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确认删除楼栋 "${row.building_name}" 吗？`, '删除确认', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await buildingAPI.deleteBuilding(row.id)
    ElMessage.success('删除成功')
    getBuildingList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除楼栋失败:', error)
    }
  }
}

/**
 * 批量删除
 */
const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请选择要删除的楼栋')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确认删除选中的 ${selectedIds.value.length} 个楼栋吗？`,
      '批量删除确认',
      {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )

    await buildingAPI.batchDeleteBuildings(selectedIds.value)
    ElMessage.success('批量删除成功')
    selectedIds.value = []
    getBuildingList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('批量删除失败:', error)
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
const handleSizeChange = (pageSize) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  getBuildingList()
}

/**
 * 当前页变化
 */
const handleCurrentChange = (page) => {
  pagination.page = page
  getBuildingList()
}

/**
 * 表单提交成功
 */
const handleFormSuccess = () => {
  dialogVisible.value = false
  getBuildingList()
}

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

// 组件挂载时获取数据
onMounted(() => {
  getBuildingList()
})
</script>

<style scoped>
.building-list-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
}

.page-header p {
  color: #666;
  margin: 0;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
}

.search-section {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-section {
  display: flex;
  gap: 12px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.el-table {
  border-radius: 8px;
  overflow: hidden;
}
</style>
