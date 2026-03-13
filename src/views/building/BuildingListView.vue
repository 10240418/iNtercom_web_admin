<template>
  <div class="building-list-container app-page">
    <div class="page-header app-page-header">
      <div class="header-content app-page-header-content">
        <div class="title-section app-page-heading">
          <h1>
            <el-icon class="title-icon app-title-icon"><OfficeBuilding /></el-icon>
            楼栋管理
          </h1>
          <p>管理小区楼栋信息和关联关系</p>
        </div>
      </div>
    </div>

    <div class="toolbar app-toolbar">
      <TableActionButtons
        add-label="新增楼栋"
        delete-label="批量删除"
        :selected-count="selectedIds.length"
        :add-icon="Plus"
        :delete-icon="Delete"
        @add="handleAddBuilding"
        @batch-delete="handleBatchDelete"
      />
    </div>

    <el-card class="table-card app-table-card" shadow="never">
      <template #header>
        <ListCardHeader
          title="楼栋列表"
          :summary="`共 ${buildingStore.pagination.total} 条记录`"
        />
      </template>

      <div v-if="buildingStore.loading" class="loading-container">
        <el-icon class="is-loading" style="font-size: 24px"><Loading /></el-icon>
        <p>正在加载楼栋数据...</p>
      </div>

      <el-table
        v-else-if="buildingStore.buildingList.length > 0"
        :data="buildingStore.buildingList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        table-layout="fixed"
        stripe
        :header-cell-style="{ background: 'var(--c-primary-bg)', color: 'var(--c-text-secondary)' }"
      >
        <el-table-column type="selection" width="56" />
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="building_name" label="楼栋名称" min-width="160" show-overflow-tooltip />
        <el-table-column prop="building_code" label="楼栋编码" min-width="140" show-overflow-tooltip />
        <el-table-column prop="address" label="地址" min-width="220" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row.status)">{{ getStatusLabel(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">
            {{ formatDateTime(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <div class="table-op-buttons">
              <el-button size="small" type="primary" plain @click="handleEditBuilding(row)">编辑</el-button>
              <el-button size="small" type="danger" plain @click="handleDeleteBuilding(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div v-else class="empty-state">
        <el-empty description="暂无楼栋数据">
          <el-button type="primary" @click="handleAddBuilding">新增第一个楼栋</el-button>
        </el-empty>
      </div>
    </el-card>

    <BuildingFormDialog
      v-model:visible="dialogVisible"
      :form-data="currentBuilding"
      :is-edit="isEdit"
      @success="handleFormSuccess"
    />

    <TablePagination
      v-if="buildingStore.hasBuildings"
      v-model:current-page="buildingStore.pagination.page"
      v-model:page-size="buildingStore.pagination.pageSize"
      :total="buildingStore.pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { OfficeBuilding, Loading, Plus, Delete } from '@element-plus/icons-vue'
import { useBuildingStore } from '@/stores/building.js'
import { formatDateTime } from '@/utils/index.js'
import { TableActionButtons, TablePagination } from '@/components/table'
import ListCardHeader from '@/page/button/ListCardHeader.vue'
import BuildingFormDialog from './components/BuildingFormDialog.vue'

const buildingStore = useBuildingStore()
const selectedIds = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const currentBuilding = ref({})

const getStatusLabel = (status) => (status === 'active' ? '启用' : '停用')

const getStatusTagType = (status) => (status === 'active' ? 'success' : 'info')

const handleSizeChange = async (pageSize) => {
  try {
    await buildingStore.changePage(1, pageSize)
  } catch (error) {
    ElMessage.error('更新分页失败')
  }
}

const handleCurrentChange = async (page) => {
  try {
    await buildingStore.changePage(page)
  } catch (error) {
    ElMessage.error('切换分页失败')
  }
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map((item) => item.id)
}

const handleAddBuilding = () => {
  currentBuilding.value = {}
  isEdit.value = false
  dialogVisible.value = true
}

const handleEditBuilding = (row) => {
  currentBuilding.value = { ...row }
  isEdit.value = true
  dialogVisible.value = true
}

const handleDeleteBuilding = async (row) => {
  try {
    await ElMessageBox.confirm(`确认删除楼栋 ${row.building_name} 吗？`, '删除确认', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await buildingStore.deleteBuilding(row.id)
    ElMessage.success('删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请选择要删除的楼栋')
    return
  }

  try {
    await ElMessageBox.confirm(`确认删除选中的 ${selectedIds.value.length} 个楼栋吗？`, '批量删除确认', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await buildingStore.batchDeleteBuildings(selectedIds.value)
    selectedIds.value = []
    ElMessage.success('批量删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('批量删除失败')
    }
  }
}

const handleFormSuccess = () => {
  dialogVisible.value = false
  buildingStore.fetchBuildingList()
}

onMounted(async () => {
  try {
    await buildingStore.fetchBuildingList()
  } catch (error) {
    ElMessage.error('获取楼栋列表失败')
  }
})
</script>

<style scoped>
.building-list-container {
  padding: 24px;
}

.toolbar {
  margin-bottom: 20px;
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

@media (max-width: 768px) {
  .building-list-container {
    padding: 16px;
  }
}
</style>
