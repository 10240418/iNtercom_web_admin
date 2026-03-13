<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { deviceAPI } from '@/api/device.js'
import { householdAPI } from '@/api/household.js'
import { mqttAPI } from '@/api/mqtt.js'

const loading = ref(false)
const deviceOptions = ref([])
const householdOptions = ref([])
const logs = ref([])
const lastResponse = ref(null)
const sessionInfo = ref(null)

const form = reactive({
  deviceId: '',
  householdNumber: '',
  callId: '',
  callerAction: 'hangup',
  calleeAction: 'answered',
  actionReason: '',
})

const statusForm = reactive({
  online: true,
  battery: 88,
  firmwareVersion: '1.0.0',
})

const messageForm = reactive({
  type: 'notification',
  level: 'info',
  message: '测试消息：前端通话流程测试页发送',
})

const callerActions = [
  { label: '挂断 hangup', value: 'hangup' },
  { label: '取消 cancelled', value: 'cancelled' },
]

const calleeActions = [
  { label: '接听 answered', value: 'answered' },
  { label: '拒绝 rejected', value: 'rejected' },
  { label: '挂断 hangup', value: 'hangup' },
  { label: '超时 timeout', value: 'timeout' },
]

const mqttTopicHints = computed(() => {
  const deviceId = form.deviceId || '{device_id}'
  return [
    `calls/request/${deviceId}`,
    `devices/${deviceId}/calls/control`,
    `devices/${deviceId}/status`,
    'users/{user_id}/calls/incoming',
    'users/{user_id}/calls/control',
    `system/${messageForm.type || '{message_type}'}`,
  ]
})

const appendLog = (title, detail = '') => {
  logs.value.unshift({
    time: new Date().toLocaleString('zh-CN'),
    title,
    detail,
  })
}

const extractList = (payload) => {
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload)) return payload
  return []
}

const initOptions = async () => {
  loading.value = true
  try {
    const [deviceResp, householdResp] = await Promise.all([
      deviceAPI.getDeviceList({ page: 1, page_size: 200 }),
      householdAPI.getHouseholdList({ page: 1, page_size: 200 }),
    ])

    deviceOptions.value = extractList(deviceResp)
    householdOptions.value = extractList(householdResp)

    if (!form.deviceId && deviceOptions.value.length > 0) {
      form.deviceId = String(deviceOptions.value[0].id)
    }
    appendLog('初始化完成', '设备/户号下拉选项已加载')
  } catch (error) {
    console.error(error)
    ElMessage.error('初始化测试数据失败，请检查设备与户号数据')
    appendLog('初始化失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

const callPayload = computed(() => {
  const payload = {
    device_id: String(form.deviceId),
    timestamp: Date.now(),
  }
  if (form.householdNumber) payload.household_number = form.householdNumber
  return payload
})

const initiateCall = async () => {
  if (!form.deviceId) {
    ElMessage.warning('请先选择设备')
    return
  }
  loading.value = true
  try {
    const resp = await mqttAPI.initiateCall(callPayload.value)
    lastResponse.value = resp
    form.callId = resp?.data?.call_id || form.callId
    appendLog('发起通话成功', `call_id=${form.callId || 'N/A'}`)
    ElMessage.success('发起通话成功')
  } catch (error) {
    console.error(error)
    appendLog('发起通话失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

const fetchSession = async () => {
  if (!form.callId) {
    ElMessage.warning('请先输入或生成 call_id')
    return
  }
  loading.value = true
  try {
    const resp = await mqttAPI.getSession(form.callId)
    sessionInfo.value = resp?.data || null
    lastResponse.value = resp
    appendLog('获取会话成功', `status=${sessionInfo.value?.status || 'unknown'}`)
  } catch (error) {
    console.error(error)
    appendLog('获取会话失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

const postCallerAction = async () => {
  if (!form.callId) {
    ElMessage.warning('请先输入 call_id')
    return
  }
  loading.value = true
  try {
    const resp = await mqttAPI.callerAction({
      call_info: {
        call_id: form.callId,
        action: form.callerAction,
        reason: form.actionReason || undefined,
        timestamp: Date.now(),
      },
    })
    lastResponse.value = resp
    appendLog('呼叫方动作已发送', form.callerAction)
    ElMessage.success('呼叫方动作发送成功')
  } catch (error) {
    console.error(error)
    appendLog('呼叫方动作失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

const postCalleeAction = async () => {
  if (!form.callId) {
    ElMessage.warning('请先输入 call_id')
    return
  }
  loading.value = true
  try {
    const resp = await mqttAPI.calleeAction({
      call_info: {
        call_id: form.callId,
        action: form.calleeAction,
        reason: form.actionReason || undefined,
        timestamp: Date.now(),
      },
    })
    lastResponse.value = resp
    appendLog('被叫方动作已发送', form.calleeAction)
    ElMessage.success('被叫方动作发送成功')
  } catch (error) {
    console.error(error)
    appendLog('被叫方动作失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

const endSession = async () => {
  if (!form.callId) {
    ElMessage.warning('请先输入 call_id')
    return
  }
  loading.value = true
  try {
    const resp = await mqttAPI.endSession({ call_id: form.callId, reason: 'manual_test_end' })
    lastResponse.value = resp
    appendLog('结束会话成功', form.callId)
    ElMessage.success('结束会话成功')
  } catch (error) {
    console.error(error)
    appendLog('结束会话失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

const publishDeviceStatus = async () => {
  if (!form.deviceId) {
    ElMessage.warning('请先选择设备')
    return
  }
  loading.value = true
  try {
    const resp = await mqttAPI.publishDeviceStatus({
      device_id: String(form.deviceId),
      online: statusForm.online,
      battery: Number(statusForm.battery),
      properties: { firmware_version: statusForm.firmwareVersion },
    })
    lastResponse.value = resp
    appendLog('设备状态已发布', `online=${statusForm.online}, battery=${statusForm.battery}`)
    ElMessage.success('设备状态发布成功')
  } catch (error) {
    console.error(error)
    appendLog('设备状态发布失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

const publishSystemMessage = async () => {
  loading.value = true
  try {
    const resp = await mqttAPI.publishSystemMessage({
      type: messageForm.type,
      level: messageForm.level,
      message: messageForm.message,
      timestamp: Date.now(),
    })
    lastResponse.value = resp
    appendLog('系统消息已发布', `${messageForm.type}/${messageForm.level}`)
    ElMessage.success('系统消息发布成功')
  } catch (error) {
    console.error(error)
    appendLog('系统消息发布失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  initOptions()
})
</script>

<template>
  <div class="app-page space-y-5">
    <div class="app-surface p-5">
      <h2 class="app-panel-title text-lg">通话流程测试台</h2>
      <p class="mt-1 text-sm text-text-secondary">
        在页面内直接执行 MQTT 通话流程测试，无需切换 MQTTX 做基础流程验证。
      </p>
    </div>

    <div class="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <section class="space-y-5 xl:col-span-2">
        <div class="app-surface p-5">
          <h3 class="app-panel-title">测试参数</h3>
          <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <el-select
              v-model="form.deviceId"
              placeholder="选择设备"
              filterable
              clearable
            >
              <el-option
                v-for="item in deviceOptions"
                :key="item.id"
                :label="`${item.name} (#${item.id})`"
                :value="String(item.id)"
              />
            </el-select>

            <el-select
              v-model="form.householdNumber"
              placeholder="选择户号(可选)"
              filterable
              clearable
            >
              <el-option
                v-for="item in householdOptions"
                :key="item.id"
                :label="`${item.household_number} (#${item.id})`"
                :value="item.household_number"
              />
            </el-select>

            <el-input
              v-model="form.callId"
              placeholder="call_id（发起通话后自动回填）"
              clearable
            />
            <el-input
              v-model="form.actionReason"
              placeholder="动作原因（可选）"
              clearable
            />

            <el-select
              v-model="form.callerAction"
              placeholder="呼叫方动作"
            >
              <el-option
                v-for="item in callerActions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-select
              v-model="form.calleeAction"
              placeholder="被叫方动作"
            >
              <el-option
                v-for="item in calleeActions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div class="app-action-row">
            <el-button
              type="primary"
              class="app-button app-button-primary"
              :loading="loading"
              @click="initiateCall"
            >发起通话</el-button>
            <el-button
              class="app-button app-button-secondary"
              :loading="loading"
              @click="fetchSession"
            >查询会话</el-button>
            <el-button
              type="warning"
              class="app-button app-button-warning"
              :loading="loading"
              @click="postCallerAction"
            >呼叫方动作</el-button>
            <el-button
              type="warning"
              plain
              class="app-button app-button-ghost"
              :loading="loading"
              @click="postCalleeAction"
            >被叫方动作</el-button>
            <el-button
              type="danger"
              class="app-button app-button-danger"
              :loading="loading"
              @click="endSession"
            >结束会话</el-button>
          </div>
        </div>

        <div class="app-surface p-5">
          <h3 class="app-panel-title">通信信息卡片</h3>
          <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="app-inline-card">
              <p class="text-xs text-text-secondary">当前 call_id</p>
              <p class="mt-1 break-all font-mono text-sm text-text-primary">
                {{ form.callId || '-' }}</p>
            </div>
            <div class="app-inline-card">
              <p class="text-xs text-text-secondary">会话状态</p>
              <p class="mt-1 text-sm font-medium text-text-primary">
                {{ sessionInfo?.status || '-' }}</p>
            </div>
            <div class="app-inline-card md:col-span-2">
              <p class="text-xs text-text-secondary">MQTT 主题提示（用于核对流程）</p>
              <ul class="mt-2 space-y-1 font-mono text-xs text-text-primary">
                <li
                  v-for="topic in mqttTopicHints"
                  :key="topic"
                >{{ topic }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="app-surface p-5">
          <h3 class="app-panel-title">附加测试：设备状态与系统消息</h3>
          <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            <el-switch
              v-model="statusForm.online"
              inline-prompt
              active-text="在线"
              inactive-text="离线"
            />
            <el-input-number
              v-model="statusForm.battery"
              :min="0"
              :max="100"
              placeholder="电量"
            />
            <el-input
              v-model="statusForm.firmwareVersion"
              placeholder="固件版本"
            />
          </div>
          <div class="app-action-row mt-3">
            <el-button
              type="success"
              class="app-button app-button-success"
              :loading="loading"
              @click="publishDeviceStatus"
            >发布设备状态</el-button>
          </div>

          <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            <el-input
              v-model="messageForm.type"
              placeholder="消息类型"
            />
            <el-select
              v-model="messageForm.level"
              placeholder="级别"
            >
              <el-option
                label="info"
                value="info"
              />
              <el-option
                label="warning"
                value="warning"
              />
              <el-option
                label="error"
                value="error"
              />
            </el-select>
            <el-input
              v-model="messageForm.message"
              placeholder="消息内容"
            />
          </div>
          <div class="app-action-row mt-3">
            <el-button
              type="success"
              plain
              class="app-button app-button-ghost"
              :loading="loading"
              @click="publishSystemMessage"
            >发布系统消息</el-button>
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div class="app-surface p-5">
          <h3 class="app-panel-title">最后响应</h3>
          <pre
            class="app-code-block mt-3 max-h-80 overflow-auto"
          >{{
JSON.stringify(lastResponse, null, 2)
          }}</pre>
        </div>

        <div class="app-surface p-5">
          <h3 class="app-panel-title">操作日志</h3>
          <ul class="mt-3 max-h-80 space-y-2 overflow-auto">
            <li
              v-for="(item, idx) in logs"
              :key="`${item.time}-${idx}`"
              class="app-inline-card p-2"
            >
              <p class="text-xs text-text-secondary">{{ item.time }}</p>
              <p class="text-sm font-medium text-text-primary">{{ item.title }}</p>
              <p class="text-xs text-text-secondary">{{ item.detail }}</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
