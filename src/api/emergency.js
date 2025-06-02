import api from './index.js'

/**
 * 紧急功能API
 */
export const emergencyAPI = {
  /**
   * 触发紧急报警
   * @param {Object} data - 报警数据
   * @returns {Promise} 报警响应
   */
  triggerAlarm(data) {
    return api.post('/emergency/alarm', data)
  },

  /**
   * 获取紧急联系人
   * @returns {Promise} 联系人列表
   */
  getEmergencyContacts() {
    return api.get('/emergency/contacts')
  },

  /**
   * 通知所有用户
   * @param {Object} data - 通知数据
   * @param {string} data.title - 通知标题
   * @param {string} data.content - 通知内容
   * @param {string} data.target_type - 目标类型
   * @param {string} data.severity - 严重级别
   * @param {number} data.property_id - 物业ID
   * @param {boolean} data.is_public - 是否公开
   * @param {string} data.expires_at - 过期时间
   * @returns {Promise} 通知响应
   */
  notifyAllUsers(data) {
    return api.post('/emergency/notify-all', data)
  },

  /**
   * 紧急解锁所有门禁
   * @returns {Promise} 解锁响应
   */
  emergencyUnlockAll() {
    return api.post('/emergency/unlock-all')
  },
}
