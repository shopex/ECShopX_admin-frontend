# 用户信息表单开发计划

## 项目概述

使用 `sp-form-plus` 组件实现用户信息编辑表单，包括基本信息修改和密码修改功能。

## 需求分析

### 表单字段
- **账户号码**：只读显示（18657170202）
- **昵称**：可编辑输入框
- **头像**：图片上传组件
- **修改密码**：密码输入框，支持显示/隐藏
- **确认密码**：密码输入框，支持显示/隐藏

### 功能要求
- 表单验证（昵称必填、密码强度、密码一致性）
- 头像上传预览
- 密码显示/隐藏切换
- 数据提交和重置功能

## 技术方案

### 1. 组件配置设计

```vue
<template>
  <div class="user-info-form">
    <SpFormPlus
      ref="userInfoForm"
      v-model="formData"
      form-type="normalForm"
      :form-items="formItems"
      label-width="100px"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      showPassword: false,
      showConfirmPassword: false,
      formItems: [
        // 基本信息分组
        {
          fieldName: 'basicInfo',
          label: '基本信息',
          component: 'group'
        },
        {
          fieldName: 'account',
          label: '账户',
          component: ({ value }) => {
            return this.$createElement('span', {
              style: { color: '#606266', fontSize: '14px' }
            }, value || '18657170202')
          }
        },
        {
          fieldName: 'nickname',
          label: '昵称',
          component: 'input',
          value: '李学南',
          componentProps: {
            placeholder: '请输入昵称',
            clearable: true,
            maxlength: 20,
            showWordLimit: true
          },
          rules: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 20, message: '昵称长度在 2 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          fieldName: 'avatar',
          label: '头像',
          component: 'imagepicker',
          value: '',
          componentProps: {
            multiple: false,
            limit: 1,
            accept: 'image/*',
            maxSize: 2, // 2MB
            onChange: (value) => {
              console.log('头像上传:', value)
            }
          },
          tip: '建议尺寸：200x200像素，支持 jpg、png 格式，文件大小不超过 2MB'
        },

        // 密码修改分组
        {
          fieldName: 'passwordInfo',
          label: '密码修改',
          component: 'group'
        },
        {
          fieldName: 'newPassword',
          label: '修改密码',
          component: ({ value, onInput }) => {
            return this.$createElement('el-input', {
              props: {
                value: value,
                type: this.showPassword ? 'text' : 'password',
                placeholder: '请输入新密码',
                clearable: true
              },
              on: {
                input: onInput
              },
              scopedSlots: {
                suffix: () => this.$createElement('i', {
                  class: [
                    'el-input__icon',
                    this.showPassword ? 'el-icon-view-off' : 'el-icon-view'
                  ],
                  style: { cursor: 'pointer' },
                  on: {
                    click: () => {
                      this.showPassword = !this.showPassword
                    }
                  }
                })
              }
            })
          },
          value: '',
          rules: [
            { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (value && !/^(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
                  callback(new Error('密码必须包含字母和数字'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
          tip: '密码长度至少6位，必须包含字母和数字'
        },
        {
          fieldName: 'confirmPassword',
          label: '确认密码',
          component: ({ value, onInput }) => {
            return this.$createElement('el-input', {
              props: {
                value: value,
                type: this.showConfirmPassword ? 'text' : 'password',
                placeholder: '请输入确认密码',
                clearable: true
              },
              on: {
                input: onInput
              },
              scopedSlots: {
                suffix: () => this.$createElement('i', {
                  class: [
                    'el-input__icon',
                    this.showConfirmPassword ? 'el-icon-view-off' : 'el-icon-view'
                  ],
                  style: { cursor: 'pointer' },
                  on: {
                    click: () => {
                      this.showConfirmPassword = !this.showConfirmPassword
                    }
                  }
                })
              }
            })
          },
          value: '',
          rules: [
            {
              validator: (rule, value, callback) => {
                if (value && value !== this.formData.newPassword) {
                  callback(new Error('两次输入的密码不一致'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ]
        }
      ]
    }
  },

  methods: {
    async handleSubmit(formData) {
      try {
        // 处理提交逻辑
        console.log('提交数据:', formData)

        // 构建提交数据
        const submitData = {
          nickname: formData.nickname,
          avatar: formData.avatar
        }

        // 如果有新密码，添加到提交数据中
        if (formData.newPassword) {
          submitData.password = formData.newPassword
        }

        // 调用API
        await this.updateUserInfo(submitData)

        this.$message.success('用户信息更新成功')
      } catch (error) {
        this.$message.error('更新失败: ' + error.message)
      }
    },

    async updateUserInfo(data) {
      // API调用逻辑
      return this.$api.user.updateInfo(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;

  ::v-deep .form-field-group {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    margin: 20px 0 10px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #e4e7ed;
  }
}
</style>
```

### 2. API 接口设计

```javascript
// api/user.js
export default {
  // 获取用户信息
  getUserInfo() {
    return request.get('/api/user/info')
  },

  // 更新用户信息
  updateInfo(data) {
    return request.put('/api/user/info', data)
  },

  // 上传头像
  uploadAvatar(file) {
    const formData = new FormData()
    formData.append('avatar', file)
    return request.post('/api/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
```

## 开发任务清单

### 阶段一：基础功能实现 (预计 1 天)
- [ ] 创建用户信息表单组件
- [ ] 配置 sp-form-plus 表单项
- [ ] 实现基本的表单布局和样式
- [ ] 添加表单验证规则

### 阶段二：高级功能实现 (预计 1 天)
- [ ] 实现密码显示/隐藏功能
- [ ] 集成图片上传组件
- [ ] 添加头像预览功能
- [ ] 实现密码强度验证

### 阶段三：数据交互 (预计 0.5 天)
- [ ] 对接用户信息获取API
- [ ] 实现表单数据提交
- [ ] 添加错误处理和成功提示
- [ ] 测试表单验证和提交流程

### 阶段四：优化和测试 (预计 0.5 天)
- [ ] 优化表单样式和用户体验
- [ ] 添加加载状态
- [ ] 进行兼容性测试
- [ ] 代码review和优化

## 技术要点

### 1. 自定义组件实现
- 使用函数式组件实现密码输入框的显示/隐藏功能
- 通过 `h` 函数创建自定义的账户显示组件

### 2. 表单验证
- 昵称长度和必填验证
- 密码强度验证（包含字母和数字）
- 密码一致性验证

### 3. 图片上传
- 限制文件大小和格式
- 实现图片预览功能
- 处理上传失败的情况

### 4. 用户体验优化
- 使用分组组织表单字段
- 添加适当的提示文字
- 合理的表单布局和样式

## 注意事项

1. **安全性**
   - 前端密码验证只是辅助，后端必须进行完整验证
   - 传输密码时需要加密处理

2. **用户体验**
   - 头像上传需要显示上传进度
   - 表单提交时显示加载状态
   - 合理的错误提示和成功反馈

3. **性能优化**
   - 图片上传前进行压缩
   - 避免频繁的表单验证

## 验收标准

- [ ] 表单布局符合设计稿要求
- [ ] 所有字段验证功能正常
- [ ] 密码显示/隐藏功能正常
- [ ] 头像上传和预览功能正常
- [ ] 表单提交和重置功能正常
- [ ] 响应式布局适配
- [ ] 无控制台错误和警告

## 时间估算

**总计：3 天**
- 开发时间：2.5 天
- 测试优化：0.5 天

## 风险评估

1. **图片上传组件兼容性**：需要确保 sp-image-picker 组件功能完整
2. **密码验证复杂性**：自定义密码组件可能需要额外调试
3. **API 接口依赖**：需要后端接口支持

## 后续优化

- 添加头像裁剪功能
- 支持批量信息修改
- 添加操作日志记录
- 支持多语言切换
