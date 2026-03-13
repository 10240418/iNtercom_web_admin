import api from './index.js'

/**
 * 物业员工管理 API
 */
export const staffAPI = {
  /**
   * 获取物业员工列表
   */
  getStaffList(params = {}) {
    return api.get('/staffs', { params })
  },

  /**
   * 获取物业员工详情
   */
  getStaffDetail(id) {
    return api.get(`/staffs/${id}`)
  },

  /**
   * 创建物业员工
   */
  createStaff(data) {
    return api.post('/staffs', data)
  },

  /**
   * 更新物业员工
   */
  updateStaff(id, data) {
    return api.put(`/staffs/${id}`, data)
  },

  /**
   * 删除物业员工
   */
  deleteStaff(id) {
    return api.delete(`/staffs/${id}`)
  },
}
