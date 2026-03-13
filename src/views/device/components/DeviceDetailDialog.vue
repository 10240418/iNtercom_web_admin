<template>
  <el-dialog v-model="dialogVisible" title="设备详情" width="800px" class="app-dialog">
    <div class="device-dialog-placeholder">
      <div class="placeholder-card">
        <h3>设备详情待完善</h3>
        <p>弹窗外观已统一，当前组件仍是占位实现，后续可直接补充设备状态、序列号和关联信息。</p>
      </div>
    </div>
    <template #footer>
      <el-button class="app-button app-button-secondary" @click="$emit('update:visible', false)">关闭</el-button>
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

<style scoped>
.device-dialog-placeholder {
  padding: 8px 0;
}

.placeholder-card {
  border: 1px solid var(--c-border);
  border-radius: 18px;
  background: var(--c-page-bg);
  padding: 20px;
}

.placeholder-card h3 {
  margin: 0 0 8px;
  color: var(--c-text-primary);
  font-size: 16px;
}

.placeholder-card p {
  margin: 0;
  color: var(--c-text-secondary);
  line-height: 1.6;
}
</style>
