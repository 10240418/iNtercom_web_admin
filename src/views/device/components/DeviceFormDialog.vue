<template>
  <el-dialog v-model="dialogVisible" title="设备表单" width="600px" class="app-dialog">
    <div class="device-dialog-placeholder">
      <div class="placeholder-card">
        <h3>设备表单待完善</h3>
        <p>当前已统一接入弹窗主题样式，后续补业务字段时会自动沿用这套配色。</p>
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
  formData: { type: Object, default: () => ({}) },
  isEdit: { type: Boolean, default: false },
})

const emit = defineEmits(['update:visible', 'success'])

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
