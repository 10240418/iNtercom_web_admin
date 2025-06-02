import api from './index.js'

/**
 * 楼栋管理API
 */
export const buildingAPI = {
  /**
   * 获取楼栋列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码，默认为1
   * @param {number} params.page_size - 每页条数，默认为10
   * @param {string} params.search - 搜索关键词(楼栋名称、编码等)
   * @returns {Promise} 楼栋列表
   */
  getBuildingList(params = {}) {
    return api.get('/buildings', { params })
  },

  /**
   * 获取楼栋详情
   * @param {number} id - 楼栋ID
   * @returns {Promise} 楼栋详情
   */
  getBuildingDetail(id) {
    return api.get(`/buildings/${id}`)
  },

  /**
   * 创建楼栋
   * @param {Object} data - 楼栋数据
   * @param {string} data.building_name - 楼栋名称
   * @param {string} data.building_code - 楼栋编码
   * @param {string} data.address - 地址信息
   * @param {string} data.status - 状态(active/inactive)
   * @returns {Promise} 创建结果
   */
  createBuilding(data) {
    return api.post('/buildings', data)
  },

  /**
   * 更新楼栋
   * @param {number} id - 楼栋ID
   * @param {Object} data - 更新数据
   * @param {string} data.building_name - 楼栋名称
   * @param {string} data.building_code - 楼栋编码
   * @param {string} data.address - 地址信息
   * @param {string} data.status - 状态(active/inactive)
   * @returns {Promise} 更新结果
   */
  updateBuilding(id, data) {
    return api.put(`/buildings/${id}`, data)
  },

  /**
   * 删除楼栋
   * @param {number} id - 楼栋ID
   * @returns {Promise} 删除结果
   */
  deleteBuilding(id) {
    return api.delete(`/buildings/${id}`)
  },

  /**
   * 批量删除楼栋
   * @param {number[]} ids - 楼栋ID数组
   * @returns {Promise} 删除结果
   */
  batchDeleteBuildings(ids) {
    return api.delete('/buildings/batch', { data: { ids } })
  },

  /**
   * 获取楼栋下的设备列表
   * @param {number} buildingId - 楼栋ID
   * @param {Object} params - 查询参数
   * @returns {Promise} 设备列表
   */
  getBuildingDevices(buildingId, params = {}) {
    return api.get(`/buildings/${buildingId}/devices`, { params })
  },

  /**
   * 获取楼栋下的住户列表
   * @param {number} buildingId - 楼栋ID
   * @param {Object} params - 查询参数
   * @returns {Promise} 住户列表
   */
  getBuildingHouseholds(buildingId, params = {}) {
    return api.get(`/buildings/${buildingId}/households`, { params })
  },
}
