<template>
  <div class="building-list-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="header-content">
        <div class="title-section">
          <h1>
            <el-icon class="title-icon"><OfficeBuilding /></el-icon>
            楼栋管理
          </h1>
          <p>管理小区楼栋信息和关联关系，共 {{ buildingStore.buildingCount }} 个楼栋</p>
        </div>
        <div class="header-stats">
          <el-card class="stat-card" shadow="hover">
            <div class="stat-content">
              <el-icon class="stat-icon"><OfficeBuilding /></el-icon>
              <div class="stat-info">
                <span class="stat-number">{{ buildingStore.buildingCount }}</span>
                <span class="stat-label">楼栋总数</span>
              </div>
            </div>
          </el-card>
          <el-card class="stat-card active" shadow="hover">
            <div class="stat-content">
              <el-icon class="stat-icon"><Select /></el-icon>
              <div class="stat-info">
                <span class="stat-number">{{ buildingStore.activeBuildings.length }}</span>
                <span class="stat-label">活跃楼栋</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!-- 楼栋列表表格 -->
    <el-card class="table-card" shadow="never">
      <template #header>
        <span>楼栋列表</span>
      </template>

      <div v-if="buildingStore.loading" style="text-align: center; padding: 50px">
        <el-icon class="is-loading" style="font-size: 24px"><Loading /></el-icon>
        <p>正在加载楼栋数据...</p>
      </div>

      <el-table
        v-else-if="buildingStore.buildingList.length > 0"
        :data="buildingStore.buildingList"
        style="width: 100%"
        stripe
      >
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="building_name" label="楼栋名称" />
        <el-table-column prop="building_code" label="楼栋编码" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="created_at" label="创建时间" />
      </el-table>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <el-empty description="暂无楼栋数据">
          <el-button type="primary" @click="refreshData">获取楼栋数据</el-button>
        </el-empty>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { OfficeBuilding, Select, Loading } from '@element-plus/icons-vue'
import { useBuildingStore } from '@/stores/building.js'
import { buildingAPI } from '@/api/building.js'

// 使用 Pinia Store
const buildingStore = useBuildingStore()

/**
 * 刷新数据
 */
const refreshData = async () => {
  try {
    await buildingStore.fetchBuildingList()
    ElMessage.success('数据刷新成功')
  } catch (error) {
    ElMessage.error('数据刷新失败')
  }
}

// 组件挂载时获取数据
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
  color: #67c23a;
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
  background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
  color: white;
  min-width: 140px;
}

.stat-card.active {
  background: linear-gradient(135deg, #e6a23c 0%, #f0b90b 100%);
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

.table-card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
}
</style>
