import api from './index.js'

/**
 * 设备管理API
 */
export const deviceAPI = {
  /**
   * 获取所有设备
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.page_size - 每页条数
   * @param {string} params.search - 搜索关键词
   * @param {number} params.building_id - 楼栋ID筛选
   * @param {string} params.status - 状态筛选
   * @returns {Promise} 设备列表
   */
  getDeviceList(params = {}) {
    return api.get('/devices', { params })
  },

  /**
   * 获取单个设备
   * @param {number} id - 设备ID
   * @returns {Promise} 设备详情
   */
  getDeviceDetail(id) {
    return api.get(`/devices/${id}`)
  },

  /**
   * 创建新设备
   * @param {Object} data - 设备数据
   * @param {string} data.name - 设备名称
   * @param {string} data.serial_number - 序列号
   * @param {string} data.location - 位置
   * @param {number} data.building_id - 楼栋ID
   * @param {number[]} data.household_ids - 关联户号ID数组
   * @param {number[]} data.staff_ids - 关联员工ID数组
   * @param {string} data.status - 状态
   * @returns {Promise} 创建结果
   */
  createDevice(data) {
    return api.post('/devices', data)
  },

  /**
   * 更新设备信息
   * @param {number} id - 设备ID
   * @param {Object} data - 更新数据
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
   * @returns {Promise} 设备状态信息
   */
  getDeviceStatus(id) {
    return api.get(`/devices/${id}/status`)
  },

  /**
   * 设备健康检测
   * @param {Object} data - 检测数据
   * @param {string} data.device_id - 设备ID
   * @returns {Promise} 检测结果
   */
  deviceHealthCheck(data) {
    return api.post('/device/status', data)
  },

  /**
   * 关联设备与楼栋
   * @param {number} id - 设备ID
   * @param {Object} data - 关联数据
   * @param {number} data.building_id - 楼栋ID
   * @returns {Promise} 关联结果
   */
  associateBuilding(id, data) {
    return api.post(`/devices/${id}/building`, data)
  },

  /**
   * 获取设备关联的户号
   * @param {number} id - 设备ID
   * @returns {Promise} 户号列表
   */
  getDeviceHouseholds(id) {
    return api.get(`/devices/${id}/households`)
  },

  /**
   * 关联设备与户号
   * @param {number} id - 设备ID
   * @param {Object} data - 关联数据
   * @param {number} data.household_id - 户号ID
   * @returns {Promise} 关联结果
   */
  associateHousehold(id, data) {
    return api.post(`/devices/${id}/households`, data)
  },

  /**
   * 解除设备与户号的关联
   * @param {number} deviceId - 设备ID
   * @param {number} householdId - 户号ID
   * @returns {Promise} 解除结果
   */
  disassociateHousehold(deviceId, householdId) {
    return api.delete(`/devices/${deviceId}/households/${householdId}`)
  },
}
