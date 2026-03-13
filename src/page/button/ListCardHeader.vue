<template>
  <div class="list-card-header">
    <span class="list-card-title">{{ title }}</span>

    <div class="list-card-right">
      <span v-if="summary" class="list-card-summary">{{ summary }}</span>

      <el-button
        v-if="showRefresh"
        type="text"
        :loading="refreshLoading"
        @click="$emit('refresh')"
      >
        {{ refreshLabel }}
      </el-button>

      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    default: '',
  },
  showRefresh: {
    type: Boolean,
    default: false,
  },
  refreshLoading: {
    type: Boolean,
    default: false,
  },
  refreshLabel: {
    type: String,
    default: '刷新',
  },
})

defineEmits(['refresh'])
</script>

<style scoped>
.list-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.list-card-title {
  font-weight: 600;
  color: var(--c-text-primary);
}

.list-card-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.list-card-summary {
  color: var(--c-text-secondary);
  font-size: 13px;
}
</style>
