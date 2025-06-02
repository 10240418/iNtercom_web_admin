import { defineStore } from 'pinia'
import { authAPI } from '@/api/auth.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
    isLoggedIn: !!localStorage.getItem('token'),
  }),

  getters: {
    /**
     * 获取用户角色
     */
    userRole: (state) => state.userInfo.role || '',

    /**
     * 获取用户名
     */
    username: (state) => state.userInfo.username || '',

    /**
     * 检查是否为管理员
     */
    isAdmin: (state) => state.userInfo.role === 'admin',
  },

  actions: {
    /**
     * 登录
     * @param {Object} loginData - 登录数据
     * @param {string} loginData.username - 用户名
     * @param {string} loginData.password - 密码
     */
    async login(loginData) {
      try {
        const response = await authAPI.login(loginData)
        // 现在API返回完整响应结构，需要访问data字段
        const data = response.data

        this.token = data.token
        this.userInfo = {
          user_id: data.user_id,
          username: data.username,
          role: data.role,
          created_at: data.created_at,
        }
        this.isLoggedIn = true

        // 存储到localStorage
        localStorage.setItem('token', this.token)
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))

        return data
      } catch (error) {
        throw error
      }
    },

    /**
     * 登出
     */
    async logout() {
      try {
        await authAPI.logout()
      } catch (error) {
        console.error('登出请求失败:', error)
      } finally {
        // 清除状态和本地存储
        this.token = ''
        this.userInfo = {}
        this.isLoggedIn = false
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
      }
    },

    /**
     * 刷新token
     */
    async refreshToken() {
      try {
        const response = await authAPI.refreshToken()
        // 适配新的响应结构
        const data = response.data
        this.token = data.token
        localStorage.setItem('token', this.token)
        return data
      } catch (error) {
        // token刷新失败，清除登录状态
        this.logout()
        throw error
      }
    },

    /**
     * 获取当前用户信息
     */
    async getCurrentUser() {
      try {
        const response = await authAPI.getCurrentUser()
        // 适配新的响应结构
        const userInfo = response.data
        this.userInfo = userInfo
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        return userInfo
      } catch (error) {
        throw error
      }
    },

    /**
     * 检查登录状态
     */
    checkAuthStatus() {
      const token = localStorage.getItem('token')
      const userInfo = localStorage.getItem('userInfo')

      if (token && userInfo) {
        this.token = token
        this.userInfo = JSON.parse(userInfo)
        this.isLoggedIn = true
        return true
      }

      return false
    },
  },
})
