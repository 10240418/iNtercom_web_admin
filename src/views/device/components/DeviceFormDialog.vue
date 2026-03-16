<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="emit('update:visible', $event)"
    :title="isEdit ? '编辑设备' : '新增设备'"
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
      <el-form-item
        label="设备名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="请输入设备名称"
        />
      </el-form-item>

      <el-form-item
        label="设备序列号"
        prop="serial_number"
      >
        <el-input
          v-model="form.serial_number"
          placeholder="请输入设备序列号"
        />
      </el-form-item>

      <el-form-item
        label="所属楼栋"
        prop="building_id"
      >
        <el-select
          v-model="form.building_id"
          placeholder="请选择楼栋"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="building in buildingList"
            :key="building.id"
            :label="building.building_name"
            :value="building.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="位置"
        prop="location"
      >
        <el-input
          v-model="form.location"
          placeholder="例如：1栋1单元门口"
        />
      </el-form-item>

      <el-form-item
        label="状态"
        prop="status"
      >
        <el-radio-group v-model="form.status">
          <el-radio value="online">在线</el-radio>
          <el-radio value="offline">离线</el-radio>
          <el-radio value="fault">故障</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button
        class="app-button app-button-secondary"
        @click="handleClose"
      >取消</el-button>
      <el-button
        class="app-button app-button-primary"
        :loading="loading"
        @click="handleSubmit"
      >
        {{ isEdit ? '更新' : '创建' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { deviceAPI } from '@/api/device.js'
import { buildingAPI } from '@/api/building.js'

const props = defineProps({
  visible: { type: Boolean, default: false },
  formData: { type: Object, default: () => ({}) },
  isEdit: { type: Boolean, default: false },
})

const emit = defineEmits(['update:visible', 'success'])

const formRef = ref()
const loading = ref(false)
const buildingList = ref([])

const form = reactive({
  name: '',
  serial_number: '',
  building_id: undefined,
  location: '',
  status: 'offline',
})

const rules = {
  name: [
    { required: true, message: '请输入设备名称', trigger: 'blur' },
    { min: 1, max: 50, message: '设备名称长度在 1 到 50 个字符', trigger: 'blur' },
  ],
  serial_number: [
    { required: true, message: '请输入设备序列号', trigger: 'blur' },
    { min: 1, max: 50, message: '设备序列号长度在 1 到 50 个字符', trigger: 'blur' },
  ],
  status: [
    { required: true, message: '请选择设备状态', trigger: 'change' },
  ],
}

const parseBuildingData = (response) => {
  const payload = response?.data
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

const loadBuildingList = async () => {
  try {
    const response = await buildingAPI.getBuildingList({ page: 1, page_size: 200 })
    buildingList.value = parseBuildingData(response)
  } catch (error) {
    buildingList.value = []
    console.error('获取楼栋列表失败:', error)
  }
}

const resetForm = () => {
  Object.assign(form, {
    name: '',
    serial_number: '',
    building_id: undefined,
    location: '',
    status: 'offline',
  })
  formRef.value?.clearValidate()
}

watch(
  () => props.visible,
  (visible) => {
    if (!visible) {
      resetForm()
    }
  },
)

watch(
  () => props.formData,
  (data) => {
    if (!props.visible) return

    if (data && Object.keys(data).length > 0) {
      Object.assign(form, {
        name: data.name || '',
        serial_number: data.serial_number || '',
        building_id: data.building_id || undefined,
        location: data.location || '',
        status: data.status || 'offline',
      })
    } else {
      resetForm()
    }
  },
  { deep: true, immediate: true },
)

const handleClose = () => {
  resetForm()
  emit('update:visible', false)
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    loading.value = true

    const payload = {
      name: form.name.trim(),
      serial_number: form.serial_number.trim(),
      status: form.status,
      location: form.location?.trim() || '',
      building_id: form.building_id || 0,
    }

    if (props.isEdit && props.formData?.id) {
      await deviceAPI.updateDevice(props.formData.id, payload)
      ElMessage.success('设备更新成功')
    } else {
      await deviceAPI.createDevice(payload)
      ElMessage.success('设备创建成功')
    }

    emit('success')
    handleClose()
  } catch (error) {
    if (error?.message) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error(props.isEdit ? '设备更新失败' : '设备创建失败')
    }
    console.error('设备表单提交失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBuildingList()
})
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
