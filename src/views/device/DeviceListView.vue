<template>
  <div class="device-list-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>设备管理</h1>
      <p>管理门禁设备信息、状态监控和关联配置</p>
    </div>

    <!-- 搜索和操作栏 -->
    <div class="toolbar">
      <div class="search-section">
        <el-select
          v-model="buildingFilter"
          placeholder="选择楼栋筛选"
          style="width: 200px; margin-right: 12px"
          clearable
          @change="handleSearch"
        >
          <el-option
            v-for="building in buildingOptions"
            :key="building.id"
            :label="building.building_name"
            :value="building.id"
          />
        </el-select>

        <el-input
          v-model="searchKeyword"
          placeholder="搜索设备名称、序列号、位置"
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
        <el-button type="primary" @click="handleAdd" :icon="Plus"> 新增设备 </el-button>
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

    <!-- 设备列表表格 -->
    <el-table
      v-loading="loading"
      :data="deviceList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />

      <el-table-column prop="id" label="ID" width="80" />

      <el-table-column prop="name" label="设备名称" min-width="120">
        <template #default="{ row }">
          <el-tag type="primary">{{ row.name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="serial_number" label="序列号" min-width="140">
        <template #default="{ row }">
          <el-tag>{{ row.serial_number }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="location" label="位置" min-width="120" />

      <el-table-column prop="building" label="所属楼栋" min-width="120">
        <template #default="{ row }">
          <el-tag v-if="row.building" type="info">
            {{ row.building.building_name }}
          </el-tag>
          <span v-else class="text-gray">未分配</span>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="设备状态" min-width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.status)">
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="updated_at" label="最后更新" min-width="170">
        <template #default="{ row }">
          {{ formatDateTime(row.updated_at) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" width="280">
        <template #default="{ row }">
          <el-button size="small" @click="handleView(row)" :icon="View"> 查看 </el-button>
          <el-button size="small" type="primary" @click="handleEdit(row)" :icon="Edit">
            编辑
          </el-button>
          <el-button size="small" type="warning" @click="handleHealthCheck(row)" :icon="Warning">
            检测
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
    <DeviceFormDialog
      v-model:visible="dialogVisible"
      :form-data="currentDevice"
      :is-edit="isEdit"
      @success="handleFormSuccess"
    />

    <!-- 详情弹窗 -->
    <DeviceDetailDialog v-model:visible="detailVisible" :device-data="currentDevice" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Delete, Edit, View, Warning } from '@element-plus/icons-vue'
import { deviceAPI } from '@/api/device.js'
import { buildingAPI } from '@/api/building.js'
import { formatDateTime } from '@/utils/index.js'
import { DEVICE_STATUS_LABELS, DEVICE_STATUS_COLORS } from '@/constants/index.js'
import DeviceFormDialog from './components/DeviceFormDialog.vue'
import DeviceDetailDialog from './components/DeviceDetailDialog.vue'

// 搜索关键词
const searchKeyword = ref('')
const buildingFilter = ref('')

// 加载状态
const loading = ref(false)

// 设备列表
const deviceList = ref([])

// 楼栋选项
const buildingOptions = ref([])

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

/**
 * 获取楼栋选项
 */
const getBuildingOptions = async () => {
  try {
    const response = await buildingAPI.getBuildingList({ page_size: 1000 })
    buildingOptions.value = response.data || []
  } catch (error) {
    console.error('获取楼栋选项失败:', error)
  }
}

/**
 * 获取设备列表
 */
const getDeviceList = async () => {
  try {
    loading.value = true
    const params = {
      page: pagination.page,
      page_size: pagination.pageSize,
      search: searchKeyword.value || undefined,
      building_id: buildingFilter.value || undefined,
    }

    const response = await deviceAPI.getDeviceList(params)
    deviceList.value = response.data || []
    pagination.total = response.total || response.data?.length || 0
  } catch (error) {
    console.error('获取设备列表失败:', error)
  } finally {
    loading.value = false
  }
}

/**
 * 搜索
 */
const handleSearch = () => {
  pagination.page = 1
  getDeviceList()
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
  try {
    await ElMessageBox.confirm(`确认对设备 "${row.name}" 执行健康检测吗？`, '健康检测确认', {
      confirmButtonText: '开始检测',
      cancelButtonText: '取消',
      type: 'warning',
    })

    const loading = ElMessage({
      message: '正在执行健康检测...',
      type: 'info',
      duration: 0,
    })

    await deviceAPI.healthCheck(row.id)
    loading.close()
    ElMessage.success('健康检测完成')
    getDeviceList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('健康检测失败:', error)
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
    getDeviceList()
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
    getDeviceList()
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
  getDeviceList()
}

/**
 * 当前页变化
 */
const handleCurrentChange = (page) => {
  pagination.page = page
  getDeviceList()
}

/**
 * 表单提交成功
 */
const handleFormSuccess = () => {
  dialogVisible.value = false
  getDeviceList()
}

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

// 组件挂载时获取数据
onMounted(() => {
  getBuildingOptions()
  getDeviceList()
})
</script>

<style scoped>
.device-list-container {
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

.text-gray {
  color: #999;
}
</style>
