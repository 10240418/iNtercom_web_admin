<template>
  <div class="action-section">
    <el-button
      class="app-button app-button-primary"
      :icon="addIcon"
      @click="$emit('add')"
    >
      {{ addLabel }}
    </el-button>

    <slot name="extra" />

    <el-button
      class="app-button app-button-danger"
      :icon="deleteIcon"
      :disabled="disableDelete"
      @click="$emit('batch-delete')"
    >
      {{ computedDeleteLabel }}
    </el-button>

    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  addLabel: {
    type: String,
    default: '新增',
  },
  deleteLabel: {
    type: String,
    default: '批量删除',
  },
  selectedCount: {
    type: Number,
    default: 0,
  },
  showCount: {
    type: Boolean,
    default: true,
  },
  addIcon: {
    type: [Object, Function],
    default: undefined,
  },
  deleteIcon: {
    type: [Object, Function],
    default: undefined,
  },
})

defineEmits(['add', 'batch-delete'])

const disableDelete = computed(() => props.selectedCount <= 0)

const computedDeleteLabel = computed(() => {
  if (!props.showCount) {
    return props.deleteLabel
  }
  return `${props.deleteLabel} (${props.selectedCount})`
})
</script>
