import { bindThisForFormSchema } from '@/utils/schemaHelper'

export const formSchema = (vm) => bindThisForFormSchema([
  {
    type: 'group',
    label: '发票设置'
  },
  {
    label: '开票渠道',
    key: 'alipay_fee_type',
    type: 'radio',
    options: [
      { name: '线下开票', label: 'online' },
      { name: '线上开票（对接第三方开票系统）', label: 'offline' }
    ]
  },
  {
    label: '开票申请方式',
    key: 'alipay_fee_type',
    type: 'radio',
    options: [
      { name: '结算页可申请开票', label: 'online' },
      { name: '运费不支持开票', label: 'offline' }
    ]
  },
  {
    label: '运费是否开票',
    key: 'alipay_fee_type',
    type: 'radio',
    options: [
      { name: '运费支持开票', label: 'online' },
      { name: '运费不支持开票', label: 'offline' }
    ]
  },
  {
    label: '运费开票名称',
    key: 'alipay_fee_type',
    type: 'input',
    tip:'为空时默认运费开票名称，如果填写名称按填写名称展示在发票上'
  },
  {
    label: '开票维度',
    key: 'alipay_fee_type',
    type: 'radio',
    options: [
      { name: '按订单开票', label: 'online' }
    ]
  },
  {
    label: '可开票期限',
    key: 'alipay_fee_type',
    component({ key }, value){
      return(
        <div>订单商品签收后，且在订单创建&nbsp; <el-input v-model={value[key]} type='number' min='0' /> &nbsp;(月)内支持申请开票</div>
      )
    }
  },
  {
    label: '专用发票展示',
    key: 'alipay_fee_type',
    type: 'radio',
    options: [
      { name: '企业抬头可选择专用发票', label: 'online' },
      { name: '运费不支持开票', label: 'offline' }
    ]
  },
  {
    label: '运费是否开票',
    key: 'alipay_fee_type',
    type: 'radio',
    options: [
      { name: '运费支持开票', label: 'online' },
      { name: '企业抬头不可以选择专用发票（前端此选项不展示，默认为普通发票）', label: 'offline' }
    ]
  },
  {
    label: '申请开票节点',
    key: 'alipay_fee_type',
    type: 'radio',
    options: [
      { name: '订单过了售后期', label: 'online' },
      { name: '订单确认收货', label: 'offline' }
    ]
  },
],
  vm
)
