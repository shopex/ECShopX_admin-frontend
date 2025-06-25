<template>
  <div class="p-4">
    <div class="grid grid-cols-3 gap-4">
      <div v-for="(item, index) in realTimeData" :key="index">
        <div class="flex flex-col bg-white rounded-lg px-6">
          <div class="text-md text-card-foreground flex items-center py-4 gap-2 border-b">
            <SpIcon :name="item.icon" size="20" :fill="themeColor" />
            <span class="text-[16px]">{{ item.label }}</span>
          </div>
          <div class="py-6">
            <div class="text-[28px] text-[#333] leading-10 font-[roboto]">{{ item.today }}</div>
            <div class="text-[14px] mt-2 leading-5 text-[#999]">昨日：{{ item.yesterday }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <div class="bg-white rounded-lg p-6 notice-box">
        <div>重要信息</div>
      </div>
      <div class="bg-white rounded-lg p-6">
        <div class="flex justify-between items-center">
          <div class="text-[18px] text-[#333]">7天用户趋势</div>
          <SpTabs :tab-list="tabList" v-model="activeTab" @change="handleTabChange" />
        </div>
        <div id="member-chart" class="h-[350px] mt-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { Column } from '@antv/g2plot'
import { formatPrice } from '@/utils'
import Config from '@/config'
export default {
  data() {
    return {
      chartData: {
        new_user: [],
        new_vip: [],
        new_svip: []
      },
      realTimeData: {
        atv: {
          icon: 'finance',
          label: '客单价',
          today: 0,
          yesterday: 0
        },
        refunded_fee: {
          icon: 'tag-one',
          label: '退款金额',
          today: 0,
          yesterday: 0
        },
        payed_fee: {
          icon: 'expenses',
          label: '实付金额',
          today: 0,
          yesterday: 0
        },
        payed_orders: {
          icon: 'shopping-cart-del',
          label: '实付订单数',
          today: 0,
          yesterday: 0
        },
        payed_members: {
          icon: 'light-member',
          label: '实付会员数',
          today: 0,
          yesterday: 0
        },
        aftersale_count: {
          icon: 'date-comes-back',
          label: '售后订单数',
          today: 0,
          yesterday: 0
        }
      },
      activeTab: 'new_user',
      tabList: [
        { name: 'new_user', label: '新增人数' },
        { name: 'new_vip', label: '新增VIP' },
        { name: 'new_svip', label: '新增SVIP' }
      ],
      themeColor: Config.themeConfig.primaryColor
    }
  },
  mounted() {
    this.getCompanyStatistics()
  },
  methods: {
    async getCompanyStatistics() {
      const { member_data, notice_data, today_data, yesterday_data } =
        await this.$api.company.getCompanyStatistics()
      this.realTimeData.payed_fee.today = formatPrice(today_data.real_payed_fee, true, '')
      this.realTimeData.payed_fee.yesterday = formatPrice(yesterday_data.real_payed_fee, true, '')
      this.realTimeData.payed_orders.today = today_data.real_payed_orders
      this.realTimeData.payed_orders.yesterday = yesterday_data.real_payed_orders
      this.realTimeData.payed_members.today = today_data.real_payed_members
      this.realTimeData.payed_members.yesterday = yesterday_data.real_payed_members
      this.realTimeData.atv.today = formatPrice(today_data.real_atv, true, '')
      this.realTimeData.atv.yesterday = formatPrice(yesterday_data.real_atv, true, '')
      this.realTimeData.refunded_fee.today = formatPrice(today_data.real_refunded_fee, true, '')
      this.realTimeData.refunded_fee.yesterday = formatPrice(
        yesterday_data.real_refunded_fee,
        true,
        ''
      )
      this.realTimeData.aftersale_count.today = today_data.real_aftersale_count
      this.realTimeData.aftersale_count.yesterday = yesterday_data.real_aftersale_count

      Object.keys(member_data).forEach(key => {
        this.chartData['new_user'].push({
          type: key.replace(/^\d{4}(\d{2})(\d{2})$/, '$1月$2日'),
          sales: member_data[key].newAddMember
        })
        this.chartData['new_vip'].push({
          type: key.replace(/^\d{4}(\d{2})(\d{2})$/, '$1月$2日'),
          sales: member_data[key].vipMember
        })
        this.chartData['new_svip'].push({
          type: key.replace(/^\d{4}(\d{2})(\d{2})$/, '$1月$2日'),
          sales: member_data[key].svipMember
        })
      })
      this.drawChart('new_user')
    },
    drawChart(tab) {
      console.log(Config.themeConfig.primaryColor.match(/\(([^)]+)\)/)?.[1])
      debugger
      this.columnPlot = new Column(document.getElementById('member-chart'), {
        data: this.chartData[tab],
        xField: 'type',
        yField: 'sales',
        // color: Config.themeConfig.primaryColor,
        color: `l(90) 0:hsla(${
          Config.themeConfig.primaryColor.match(/\(([^)]+)\)/)?.[1]
        }, 1) 1:hsla(${Config.themeConfig.primaryColor.match(/\(([^)]+)\)/)?.[1]}, 0.5)`
        // color: `l(90) 0:${Config.themeConfig.primaryColor} 1:hsla(37 100% 50%, 0.5)`
        // color: 'l(90) 0:hsla(209, 100%, 55%, 0.3) 1:hsla(100, 100%, 44%, 0.7)'
      })
      this.columnPlot.render()
    },
    handleTabChange(tab) {
      this.columnPlot.changeData(this.chartData[tab])
    }
  }
}
</script>

<style lang="scss" scoped>
// .notice-box {
//   width: calc((100% - 32px) / 3);
// }
</style>
