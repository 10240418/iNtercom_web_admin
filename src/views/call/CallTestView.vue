<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { buildingAPI } from '@/api/building.js'
import { deviceAPI } from '@/api/device.js'
import { householdAPI } from '@/api/household.js'
import { mqttAPI } from '@/api/mqtt.js'

const loading = ref(false)
const deviceOptions = ref([])
const allHouseholdOptions = ref([])
const householdOptions = ref([])
const logs = ref([])
const initiateResponse = ref(null)
const callerResponse = ref(null)
const calleeResponse = ref(null)
const sessionInfo = ref(null)

const form = reactive({
  deviceId: '',
  householdNumber: '',
  callId: '',
})

const callerActions = [
  { label: '挂断', value: 'hangup' },
  { label: '取消', value: 'cancelled' },
]

const calleeActions = [
  { label: '接听', value: 'answered' },
  { label: '拒绝', value: 'rejected' },
  { label: '挂断', value: 'hangup' },
  { label: '超时', value: 'timeout' },
]

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

const ensureHouseholdSelectionValid = () => {
  if (!form.householdNumber) return
  const exists = householdOptions.value.some((item) => item.household_number === form.householdNumber)
  if (!exists) {
    form.householdNumber = ''
  }
}

const getSelectedDevice = (deviceId) => deviceOptions.value.find((item) => String(item.id) === String(deviceId))

const getSelectedDeviceBuildingID = (deviceId) => {
  const device = getSelectedDevice(deviceId)
  if (!device) return ''
  return String(device.building_id || device.building?.id || '').trim()
}

const loadHouseholdsByDevice = async (deviceId) => {
  if (!deviceId) {
    householdOptions.value = [...allHouseholdOptions.value]
    ensureHouseholdSelectionValid()
    return
  }

  try {
    const buildingID = getSelectedDeviceBuildingID(deviceId)

    if (buildingID) {
      const resp = await buildingAPI.getBuildingHouseholds(buildingID)
      const list = extractList(resp)
      if (list.length > 0) {
        householdOptions.value = list
        ensureHouseholdSelectionValid()
        return
      }
    }

    const deviceResp = await deviceAPI.getDeviceHouseholds(deviceId)
    const deviceHouseholds = extractList(deviceResp)
    householdOptions.value = deviceHouseholds.length > 0 ? deviceHouseholds : [...allHouseholdOptions.value]
    ensureHouseholdSelectionValid()
  } catch (error) {
    console.error(error)
    householdOptions.value = [...allHouseholdOptions.value]
    ensureHouseholdSelectionValid()
    appendLog('设备户号加载失败', '按楼栋加载失败，已回退到全部户号')
  }
}

const currentCallId = computed(() => form.callId || sessionInfo.value?.call_id || '')

const requireCallId = () => {
  if (!currentCallId.value) {
    ElMessage.warning('请先发起通话，系统会自动生成 call_id')
    return ''
  }
  if (!form.callId) {
    form.callId = currentCallId.value
  }
  return currentCallId.value
}

const copyCallId = async () => {
  const callId = currentCallId.value
  if (!callId) {
    ElMessage.warning('当前没有可复制的 call_id')
    return
  }

  try {
    await navigator.clipboard.writeText(callId)
    ElMessage.success('call_id 已复制')
  } catch (error) {
    console.error(error)
    ElMessage.error('复制失败，请手动复制')
  }
}

const initOptions = async () => {
  loading.value = true
  try {
    const [deviceResp, householdResp] = await Promise.all([
      deviceAPI.getDeviceList({ page: 1, page_size: 200 }),
      householdAPI.getHouseholdList({ page: 1, page_size: 200 }),
    ])

    deviceOptions.value = extractList(deviceResp)
    allHouseholdOptions.value = extractList(householdResp)
    householdOptions.value = [...allHouseholdOptions.value]

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
    initiateResponse.value = resp
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
  const callId = requireCallId()
  if (!callId) return

  loading.value = true
  try {
    const resp = await mqttAPI.getSession(callId)
    sessionInfo.value = resp?.data || null
    appendLog('获取会话成功', `status=${sessionInfo.value?.status || 'unknown'}`)
  } catch (error) {
    console.error(error)
    appendLog('获取会话失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

const postCallerAction = async (action) => {
  const callId = requireCallId()
  if (!callId) return

  loading.value = true
  try {
    const resp = await mqttAPI.callerAction({
      call_id: callId,
      action,
      timestamp: Date.now(),
    })
    callerResponse.value = {
      action,
      response: resp,
    }
    appendLog('呼叫方动作已发送', action)
    ElMessage.success('呼叫方动作发送成功')
  } catch (error) {
    console.error(error)
    appendLog('呼叫方动作失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

const postCalleeAction = async (action) => {
  const callId = requireCallId()
  if (!callId) return

  loading.value = true
  try {
    const resp = await mqttAPI.calleeAction({
      call_id: callId,
      action,
      timestamp: Date.now(),
    })
    calleeResponse.value = {
      action,
      response: resp,
    }
    appendLog('被叫方动作已发送', action)
    ElMessage.success('被叫方动作发送成功')
  } catch (error) {
    console.error(error)
    appendLog('被叫方动作失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

const endSession = async () => {
  const callId = requireCallId()
  if (!callId) return

  loading.value = true
  try {
    const resp = await mqttAPI.endSession({ call_id: callId, reason: 'manual_test_end' })
    calleeResponse.value = {
      action: 'end_session',
      response: resp,
    }
    appendLog('结束会话成功', callId)
    ElMessage.success('结束会话成功')
  } catch (error) {
    console.error(error)
    appendLog('结束会话失败', error?.message || 'unknown error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  initOptions()
})

watch(
  () => form.deviceId,
  async (deviceId) => {
    await loadHouseholdsByDevice(deviceId)
  },
)
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
          <h3 class="app-panel-title">模块 1：发起通话卡片</h3>
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

            <div class="app-inline-card md:col-span-2">
              <div class="flex items-center justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <p class="text-xs text-text-secondary">当前 call_id</p>
                  <p class="mt-1 break-all font-mono text-sm text-text-primary">
                    {{ currentCallId || '-' }}
                  </p>
                </div>
                <el-button
                  class="app-button app-button-secondary"
                  :disabled="!currentCallId"
                  @click="copyCallId"
                >一键复制 call_id</el-button>
              </div>
            </div>
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
          </div>
        </div>

        <div class="app-surface p-5">
          <h3 class="app-panel-title">模块 2：呼叫端控制卡片</h3>
          <div class="app-action-row">
            <el-button
              v-for="item in callerActions"
              :key="item.value"
              type="warning"
              class="app-button app-button-warning"
              :loading="loading"
              :disabled="!currentCallId"
              @click="postCallerAction(item.value)"
            >{{ item.label }}</el-button>
          </div>
        </div>

        <div class="app-surface p-5">
          <h3 class="app-panel-title">模块 3：被呼叫端控制卡片</h3>
          <div class="app-action-row">
            <el-button
              v-for="item in calleeActions"
              :key="item.value"
              type="warning"
              plain
              class="app-button app-button-ghost"
              :loading="loading"
              :disabled="!currentCallId"
              @click="postCalleeAction(item.value)"
            >{{ item.label }}</el-button>
            <el-button
              type="danger"
              class="app-button app-button-danger"
              :loading="loading"
              :disabled="!currentCallId"
              @click="endSession"
            >结束会话</el-button>
          </div>
        </div>
      </section>

      <section class="space-y-5">
        <div class="app-surface p-5">
          <h3 class="app-panel-title">发起响应消息</h3>
          <pre class="app-code-block mt-3 max-h-80 overflow-auto">{{
JSON.stringify(initiateResponse, null, 2)
          }}</pre>
        </div>

        <div class="app-surface p-5">
          <h3 class="app-panel-title">呼叫端消息卡片</h3>
          <pre class="app-code-block mt-3 max-h-80 overflow-auto">{{
JSON.stringify(callerResponse, null, 2)
          }}</pre>
        </div>

        <div class="app-surface p-5">
          <h3 class="app-panel-title">被呼叫端取消通话消息</h3>
          <pre class="app-code-block mt-3 max-h-80 overflow-auto">{{
JSON.stringify(calleeResponse, null, 2)
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
              <p class="text-sm font-medium text-text-primary">{{ item.title }}
              </p>
              <p class="text-xs text-text-secondary">{{ item.detail }}</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
