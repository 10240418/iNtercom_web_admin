<script setup>
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { User, OfficeBuilding, Monitor, House, Phone, InfoFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user.js'

const router = useRouter()
const userStore = useUserStore()

const title = 'iLock设备管理端'

/**
 * 导航到指定页面
 */
const navigateTo = (path) => {
  router.push(path)
}

/**
 * 退出登录
 */
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确认退出登录吗？', '退出确认', {
      confirmButtonText: '确认退出',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await userStore.logout()
    ElMessage.success('已退出登录')
    router.push('/login')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('退出登录失败:', error)
    }
  }
}
</script>

<template>
  <div class="home-container">
    <div class="header">
      <h1>{{ title }}</h1>
      <div class="user-info">
        <span>欢迎，{{ userStore.username }}！</span>
        <el-button type="danger" size="small" @click="handleLogout"> 退出登录 </el-button>
      </div>
    </div>

    <div class="dashboard">
      <div class="quick-actions">
        <h2>快速操作</h2>
        <div class="action-cards">
          <el-card class="action-card" shadow="hover" @click="navigateTo('/admin/list')">
            <div class="card-content">
              <el-icon class="card-icon"><User /></el-icon>
              <h3>管理员管理</h3>
              <p>管理系统管理员账户</p>
            </div>
          </el-card>

          <el-card class="action-card" shadow="hover" @click="navigateTo('/building/list')">
            <div class="card-content">
              <el-icon class="card-icon"><OfficeBuilding /></el-icon>
              <h3>楼栋管理</h3>
              <p>管理小区楼栋信息</p>
            </div>
          </el-card>

          <el-card class="action-card" shadow="hover" @click="navigateTo('/device/list')">
            <div class="card-content">
              <el-icon class="card-icon"><Monitor /></el-icon>
              <h3>设备管理</h3>
              <p>管理门禁设备</p>
            </div>
          </el-card>

          <el-card class="action-card" shadow="hover" @click="navigateTo('/household/list')">
            <div class="card-content">
              <el-icon class="card-icon"><House /></el-icon>
              <h3>住户管理</h3>
              <p>管理住户信息</p>
            </div>
          </el-card>

          <el-card class="action-card" shadow="hover" @click="navigateTo('/call-record/list')">
            <div class="card-content">
              <el-icon class="card-icon"><Phone /></el-icon>
              <h3>通话记录</h3>
              <p>查看通话历史</p>
            </div>
          </el-card>

          <el-card class="action-card" shadow="hover" @click="navigateTo('/about')">
            <div class="card-content">
              <el-icon class="card-icon"><InfoFilled /></el-icon>
              <h3>关于系统</h3>
              <p>系统信息和帮助</p>
            </div>
          </el-card>
        </div>
      </div>

      <div class="stats-section">
        <h2>系统概览</h2>
        <div class="stats-cards">
          <el-card class="stat-card">
            <el-statistic title="管理员总数" :value="0" />
          </el-card>
          <el-card class="stat-card">
            <el-statistic title="楼栋总数" :value="0" />
          </el-card>
          <el-card class="stat-card">
            <el-statistic title="设备总数" :value="0" />
          </el-card>
          <el-card class="stat-card">
            <el-statistic title="住户总数" :value="0" />
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 20px;
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info span {
  color: #666;
  font-size: 14px;
}

.dashboard {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.quick-actions h2,
.stats-section h2 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0 0 20px 0;
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.action-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.action-card:hover {
  transform: translateY(-4px);
}

.card-content {
  text-align: center;
  padding: 20px;
}

.card-icon {
  font-size: 48px;
  color: #409eff;
  margin-bottom: 16px;
}

.card-content h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px 0;
}

.card-content p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  text-align: center;
}
</style>
