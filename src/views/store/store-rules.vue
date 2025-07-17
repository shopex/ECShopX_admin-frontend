<template>
  <SpPage>
    <div class="store-rules-container">
      <SpFormPlus
        ref="storeRulesForm"
        form-type="normalForm"
        :form-items="formItems"
        :value="formData"
        label-width="180px"
        @submit="handleSubmit"
        @field-change="handleFieldChange"
      />
    </div>
  </SpPage>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        // 非自然流量配置
        miniProgramAccess: true,
        shareCardAccess: true,
        guidanceEnabled: false,
        guidanceWechatGroup: true,
        guidanceMoments: true,

        // 自然流量配置
        exclusiveStoreEnabled: false,
        exclusiveStoreAccess: true,
        lbsWechatEnabled: false,
        lbsWechatAccess: true,

        // 免责条款
        disclaimerEnabled: true,
        defaultUser: '介绍值',
        pageLimit: 1566,
        additionalSettings: ''
      },
      formItems: [
        // 非自然流量分组标题
        {
          fieldName: 'nonNaturalTrafficTitle',
          label: '店铺码进店',
          component: 'switch',
          tip: () => (
            <div>
              <p>通过带门店参小程序码扫码进入对应店铺</p>
              <p>通过分享小程序卡片进入对应店铺</p>
            </div>
          )
        },

        // 店铺的过度
        {
          fieldName: 'storeTransitionTitle',
          label: '',
          component: ({ h }) => {
            return h(
              'div',
              {
                class: 'form-sub-title'
              },
              [h('h4', '店铺的过度：')]
            )
          }
        },

        {
          fieldName: 'miniProgramAccess',
          label: '通过制7日售小程序用户进入对应店铺',
          component: 'checkbox',
          componentProps: {
            options: [{ label: '启用', value: true }]
          }
        },

        {
          fieldName: 'shareCardAccess',
          label: '通过分享小程序卡片进入对应店铺',
          component: 'checkbox',
          componentProps: {
            options: [{ label: '启用', value: true }]
          }
        },

        // 导购带料过度
        {
          fieldName: 'guidanceTitle',
          label: '',
          component: ({ h }) => {
            return h(
              'div',
              {
                class: 'form-sub-title'
              },
              [h('h4', '导购带料过度（需开通导购功能）：')]
            )
          }
        },

        {
          fieldName: 'guidanceEnabled',
          label: '开通导购功能',
          component: 'radio',
          componentProps: {
            options: [
              { label: '是', value: true },
              { label: '否', value: false }
            ]
          }
        },

        {
          fieldName: 'guidanceWechatGroup',
          label: '通过日企微信群如导购加好友的过度建议降低的事来卡片过度',
          component: 'checkbox',
          componentProps: {
            options: [{ label: '启用', value: true }]
          },
          isShow: value => {
            return this.formData.guidanceEnabled === true
          }
        },

        {
          fieldName: 'guidanceMoments',
          label: '通过导购微信朋友圈的事来解决、小程序卡片过度',
          component: 'checkbox',
          componentProps: {
            options: [{ label: '启用', value: true }]
          },
          isShow: value => {
            return this.formData.guidanceEnabled === true
          }
        },

        // 自然流量分组
        {
          fieldName: 'naturalTrafficTitle',
          label: '',
          component: ({ h }) => {
            return h(
              'div',
              {
                class: 'form-group-title'
              },
              [h('h3', '自然流量（不带参）')]
            )
          }
        },

        // 进入专属时所商店
        {
          fieldName: 'exclusiveStoreTitle',
          label: '',
          component: ({ h }) => {
            return h(
              'div',
              {
                class: 'form-sub-title'
              },
              [h('h4', '进入专属时所商店（需开通导购功能）')]
            )
          }
        },

        {
          fieldName: 'exclusiveStoreEnabled',
          label: '开通专属商店功能',
          component: 'radio',
          componentProps: {
            options: [
              { label: '是', value: true },
              { label: '否', value: false }
            ]
          }
        },

        {
          fieldName: 'exclusiveStoreAccess',
          label: '通过日企微信群如导购加好友、进入专属时所商店',
          component: 'checkbox',
          componentProps: {
            options: [{ label: '启用', value: true }]
          },
          isShow: value => {
            return this.formData.exclusiveStoreEnabled === true
          }
        },

        // LBS微信过度
        {
          fieldName: 'lbsWechatTitle',
          label: '',
          component: ({ h }) => {
            return h(
              'div',
              {
                class: 'form-sub-title'
              },
              [h('h4', 'LBS微信过度')]
            )
          }
        },

        {
          fieldName: 'lbsWechatEnabled',
          label: '开通LBS微信功能',
          component: 'radio',
          componentProps: {
            options: [
              { label: '是', value: true },
              { label: '否', value: false }
            ]
          }
        },

        {
          fieldName: 'lbsWechatAccess',
          label: '通过日企微信群如导购加好友、进入专属时所商店',
          component: 'checkbox',
          componentProps: {
            options: [{ label: '启用', value: true }]
          },
          isShow: value => {
            return this.formData.lbsWechatEnabled === true
          }
        },

        // 免责条款
        {
          fieldName: 'disclaimerTitle',
          label: '',
          component: ({ h }) => {
            return h(
              'div',
              {
                class: 'form-group-title'
              },
              [h('h3', '免责条款')]
            )
          }
        },

        {
          fieldName: 'disclaimerEnabled',
          label: '包含条款、导航界面、充值LBS到期条款',
          component: 'checkbox',
          componentProps: {
            options: [{ label: '启用', value: true }]
          }
        },

        {
          fieldName: 'defaultUser',
          label: '默认人',
          component: 'input',
          componentProps: {
            placeholder: '请输入默认人'
          },
          rules: [{ required: true, message: '请输入默认人', trigger: 'blur' }]
        },

        {
          fieldName: 'pageLimit',
          label: '包含又页面',
          component: 'input',
          componentProps: {
            type: 'number',
            placeholder: '请输入页面数量'
          },
          rules: [{ required: true, message: '请输入页面数量', trigger: 'blur' }]
        },

        {
          fieldName: 'additionalSettings',
          label: '其他设置',
          component: 'input',
          componentProps: {
            type: 'textarea',
            placeholder: '请输入其他设置信息',
            rows: 3
          },
          tip: '可以输入其他相关配置信息'
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      console.log('提交店铺规则配置:', formData)

      // 这里可以调用API保存配置
      this.saveStoreRules(formData)
    },

    handleFieldChange({ fieldName, value }) {
      console.log('字段变化:', fieldName, value)
      this.formData[fieldName] = value

      // 处理联动逻辑
      if (fieldName === 'guidanceEnabled' && !value) {
        this.formData.guidanceWechatGroup = false
        this.formData.guidanceMoments = false
      }

      if (fieldName === 'exclusiveStoreEnabled' && !value) {
        this.formData.exclusiveStoreAccess = false
      }

      if (fieldName === 'lbsWechatEnabled' && !value) {
        this.formData.lbsWechatAccess = false
      }
    },

    async saveStoreRules(formData) {
      try {
        // 模拟API调用
        const response = await this.$api.store.saveRules(formData)

        if (response.success) {
          this.$message.success('店铺规则配置保存成功')
        } else {
          this.$message.error('保存失败：' + response.message)
        }
      } catch (error) {
        console.error('保存店铺规则失败:', error)
        this.$message.error('保存失败，请重试')
      }
    },

    // 验证表单
    async validateForm() {
      try {
        const formData = await this.$refs.storeRulesForm.validate()
        return formData
      } catch (errors) {
        console.error('表单验证失败:', errors)
        throw errors
      }
    },

    // 重置表单
    resetForm() {
      this.$refs.storeRulesForm.resetField()
    },

    async loadStoreRules() {
      try {
        const response = await this.$api.store.getRules()
        if (response.success && response.data) {
          // 更新表单数据
          Object.assign(this.formData, response.data)
        }
      } catch (error) {
        console.error('加载店铺规则失败:', error)
      }
    }
  },

  mounted() {
    // 页面加载时获取现有配置
    this.loadStoreRules()
  }
}
</script>

<style lang="scss" scoped></style>
