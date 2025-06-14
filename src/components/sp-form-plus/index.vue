<template>
  <el-form
    ref="form"
    class="sp-form-plus"
    :class="{
      'sp-form-plus--search-form': formType === 'searchForm',
      'sp-form-plus--inline': inline
    }"
    :model="formData"
    :label-width="labelWidth"
  >
    <div ref="wapperRef" class="sp-form-plus__wapper">
      <FormField
        v-for="item in formItems"
        :key="item.fieldName"
        :component="item.component || 'input'"
        :component-props="item.componentProps"
        :field-name="item.fieldName"
        :form-item-class="item.formItemClass"
        :label="`${item.label}${colon ? ':' : ''}`"
        :rules="item.rules"
        :value="formData[item.fieldName]"
        @input="val => handleFieldChange(item.fieldName, val)"
      />

      <template v-if="showDefaultActions">
        <div class="sp-form-plus__actions w-full text-right">
          <el-button type="primary" @click="handleSubmit">
            <div class="flex items-center">
              <SpIcon name="search" :size="14" />
              <span class="ml-1">查询</span>
            </div>
          </el-button>
          <el-button @click="handleReset">
            <div class="flex items-center">
              <SpIcon name="rotate-ccw" :size="14" />
              <span class="ml-1">重置</span>
            </div>
          </el-button>

          <!-- 搜索表单的扩展按钮 -->
          <el-button v-if="formType === 'searchForm'" type="text" @click="toggleExtend">
            <div class="flex items-center">
              <span>{{ `${extend ? '收起' : '展开'}` }}</span>
              <SpIcon
                :class="{ 'extend-icon': true, 'extend-active': extend }"
                name="chevrons-down"
              />
            </div>
          </el-button>
        </div>
      </template>
    </div>
  </el-form>
</template>

<script>
import FormField from './form-field'

export default {
  name: 'SpFormPlus',
  components: {
    FormField
  },
  props: {
    colon: {
      type: Boolean,
      default: false
    },
    formType: {
      type: String,
      default: ['searchForm']
    },
    formItems: {
      type: Array,
      default: () => []
    },
    formApi: {
      type: Object,
      default: () => ({})
    },
    inline: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '160px'
    },
    layout: {
      type: String,
      default: 'horizontal'
    },
    showDefaultActions: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formData: this.initFormData(),
      extend: false
    }
  },
  watch: {
    formItems: {
      handler() {
        this.formData = this.initFormData()
      },
      deep: true
    }
  },
  created() {
    console.log('initial formItems:', this.formItems)
  },
  methods: {
    // 初始化表单数据
    initFormData() {
      const formData = {}
      this.formItems.forEach(item => {
        formData[item.fieldName] = item.value || ''
      })
      return formData
    },
    // 处理字段值变化
    handleFieldChange(fieldName, value) {
      console.log('field change:', fieldName, value)
      this.$set(this.formData, fieldName, value)
      this.$emit('field-change', { fieldName, value })
    },
    // 提交表单
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData)
        }
      })
    },
    // 重置表单
    handleReset() {
      this.$refs.form.resetFields()
      this.$emit('reset')
    },
    // 验证表单
    validate() {
      debugger
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          valid ? resolve(this.formData) : reject(new Error('表单验证失败'))
        })
      })
    },
    // 重置指定字段
    resetField(field) {
      this.$refs.form.resetField(field)
    },
    // 清除验证
    clearValidate(props) {
      this.$refs.form.clearValidate(props)
    },
    toggleExtend() {}
  }
}
</script>

<style lang="scss" scoped>
.sp-form-plus {
  ::v-deep .el-select {
    display: block;
  }
  &--inline {
    .sp-form-plus__wapper {
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      .form-field {
        margin-bottom: 0;
      }
    }
  }
  &--search-form {
    background-color: #f6f7f9;
    box-sizing: content-box;
    padding: 16px 16px 16px;
  }
  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-column: -2 / -1;
  }
}
</style>
