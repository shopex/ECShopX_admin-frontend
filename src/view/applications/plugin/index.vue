<style scoped lang="scss">
.app-item {
  display: flex;
  border: 1px solid #e9e9e9;
  margin-bottom: 20px;
  padding: 16px;
}
.app-logo {
  width: 140px;
  height: 140px;
  margin-right: 10px;
}
.app-name {
  font-weight: 600;
}
.app-desc {
  font-size: 13px;
  height: 80px;
  color: #979797;
}

.dialog-app-content {
  display: flex;
  .connect-icon {
    width: 220px;
    height: 220px;
  }
  .connect-desc {
    margin-left: 10px;
  }
}
</style>
<style lang="scss">
.dialog-app {
  .el-dialog__body {
    padding: 20px;
  }
}
</style>

<template>
  <div>
    <template v-if="!VERSION_IN_PURCHASE">
      <el-row class="" :gutter="20">
        <el-col v-for="(item, index) in appList" :key="`app-item__${index}`" :span="8">
          <div class="app-item">
            <div class="app-logo">
              <el-image :src="require(`@/assets/img/ectapp/${item.key}.png`)" />
            </div>
            <div>
              <div class="app-name">{{ item.title }}</div>
              <div class="app-desc">{{ item.desc }}</div>
              <div class="app-action">
                <el-button type="primary" @click="onClickItem(item)">{{ item.button }}</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-dialog
        custom-class="dialog-app"
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="680px"
      >
        <div class="dialog-app-content">
          <div class="connect-icon">
            <el-image :src="require(`@/assets/img/ectapp/${selectKey}_code.png`)" />
          </div>
          <div class="connect-desc">
            <div class="txt-m">扫描左侧二维码联系工作人员订购应用，订购成功前无法使用。</div>
            <div class="txt-s">如已订购，请联系客服处理。</div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = true">确定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      visible: false,
      status: false,
      appList: [
        {
          title: 'Adapay分账',
          key: 'adapay',
          desc: '商派 ECShopX 集成汇付分账，作为合规、安全、灵活的聚合支付解决方案，通过多级账户管理、聚合支付、高效结算等多维度助力电商实现平台化、数字化。',
          button: '立即订购'
        },
        {
          title: '积分商城',
          key: 'point',
          desc: '积分商城是一个通过让用户兑换商品，提升积分价值的营销工具，帮助商户增强用户粘性，让客户保持活跃，促进用户下单，提高转化及复购。',
          button: '立即开启'
        },
        {
          title: '内购商城',
          key: 'neigou',
          desc: '品牌商家与企业进行合作，为企业提供商品的内部购买优惠福利。通过企业员工裂变亲友新客，提升下单转化效率，实现资金快速流转。',
          button: '立即开启'
        },
        {
          title: '营销中心',
          key: 'yingxiao',
          desc: '基于企业微信的营销工具，帮助品牌建立1对1的服务关系，可视化客户画，标准化的生命周期沟通，精准的产品推荐，提升工作效率和销售转化率。',
          button: '立即订购'
        },
        {
          title: '高性能秒杀',
          key: 'miaosha',
          desc: '促进客户购买品牌商品而开展的营销活动，通过商品低价让利与限时限量的稀缺效应，吸引客户抢购秒杀品，同时有机会对这部分客户进行转化，在品牌下产生更多消费。',
          button: '立即订购'
        }
      ],
      selectKey: 'adapay',
      dialogTitle: '',
      dialogVisible: false
    }
  },
  created() {
    this.fetch()
  },
  mounted() {},
  methods: {
    clickChange(visible) {
      this.visible = visible
    },
    async fetch() {
      this.loading = true
      const { status } = await this.$api.application.adapayIsOpen()
      this.loading = false
      this.status = status
    },
    onClickItem({ name, key, title }) {
      (this.dialogTitle = title), (this.selectKey = key)
      this.dialogVisible = true
    }
  }
}
</script>
