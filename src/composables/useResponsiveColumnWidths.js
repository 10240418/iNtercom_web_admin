import { computed, onBeforeUnmount, onMounted, ref, unref } from 'vue'

/**
 * 将百分比列宽配置按容器实时换算为像素宽度。
 * percentMap 形如: { name: { percent: 16, min: 120, max: 260 } }
 */
export const useResponsiveColumnWidths = (percentMap, defaultWidth = 1200) => {
  const tableContainerRef = ref(null)
  const containerWidth = ref(defaultWidth)
  let resizeObserver = null

  const updateContainerWidth = () => {
    const el = unref(tableContainerRef)
    if (!el) return
    const nextWidth = Number(el.clientWidth || el.offsetWidth || 0)
    if (nextWidth > 0) {
      containerWidth.value = nextWidth
    }
  }

  onMounted(() => {
    updateContainerWidth()
    const el = unref(tableContainerRef)
    if (!el || typeof ResizeObserver === 'undefined') return

    resizeObserver = new ResizeObserver(() => {
      updateContainerWidth()
    })
    resizeObserver.observe(el)
  })

  onBeforeUnmount(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  })

  const columnWidths = computed(() => {
    const widthMap = {}
    const baseWidth = containerWidth.value || defaultWidth

    Object.entries(percentMap).forEach(([key, config]) => {
      const percent = Number(config?.percent || 0)
      const min = Number(config?.min || 0)
      const max = config?.max != null ? Number(config.max) : null

      let px = Math.round((baseWidth * percent) / 100)
      if (min > 0) {
        px = Math.max(px, min)
      }
      if (max != null && !Number.isNaN(max)) {
        px = Math.min(px, max)
      }
      widthMap[key] = px
    })

    return widthMap
  })

  return {
    tableContainerRef,
    columnWidths,
  }
}
