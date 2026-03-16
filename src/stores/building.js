import { defineStore } from 'pinia'
import { buildingAPI } from '@/api/building.js'

export const useBuildingStore = defineStore('building', {
  state: () => ({
    // 楼栋列表
    buildingList: [],
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
    // 当前编辑的楼栋
    currentBuilding: null,
  }),

  getters: {
    /**
     * 获取楼栋总数
     */
    buildingCount: (state) => state.pagination.total,

    /**
     * 是否有楼栋数据
     */
    hasBuildings: (state) => state.buildingList.length > 0,

    /**
     * 获取分页信息
     */
    paginationInfo: (state) => ({
      page: state.pagination.page,
      pageSize: state.pagination.pageSize,
      total: state.pagination.total,
      totalPages: state.pagination.totalPages,
    }),

    /**
     * 获取活跃状态的楼栋
     */
    activeBuildings: (state) =>
      state.buildingList.filter((building) => building.status === 'active'),
  },

  actions: {
    /**
     * 获取楼栋列表
     * @param {Object} params - 查询参数
     */
    async fetchBuildingList(params = {}) {
      try {
        console.log('BuildingStore fetchBuildingList开始')
        this.loading = true

        const queryParams = {
          page: params.page || this.pagination.page,
          page_size: params.pageSize || this.pagination.pageSize,
          search: params.search || this.searchKeyword || undefined,
        }

        console.log('楼栋请求参数:', queryParams)

        const response = await buildingAPI.getBuildingList(queryParams)
        console.log('楼栋API响应原始数据:', response)

        // 正确解析嵌套的数据结构
        const responseData = response.data
        console.log('楼栋解析后的responseData:', responseData)

        this.buildingList = Array.isArray(responseData.data) ? responseData.data : (responseData.data?.data || [])
        console.log('设置buildingList:', this.buildingList)

        // 更新分页信息
        this.pagination = {
          page: responseData.page || 1,
          pageSize: responseData.page_size || 10,
          total: responseData.total || 0,
          totalPages: responseData.total_pages || 0,
        }

        console.log('楼栋更新分页信息:', this.pagination)

        return response
      } catch (error) {
        console.error('获取楼栋列表失败:', error)
        console.error('楼栋错误详情:', {
          message: error.message,
          response: error.response,
          stack: error.stack
        })
        this.buildingList = []
        throw error
      } finally {
        this.loading = false
        console.log('BuildingStore fetchBuildingList完成，最终状态:', {
          buildingList: this.buildingList,
          buildingCount: this.buildingList.length,
          hasBuildings: this.buildingList.length > 0
        })
      }
    },

    /**
     * 搜索楼栋
     * @param {string} keyword - 搜索关键词
     */
    async searchBuildings(keyword = '') {
      this.searchKeyword = keyword
      this.pagination.page = 1
      return await this.fetchBuildingList()
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
      return await this.fetchBuildingList()
    },

    /**
     * 创建楼栋
     * @param {Object} buildingData - 楼栋数据
     */
    async createBuilding(buildingData) {
      try {
        const response = await buildingAPI.createBuilding(buildingData)
        // 重新获取列表
        await this.fetchBuildingList()
        return response
      } catch (error) {
        console.error('创建楼栋失败:', error)
        throw error
      }
    },

    /**
     * 更新楼栋
     * @param {number} id - 楼栋ID
     * @param {Object} buildingData - 更新数据
     */
    async updateBuilding(id, buildingData) {
      try {
        const response = await buildingAPI.updateBuilding(id, buildingData)
        // 重新获取列表
        await this.fetchBuildingList()
        return response
      } catch (error) {
        console.error('更新楼栋失败:', error)
        throw error
      }
    },

    /**
     * 删除楼栋
     * @param {number} id - 楼栋ID
     */
    async deleteBuilding(id) {
      try {
        const response = await buildingAPI.deleteBuilding(id)
        // 重新获取列表
        await this.fetchBuildingList()
        return response
      } catch (error) {
        console.error('删除楼栋失败:', error)
        throw error
      }
    },

    /**
     * 批量删除楼栋
     * @param {number[]} ids - 楼栋ID数组
     */
    async batchDeleteBuildings(ids) {
      try {
        const response = await buildingAPI.batchDeleteBuildings(ids)
        // 重新获取列表
        await this.fetchBuildingList()
        return response
      } catch (error) {
        console.error('批量删除楼栋失败:', error)
        throw error
      }
    },

    /**
     * 获取楼栋详情
     * @param {number} id - 楼栋ID
     */
    async fetchBuildingDetail(id) {
      try {
        const response = await buildingAPI.getBuildingDetail(id)
        return response.data
      } catch (error) {
        console.error('获取楼栋详情失败:', error)
        throw error
      }
    },

    /**
     * 获取楼栋下的设备列表
     * @param {number} buildingId - 楼栋ID
     * @param {Object} params - 查询参数
     */
    async fetchBuildingDevices(buildingId, params = {}) {
      try {
        const response = await buildingAPI.getBuildingDevices(buildingId, params)
        return response.data
      } catch (error) {
        console.error('获取楼栋设备失败:', error)
        throw error
      }
    },

    /**
     * 获取楼栋下的住户列表
     * @param {number} buildingId - 楼栋ID
     * @param {Object} params - 查询参数
     */
    async fetchBuildingHouseholds(buildingId, params = {}) {
      try {
        const response = await buildingAPI.getBuildingHouseholds(buildingId, params)
        return response.data
      } catch (error) {
        console.error('获取楼栋住户失败:', error)
        throw error
      }
    },

    /**
     * 设置当前编辑的楼栋
     * @param {Object} building - 楼栋数据
     */
    setCurrentBuilding(building) {
      this.currentBuilding = building
    },

    /**
     * 清空当前编辑的楼栋
     */
    clearCurrentBuilding() {
      this.currentBuilding = null
    },

    /**
     * 重置store状态
     */
    resetState() {
      this.buildingList = []
      this.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
      }
      this.loading = false
      this.searchKeyword = ''
      this.currentBuilding = null
    },
  },
})
