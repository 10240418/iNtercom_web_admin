<template>
  <div class="staff-list-container app-page">
    <div class="page-header app-page-header">
      <div class="header-content app-page-header-content">
        <div class="title-section app-page-heading">
          <h1>
            <el-icon class="title-icon app-title-icon">
              <User />
            </el-icon>
            物业员工管理
          </h1>
          <p>统一管理员工账号与岗位信息</p>
        </div>
      </div>
    </div>

    <div class="toolbar app-toolbar">
      <TableActionButtons
        add-label="新增员工"
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
          title="员工列表"
          :summary="`共 ${staffStore.pagination.total} 条记录`"
          :show-refresh="true"
          :refresh-loading="staffStore.loading"
          @refresh="refreshStaffData"
        />
      </template>

      <el-table
        v-loading="staffStore.loading"
        :data="staffStore.staffList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        table-layout="fixed"
        stripe
        :header-cell-style="{ background: 'var(--c-primary-bg)', color: 'var(--c-text-secondary)' }"
      >
        <el-table-column
          type="selection"
          width="56"
        />

        <el-table-column
          prop="id"
          label="ID"
          width="80"
          align="center"
        />

        <el-table-column
          prop="username"
          label="用户名"
          min-width="160"
          show-overflow-tooltip
        >
          <template #default="{ row }">{{ row.username || '-' }}</template>
        </el-table-column>

        <el-table-column
          label="邮箱"
          min-width="160"
          show-overflow-tooltip
        >
          <template #default>--</template>
        </el-table-column>

        <el-table-column
          prop="phone"
          label="电话"
          min-width="160"
          show-overflow-tooltip
        />

        <el-table-column
          prop="role"
          label="角色"
          min-width="120"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <el-tag
              :type="getRoleTagType(row.role)">{{ getRoleLabel(row.role) }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="created_at"
          label="创建时间"
          min-width="180"
          show-overflow-tooltip
        >
          <template
            #default="{ row }">{{ formatDateTime(row.created_at) }}</template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="160"
          fixed="right"
        >
          <template #default="{ row }">
            <div class="table-op-buttons">
              <el-button
                size="small"
                type="primary"
                plain
                @click="handleEdit(row)"
              >编辑</el-button>
              <el-button
                size="small"
                type="danger"
                plain
                @click="handleDelete(row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div
        v-if="!staffStore.loading && !staffStore.hasStaffs"
        class="empty-state"
      >
        <el-empty description="暂无员工数据">
          <el-button
            type="primary"
            @click="handleAdd"
          >新增第一个员工</el-button>
        </el-empty>
      </div>
    </el-card>

    <TablePagination
      v-if="staffStore.hasStaffs"
      v-model:current-page="staffStore.pagination.page"
      v-model:page-size="staffStore.pagination.pageSize"
      :total="staffStore.pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑物业员工' : '新增物业员工'"
      width="620px"
      class="app-dialog"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="formData.username"
            maxlength="30"
            placeholder="请输入用户名"
          />
        </el-form-item>

        <el-form-item
          label="手机号"
          prop="phone"
        >
          <el-input
            v-model="formData.phone"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </el-form-item>

        <el-form-item
          label="角色"
          prop="role"
        >
          <el-select
            v-model="formData.role"
            style="width: 100%"
          >
            <el-option
              label="管理员"
              value="manager"
            />
            <el-option
              label="员工"
              value="staff"
            />
            <el-option
              label="安保"
              value="security"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="岗位"
          prop="position"
        >
          <el-input
            v-model="formData.position"
            maxlength="50"
            placeholder="如：客服 / 经理"
          />
        </el-form-item>

        <el-form-item
          label="小区名"
          prop="property_name"
        >
          <el-input
            v-model="formData.property_name"
            maxlength="100"
            placeholder="请输入物业名称"
          />
        </el-form-item>

        <el-form-item
          label="状态"
          prop="status"
        >
          <el-select
            v-model="formData.status"
            style="width: 100%"
          >
            <el-option
              label="启用"
              value="active"
            />
            <el-option
              label="停用"
              value="inactive"
            />
            <el-option
              label="暂停"
              value="suspended"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :label="isEdit ? '重置密码' : '密码'"
          prop="password"
        >
          <el-input
            v-model="formData.password"
            type="password"
            show-password
            :placeholder="isEdit ? '留空则不修改' : '请输入密码'"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button
          class="app-button app-button-secondary"
          @click="dialogVisible = false"
        >取消</el-button>
        <el-button
          class="app-button app-button-primary"
          :loading="submitting"
          @click="handleSubmit"
        >
          {{ isEdit ? '更新' : '创建' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { User, Plus, Delete } from '@element-plus/icons-vue'
import { formatDateTime } from '@/utils/index.js'
import { useStaffStore } from '@/stores/staff.js'
import { useListAutoRefresh } from '@/composables/useListAutoRefresh.js'
import { useListPagination } from '@/composables/useListPagination.js'
import { TableActionButtons, TablePagination } from '@/components/table'
import ListCardHeader from '@/page/button/ListCardHeader.vue'

const staffStore = useStaffStore()

const selectedIds = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const editingId = ref(null)
const formRef = ref(null)
const submitting = ref(false)

const formData = reactive({
  username: '',
  phone: '',
  role: 'staff',
  position: '',
  property_name: '',
  status: 'active',
  password: '',
})

const formRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  password: [
    {
      validator: (_rule, value, callback) => {
        if (!isEdit.value && !value) {
          callback(new Error('新增员工必须填写密码'))
          return
        }
        callback()
      },
      trigger: 'blur',
    },
  ],
}

const resetFormData = () => {
  formData.username = ''
  formData.phone = ''
  formData.role = 'staff'
  formData.position = ''
  formData.property_name = ''
  formData.status = 'active'
  formData.password = ''
}

const getRoleLabel = (role) => {
  const map = {
    manager: '管理员',
    staff: '员工',
    security: '安保',
  }
  return map[role] || role
}

const getRoleTagType = (role) => {
  const map = {
    manager: 'warning',
    staff: 'primary',
    security: 'success',
  }
  return map[role] || 'info'
}

const handleAdd = () => {
  isEdit.value = false
  editingId.value = null
  resetFormData()
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  editingId.value = row.id
  formData.username = row.username || ''
  formData.phone = row.phone || ''
  formData.role = row.role || 'staff'
  formData.position = row.position || ''
  formData.property_name = row.property_name || ''
  formData.status = row.status || 'active'
  formData.password = ''
  dialogVisible.value = true
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确认删除员工 ${row.username || row.id} 吗？`, '删除确认', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await staffStore.deleteStaff(row.id)
    ElMessage.success('删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请选择要删除的员工')
    return
  }

  try {
    await ElMessageBox.confirm(`确认删除选中的 ${selectedIds.value.length} 位员工吗？`, '批量删除确认', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await staffStore.batchDeleteStaff(selectedIds.value)
    selectedIds.value = []
    ElMessage.success('批量删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('批量删除失败')
    }
  }
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map((item) => item.id)
}

const {
  handleSizeChange,
  handleCurrentChange,
} = useListPagination({
  onPageChange: (page, pageSize) => staffStore.changePage(page, pageSize),
  pageErrorMessage: '切换页面失败',
  sizeErrorMessage: '切换页面大小失败',
})

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    submitting.value = true

    const payload = {
      username: formData.username,
      phone: formData.phone,
      role: formData.role,
      position: formData.position,
      property_name: formData.property_name,
      status: formData.status,
    }

    if (formData.password) {
      payload.password = formData.password
    }

    if (isEdit.value) {
      await staffStore.updateStaff(editingId.value, payload)
      ElMessage.success('更新成功')
    } else {
      await staffStore.createStaff(payload)
      ElMessage.success('创建成功')
    }

    dialogVisible.value = false
    await refreshStaffData()
  } catch (error) {
    if (error?.message) {
      ElMessage.error(error.message)
    }
  } finally {
    submitting.value = false
  }
}

const { refresh: refreshStaffData } = useListAutoRefresh({
  fetcher: () => staffStore.fetchStaffList(),
  errorMessage: '刷新员工列表失败',
})
</script>

<style scoped>
.staff-list-container {
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
  .staff-list-container {
    padding: 16px;
  }
}
</style>
