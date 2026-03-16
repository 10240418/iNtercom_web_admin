import { defineStore } from 'pinia'
import { staffAPI } from '@/api/staff.js'

export const useStaffStore = defineStore('staff', {
  state: () => ({
    staffList: [],
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
    },
    loading: false,
  }),

  getters: {
    hasStaffs: (state) => state.staffList.length > 0,
  },

  actions: {
    async fetchStaffList(params = {}) {
      try {
        this.loading = true

        const queryParams = {
          page: params.page || this.pagination.page,
          page_size: params.pageSize || this.pagination.pageSize,
        }

        const response = await staffAPI.getStaffList(queryParams)
        const responseData = response.data

        this.staffList = Array.isArray(responseData.data) ? responseData.data : (responseData.data?.data || [])
        this.pagination = {
          page: responseData.page || 1,
          pageSize: responseData.page_size || 10,
          total: responseData.total || 0,
          totalPages: responseData.total_pages || 0,
        }

        return response
      } finally {
        this.loading = false
      }
    },

    async changePage(page, pageSize = null) {
      this.pagination.page = page
      if (pageSize) {
        this.pagination.pageSize = pageSize
      }
      return await this.fetchStaffList()
    },

    async createStaff(payload) {
      await staffAPI.createStaff(payload)
      await this.fetchStaffList()
    },

    async updateStaff(id, payload) {
      await staffAPI.updateStaff(id, payload)
      await this.fetchStaffList()
    },

    async deleteStaff(id) {
      await staffAPI.deleteStaff(id)
      await this.fetchStaffList()
    },

    async batchDeleteStaff(ids = []) {
      await Promise.all(ids.map((id) => staffAPI.deleteStaff(id)))
      await this.fetchStaffList()
    },
  },
})
