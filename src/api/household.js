import api from './index.js'

/**
 * 住户管理API
 */
export const householdAPI = {
  /**
   * 获取所有户号
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.page_size - 每页条数
   * @param {string} params.search - 搜索关键词
   * @param {number} params.building_id - 楼栋ID筛选
   * @returns {Promise} 户号列表
   */
  getHouseholdList(params = {}) {
    return api.get('/households', { params })
  },

  /**
   * 获取户号详情
   * @param {number} id - 户号ID
   * @returns {Promise} 户号详情
   */
  getHouseholdDetail(id) {
    return api.get(`/households/${id}`)
  },

  /**
   * 创建户号
   * @param {Object} data - 户号数据
   * @param {string} data.household_number - 户号
   * @param {number} data.building_id - 楼栋ID
   * @param {string} data.status - 状态(active/inactive)
   * @returns {Promise} 创建结果
   */
  createHousehold(data) {
    return api.post('/households', data)
  },

  /**
   * 更新户号
   * @param {number} id - 户号ID
   * @param {Object} data - 更新数据
   * @returns {Promise} 更新结果
   */
  updateHousehold(id, data) {
    return api.put(`/households/${id}`, data)
  },

  /**
   * 删除户号
   * @param {number} id - 户号ID
   * @returns {Promise} 删除结果
   */
  deleteHousehold(id) {
    return api.delete(`/households/${id}`)
  },

  /**
   * 获取户号关联的设备
   * @param {number} id - 户号ID
   * @returns {Promise} 设备列表
   */
  getHouseholdDevices(id) {
    return api.get(`/households/${id}/devices`)
  },

  /**
   * 关联户号与设备
   * @param {number} id - 户号ID
   * @param {Object} data - 关联数据
   * @param {number} data.device_id - 设备ID
   * @returns {Promise} 关联结果
   */
  associateDevice(id, data) {
    return api.post(`/households/${id}/devices`, data)
  },

  /**
   * 解除户号与设备的关联
   * @param {number} householdId - 户号ID
   * @param {number} deviceId - 设备ID
   * @returns {Promise} 解除结果
   */
  disassociateDevice(householdId, deviceId) {
    return api.delete(`/households/${householdId}/devices/${deviceId}`)
  },
}

/**
 * 居民管理API
 */
export const residentAPI = {
  /**
   * 获取居民列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.page_size - 每页条数
   * @param {string} params.search - 搜索关键词
   * @param {number} params.household_id - 户号ID筛选
   * @returns {Promise} 居民列表
   */
  getResidentList(params = {}) {
    return api.get('/residents', { params })
  },

  /**
   * 获取居民详情
   * @param {number} id - 居民ID
   * @returns {Promise} 居民详情
   */
  getResidentDetail(id) {
    return api.get(`/residents/${id}`)
  },

  /**
   * 创建居民
   * @param {Object} data - 居民数据
   * @param {string} data.name - 姓名
   * @param {string} data.phone - 电话
   * @param {string} data.email - 邮箱
   * @param {number} data.household_id - 户号ID
   * @returns {Promise} 创建结果
   */
  createResident(data) {
    return api.post('/residents', data)
  },

  /**
   * 更新居民
   * @param {number} id - 居民ID
   * @param {Object} data - 更新数据
   * @returns {Promise} 更新结果
   */
  updateResident(id, data) {
    return api.put(`/residents/${id}`, data)
  },

  /**
   * 删除居民
   * @param {number} id - 居民ID
   * @returns {Promise} 删除结果
   */
  deleteResident(id) {
    return api.delete(`/residents/${id}`)
  },
}
