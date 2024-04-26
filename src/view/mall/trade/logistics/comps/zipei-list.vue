<template>
  <div class="zipei-list">
    <div class="delivery-open">
      商家自配送是否开启：
      <el-switch v-model="is_open" active-color="#13ce66" inactive-color="#ff4949" />
    </div>
    <span class="delivery-open">平台自营店铺配送费用配置</span>
    <div>
        <div class="delivery-money">
            <span>配送：</span>
            <el-input-number v-model="min_amount" :precision="2" :step="0.1" :max="10"></el-input-number>
            <span>元，基础运费</span>
            <el-input-number v-model="freight_fee" :precision="2" :step="0.1" :max="10"></el-input-number>
            <span>元</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZiPeiList',
  /**
   * is_open  是否开启
   * min_amount  最小起配金额
   * freight_fee  基础运费
   * rule:  规则
   *  [{
   *   selected  是否选中
   *   full  满多少
   *   freight_fee  运费多少
   *  }]
   */
  data() {
    return {
      is_open: false,
      min_amount: 0,
      freight_fee: 0,
      rule: [
        {
          selected: false,
          full: 0,
          freight_fee: 0
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .el-input-number {
    margin: 0 14px;
    line-height: 34px;
}
.delivery-open {
  margin: 20px;
}
.delivery-money{
    display: flex;
    align-items: center;
    margin: 20px 60px;
}
</style>
