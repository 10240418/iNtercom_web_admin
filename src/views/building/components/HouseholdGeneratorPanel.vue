<template>
  <div class="generator-panel">
    <div class="generator-toolbar app-inline-card">
      <div class="toolbar-head">
        <h4 class="app-panel-title">户号生成器</h4>
        <p>支持 G-99 楼层自动补全，逐层展开配置单元并实时预览户号</p>
      </div>

      <div class="toolbar-actions">
        <el-input
          v-model="templateName"
          placeholder="模板名称（可选）"
          style="width: 200px"
        />
        <el-button
          :loading="templateLoading"
          @click="loadTemplate"
        >加载模板</el-button>
        <el-button
          :loading="templateSaving"
          @click="saveTemplate"
        >保存模板</el-button>
      </div>

      <div class="toolbar-grid">
        <el-form-item
          label="楼号编码"
          class="compact-item"
        >
          <el-input
            v-model="buildingCodeInput"
            maxlength="8"
            placeholder="如: 08"
            style="width: 140px"
            @change="syncBuildingCode"
          />
        </el-form-item>

        <el-form-item
          label="楼层多选"
          class="compact-item wide-item"
        >
          <el-select
            v-model="selectedFloors"
            multiple
            filterable
            allow-create
            default-first-option
            clearable
            collapse-tags
            collapse-tags-tooltip
            placeholder="可选 G / 01...99 / 自定义，如 01-02"
            @change="handleFloorsChange"
            style="width: 100%"
          >
            <el-option
              v-for="floor in floorOptions"
              :key="floor"
              :label="floor"
              :value="floor"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="自动并单元"
          class="compact-item"
        >
          <el-switch v-model="autoMergeUnits" />
        </el-form-item>
      </div>

      <p class="toolbar-hint">
        快捷：在楼层多选中只选两个标准层（例如 G 和 15），会自动补齐中间楼层。
      </p>

      <div class="submit-actions">
        <el-button
          class="app-button app-button-primary"
          :disabled="generatedRows.length === 0 || generationLoading"
          :loading="generationLoading"
          @click="persistGeneratedRows"
        >
          确认生成并批量写入后端
        </el-button>
        <el-button
          class="app-button app-button-warning"
          :disabled="lastCreatedIDs.length === 0 || rollbackLoading"
          :loading="rollbackLoading"
          @click="rollbackLastBatch"
        >
          回滚上次批量写入
        </el-button>
      </div>

      <el-progress
        v-if="generationLoading || generationProgress > 0"
        :percentage="generationProgress"
        :status="generationLoading ? '' : 'success'"
        :stroke-width="12"
      />
    </div>

    <el-table
      v-if="floorRows.length > 0"
      :data="floorRows"
      row-key="key"
      table-layout="fixed"
      class="floor-table"
      style="width: 100%"
    >
      <el-table-column
        type="expand"
        width="56"
      >
        <template #default="{ row }">
          <div class="expand-panel app-inline-card">
            <div class="expand-grid">
              <el-form-item
                label="单元多选"
                class="compact-item wide-item"
              >
                <el-select
                  v-model="row.units"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  clearable
                  collapse-tags
                  collapse-tags-tooltip
                  placeholder="可选 A-Z 或自定义，如 A-B"
                  @change="(vals) => handleUnitsChange(row, vals)"
                  style="width: 100%"
                >
                  <el-option
                    v-for="unit in unitOptions"
                    :key="unit"
                    :label="unit"
                    :value="unit"
                  />
                </el-select>
              </el-form-item>

              <el-form-item
                label="楼层显示名"
                class="compact-item"
              >
                <el-input
                  v-model="row.floorLabel"
                  maxlength="12"
                  placeholder="例如 01 / 01-02 / G"
                  @input="rebuildGeneratedRows"
                />
              </el-form-item>
            </div>

            <div class="expand-actions">
              <el-button
                size="small"
                plain
                type="warning"
                :disabled="!canMergeWithNext(row)"
                @click="mergeWithNext(row)"
              >
                与下一层合并
              </el-button>
              <el-button
                size="small"
                plain
                type="info"
                :disabled="!row.mergedTo"
                @click="cancelMerge(row)"
              >
                取消并层
              </el-button>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="floorRaw"
        label="原始层"
        width="100"
      />

      <el-table-column
        label="显示楼层"
        width="160"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <el-tag type="primary">{{ row.floorLabel }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="单元"
        min-width="180"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <span>{{ getUnitDisplay(row) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="生成条数"
        width="120"
        align="center"
      >
        <template #default="{ row }">
          <el-tag type="success">{{ getRowGeneratedCount(row) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        width="120"
      >
        <template #default="{ row }">
          <el-tag :type="row.disabledByMerge ? 'info' : 'success'">
            {{ row.disabledByMerge ? '被并层' : '生效中' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-empty
      v-else
      description="请先选择楼层"
    />

    <div
      class="preview-card app-surface"
      v-if="generatedRows.length > 0"
    >
      <div class="preview-head">
        <h4 class="app-panel-title">户号预览（{{ generatedRows.length }}）</h4>
        <el-button
          size="small"
          @click="copyPreview"
        >复制前 200 条</el-button>
      </div>

      <el-table
        :data="generatedRows"
        table-layout="fixed"
        style="width: 100%"
        max-height="360"
      >
        <el-table-column
          prop="house"
          label="house"
          width="120"
          show-overflow-tooltip
        />
        <el-table-column
          prop="floor"
          label="floor"
          width="120"
          show-overflow-tooltip
        />
        <el-table-column
          prop="unit"
          label="unit"
          width="120"
          show-overflow-tooltip
        />
        <el-table-column
          prop="household_id"
          label="household_id"
          min-width="240"
          show-overflow-tooltip
        />
      </el-table>
    </div>

    <div
      class="query-card app-surface"
      v-loading="queryLoading"
    >
      <div class="preview-head">
        <h4 class="app-panel-title">已落库户号查询</h4>
      </div>

      <div class="query-grid">
        <el-input
          v-model="queryForm.search"
          placeholder="关键词：户号/扩展ID"
          clearable
        />
        <el-input
          v-model="queryForm.house_code"
          placeholder="楼号编码 house_code"
          clearable
        />
        <el-input
          v-model="queryForm.floor_code"
          placeholder="楼层编码 floor_code"
          clearable
        />
        <el-input
          v-model="queryForm.unit_code"
          placeholder="单元编码 unit_code"
          clearable
        />
        <el-input
          v-model="queryForm.household_ext_id"
          placeholder="扩展ID household_ext_id"
          clearable
        />
        <el-select
          v-model="queryForm.status"
          placeholder="状态"
          clearable
        >
          <el-option
            v-for="status in statusOptions"
            :key="status.label"
            :label="status.label"
            :value="status.value"
          />
        </el-select>
      </div>

      <div class="query-actions">
        <el-button
          class="app-button app-button-primary"
          @click="handleQuerySubmit"
        >查询</el-button>
        <el-button
          class="app-button app-button-secondary"
          @click="handleQueryReset"
        >重置</el-button>
        <el-button
          :loading="exportLoading"
          @click="exportCurrentFilterCSV"
        >导出当前筛选 CSV</el-button>
      </div>

      <el-table
        :data="existingHouseholds"
        table-layout="fixed"
        style="width: 100%"
        max-height="360"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="80"
        />
        <el-table-column
          prop="household_number"
          label="户号"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="house_code"
          label="house"
          width="110"
          show-overflow-tooltip
        />
        <el-table-column
          prop="floor_code"
          label="floor"
          width="130"
          show-overflow-tooltip
        />
        <el-table-column
          prop="unit_code"
          label="unit"
          width="130"
          show-overflow-tooltip
        />
        <el-table-column
          prop="household_ext_id"
          label="household_id"
          min-width="220"
          show-overflow-tooltip
        />
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        >
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status || 'unknown' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div class="query-pagination">
        <TablePagination
          v-model:current-page="queryPage"
          v-model:page-size="queryPageSize"
          :total="queryTotal"
          @size-change="handlePageSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { buildingAPI } from '@/api/building.js'
import { householdAPI } from '@/api/household.js'
import { TablePagination } from '@/components/table'

const props = defineProps({
  buildingData: {
    type: Object,
    default: () => ({}),
  },
})

const floorOptions = ['G', ...Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, '0'))]
const unitOptions = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

const selectedFloors = ref([])
const floorRows = ref([])
const generatedRows = ref([])
const autoMergeUnits = ref(true)

const buildingCodeInput = ref('')
const templateName = ref('默认模板')

const templateLoading = ref(false)
const templateSaving = ref(false)
const generationLoading = ref(false)
const rollbackLoading = ref(false)
const generationProgress = ref(0)
const lastCreatedIDs = ref([])

const queryLoading = ref(false)
const exportLoading = ref(false)
const queryPage = ref(1)
const queryPageSize = ref(10)
const queryTotal = ref(0)
const existingHouseholds = ref([])

const queryForm = ref({
  search: '',
  house_code: '',
  floor_code: '',
  unit_code: '',
  household_ext_id: '',
  status: '',
})

const buildingCode = computed(() => {
  const raw = (buildingCodeInput.value || '').trim()
  if (raw) return raw.toUpperCase()

  const code = String(props.buildingData?.building_code || '').trim()
  if (code) return code.toUpperCase()

  const idVal = props.buildingData?.id
  if (idVal !== undefined && idVal !== null) {
    return String(idVal).padStart(2, '0')
  }
  return '00'
})

watch(
  () => props.buildingData,
  () => {
    if (!buildingCodeInput.value) {
      syncBuildingCode()
    }
  },
  { immediate: true, deep: true },
)

watch(
  () => props.buildingData?.id,
  (id) => {
    selectedFloors.value = []
    floorRows.value = []
    generatedRows.value = []
    generationProgress.value = 0
    lastCreatedIDs.value = []

    if (id) {
      loadTemplate()
      runHouseholdQuery()
    }
  },
  { immediate: true },
)

const statusOptions = [
  { label: '全部状态', value: '' },
  { label: '启用', value: 'active' },
  { label: '停用', value: 'inactive' },
]

function getListQueryParams () {
  const buildingID = props.buildingData?.id
  const params = {
    page: queryPage.value,
    page_size: queryPageSize.value,
    building_id: buildingID,
  }

  Object.entries(queryForm.value).forEach(([key, value]) => {
    if (String(value || '').trim() !== '') {
      params[key] = String(value).trim()
    }
  })

  return params
}

async function loadExistingHouseholds () {
  const buildingID = props.buildingData?.id
  if (!buildingID) return

  try {
    queryLoading.value = true
    const resp = await householdAPI.getHouseholdList(getListQueryParams())
    const data = resp.data || {}
    existingHouseholds.value = data.data || []
    queryTotal.value = data.total || 0
  } catch (error) {
    existingHouseholds.value = []
    queryTotal.value = 0
    ElMessage.error(`加载户号列表失败: ${error.message || '未知错误'}`)
  } finally {
    queryLoading.value = false
  }
}

async function runHouseholdQuery () {
  await loadExistingHouseholds()
}

async function handleQuerySubmit () {
  queryPage.value = 1
  await runHouseholdQuery()
}

async function handleQueryReset () {
  queryForm.value = {
    search: '',
    house_code: '',
    floor_code: '',
    unit_code: '',
    household_ext_id: '',
    status: '',
  }
  queryPage.value = 1
  await runHouseholdQuery()
}

async function handlePageChange (page) {
  queryPage.value = page
  await loadExistingHouseholds()
}

async function handlePageSizeChange (size) {
  queryPageSize.value = size
  queryPage.value = 1
  await loadExistingHouseholds()
}

function escapeCSVCell (value) {
  const text = String(value ?? '')
  if (text.includes('"') || text.includes(',') || text.includes('\n')) {
    return `"${text.replace(/"/g, '""')}"`
  }
  return text
}

async function exportCurrentFilterCSV () {
  const buildingID = props.buildingData?.id
  if (!buildingID) {
    ElMessage.warning('请先选择有效楼栋')
    return
  }

  try {
    exportLoading.value = true
    const pageSize = 200
    const maxRows = 10000
    let page = 1
    let total = 0
    const rows = []

    while (true) {
      const params = getListQueryParams(false)
      params.page = page
      params.page_size = pageSize

      const resp = await householdAPI.getHouseholdList(params)
      const data = resp.data || {}
      const list = data.data || []
      total = data.total || 0

      rows.push(...list)

      if (rows.length >= total || list.length === 0 || rows.length >= maxRows) {
        break
      }

      page += 1
    }

    const header = [
      'id',
      'household_number',
      'house_code',
      'floor_code',
      'unit_code',
      'household_ext_id',
      'status',
      'building_id',
      'building_status',
      'created_at',
      'updated_at',
    ]

    const csvRows = [header.join(',')]
    rows.forEach((row) => {
      const line = [
        row.id,
        row.household_number,
        row.house_code,
        row.floor_code,
        row.unit_code,
        row.household_ext_id,
        row.status,
        row.building_id,
        row.building?.status || '',
        row.created_at,
        row.updated_at,
      ].map(escapeCSVCell)
      csvRows.push(line.join(','))
    })

    const csvContent = `\uFEFF${csvRows.join('\n')}`
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const code = String(props.buildingData?.building_code || props.buildingData?.id || 'building')
    link.href = url
    link.download = `households_${code}_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    if (rows.length >= maxRows && total > maxRows) {
      ElMessage.warning(`导出已完成，仅导出前 ${maxRows} 条（总计 ${total} 条）`)
      return
    }

    ElMessage.success(`导出完成，共 ${rows.length} 条`)
  } catch (error) {
    ElMessage.error(`导出失败: ${error.message || '未知错误'}`)
  } finally {
    exportLoading.value = false
  }
}

function syncBuildingCode () {
  if (buildingCodeInput.value) return
  const code = String(props.buildingData?.building_code || '').trim()
  if (code) {
    buildingCodeInput.value = code.toUpperCase()
    return
  }

  const idVal = props.buildingData?.id
  if (idVal !== undefined && idVal !== null) {
    buildingCodeInput.value = String(idVal).padStart(2, '0')
  }
}

function handleFloorsChange (values) {
  const normalized = normalizeFloorSelection(values)
  selectedFloors.value = normalized
  rebuildFloorRows()
}

function normalizeFloorSelection (values) {
  const uniq = Array.from(new Set((values || []).map((v) => String(v).trim()).filter(Boolean)))

  const standardSelected = uniq.filter((v) => floorOptions.includes(v))
  if (uniq.length === 2 && standardSelected.length === 2) {
    const a = floorOptions.indexOf(standardSelected[0])
    const b = floorOptions.indexOf(standardSelected[1])
    const minIdx = Math.min(a, b)
    const maxIdx = Math.max(a, b)
    return floorOptions.slice(minIdx, maxIdx + 1)
  }

  return sortFloors(uniq)
}

function sortFloors (values) {
  const standard = []
  const custom = []

  values.forEach((v) => {
    if (floorOptions.includes(v)) {
      standard.push(v)
    } else {
      custom.push(v)
    }
  })

  standard.sort((a, b) => floorOptions.indexOf(a) - floorOptions.indexOf(b))
  return [...standard, ...custom]
}

function rebuildFloorRows () {
  const oldMap = new Map(floorRows.value.map((r) => [r.floorRaw, r]))

  floorRows.value = selectedFloors.value.map((floorRaw, index) => {
    const old = oldMap.get(floorRaw)
    if (old) {
      return {
        ...old,
        index,
        key: `${floorRaw}-${index}`,
      }
    }

    return {
      key: `${floorRaw}-${index}`,
      index,
      floorRaw,
      floorLabel: floorRaw,
      units: ['A'],
      mergedTo: '',
      disabledByMerge: false,
    }
  })

  reapplyMergeState()
  rebuildGeneratedRows()
}

function reapplyMergeState () {
  const byRaw = new Map(floorRows.value.map((r) => [r.floorRaw, r]))
  floorRows.value.forEach((row) => {
    row.disabledByMerge = false
  })

  floorRows.value.forEach((row) => {
    if (!row.mergedTo) return
    const target = byRaw.get(row.mergedTo)
    if (!target) {
      row.mergedTo = ''
      return
    }
    target.disabledByMerge = true
    row.floorLabel = `${row.floorRaw}-${target.floorRaw}`
  })
}

function canMergeWithNext (row) {
  if (row.disabledByMerge) return false
  const next = floorRows.value[row.index + 1]
  return !!next && !next.disabledByMerge
}

function mergeWithNext (row) {
  if (!canMergeWithNext(row)) return
  const next = floorRows.value[row.index + 1]
  row.mergedTo = next.floorRaw
  row.floorLabel = `${row.floorRaw}-${next.floorRaw}`
  reapplyMergeState()
  rebuildGeneratedRows()
}

function cancelMerge (row) {
  row.mergedTo = ''
  row.floorLabel = row.floorRaw
  reapplyMergeState()
  rebuildGeneratedRows()
}

function handleUnitsChange (row, values) {
  const uniq = Array.from(new Set((values || []).map((v) => String(v).trim().toUpperCase()).filter(Boolean)))

  const standardSelected = uniq.filter((v) => unitOptions.includes(v))
  if (uniq.length === 2 && standardSelected.length === 2) {
    const a = unitOptions.indexOf(standardSelected[0])
    const b = unitOptions.indexOf(standardSelected[1])
    const minIdx = Math.min(a, b)
    const maxIdx = Math.max(a, b)
    row.units = unitOptions.slice(minIdx, maxIdx + 1)
  } else {
    const standard = standardSelected.sort((a, b) => unitOptions.indexOf(a) - unitOptions.indexOf(b))
    const custom = uniq.filter((v) => !unitOptions.includes(v))
    row.units = [...standard, ...custom]
  }

  rebuildGeneratedRows()
}

function getUnitDisplay (row) {
  if (!row.units?.length) return '未配置'
  const merged = buildUnitGroups(row.units)
  return merged.join(', ')
}

function getRowGeneratedCount (row) {
  if (row.disabledByMerge) return 0
  return buildUnitGroups(row.units).length
}

function buildUnitGroups (units) {
  if (!units || units.length === 0) return []

  const normalized = Array.from(new Set(units))
  const standard = normalized.filter((u) => unitOptions.includes(u))
  const custom = normalized.filter((u) => !unitOptions.includes(u))

  if (!autoMergeUnits.value || standard.length === 0) {
    return [...standard, ...custom]
  }

  const sorted = [...standard].sort((a, b) => unitOptions.indexOf(a) - unitOptions.indexOf(b))
  const groups = []

  let start = sorted[0]
  let prev = sorted[0]

  for (let i = 1; i < sorted.length; i += 1) {
    const current = sorted[i]
    const isNext = unitOptions.indexOf(current) === unitOptions.indexOf(prev) + 1
    if (isNext) {
      prev = current
      continue
    }

    groups.push(start === prev ? start : `${start}-${prev}`)
    start = current
    prev = current
  }

  groups.push(start === prev ? start : `${start}-${prev}`)
  return [...groups, ...custom]
}

function toIdPart (value) {
  return String(value || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
}

function rebuildGeneratedRows () {
  const rows = []

  floorRows.value.forEach((floorRow) => {
    if (floorRow.disabledByMerge) return

    const floorLabel = String(floorRow.floorLabel || floorRow.floorRaw).trim()
    if (!floorLabel) return

    const unitGroups = buildUnitGroups(floorRow.units)
    if (unitGroups.length === 0) return

    unitGroups.forEach((unitLabel) => {
      rows.push({
        house: buildingCode.value,
        floor: floorLabel,
        unit: unitLabel,
        household_id: `${toIdPart(buildingCode.value)}${toIdPart(floorLabel)}${toIdPart(unitLabel)}`,
      })
    })
  })

  generatedRows.value = rows
}

function getTemplatePayload () {
  return {
    selectedFloors: selectedFloors.value,
    floorRows: floorRows.value.map((row) => ({
      floorRaw: row.floorRaw,
      floorLabel: row.floorLabel,
      units: row.units,
      mergedTo: row.mergedTo,
    })),
    autoMergeUnits: autoMergeUnits.value,
    buildingCodeInput: buildingCodeInput.value,
  }
}

function applyTemplatePayload (payload) {
  selectedFloors.value = Array.isArray(payload.selectedFloors) ? payload.selectedFloors : []
  autoMergeUnits.value = !!payload.autoMergeUnits
  buildingCodeInput.value = payload.buildingCodeInput || buildingCodeInput.value

  if (Array.isArray(payload.floorRows) && payload.floorRows.length > 0) {
    floorRows.value = payload.floorRows.map((item, index) => ({
      key: `${item.floorRaw || item.floorLabel || index}-${index}`,
      index,
      floorRaw: item.floorRaw || item.floorLabel || '',
      floorLabel: item.floorLabel || item.floorRaw || '',
      units: Array.isArray(item.units) ? item.units : ['A'],
      mergedTo: item.mergedTo || '',
      disabledByMerge: false,
    }))
    reapplyMergeState()
    rebuildGeneratedRows()
    return
  }

  rebuildFloorRows()
}

async function loadTemplate () {
  const buildingID = props.buildingData?.id
  if (!buildingID) return

  try {
    templateLoading.value = true
    const response = await buildingAPI.getHouseholdTemplate(buildingID)
    const payload = response.data
    if (!payload?.exists || !payload.template_json) {
      return
    }

    const parsed = JSON.parse(payload.template_json)
    templateName.value = payload.template_name || '默认模板'
    applyTemplatePayload(parsed)
    ElMessage.success('已加载楼栋模板')
  } catch (error) {
    ElMessage.error(`加载模板失败: ${error.message || '未知错误'}`)
  } finally {
    templateLoading.value = false
  }
}

async function saveTemplate () {
  const buildingID = props.buildingData?.id
  if (!buildingID) {
    ElMessage.warning('请先选择有效楼栋')
    return
  }

  try {
    templateSaving.value = true
    await buildingAPI.saveHouseholdTemplate(buildingID, {
      template_name: templateName.value || '默认模板',
      template_json: JSON.stringify(getTemplatePayload()),
    })
    ElMessage.success('模板保存成功')
  } catch (error) {
    ElMessage.error(`模板保存失败: ${error.message || '未知错误'}`)
  } finally {
    templateSaving.value = false
  }
}

async function persistGeneratedRows () {
  const buildingID = props.buildingData?.id
  if (!buildingID) {
    ElMessage.warning('请先选择有效楼栋')
    return
  }

  if (generatedRows.value.length === 0) {
    ElMessage.warning('暂无可提交数据')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确认将 ${generatedRows.value.length} 条户号写入后端吗？系统会自动跳过已存在户号。`,
      '批量生成确认',
      {
        confirmButtonText: '确认生成',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )

    generationLoading.value = true
    generationProgress.value = 0
    lastCreatedIDs.value = []

    const chunkSize = 200
    const rows = generatedRows.value
    const total = rows.length

    let processed = 0
    let totalCreated = 0
    let totalSkipped = 0
    let totalFailed = 0

    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize)
      const payloadItems = chunk.map((item) => ({
        household_number: item.household_id,
        house: item.house,
        floor: item.floor,
        unit: item.unit,
        household_id: item.household_id,
      }))

      const resp = await buildingAPI.batchCreateBuildingHouseholds(buildingID, {
        household_items: payloadItems,
      })

      const data = resp.data || {}
      totalCreated += data.created_count || 0
      totalSkipped += data.skipped_count || 0
      totalFailed += data.failed_count || 0

      if (Array.isArray(data.created_ids)) {
        lastCreatedIDs.value.push(...data.created_ids)
      }

      processed += chunk.length
      generationProgress.value = Math.min(100, Math.round((processed / total) * 100))
    }

    ElMessage.success(
      `批量完成：创建 ${totalCreated} 条，跳过 ${totalSkipped} 条，失败 ${totalFailed} 条。`,
    )
    await runHouseholdQuery()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`批量生成失败: ${error.message || '未知错误'}`)
    }
  } finally {
    generationLoading.value = false
  }
}

async function rollbackLastBatch () {
  const buildingID = props.buildingData?.id
  if (!buildingID || lastCreatedIDs.value.length === 0) {
    ElMessage.warning('暂无可回滚数据')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确认回滚上次创建的 ${lastCreatedIDs.value.length} 条户号吗？`,
      '回滚确认',
      {
        confirmButtonText: '确认回滚',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )

    rollbackLoading.value = true
    const resp = await buildingAPI.rollbackBuildingHouseholds(buildingID, {
      created_ids: lastCreatedIDs.value,
    })

    const data = resp.data || {}
    const deletedCount = data.deleted_count || 0
    const blocked = data.blocked || {}
    const blockedCount = Object.keys(blocked).length

    if (deletedCount > 0) {
      ElMessage.success(`回滚完成：已删除 ${deletedCount} 条，阻塞 ${blockedCount} 条。`)
    } else {
      ElMessage.warning(`未删除任何数据，阻塞 ${blockedCount} 条。`)
    }

    lastCreatedIDs.value = []
    await runHouseholdQuery()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`回滚失败: ${error.message || '未知错误'}`)
    }
  } finally {
    rollbackLoading.value = false
  }
}

watch(autoMergeUnits, () => {
  rebuildGeneratedRows()
})

async function copyPreview () {
  try {
    const payload = generatedRows.value.slice(0, 200)
    const text = payload
      .map((item) => `${item.house},${item.floor},${item.unit},${item.household_id}`)
      .join('\n')

    await navigator.clipboard.writeText(text)
    ElMessage.success('已复制前 200 条预览')
  } catch (_error) {
    ElMessage.error('复制失败，请检查浏览器权限')
  }
}
</script>

<style scoped>
.generator-panel {
  margin-top: 16px;
}

.generator-toolbar {
  margin-bottom: 16px;
}

.toolbar-head p {
  margin-top: 4px;
  color: var(--c-text-secondary);
  font-size: 13px;
}

.toolbar-actions {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.toolbar-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 180px 1fr 140px;
  gap: 12px;
}

.wide-item {
  min-width: 0;
}

.toolbar-hint {
  margin-top: 10px;
  color: var(--c-text-secondary);
  font-size: 12px;
}

.submit-actions {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.floor-table {
  margin-bottom: 16px;
}

.expand-panel {
  margin: 6px 12px;
}

.expand-grid {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 12px;
}

.expand-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.preview-card {
  padding: 16px;
}

.query-card {
  padding: 16px;
  margin-top: 16px;
}

.preview-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.query-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 10px;
}

.query-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.query-pagination {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.compact-item {
  margin-bottom: 0;
}

@media (max-width: 960px) {
  .toolbar-grid,
  .expand-grid {
    grid-template-columns: 1fr;
  }

  .query-grid {
    grid-template-columns: 1fr;
  }
}
</style>
