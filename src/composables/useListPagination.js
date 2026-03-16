import { ElMessage } from 'element-plus'

/**
 * 通用分页交互封装。
 * 统一处理：切换页码 / 切换页大小以及错误提示。
 */
export function useListPagination (options) {
  const {
    onPageChange,
    onPageSizeChange,
    pageErrorMessage = '切换页面失败',
    sizeErrorMessage = '切换页面大小失败',
  } = options

  const handleCurrentChange = async (page) => {
    try {
      await onPageChange(page)
    } catch (error) {
      if (pageErrorMessage) {
        ElMessage.error(pageErrorMessage)
      }
      throw error
    }
  }

  const handleSizeChange = async (pageSize) => {
    try {
      if (onPageSizeChange) {
        await onPageSizeChange(pageSize)
      } else {
        await onPageChange(1, pageSize)
      }
    } catch (error) {
      if (sizeErrorMessage) {
        ElMessage.error(sizeErrorMessage)
      }
      throw error
    }
  }

  return {
    handleCurrentChange,
    handleSizeChange,
  }
}
