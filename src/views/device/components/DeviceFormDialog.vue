<template>
  <el-dialog v-model="dialogVisible" title="设备表单" width="600px">
    <div>设备表单组件 - 待实现</div>
    <template #footer>
      <el-button @click="$emit('update:visible', false)">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  formData: { type: Object, default: () => ({}) },
  isEdit: { type: Boolean, default: false },
})

const emit = defineEmits(['update:visible', 'success'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
})
</script>
