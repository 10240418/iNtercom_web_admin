import { defineStore } from 'pinia'
import { adminAPI } from '@/api/admin.js'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    // 管理员列表
    adminList: [],
    // 分页信息
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
    },
    // 加载状态
    loading: false,
    // 搜索关键词
    searchKeyword: '',
    // 当前编辑的管理员
    currentAdmin: null,
  }),

  getters: {
    /**
     * 获取管理员总数
     */
    adminCount: (state) => state.pagination.total,

    /**
     * 是否有管理员数据
     */
    hasAdmins: (state) => state.adminList.length > 0,

    /**
     * 获取分页信息
     */
    paginationInfo: (state) => ({
      page: state.pagination.page,
      pageSize: state.pagination.pageSize,
      total: state.pagination.total,
      totalPages: state.pagination.totalPages,
    }),
  },

  actions: {
    /**
     * 获取管理员列表
     * @param {Object} params - 查询参数
     */
    async fetchAdminList(params = {}) {
      try {
        console.log('AdminStore fetchAdminList开始')
        this.loading = true

        const queryParams = {
          page: params.page || this.pagination.page,
          page_size: params.pageSize || this.pagination.pageSize,
          search: params.search || this.searchKeyword || undefined,
        }

        console.log('请求参数:', queryParams)

        const response = await adminAPI.getAdminList(queryParams)
        console.log('API响应原始数据:', response)

        // 正确解析嵌套的数据结构
        const responseData = response.data
        console.log('解析后的responseData:', responseData)

        this.adminList = responseData.data || []
        console.log('设置adminList:', this.adminList)

        // 更新分页信息
        this.pagination = {
          page: responseData.page || 1,
          pageSize: responseData.page_size || 10,
          total: responseData.total || 0,
          totalPages: responseData.total_pages || 0,
        }

        console.log('更新分页信息:', this.pagination)

        return response
      } catch (error) {
        console.error('获取管理员列表失败:', error)
        console.error('错误详情:', {
          message: error.message,
          response: error.response,
          stack: error.stack,
        })
        this.adminList = []
        throw error
      } finally {
        this.loading = false
        console.log('AdminStore fetchAdminList完成，最终状态:', {
          adminList: this.adminList,
          adminCount: this.adminList.length,
          hasAdmins: this.adminList.length > 0,
        })
      }
    },

    /**
     * 搜索管理员
     * @param {string} keyword - 搜索关键词
     */
    async searchAdmins(keyword = '') {
      this.searchKeyword = keyword
      this.pagination.page = 1
      return await this.fetchAdminList()
    },

    /**
     * 分页变更
     * @param {number} page - 页码
     * @param {number} pageSize - 每页大小
     */
    async changePage(page, pageSize = null) {
      this.pagination.page = page
      if (pageSize) {
        this.pagination.pageSize = pageSize
      }
      return await this.fetchAdminList()
    },

    /**
     * 创建管理员
     * @param {Object} adminData - 管理员数据
     */
    async createAdmin(adminData) {
      try {
        const response = await adminAPI.createAdmin(adminData)
        // 重新获取列表
        await this.fetchAdminList()
        return response
      } catch (error) {
        console.error('创建管理员失败:', error)
        throw error
      }
    },

    /**
     * 更新管理员
     * @param {number} id - 管理员ID
     * @param {Object} adminData - 更新数据
     */
    async updateAdmin(id, adminData) {
      try {
        const response = await adminAPI.updateAdmin(id, adminData)
        // 重新获取列表
        await this.fetchAdminList()
        return response
      } catch (error) {
        console.error('更新管理员失败:', error)
        throw error
      }
    },

    /**
     * 删除管理员
     * @param {number} id - 管理员ID
     */
    async deleteAdmin(id) {
      try {
        const response = await adminAPI.deleteAdmin(id)
        // 重新获取列表
        await this.fetchAdminList()
        return response
      } catch (error) {
        console.error('删除管理员失败:', error)
        throw error
      }
    },

    /**
     * 批量删除管理员
     * @param {number[]} ids - 管理员ID数组
     */
    async batchDeleteAdmins(ids) {
      try {
        const response = await adminAPI.batchDeleteAdmins(ids)
        // 重新获取列表
        await this.fetchAdminList()
        return response
      } catch (error) {
        console.error('批量删除管理员失败:', error)
        throw error
      }
    },

    /**
     * 设置当前编辑的管理员
     * @param {Object} admin - 管理员数据
     */
    setCurrentAdmin(admin) {
      this.currentAdmin = admin
    },

    /**
     * 清空当前编辑的管理员
     */
    clearCurrentAdmin() {
      this.currentAdmin = null
    },

    /**
     * 重置store状态
     */
    resetState() {
      this.adminList = []
      this.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
      }
      this.loading = false
      this.searchKeyword = ''
      this.currentAdmin = null
    },
  },
})
