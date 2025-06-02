import api from './index.js'

/**
 * RTC实时通话API
 */
export const rtcAPI = {
  /**
   * 发起视频通话
   * @param {Object} data - 通话数据
   * @param {string} data.device_id - 设备ID
   * @param {string} data.resident_id - 居民ID
   * @returns {Promise} 通话响应
   */
  startVideoCall(data) {
    return api.post('/api/rtc/call', data)
  },

  /**
   * 获取RTC Token
   * @param {Object} data - Token请求数据
   * @param {string} data.channel_id - 频道ID
   * @param {string} data.user_id - 用户ID
   * @returns {Promise} Token响应
   */
  getRTCToken(data) {
    return api.post('/api/rtc/token', data)
  },
}
