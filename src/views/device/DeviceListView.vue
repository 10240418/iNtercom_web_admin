<template>
  <div class="device-list-container app-page">
    <div class="page-header app-page-header">
      <div class="header-content app-page-header-content">
        <div class="title-section app-page-heading">
          <h1>
            <el-icon class="title-icon app-title-icon">
              <Monitor />
            </el-icon>
            设备管理
          </h1>
          <p>管理门禁设备信息、状态监控和关联配置</p>
        </div>
      </div>
    </div>

    <div class="toolbar app-toolbar">
      <TableActionButtons
        add-label="新增设备"
        delete-label="批量删除"
        :selected-count="selectedIds.length"
        :add-icon="Plus"
        :delete-icon="Delete"
        @add="handleAdd"
        @batch-delete="handleBatchDelete"
      />
    </div>

    <el-card
      class="table-card app-table-card"
      shadow="never"
    >
      <template #header>
        <ListCardHeader
          title="设备列表"
          :summary="`共 ${pagination.total} 条记录`"
          :show-refresh="true"
          :refresh-loading="loading"
          @refresh="refreshDeviceList"
        />
      </template>

      <div ref="tableContainerRef">
        <el-table
          v-loading="loading"
          :data="deviceList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          table-layout="fixed"
          stripe
          :header-cell-style="{ background: 'var(--c-primary-bg)', color: 'var(--c-text-secondary)' }"
        >
          <el-table-column
            type="selection"
            :width="columnWidths.selection"
          />

          <el-table-column
            prop="id"
            label="ID"
            :width="columnWidths.id"
          />

          <el-table-column
            prop="name"
            label="设备名称"
            :min-width="columnWidths.name"
          >
            <template #default="{ row }">
              <el-tag type="primary">{{ row.name }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="serial_number"
            label="序列号"
            :min-width="columnWidths.serialNumber"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag>{{ row.serial_number }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="location"
            label="位置"
            :min-width="columnWidths.location"
            show-overflow-tooltip
          />

          <el-table-column
            prop="building"
            label="所属楼栋"
            :min-width="columnWidths.building"
          >
            <template #default="{ row }">
              <el-tag
                v-if="row.building"
                type="info"
              >
                {{ row.building.building_name }}
              </el-tag>
              <span
                v-else
                class="text-gray"
              >未分配</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="status"
            label="设备状态"
            :min-width="columnWidths.status"
          >
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.status)">
                {{ getStatusLabel(row.status) }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="updated_at"
            label="最后更新"
            :min-width="columnWidths.updatedAt"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              {{ formatDateTime(row.updated_at) }}
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            fixed="right"
            :width="columnWidths.actions"
          >
            <template #default="{ row }">
              <div class="table-op-buttons">
                <el-button
                  size="small"
                  @click="handleView(row)"
                  :icon="View"
                > 查看 </el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="handleEdit(row)"
                  :icon="Edit"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  type="warning"
                  @click="handleHealthCheck(row)"
                  :icon="Warning"
                >
                  检测
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(row)"
                  :icon="Delete"
                >
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <TablePagination
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.pageSize"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 新增/编辑弹窗 -->
    <DeviceFormDialog
      v-model:visible="dialogVisible"
      :form-data="currentDevice"
      :is-edit="isEdit"
      @success="handleFormSuccess"
    />

    <!-- 详情弹窗 -->
    <DeviceDetailDialog
      v-model:visible="detailVisible"
      :device-data="currentDevice"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Delete, Edit, View, Warning, Monitor } from '@element-plus/icons-vue'
import { deviceAPI } from '@/api/device.js'
import { formatDateTime } from '@/utils/index.js'
import { DEVICE_STATUS_LABELS, DEVICE_STATUS_COLORS } from '@/constants/index.js'
import { useListAutoRefresh } from '@/composables/useListAutoRefresh.js'
import { useListPagination } from '@/composables/useListPagination.js'
import { useResponsiveColumnWidths } from '@/composables/useResponsiveColumnWidths.js'
import { TableActionButtons, TablePagination } from '@/components/table'
import ListCardHeader from '@/page/button/ListCardHeader.vue'
import DeviceFormDialog from './components/DeviceFormDialog.vue'
import DeviceDetailDialog from './components/DeviceDetailDialog.vue'

// 加载状态
const loading = ref(false)

// 设备列表
const deviceList = ref([])

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
const currentDevice = ref({})

const columnWidthPercents = {
  selection: { percent: 4, min: 55 },
  id: { percent: 6, min: 80 },
  name: { percent: 12, min: 140 },
  serialNumber: { percent: 15, min: 170 },
  location: { percent: 12, min: 140 },
  building: { percent: 12, min: 140 },
  status: { percent: 10, min: 120 },
  updatedAt: { percent: 14, min: 180 },
  actions: { percent: 25, min: 360 },
}

const {
  tableContainerRef,
  columnWidths,
} = useResponsiveColumnWidths(columnWidthPercents)

/**
 * 获取设备列表
 */
const getDeviceList = async () => {
  try {
    loading.value = true
    const params = {
      page: pagination.page,
      page_size: pagination.pageSize,
    }

    const response = await deviceAPI.getDeviceList(params)
    deviceList.value = Array.isArray(response.data) ? response.data : (response.data?.data || [])
    pagination.total = response.data?.total || response.total || deviceList.value.length || 0
  } catch (error) {
    console.error('获取设备列表失败:', error)
    throw error
  } finally {
    loading.value = false
  }
}

/**
 * 新增设备
 */
const handleAdd = () => {
  currentDevice.value = {}
  isEdit.value = false
  dialogVisible.value = true
}

/**
 * 编辑设备
 */
const handleEdit = (row) => {
  currentDevice.value = { ...row }
  isEdit.value = true
  dialogVisible.value = true
}

/**
 * 查看设备详情
 */
const handleView = (row) => {
  currentDevice.value = row
  detailVisible.value = true
}

/**
 * 设备健康检测
 */
const handleHealthCheck = async (row) => {
  let loadingMessage = null
  try {
    await ElMessageBox.confirm(`确认对设备 "${row.name}" 执行健康检测吗？`, '健康检测确认', {
      confirmButtonText: '开始检测',
      cancelButtonText: '取消',
      type: 'warning',
    })

    loadingMessage = ElMessage({
      message: '正在执行健康检测...',
      type: 'info',
      duration: 0,
    })

    await deviceAPI.healthCheck(row.id)
    ElMessage.success('健康检测完成')
    await refreshDeviceList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('健康检测失败:', error)
      ElMessage.error('健康检测失败，请稍后重试')
    }
  } finally {
    if (loadingMessage) {
      loadingMessage.close()
    }
  }
}

/**
 * 删除设备
 */
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确认删除设备 "${row.name}" 吗？`, '删除确认', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await deviceAPI.deleteDevice(row.id)
    ElMessage.success('删除成功')
    await refreshDeviceList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除设备失败:', error)
    }
  }
}

/**
 * 批量删除
 */
const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请选择要删除的设备')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确认删除选中的 ${selectedIds.value.length} 个设备吗？`,
      '批量删除确认',
      {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )

    await deviceAPI.batchDeleteDevices(selectedIds.value)
    ElMessage.success('批量删除成功')
    selectedIds.value = []
    await refreshDeviceList()
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

const {
  handleSizeChange,
  handleCurrentChange,
} = useListPagination({
  onPageChange: async (page, pageSize) => {
    pagination.page = page
    if (pageSize) {
      pagination.pageSize = pageSize
    }
    await refreshDeviceList()
  },
  onPageSizeChange: async (pageSize) => {
    pagination.page = 1
    pagination.pageSize = pageSize
    await refreshDeviceList()
  },
  pageErrorMessage: '切换页面失败',
  sizeErrorMessage: '切换页面大小失败',
})

/**
 * 表单提交成功
 */
const handleFormSuccess = () => {
  dialogVisible.value = false
  void refreshDeviceList()
}

const { refresh: refreshDeviceList } = useListAutoRefresh({
  fetcher: getDeviceList,
  errorMessage: '刷新设备列表失败',
})

/**
 * 获取状态标签
 */
const getStatusLabel = (status) => {
  return DEVICE_STATUS_LABELS[status] || status
}

/**
 * 获取状态标签类型
 */
const getStatusTagType = (status) => {
  return DEVICE_STATUS_COLORS[status] || 'info'
}

</script>

<style scoped>
.device-list-container {
  padding: 24px;
}

.toolbar {
  margin-bottom: 20px;
}

.text-gray {
  color: var(--c-text-muted);
}

@media (max-width: 768px) {
  .device-list-container {
    padding: 16px;
  }
}
</style>
