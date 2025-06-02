import api from './index.js'

/**
 * 设备管理API
 */
export const deviceAPI = {
  /**
   * 获取设备列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码，默认为1
   * @param {number} params.page_size - 每页条数，默认为10
   * @param {number} params.building_id - 楼栋ID(可选)
   * @param {string} params.search - 搜索关键词(设备名称、序列号等)
   * @returns {Promise} 设备列表
   */
  getDeviceList(params = {}) {
    return api.get('/devices', { params })
  },

  /**
   * 获取设备详情
   * @param {number} id - 设备ID
   * @returns {Promise} 设备详情
   */
  getDeviceDetail(id) {
    return api.get(`/devices/${id}`)
  },

  /**
   * 创建设备
   * @param {Object} data - 设备数据
   * @param {string} data.name - 设备名称
   * @param {string} data.serial_number - 序列号
   * @param {string} data.location - 位置
   * @param {number} data.building_id - 楼栋ID
   * @param {number} data.household_id - 住户ID(可选)
   * @returns {Promise} 创建结果
   */
  createDevice(data) {
    return api.post('/devices', data)
  },

  /**
   * 更新设备
   * @param {number} id - 设备ID
   * @param {Object} data - 更新数据
   * @param {string} data.name - 设备名称
   * @param {string} data.serial_number - 序列号
   * @param {string} data.location - 位置
   * @param {number} data.building_id - 楼栋ID
   * @param {number} data.household_id - 住户ID(可选)
   * @returns {Promise} 更新结果
   */
  updateDevice(id, data) {
    return api.put(`/devices/${id}`, data)
  },

  /**
   * 删除设备
   * @param {number} id - 设备ID
   * @returns {Promise} 删除结果
   */
  deleteDevice(id) {
    return api.delete(`/devices/${id}`)
  },

  /**
   * 获取设备状态
   * @param {number} id - 设备ID
   * @returns {Promise} 设备状态
   */
  getDeviceStatus(id) {
    return api.get(`/devices/${id}/status`)
  },

  /**
   * 设置设备楼栋关联
   * @param {number} id - 设备ID
   * @param {Object} data - 楼栋数据
   * @param {number} data.building_id - 楼栋ID
   * @returns {Promise} 关联结果
   */
  setDeviceBuilding(id, data) {
    return api.post(`/devices/${id}/building`, data)
  },

  /**
   * 获取设备关联的住户列表
   * @param {number} id - 设备ID
   * @returns {Promise} 住户列表
   */
  getDeviceHouseholds(id) {
    return api.get(`/devices/${id}/households`)
  },

  /**
   * 添加设备住户关联
   * @param {number} id - 设备ID
   * @param {Object} data - 住户数据
   * @param {number} data.household_id - 住户ID
   * @returns {Promise} 关联结果
   */
  addDeviceHousehold(id, data) {
    return api.post(`/devices/${id}/households`, data)
  },

  /**
   * 删除设备住户关联
   * @param {number} deviceId - 设备ID
   * @param {number} householdId - 住户ID
   * @returns {Promise} 删除结果
   */
  removeDeviceHousehold(deviceId, householdId) {
    return api.delete(`/devices/${deviceId}/households/${householdId}`)
  },

  /**
   * 清除设备所有住户关联
   * @param {number} id - 设备ID
   * @returns {Promise} 清除结果
   */
  clearDeviceHouseholds(id) {
    return api.delete(`/devices/${id}/households`)
  },

  /**
   * 健康检测
   * @param {number} id - 设备ID
   * @returns {Promise} 检测结果
   */
  healthCheck(id) {
    return api.post(`/devices/${id}/health-check`)
  },

  /**
   * 批量删除设备
   * @param {number[]} ids - 设备ID数组
   * @returns {Promise} 删除结果
   */
  batchDeleteDevices(ids) {
    return api.delete('/devices/batch', { data: { ids } })
  },
}
