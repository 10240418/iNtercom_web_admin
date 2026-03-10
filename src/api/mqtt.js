import api from './index.js'

/**
 * MQTT 通话测试 API
 */
export const mqttAPI = {
  initiateCall (data) {
    return api.post('/mqtt/call', data)
  },

  callerAction (data) {
    return api.post('/mqtt/controller/device', data)
  },

  calleeAction (data) {
    return api.post('/mqtt/controller/resident', data)
  },

  getSession (callId) {
    return api.get('/mqtt/session', { params: { call_id: callId } })
  },

  endSession (data) {
    return api.post('/mqtt/end-session', data)
  },

  publishDeviceStatus (data) {
    return api.post('/mqtt/device/status', data)
  },

  publishSystemMessage (data) {
    return api.post('/mqtt/system/message', data)
  },
}
