import api from './index.js'

/**
 * 认证相关API
 */
export const authAPI = {
  /**
   * 用户登录
   * @param {Object} data - 登录数据
   * @param {string} data.username - 用户名
   * @param {string} data.password - 密码
   * @returns {Promise} 登录响应
   */
  login(data) {
    return api.post('/auth/login', data)
  },

  /**
   * 退出登录
   * @returns {Promise} 登出响应
   */
  logout() {
    return api.post('/auth/logout')
  },

  /**
   * 刷新token
   * @returns {Promise} 刷新响应
   */
  refreshToken() {
    return api.post('/auth/refresh')
  },

  /**
   * 获取当前用户信息
   * @returns {Promise} 用户信息
   */
  getCurrentUser() {
    return api.get('/auth/me')
  },
}
