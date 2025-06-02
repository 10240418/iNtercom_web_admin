import api from './index.js'

/**
 * 管理员管理API
 */
export const adminAPI = {
  /**
   * 获取管理员列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码，默认为1
   * @param {number} params.page_size - 每页条数，默认为10
   * @param {string} params.search - 搜索关键词(用户名、电话等)
   * @returns {Promise} 管理员列表
   */
  getAdminList(params = {}) {
    return api.get('/admin', { params })
  },

  /**
   * 获取管理员详情
   * @param {number} id - 管理员ID
   * @returns {Promise} 管理员详情
   */
  getAdminDetail(id) {
    return api.get(`/admin/${id}`)
  },

  /**
   * 创建管理员
   * @param {Object} data - 管理员数据
   * @param {string} data.username - 用户名
   * @param {string} data.email - 邮箱
   * @param {string} data.phone - 电话
   * @param {string} data.password - 密码
   * @returns {Promise} 创建结果
   */
  createAdmin(data) {
    return api.post('/admin', data)
  },

  /**
   * 更新管理员
   * @param {number} id - 管理员ID
   * @param {Object} data - 更新数据
   * @param {string} data.email - 邮箱
   * @param {string} data.phone - 电话
   * @param {string} data.password - 密码(可选)
   * @returns {Promise} 更新结果
   */
  updateAdmin(id, data) {
    return api.put(`/admin/${id}`, data)
  },

  /**
   * 删除管理员
   * @param {number} id - 管理员ID
   * @returns {Promise} 删除结果
   */
  deleteAdmin(id) {
    return api.delete(`/admin/${id}`)
  },

  /**
   * 批量删除管理员
   * @param {number[]} ids - 管理员ID数组
   * @returns {Promise} 删除结果
   */
  batchDeleteAdmins(ids) {
    return api.delete('/admin/batch', { data: { ids } })
  },
}
