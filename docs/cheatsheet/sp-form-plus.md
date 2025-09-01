# SP-Form-Plus 组件使用手册

## 概述

`sp-form-plus` 是一个基于 Element UI 的增强版表单组件，提供了更灵活的配置方式和更丰富的功能。支持多种表单类型（普通表单、搜索表单）和多种字段组件，支持自定义组件渲染，具有良好的扩展性。

## 基本用法

### 引入组件

```javascript
import SpFormPlus from '@/components/sp-form-plus'

export default {
  components: {
    SpFormPlus
  }
}
```

### 基础示例

```vue
<template>
  <SpFormPlus
    v-model="formData"
    :form-items="formItems"
    form-type="normalForm"
    label-width="120px"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      formItems: [
        {
          fieldName: 'name',
          label: '姓名',
          component: 'input',
          value: '', // 默认值
          componentProps: {
            placeholder: '请输入姓名'
          },
          rules: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        {
          fieldName: 'email',
          label: '邮箱',
          component: 'input',
          value: '',
          componentProps: {
            placeholder: '请输入邮箱'
          },
          rules: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
          ]
        },
        {
          fieldName: 'status',
          label: '状态',
          component: 'select',
          value: '',
          componentProps: {
            options: [
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 }
            ]
          }
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      console.log('表单提交:', formData)
      // 处理表单提交逻辑
    }
  }
}
</script>
```

## API 文档

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `colon` | Boolean | `false` | 是否在 label 后添加冒号 |
| `formType` | String | `'searchForm'` | 表单类型，可选值：`'searchForm'`、`'normalForm'` |
| `formItems` | Array | `[]` | 表单项配置数组 |
| `formApi` | Object | `{}` | 表单 API 配置（预留字段，暂未使用） |
| `inline` | Boolean | `false` | 是否内联显示（使用网格布局） |
| `labelWidth` | String | `'160px'` | 标签宽度 |
| `layout` | String | `'horizontal'` | 布局方式（预留字段，暂未使用） |
| `showDefaultActions` | Boolean | `true` | 是否显示默认操作按钮 |
| `value` / `v-model` | Object | `{}` | 表单数据（支持 v-model 双向绑定） |

### Form Item 配置

每个表单项支持以下配置：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `fieldName` | String | - | 字段名（必填） |
| `label` | String | `''` | 标签文字 |
| `component` | String/Function | `'input'` | 组件类型或自定义组件函数 |
| `componentProps` | Object | `{}` | 组件属性，支持 onChange 回调 |
| `rules` | Array | `[]` | Element UI 验证规则 |
| `value` | Any | `''` | 默认值 |
| `formItemClass` | String | `''` | 表单项样式类名 |
| `isShow` | Function | - | 是否显示的判断函数，接收当前字段值作为参数 |
| `tip` | String/Function | `''` | 提示文字，支持函数形式 |

### 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `submit` | 表单提交时触发（验证通过后） | `(formData)` |
| `input` | 表单数据变化时触发（用于 v-model） | `(formData)` |
| `reset` | 表单重置时触发 | - |

**注意：** `field-change` 事件在当前版本中已被注释，使用 v-model 或 componentProps.onChange 来处理字段变化。

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|-------|
| `validate` | 验证表单 | - | `Promise<formData>` |
| `resetField` | 重置指定字段 | `(field)` | - |
| `clearValidate` | 清除验证 | `(props)` | - |

## 支持的字段类型

### 1. Input 输入框

```javascript
{
  fieldName: 'username',
  label: '用户名',
  component: 'input',
  value: '',
  componentProps: {
    placeholder: '请输入用户名',
    maxlength: 50,
    showWordLimit: true,
    onChange: (value, formData) => {
      console.log('输入值变化:', value)
    }
  }
}
```

### 2. Select 选择框

```javascript
{
  fieldName: 'category',
  label: '分类',
  component: 'select',
  value: '',
  componentProps: {
    options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2, disabled: true }
    ],
    multiple: false,
    clearable: true,
    onChange: (value, formData) => {
      console.log('选择变化:', value)
    }
  }
}
```

### 3. Radio 单选框

```javascript
{
  fieldName: 'gender',
  label: '性别',
  component: 'radio',
  value: 1,
  componentProps: {
    options: [
      { label: '男', value: 1 },
      { label: '女', value: 2, disabled: false }
    ]
  }
}
```

### 4. Checkbox 复选框

```javascript
{
  fieldName: 'hobbies',
  label: '爱好',
  component: 'checkbox',
  value: [],
  componentProps: {
    options: [
      { label: '读书', value: 'reading' },
      { label: '运动', value: 'sports' },
      { label: '音乐', value: 'music', disabled: false }
    ]
  }
}
```

### 5. Switch 开关

```javascript
{
  fieldName: 'enabled',
  label: '启用状态',
  component: 'switch',
  value: false,
  componentProps: {
    activeColor: '#13ce66',
    inactiveColor: '#ff4949',
    activeText: '开',
    inactiveText: '关',
    disabled: (formData) => {
      // 支持函数形式的动态禁用
      return formData.readonly === true
    }
  }
}
```

### 6. DateTimePicker 日期时间选择器

```javascript
{
  fieldName: 'dateRange',
  label: '时间范围',
  component: 'datetimepicker',
  value: [],
  componentProps: {
    type: 'datetimerange',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    rangeSeparator: '至',
    defaultTime: ['00:00:00', '23:59:59']
  }
}
```

### 7. ImagePicker 图片选择器

```javascript
{
  fieldName: 'avatar',
  label: '头像',
  component: 'imagepicker',
  value: '',
  componentProps: {
    multiple: false,
    limit: 1,
    onChange: (value) => {
      console.log('图片选择变化:', value)
    }
  }
}
```

### 8. Button 按钮

```javascript
{
  fieldName: 'action',
  label: '操作',
  component: 'button',
  componentProps: {
    text: '点击操作',
    type: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    class: 'custom-button',
    onClick: (event) => {
      console.log('按钮点击', event)
    }
  }
}
```

### 9. Group 分组标题

```javascript
{
  fieldName: 'group1',
  label: '基本信息',
  component: 'group'
}
```

### 10. 自定义组件

```javascript
{
  fieldName: 'custom',
  label: '自定义字段',
  component: ({ value, props, onInput, h, formData }) => {
    return h('div', { class: 'custom-field' }, [
      h('span', { style: 'margin-right: 10px' }, '当前值：' + value),
      h('el-button', {
        props: { size: 'small' },
        on: {
          click: () => onInput('新值_' + Date.now())
        }
      }, '更改值')
    ])
  }
}
```

## 表单类型

### 搜索表单

```vue
<template>
  <SpFormPlus
    v-model="searchData"
    form-type="searchForm"
    :form-items="searchFormItems"
    label-width="80px"
    @submit="handleSearch"
    @reset="handleReset"
  />
</template>

<script>
export default {
  data() {
    return {
      searchData: {},
      searchFormItems: [
        {
          fieldName: 'keyword',
          label: '关键词',
          component: 'input',
          value: '',
          componentProps: {
            placeholder: '请输入关键词',
            clearable: true
          }
        },
        {
          fieldName: 'status',
          label: '状态',
          component: 'select',
          value: '',
          componentProps: {
            placeholder: '请选择状态',
            clearable: true,
            options: [
              { label: '全部', value: '' },
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 }
            ]
          }
        },
        {
          fieldName: 'dateRange',
          label: '创建时间',
          component: 'datetimepicker',
          value: [],
          componentProps: {
            type: 'datetimerange'
          }
        }
      ]
    }
  },
  methods: {
    handleSearch(formData) {
      console.log('搜索条件:', formData)
      // 处理搜索逻辑
      this.loadData(formData)
    },
    handleReset() {
      console.log('重置搜索条件')
      // 重置后重新加载数据
      this.loadData({})
    },
    loadData(params) {
      // 实际的数据加载逻辑
    }
  }
}
</script>
```

### 普通表单

```vue
<template>
  <SpFormPlus
    ref="formRef"
    v-model="formData"
    form-type="normalForm"
    :form-items="formItems"
    label-width="120px"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      formItems: [
        {
          fieldName: 'name',
          label: '姓名',
          component: 'input',
          value: '',
          rules: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        {
          fieldName: 'enabled',
          label: '启用状态',
          component: 'switch',
          value: false
        }
      ]
    }
  },
  methods: {
    async handleSubmit(formData) {
      try {
        console.log('提交数据:', formData)
        // 执行提交逻辑
        await this.saveData(formData)
        this.$message.success('保存成功')
      } catch (error) {
        this.$message.error('保存失败')
      }
    },
    // 手动验证表单
    async validateForm() {
      try {
        const formData = await this.$refs.formRef.validate()
        console.log('验证通过:', formData)
        return formData
      } catch (error) {
        console.log('验证失败:', error)
        throw error
      }
    }
  }
}
</script>
```

## 表单验证

### 基本验证

```javascript
{
  fieldName: 'email',
  label: '邮箱',
  component: 'input',
  rules: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}
```

### 自定义验证

```javascript
{
  fieldName: 'phone',
  label: '手机号',
  component: 'input',
  rules: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入手机号'))
        } else if (!/^1[3-9]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
```

## 条件显示

```javascript
{
  fieldName: 'reason',
  label: '原因',
  component: 'input',
  isShow: (value) => {
    // 只有当状态为禁用时才显示
    return this.formData.status === 0
  }
}
```

## 内联表单

内联表单使用 CSS Grid 布局，自动适应容器宽度：

```vue
<template>
  <SpFormPlus
    v-model="formData"
    :form-items="formItems"
    inline
    form-type="searchForm"
    label-width="100px"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      formItems: [
        {
          fieldName: 'keyword',
          label: '关键词',
          component: 'input',
          value: ''
        },
        {
          fieldName: 'status',
          label: '状态',
          component: 'select',
          value: '',
          componentProps: {
            options: [
              { label: '全部', value: '' },
              { label: '启用', value: 1 }
            ]
          }
        }
      ]
    }
  }
}
</script>
```

## 高级用法

### 动态表单项

使用计算属性根据表单数据动态生成表单项：

```javascript
computed: {
  formItems() {
    const items = [
      {
        fieldName: 'type',
        label: '类型',
        component: 'select',
        value: '',
        componentProps: {
          options: [
            { label: '个人', value: 'personal' },
            { label: '企业', value: 'company' }
          ],
          onChange: (value, formData) => {
            // 清空关联字段
            if (value !== 'company') {
              this.$set(formData, 'companyName', '')
            }
          }
        }
      }
    ]

    // 根据类型动态添加字段
    if (this.formData.type === 'company') {
      items.push({
        fieldName: 'companyName',
        label: '公司名称',
        component: 'input',
        value: '',
        rules: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ]
      })
    }

    return items
  }
}
```

### 表单联动

使用 componentProps.onChange 实现字段间的联动：

```javascript
{
  fieldName: 'province',
  label: '省份',
  component: 'select',
  value: '',
  componentProps: {
    options: this.provinces,
    onChange: (value, formData) => {
      // 清空城市选择
      this.$set(formData, 'city', '')
      this.$set(formData, 'district', '')

      // 加载对应城市数据
      this.loadCities(value).then(cities => {
        // 更新城市字段的选项
        this.updateCityOptions(cities)
      })
    }
  }
},
{
  fieldName: 'city',
  label: '城市',
  component: 'select',
  value: '',
  componentProps: {
    options: this.cities,
    onChange: (value, formData) => {
      // 清空区县选择
      this.$set(formData, 'district', '')
      // 加载区县数据
      this.loadDistricts(value)
    }
  }
}
```

## 样式定制

### 自定义样式类

通过 formItemClass 为特定字段添加自定义样式：

```javascript
{
  fieldName: 'special',
  label: '特殊字段',
  component: 'input',
  value: '',
  formItemClass: 'custom-form-item highlight-field',
  tip: '这是一个重要字段'
}
```

```scss
.custom-form-item {
  &.highlight-field {
    .el-form-item__label {
      color: #f56c6c;
      font-weight: bold;

      &::before {
        content: '★ ';
        color: #ff4949;
      }
    }

    .el-input__inner {
      border-color: #f56c6c;
    }
  }
}

// 搜索表单特殊样式
.sp-form-plus--search-form {
  .custom-form-item {
    background-color: rgba(245, 108, 108, 0.1);
    padding: 8px;
    border-radius: 4px;
  }
}
```

## 最佳实践

1. **合理使用表单类型**
   - `searchForm`：用于数据筛选，带有查询/重置按钮，具有特殊的背景样式
   - `normalForm`：用于数据录入，带有保存按钮

2. **数据绑定**
   - 优先使用 `v-model` 进行双向绑定
   - 在表单项中设置 `value` 属性作为默认值
   - 使用 `componentProps.onChange` 处理字段变化

3. **验证规则**
   - 将常用验证规则提取为公共配置
   - 支持同步和异步验证
   - 使用 `ref` 调用 `validate()` 方法进行手动验证

4. **布局设置**
   - 根据标签长度合理设置 `labelWidth`
   - 使用 `inline` 属性创建自适应的网格布局
   - 通过 `formItemClass` 自定义单个字段样式

5. **动态表单**
   - 使用计算属性创建动态表单项
   - 通过 `isShow` 函数控制字段显示/隐藏
   - 使用 `onChange` 回调实现字段联动

6. **自定义组件**
   - 使用函数形式创建自定义组件
   - 通过 `h` 函数创建 VNode
   - 利用 `formData` 参数访问整个表单数据

7. **性能优化**
   - 大量表单项时使用 `isShow` 而非动态创建
   - 合理使用 `group` 组件进行分组
   - 避免在 `componentProps.onChange` 中执行重度计算

## 常见问题

### Q: 如何获取表单数据？
**A:** 有以下几种方式：
- 使用 `v-model` 双向绑定：`<SpFormPlus v-model="formData" />`
- 监听 `@submit` 事件：`@submit="handleSubmit"`
- 手动调用验证：`this.$refs.formRef.validate()`

### Q: 如何重置表单？
**A:**
- 搜索表单：点击重置按钮或监听 `@reset` 事件
- 普通表单：调用 `this.$refs.formRef.resetField()` 方法
- 手动重置：将 formData 重置为初始值

### Q: 如何自定义组件？
**A:** 将 `component` 属性设置为函数：
```javascript
component: ({ value, props, onInput, h, formData }) => {
  return h('div', '自定义内容')
}
```

### Q: 如何实现表单联动？
**A:** 在 `componentProps.onChange` 中处理：
```javascript
componentProps: {
  onChange: (value, formData) => {
    // 修改其他字段的值
    this.$set(formData, 'otherField', '')
  }
}
```

### Q: 字段变化事件为什么不生效？
**A:** `field-change` 事件在当前版本中已被注释，请使用：
- `v-model` 监听整体数据变化
- `componentProps.onChange` 监听单个字段变化

### Q: 如何处理异步验证？
**A:** 在 `rules` 中使用自定义验证器：
```javascript
rules: [{
  validator: async (rule, value, callback) => {
    try {
      await this.checkValueExists(value)
      callback()
    } catch (error) {
      callback(new Error('验证失败'))
    }
  }
}]
```

### Q: 如何控制字段的显示/隐藏？
**A:** 使用 `isShow` 函数：
```javascript
{
  fieldName: 'conditionalField',
  isShow: (value) => this.formData.showCondition === true
}
```

### Q: 搜索表单的展开/收起功能如何使用？
**A:** 展开/收起按钮已实现 UI 但功能暂未完善，当前版本的 `toggleExtend` 方法为空实现。

