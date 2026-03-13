<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    :title="isEdit ? '编辑居民' : '新增居民'"
    class="app-dialog"
    width="600px"
    :before-close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="所属住户" prop="household_id">
        <el-select v-model="form.household_id" placeholder="请选择住户" style="width: 100%">
          <el-option
            v-for="household in householdList"
            :key="household.id"
            :label="household.household_number"
            :value="household.id"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button class="app-button app-button-secondary" @click="handleClose">取消</el-button>
      <el-button class="app-button app-button-primary" @click="handleSubmit" :loading="loading">
        {{ isEdit ? '更新' : '创建' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useHouseholdStore } from '@/stores/household.js'

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

const householdStore = useHouseholdStore()
const formRef = ref()
const loading = ref(false)

// 表单数据
const form = reactive({
  name: '',
  phone: '',
  email: '',
  household_id: '',
})

// 住户列表
const householdList = computed(() => householdStore.householdList)

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 1, max: 50, message: '姓名长度在 1 到 50 个字符', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  household_id: [
    { required: true, message: '请选择住户', trigger: 'change' },
  ],
}

// 监听表单数据变化
watch(
  () => props.formData,
  (newData) => {
    if (newData && Object.keys(newData).length > 0) {
      Object.assign(form, {
        name: newData.name || '',
        phone: newData.phone || '',
        email: newData.email || '',
        household_id: newData.household_id || '',
      })
    }
  },
  { immediate: true, deep: true }
)

// 重置表单
const resetForm = () => {
  Object.assign(form, {
    name: '',
    phone: '',
    email: '',
    household_id: '',
  })
  formRef.value?.clearValidate()
}

// 处理关闭
const handleClose = () => {
  resetForm()
  emit('update:visible', false)
}

// 处理提交
const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    loading.value = true

    const formData = { ...form }

    if (props.isEdit) {
      await householdStore.updateResident(props.formData.id, formData)
      ElMessage.success('居民更新成功')
    } else {
      await householdStore.createResident(formData)
      ElMessage.success('居民创建成功')
    }

    emit('success')
    handleClose()
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error(props.isEdit ? '更新失败' : '创建失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
