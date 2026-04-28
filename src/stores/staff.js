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
      const response = await staffAPI.createStaff(payload)
      void this.fetchStaffList()
      return response
    },

    async updateStaff(id, payload) {
      const response = await staffAPI.updateStaff(id, payload)
      void this.fetchStaffList()
      return response
    },

    async deleteStaff(id) {
      const response = await staffAPI.deleteStaff(id)
      void this.fetchStaffList()
      return response
    },

    async batchDeleteStaff(ids = []) {
      const response = await Promise.all(ids.map((id) => staffAPI.deleteStaff(id)))
      void this.fetchStaffList()
      return response
    },
  },
})
