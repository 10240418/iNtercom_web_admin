import { ref, onActivated, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

/**
 * 通用列表刷新逻辑封装。
 * 统一处理：手动刷新、页面挂载刷新、页面激活刷新、重复触发防抖。
 */
export function useListAutoRefresh (options) {
  const {
    fetcher,
    errorMessage = '刷新列表失败',
    autoOnMounted = true,
    autoOnActivated = true,
    shouldRefresh = () => true,
  } = options

  const refreshing = ref(false)

  const refresh = async () => {
    if (refreshing.value) return false
    if (!shouldRefresh()) return false

    try {
      refreshing.value = true
      await fetcher()
      return true
    } catch (error) {
      if (errorMessage) {
        ElMessage.error(errorMessage)
      }
      throw error
    } finally {
      refreshing.value = false
    }
  }

  if (autoOnMounted) {
    onMounted(() => {
      void refresh()
    })
  }

  if (autoOnActivated) {
    onActivated(() => {
      void refresh()
    })
  }

  return {
    refresh,
    refreshing,
  }
}
