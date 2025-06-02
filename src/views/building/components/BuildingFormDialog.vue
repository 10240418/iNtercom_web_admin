<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '编辑楼栋' : '新增楼栋'"
    width="600px"
    :before-close="handleClose"
  >
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
      <el-form-item label="楼栋名称" prop="building_name">
        <el-input v-model="formData.building_name" placeholder="请输入楼栋名称" maxlength="100" />
      </el-form-item>

      <el-form-item label="楼栋编码" prop="building_code">
        <el-input v-model="formData.building_code" placeholder="请输入楼栋编码" maxlength="50" />
        <div class="form-tip">楼栋编码必须唯一，建议使用数字或字母组合</div>
      </el-form-item>

      <el-form-item label="地址信息" prop="address">
        <el-input
          v-model="formData.address"
          type="textarea"
          :rows="3"
          placeholder="请输入楼栋详细地址"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio
            v-for="(label, value) in BUILDING_STATUS_LABELS"
            :key="value"
            :value="value"
            :label="value"
          >
            {{ label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitting">
          {{ isEdit ? '更新' : '创建' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { buildingAPI } from '@/api/building.js'
import { BUILDING_STATUS_LABELS } from '@/constants/index.js'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible', 'success'])

// 弹窗显示状态
const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
})

// 表单引用
const formRef = ref(null)

// 提交状态
const submitting = ref(false)

// 表单数据
const formData = reactive({
  building_name: '',
  building_code: '',
  address: '',
  status: 'active',
})

// 表单验证规则
const formRules = {
  building_name: [
    { required: true, message: '请输入楼栋名称', trigger: 'blur' },
    { min: 1, max: 100, message: '楼栋名称长度在 1 到 100 个字符', trigger: 'blur' },
  ],
  building_code: [
    { required: true, message: '请输入楼栋编码', trigger: 'blur' },
    { min: 1, max: 50, message: '楼栋编码长度在 1 到 50 个字符', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9\-_]+$/,
      message: '楼栋编码只能包含字母、数字、连字符和下划线',
      trigger: 'blur',
    },
  ],
  address: [
    { required: true, message: '请输入地址信息', trigger: 'blur' },
    { min: 1, max: 500, message: '地址信息长度在 1 到 500 个字符', trigger: 'blur' },
  ],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
}

/**
 * 监听表单数据变化
 */
watch(
  () => props.formData,
  (newData) => {
    if (newData) {
      Object.assign(formData, {
        building_name: newData.building_name || '',
        building_code: newData.building_code || '',
        address: newData.address || '',
        status: newData.status || 'active',
      })
    }
  },
  { immediate: true },
)

/**
 * 提交表单
 */
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    submitting.value = true

    const submitData = {
      building_name: formData.building_name,
      building_code: formData.building_code,
      address: formData.address,
      status: formData.status,
    }

    if (props.isEdit) {
      await buildingAPI.updateBuilding(props.formData.id, submitData)
      ElMessage.success('更新楼栋成功')
    } else {
      await buildingAPI.createBuilding(submitData)
      ElMessage.success('创建楼栋成功')
    }

    emit('success')
  } catch (error) {
    console.error('提交表单失败:', error)
  } finally {
    submitting.value = false
  }
}

/**
 * 关闭弹窗
 */
const handleClose = () => {
  formRef.value?.resetFields()
  emit('update:visible', false)
}
</script>

<style scoped>
.form-tip {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
