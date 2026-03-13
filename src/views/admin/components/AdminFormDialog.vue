<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '编辑管理员' : '新增管理员'"
    class="app-dialog"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名" :disabled="isEdit" />
        <div class="form-tip" v-if="isEdit">编辑时不能修改用户名</div>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱地址" type="email" />
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号码" maxlength="11" />
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <el-select v-model="formData.role" placeholder="请选择角色" style="width: 100%">
          <el-option
            v-for="(label, value) in USER_ROLE_LABELS"
            :key="value"
            :label="label"
            :value="value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          show-password
        />
        <div class="form-tip" v-if="isEdit">不填写则不修改密码</div>
      </el-form-item>

      <el-form-item v-if="!isEdit" label="确认密码" prop="confirmPassword">
        <el-input
          v-model="formData.confirmPassword"
          type="password"
          placeholder="请再次输入密码"
          show-password
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button class="app-button app-button-secondary" @click="handleClose">取消</el-button>
      <el-button class="app-button app-button-primary" @click="handleSubmit" :loading="submitting">
        {{ isEdit ? '更新' : '创建' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { adminAPI } from '@/api/admin.js'
import { validateEmail, validatePhone, validatePassword } from '@/utils/index.js'
import { USER_ROLE_LABELS } from '@/constants/index.js'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible', 'success'])

// 弹窗显示状态
const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
})

// 表单引用
const formRef = ref(null)

// 提交状态
const submitting = ref(false)

// 表单数据
const formData = reactive({
  username: '',
  email: '',
  phone: '',
  role: 'operator',
  password: '',
  confirmPassword: '',
})

// 表单验证规则
const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
          return
        }
        if (!validateEmail(value)) {
          callback(new Error('请输入正确的邮箱格式'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
          return
        }
        if (!validatePhone(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  password: [
    {
      validator: (rule, value, callback) => {
        if (props.isEdit && !value) {
          // 编辑时密码可以为空
          callback()
          return
        }
        if (!props.isEdit && !value) {
          callback(new Error('请输入密码'))
          return
        }
        if (value) {
          const result = validatePassword(value)
          if (!result.isValid) {
            callback(new Error(result.messages[0]))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  confirmPassword: [
    {
      validator: (rule, value, callback) => {
        if (props.isEdit) {
          // 编辑时不需要确认密码
          callback()
          return
        }
        if (!value) {
          callback(new Error('请再次输入密码'))
          return
        }
        if (value !== formData.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

/**
 * 监听表单数据变化
 */
watch(
  () => props.formData,
  (newData) => {
    if (newData) {
      Object.assign(formData, {
        username: newData.username || '',
        email: newData.email || '',
        phone: newData.phone || '',
        role: newData.role || 'operator',
        password: '',
        confirmPassword: '',
      })
    }
  },
  { immediate: true },
)

/**
 * 提交表单
 */
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    submitting.value = true

    const submitData = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
    }

    // 如果有密码则包含密码
    if (formData.password) {
      submitData.password = formData.password
    }

    if (props.isEdit) {
      await adminAPI.updateAdmin(props.formData.id, submitData)
      ElMessage.success('更新管理员成功')
    } else {
      await adminAPI.createAdmin(submitData)
      ElMessage.success('创建管理员成功')
    }

    emit('success')
  } catch (error) {
    console.error('提交表单失败:', error)
  } finally {
    submitting.value = false
  }
}

/**
 * 关闭弹窗
 */
const handleClose = () => {
  formRef.value?.resetFields()
  emit('update:visible', false)
}
</script>

<style scoped>
.form-tip {
  font-size: 12px;
  color: var(--c-text-secondary);
  margin-top: 4px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
