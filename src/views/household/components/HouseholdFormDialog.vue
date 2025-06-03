<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    :title="isEdit ? '编辑住户' : '新增住户'"
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
      <el-form-item label="住户号" prop="household_number">
        <el-input v-model="form.household_number" placeholder="请输入住户号" />
      </el-form-item>

      <el-form-item label="所属楼栋" prop="building_id">
        <el-select v-model="form.building_id" placeholder="请选择楼栋" style="width: 100%">
          <el-option
            v-for="building in buildingList"
            :key="building.id"
            :label="building.building_name"
            :value="building.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio value="active">正常</el-radio>
          <el-radio value="inactive">停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="loading">
          {{ isEdit ? '更新' : '创建' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useHouseholdStore } from '@/stores/household.js'
import { useBuildingStore } from '@/stores/building.js'

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
const buildingStore = useBuildingStore()
const formRef = ref()
const loading = ref(false)

// 表单数据
const form = reactive({
  household_number: '',
  building_id: '',
  status: 'active',
})

// 楼栋列表
const buildingList = computed(() => buildingStore.buildingList)

// 表单验证规则
const rules = {
  household_number: [
    { required: true, message: '请输入住户号', trigger: 'blur' },
    { min: 1, max: 50, message: '住户号长度在 1 到 50 个字符', trigger: 'blur' },
  ],
  building_id: [
    { required: true, message: '请选择楼栋', trigger: 'change' },
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' },
  ],
}

// 监听表单数据变化
watch(
  () => props.formData,
  (newData) => {
    if (newData && Object.keys(newData).length > 0) {
      Object.assign(form, {
        household_number: newData.household_number || '',
        building_id: newData.building_id || '',
        status: newData.status || 'active',
      })
    }
  },
  { immediate: true, deep: true }
)

// 重置表单
const resetForm = () => {
  Object.assign(form, {
    household_number: '',
    building_id: '',
    status: 'active',
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
      await householdStore.updateHousehold(props.formData.id, formData)
      ElMessage.success('住户更新成功')
    } else {
      await householdStore.createHousehold(formData)
      ElMessage.success('住户创建成功')
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
