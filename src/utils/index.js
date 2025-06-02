import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/constants/index.js'

/**
 * 格式化日期时间
 * @param {string|Date} date - 日期
 * @param {string} format - 格式，默认为 YYYY-MM-DD HH:mm:ss
 * @returns {string} 格式化后的日期字符串
 */
export function formatDateTime(date, format = DATE_FORMAT.DATETIME) {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 格式化日期
 * @param {string|Date} date - 日期
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date) {
  return formatDateTime(date, DATE_FORMAT.DATE)
}

/**
 * 格式化时间
 * @param {string|Date} date - 日期
 * @returns {string} 格式化后的时间字符串
 */
export function formatTime(date) {
  return formatDateTime(date, DATE_FORMAT.TIME)
}

/**
 * 获取相对时间
 * @param {string|Date} date - 日期
 * @returns {string} 相对时间描述
 */
export function getRelativeTime(date) {
  if (!date) return ''
  const now = dayjs()
  const target = dayjs(date)
  const diffMinutes = now.diff(target, 'minutes')

  if (diffMinutes < 1) return '刚刚'
  if (diffMinutes < 60) return `${diffMinutes}分钟前`

  const diffHours = now.diff(target, 'hours')
  if (diffHours < 24) return `${diffHours}小时前`

  const diffDays = now.diff(target, 'days')
  if (diffDays < 7) return `${diffDays}天前`

  return formatDateTime(date)
}

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否有效
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证手机号格式
 * @param {string} phone - 手机号
 * @returns {boolean} 是否有效
 */
export function validatePhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 验证密码强度
 * @param {string} password - 密码
 * @returns {Object} 验证结果
 */
export function validatePassword(password) {
  const result = {
    isValid: false,
    strength: 0,
    messages: []
  }

  if (!password) {
    result.messages.push('密码不能为空')
    return result
  }

  if (password.length < 8) {
    result.messages.push('密码长度至少8位')
  } else {
    result.strength += 1
  }

  if (!/[a-z]/.test(password)) {
    result.messages.push('密码必须包含小写字母')
  } else {
    result.strength += 1
  }

  if (!/[A-Z]/.test(password)) {
    result.messages.push('密码必须包含大写字母')
  } else {
    result.strength += 1
  }

  if (!/\d/.test(password)) {
    result.messages.push('密码必须包含数字')
  } else {
    result.strength += 1
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.messages.push('密码必须包含特殊字符')
  } else {
    result.strength += 1
  }

  result.isValid = result.messages.length === 0
  return result
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function} 节流后的函数
 */
export function throttle(func, delay) {
  let lastExecTime = 0
  return function (...args) {
    const currentTime = Date.now()
    if (currentTime - lastExecTime >= delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    }
  }
}

/**
 * 深拷贝对象
 * @param {any} obj - 要拷贝的对象
 * @returns {any} 拷贝后的对象
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

/**
 * 生成随机字符串
 * @param {number} length - 字符串长度
 * @returns {string} 随机字符串
 */
export function generateRandomString(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
