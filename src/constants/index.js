/**
 * 设备状态枚举
 */
export const DEVICE_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  FAULT: 'fault',
}

/**
 * 设备状态标签
 */
export const DEVICE_STATUS_LABELS = {
  [DEVICE_STATUS.ONLINE]: '在线',
  [DEVICE_STATUS.OFFLINE]: '离线',
  [DEVICE_STATUS.FAULT]: '故障',
}

/**
 * 设备状态颜色
 */
export const DEVICE_STATUS_COLORS = {
  [DEVICE_STATUS.ONLINE]: 'success',
  [DEVICE_STATUS.OFFLINE]: 'danger',
  [DEVICE_STATUS.FAULT]: 'warning',
}

/**
 * 通话状态枚举
 */
export const CALL_STATUS = {
  ANSWERED: 'answered',
  MISSED: 'missed',
  TIMEOUT: 'timeout',
}

/**
 * 通话状态标签
 */
export const CALL_STATUS_LABELS = {
  [CALL_STATUS.ANSWERED]: '已接听',
  [CALL_STATUS.MISSED]: '未接听',
  [CALL_STATUS.TIMEOUT]: '超时',
}

/**
 * 用户角色枚举
 */
export const USER_ROLE = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
}

/**
 * 用户角色标签
 */
export const USER_ROLE_LABELS = {
  [USER_ROLE.ADMIN]: '超级管理员',
  [USER_ROLE.MANAGER]: '管理员',
  [USER_ROLE.OPERATOR]: '操作员',
}

/**
 * 通用状态枚举
 */
export const COMMON_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}

/**
 * 通用状态标签
 */
export const COMMON_STATUS_LABELS = {
  [COMMON_STATUS.ACTIVE]: '启用',
  [COMMON_STATUS.INACTIVE]: '禁用',
}

/**
 * 楼栋状态枚举
 */
export const BUILDING_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}

/**
 * 楼栋状态标签
 */
export const BUILDING_STATUS_LABELS = {
  [BUILDING_STATUS.ACTIVE]: '正常',
  [BUILDING_STATUS.INACTIVE]: '停用',
}

/**
 * 楼栋状态颜色
 */
export const BUILDING_STATUS_COLORS = {
  [BUILDING_STATUS.ACTIVE]: 'success',
  [BUILDING_STATUS.INACTIVE]: 'info',
}

/**
 * 分页默认配置
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 20, 50, 100],
}

/**
 * 日期格式
 */
export const DATE_FORMAT = {
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
}
