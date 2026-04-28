import { defineStore } from 'pinia'
import { householdAPI, residentAPI } from '@/api/household.js'

export const useHouseholdStore = defineStore('household', {
  state: () => ({
    // 住户列表
    householdList: [],
    // 居民列表
    residentList: [],
    // 分页信息
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
    },
    // 居民分页信息
    residentPagination: {
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
    },
    // 加载状态
    loading: false,
    residentLoading: false,
    // 搜索关键词
    searchKeyword: '',
    residentSearchKeyword: '',
    // 当前编辑的住户
    currentHousehold: null,
    // 当前编辑的居民
    currentResident: null,
  }),

  getters: {
    /**
     * 获取住户总数
     */
    householdCount: (state) => state.pagination.total,

    /**
     * 获取居民总数
     */
    residentCount: (state) => state.residentPagination.total,

    /**
     * 是否有住户数据
     */
    hasHouseholds: (state) => state.householdList.length > 0,

    /**
     * 是否有居民数据
     */
    hasResidents: (state) => state.residentList.length > 0,

    /**
     * 获取活跃状态的住户
     */
    activeHouseholds: (state) =>
      state.householdList.filter((household) => household.status === 'active'),

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
     * 获取居民分页信息
     */
    residentPaginationInfo: (state) => ({
      page: state.residentPagination.page,
      pageSize: state.residentPagination.pageSize,
      total: state.residentPagination.total,
      totalPages: state.residentPagination.totalPages,
    }),
  },

  actions: {
    /**
     * 获取住户列表
     * @param {Object} params - 查询参数
     */
    async fetchHouseholdList(params = {}) {
      try {
        this.loading = true

        const queryParams = {
          page: params.page || this.pagination.page,
          page_size: params.pageSize || this.pagination.pageSize,
          search: params.search || this.searchKeyword || undefined,
          building_id: params.building_id || undefined,
        }

        const response = await householdAPI.getHouseholdList(queryParams)
        const responseData = response.data

        this.householdList = Array.isArray(responseData.data) ? responseData.data : (responseData.data?.data || [])

        // 更新分页信息
        this.pagination = {
          page: responseData.page || 1,
          pageSize: responseData.page_size || 10,
          total: responseData.total || 0,
          totalPages: responseData.total_pages || 0,
        }

        return response
      } catch (error) {
        console.error('获取住户列表失败:', error)
        this.householdList = []
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * 获取居民列表
     * @param {Object} params - 查询参数
     */
    async fetchResidentList(params = {}) {
      try {
        this.residentLoading = true

        const queryParams = {
          page: params.page || this.residentPagination.page,
          page_size: params.pageSize || this.residentPagination.pageSize,
          search: params.search || this.residentSearchKeyword || undefined,
          household_id: params.household_id || undefined,
        }

        const response = await residentAPI.getResidentList(queryParams)
        const responseData = response.data

        this.residentList = Array.isArray(responseData.data) ? responseData.data : (responseData.data?.data || [])

        // 更新居民分页信息
        this.residentPagination = {
          page: responseData.page || 1,
          pageSize: responseData.page_size || 10,
          total: responseData.total || 0,
          totalPages: responseData.total_pages || 0,
        }

        return response
      } catch (error) {
        console.error('获取居民列表失败:', error)
        this.residentList = []
        throw error
      } finally {
        this.residentLoading = false
      }
    },

    /**
     * 搜索住户
     * @param {string} keyword - 搜索关键词
     */
    async searchHouseholds(keyword = '') {
      this.searchKeyword = keyword
      this.pagination.page = 1
      return await this.fetchHouseholdList()
    },

    /**
     * 搜索居民
     * @param {string} keyword - 搜索关键词
     */
    async searchResidents(keyword = '') {
      this.residentSearchKeyword = keyword
      this.residentPagination.page = 1
      return await this.fetchResidentList()
    },

    /**
     * 住户分页变更
     * @param {number} page - 页码
     * @param {number} pageSize - 每页大小
     */
    async changeHouseholdPage(page, pageSize = null) {
      this.pagination.page = page
      if (pageSize) {
        this.pagination.pageSize = pageSize
      }
      return await this.fetchHouseholdList()
    },

    /**
     * 居民分页变更
     * @param {number} page - 页码
     * @param {number} pageSize - 每页大小
     */
    async changeResidentPage(page, pageSize = null) {
      this.residentPagination.page = page
      if (pageSize) {
        this.residentPagination.pageSize = pageSize
      }
      return await this.fetchResidentList()
    },

    /**
     * 创建住户
     * @param {Object} householdData - 住户数据
     */
    async createHousehold(householdData) {
      try {
        const response = await householdAPI.createHousehold(householdData)
        void this.fetchHouseholdList()
        return response
      } catch (error) {
        console.error('创建住户失败:', error)
        throw error
      }
    },

    /**
     * 更新住户
     * @param {number} id - 住户ID
     * @param {Object} householdData - 更新数据
     */
    async updateHousehold(id, householdData) {
      try {
        const response = await householdAPI.updateHousehold(id, householdData)
        void this.fetchHouseholdList()
        return response
      } catch (error) {
        console.error('更新住户失败:', error)
        throw error
      }
    },

    /**
     * 删除住户
     * @param {number} id - 住户ID
     */
    async deleteHousehold(id) {
      try {
        const response = await householdAPI.deleteHousehold(id)
        void this.fetchHouseholdList()
        return response
      } catch (error) {
        console.error('删除住户失败:', error)
        throw error
      }
    },

    /**
     * 创建居民
     * @param {Object} residentData - 居民数据
     */
    async createResident(residentData) {
      try {
        const response = await residentAPI.createResident(residentData)
        void this.fetchResidentList()
        return response
      } catch (error) {
        console.error('创建居民失败:', error)
        throw error
      }
    },

    /**
     * 更新居民
     * @param {number} id - 居民ID
     * @param {Object} residentData - 更新数据
     */
    async updateResident(id, residentData) {
      try {
        const response = await residentAPI.updateResident(id, residentData)
        void this.fetchResidentList()
        return response
      } catch (error) {
        console.error('更新居民失败:', error)
        throw error
      }
    },

    /**
     * 删除居民
     * @param {number} id - 居民ID
     */
    async deleteResident(id) {
      try {
        const response = await residentAPI.deleteResident(id)
        void this.fetchResidentList()
        return response
      } catch (error) {
        console.error('删除居民失败:', error)
        throw error
      }
    },

    /**
     * 获取住户详情
     * @param {number} id - 住户ID
     */
    async fetchHouseholdDetail(id) {
      try {
        const response = await householdAPI.getHouseholdDetail(id)
        return response.data
      } catch (error) {
        console.error('获取住户详情失败:', error)
        throw error
      }
    },

    /**
     * 获取居民详情
     * @param {number} id - 居民ID
     */
    async fetchResidentDetail(id) {
      try {
        const response = await residentAPI.getResidentDetail(id)
        return response.data
      } catch (error) {
        console.error('获取居民详情失败:', error)
        throw error
      }
    },

    /**
     * 获取住户关联的设备
     * @param {number} id - 住户ID
     */
    async fetchHouseholdDevices(id) {
      try {
        const response = await householdAPI.getHouseholdDevices(id)
        return response.data
      } catch (error) {
        console.error('获取住户设备失败:', error)
        throw error
      }
    },

    /**
     * 设置当前编辑的住户
     * @param {Object} household - 住户数据
     */
    setCurrentHousehold(household) {
      this.currentHousehold = household
    },

    /**
     * 设置当前编辑的居民
     * @param {Object} resident - 居民数据
     */
    setCurrentResident(resident) {
      this.currentResident = resident
    },

    /**
     * 清空当前编辑的住户
     */
    clearCurrentHousehold() {
      this.currentHousehold = null
    },

    /**
     * 清空当前编辑的居民
     */
    clearCurrentResident() {
      this.currentResident = null
    },

    /**
     * 重置store状态
     */
    resetState() {
      this.householdList = []
      this.residentList = []
      this.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
      }
      this.residentPagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
      }
      this.loading = false
      this.residentLoading = false
      this.searchKeyword = ''
      this.residentSearchKeyword = ''
      this.currentHousehold = null
      this.currentResident = null
    },
  },
})
