<template>
  <el-dialog v-model="dialogVisible" title="设备详情" width="800px">
    <div>设备详情组件 - 待实现</div>
    <template #footer>
      <el-button @click="$emit('update:visible', false)">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  deviceData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['update:visible', 'edit'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
})
</script>
