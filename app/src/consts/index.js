export const SALES_STATUS = [
  { title: '前台可销售', value: 'onsale' },
  { title: '可线下销售', value: 'offline_sale' },
  { title: '前台仅展示', value: 'only_show' },
  { title: '不可销售', value: 'instock' }
]

export const DISTRIBUTION_TYPE = [
  { title: '全部', value: '' },
  { title: '普通快递', value: 'logistics' },
  { title: '同城配', value: 'dada' },
  { title: '客户自提', value: 'ziti' }
]

export const ORDER_STATUS = [
  { title: '全部', value: '' },
  { title: '待支付', value: 'notpay' },
  { title: '待发货', value: 'notship' },
  { title: '待收货', value: 'shipping' },
  { title: '待退款', value: 'cancelapply' },
  { title: '待自提', value: 'ziti' },
  { title: '已取消', value: 'cancel' },
  { title: '已完成', value: 'finish' },
  { title: '待接单', value: 'dada_0' },
  { title: '待骑士接单', value: 'dada_1' },
  { title: '待取货', value: 'dada_2' },
  { title: '骑士到店', value: 'dada_100' },
  { title: '配送中', value: 'dada_3' },
  { title: '未妥投', value: 'dada_9' }
]

export const ORDER_TYPE = [
  { title: '全部', value: '' },
  { title: '团购订单', value: 'groups' },
  { title: '秒杀订单', value: 'seckill' },
  { title: '普通订单', value: 'normal' }
  // { title: "导购订单", value: "shopguide" },
  // { title: "跨境订单", value: "crossborder" },
  // { title: "助力订单", value: "bargain" },
  // { title: "社区订单", value: "community" },
  // { title: "服务类订单", value: "services" },
  // { title: "兑换订单", value: "excard"}
]

export const INVOICE_STATUS = [
  { title: '全部', value: '' },
  { title: '未开票', value: 0 },
  { title: '已开票', value: 1 }
]

export const ORDER_CATEGORY = [
  { title: '全部', value: '' },
  { title: '自营订单', value: 'self' },
  { title: '商家订单', value: 'shop' }
]

export const PICKER_DATE_OPTIONS = {
  shortcuts: [
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}