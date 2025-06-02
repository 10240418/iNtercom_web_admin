import api from './index.js'

/**
 * 通话记录API
 */
export const callRecordAPI = {
  /**
   * 获取通话记录列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.page_size - 每页条数
   * @param {string} params.start_date - 开始日期
   * @param {string} params.end_date - 结束日期
   * @param {string} params.call_status - 通话状态
   * @returns {Promise} 通话记录列表
   */
  getCallRecordList(params = {}) {
    return api.get('/call_records', { params })
  },

  /**
   * 获取设备通话记录
   * @param {number} deviceId - 设备ID
   * @param {Object} params - 查询参数
   * @returns {Promise} 设备通话记录
   */
  getDeviceCallRecords(deviceId, params = {}) {
    return api.get(`/call_records/device/${deviceId}`, { params })
  },

  /**
   * 获取居民通话记录
   * @param {number} residentId - 居民ID
   * @param {Object} params - 查询参数
   * @returns {Promise} 居民通话记录
   */
  getResidentCallRecords(residentId, params = {}) {
    return api.get(`/call_records/resident/${residentId}`, { params })
  },

  /**
   * 通过CallID获取通话记录
   * @param {Object} params - 查询参数
   * @param {string} params.call_id - 通话ID
   * @returns {Promise} 通话记录
   */
  getCallRecordByCallId(params) {
    return api.get('/call_records/session', { params })
  },

  /**
   * 获取通话统计信息
   * @param {Object} params - 查询参数
   * @returns {Promise} 统计信息
   */
  getCallStatistics(params = {}) {
    return api.get('/call_records/statistics', { params })
  },

  /**
   * 获取通话记录详情
   * @param {number} id - 通话记录ID
   * @returns {Promise} 通话记录详情
   */
  getCallRecordDetail(id) {
    return api.get(`/call_records/${id}`)
  },

  /**
   * 提交通话反馈
   * @param {number} id - 通话记录ID
   * @param {Object} data - 反馈数据
   * @param {number} data.rating - 评分
   * @param {string} data.comment - 评论
   * @param {string} data.issues - 问题描述
   * @returns {Promise} 提交结果
   */
  submitCallFeedback(id, data) {
    return api.post(`/call_records/${id}/feedback`, data)
  },
}
