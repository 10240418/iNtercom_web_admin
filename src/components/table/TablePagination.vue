<template>
  <div class="pagination-container app-pagination-bar" :class="containerClass">
    <el-pagination
      v-model:current-page="innerCurrentPage"
      v-model:page-size="innerPageSize"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      :background="background"
      :hide-on-single-page="hideOnSinglePage"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100],
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  background: {
    type: Boolean,
    default: true,
  },
  hideOnSinglePage: {
    type: Boolean,
    default: false,
  },
  containerClass: {
    type: [String, Array, Object],
    default: '',
  },
})

const emit = defineEmits(['update:currentPage', 'update:pageSize', 'size-change', 'current-change'])

const innerCurrentPage = computed({
  get: () => props.currentPage,
  set: (value) => {
    emit('update:currentPage', value)
  },
})

const innerPageSize = computed({
  get: () => props.pageSize,
  set: (value) => {
    emit('update:pageSize', value)
  },
})

const onSizeChange = (value) => {
  emit('size-change', value)
}

const onCurrentChange = (value) => {
  emit('current-change', value)
}
</script>
