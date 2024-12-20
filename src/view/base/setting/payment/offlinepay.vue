<style lang="scss"></style>
<template>
  <SpForm v-model="form" :form-list="formList" @onSubmit="onSaveConfig" />
</template>

<script>
export default {
  name: '',
  data() {
    return {
      form: {
        bank_account_name: '',
        bank_account_no: '',
        bank_name: '',
        // china_ums_no: '',
        auto_cancel_time: 0,
        is_examine:'1',
        pay_tips: '',
        is_open: false
      },
      formList: [
        {
          label: '支付方式名称',
          key: 'bank_account_name',
          type: 'input',
          required: true,
          message: '不能为空'
        },
        {
          label: '线下转账说明',
          key: 'pay_tips',
          type: 'textarea',
          width: '600px'
        },
        {
          label: '订单自动取消',
          key: 'auto_cancel_time',
          component: ({ key }, value) => {
            return (
              <div>
                未付款订单，将在
                <el-input
                  type='number'
                  min='0'
                  style='width: 100px;margin-left: 10px;'
                  v-model={value[key]}
                />
                （小时）之后取消
              </div>
            )
          },
          required: true,
          message: '不能为空'
        },
        {
          label: '是否需要财务审核',
          key: 'is_examine',
          type: 'radio',
          options: [
            {
              label: '1',
              name: '是'
            },
            {
              label: '0',
              name: '否'
            }
          ],
          required: true,
          message: '不能为空'
        },

        {
          label: '是否开启',
          key: 'is_open',
          type: 'switch'
        }
        // {
        //   label: '收款账户名称',
        //   key: 'bank_account_name',
        //   type: 'input',
        //   required: true,
        //   message: '不能为空'
        // },
        // {
        //   label: '银行账号',
        //   key: 'bank_account_no',
        //   type: 'input',
        //   required: true,
        //   message: '不能为空'
        // },
        // {
        //   label: '开户银行',
        //   key: 'bank_name',
        //   type: 'input',
        //   required: true,
        //   message: '不能为空'
        // },
        // {
        //   label: '银联号',
        //   key: 'china_ums_no',
        //   type: 'input',
        //   required: true,
        //   message: '不能为空'
        // },
      ]
    }
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    async getConfig() {
      const res = await this.$api.trade.getPaymentSetting({ pay_type: 'offline_pay' })
      this.form.bank_account_name = res.bank_account_name
      this.form.bank_account_no = res.bank_account_no
      this.form.bank_name = res.bank_name
      // this.form.china_ums_no = res.china_ums_no
      this.form.auto_cancel_time = res.auto_cancel_time
      this.form.pay_tips = res.pay_tips
      this.form.is_open = res.is_open == 1
      this.form.is_examine = res.is_examine
    },
    async onSaveConfig() {
      const params = {
        ...this.form,
        pay_type: 'offline_pay',
        is_open: this.form.is_open ? 1 : 0
      }
      await this.$api.trade.setPaymentSetting(params)
      this.$message.success('保存成功')
    }
  }
}
</script>
