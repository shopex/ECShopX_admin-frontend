<template>
  <div :class="{'wgt-goods-scroll': true, 'padded': value.padded}">
    <div v-if="value.title || value.subtitle" class="wgt-hd">
      <span class="title">{{ value.title }}</span>
      <countdown v-if="value.type !== 'goods'" :end-time="time" :end-text="'活动已结束'" :callback="function () {}">
        <template slot-scope="scope">
          <div v-if="!scope.content" class="wgt-goods-scroll-timer">
            <div class="timer">{{ scope.day ? scope.day : '00' }} </div>
            <div class="dot">天</div>
            <div class="timer">{{ scope.hour ? scope.hour : '00' }}</div>
            <div class="dot">时</div>
            <div class="timer">{{ scope.min ? scope.min : '00' }}</div>
            <div class="dot">分</div>
            <div class="timer">{{ scope.sec ? scope.sec : '00' }}</div>
            <div class="dot"> 秒 </div>
            <div>{{ text }}</div>
          </div>
          <div v-else class="wgt-goods-scroll-timer">{{ scope.content }}</div>
        </template>
      </countdown>
      <span v-else class="sub-title">{{ value.subtitle }}</span>
    </div>
    <div class="wgt-bd" :class="{'spaced': value.spaced}">
      <SpImage v-model="value.backgroundImg" :width="96" :height="96" />
      {{JSON.stringify(value)}}
    </div>
  </div>
</template>

<script>
import config from './config'
import countDown from '@/components/countdown'
const subscript = require('@/assets/img/subscript.png')
import { getSeckillItemList } from '@/api/promotions'

export default {
  name: 'GoodsScroll',
  wgtName: '商品滚动',
  wgtDesc: '',
  wgtIcon: 'wgt-goods-scroll',
  config: config,
  props: {
    value: [Object, Array]
  },
  components: {
    countdown: countDown
  },
  data() {
    return {
      seckillId: '',
      text: '',
      time: 0,
      subscriptImg: subscript,
      colorPrimary: '',
      data: []
    }
  },
  watch: {
    value: {
      handler (val) {
        this.time = 0
        this.data = val.data
        this.seckillId = val.seckillId
      },
      deep: true,
      immediate: true
    },
    seckillId: {
      handler (value) {
        if (value) {
          getSeckillItemList({
            seckill_id: value,
            page: 1,
            pageSize: 10,
            is_sku: 0,
            seckill_type: this.value.type === 'limitTimeSale' ? 'limited_time_sale' : ''
          }).then((res) => {
            let data = res.data.data
            if (data.activity.status === 'in_sale') {
              this.time = data.activity.activity_end_time
              this.text = '后结束'
            } else if (data.activity.status === 'in_the_notice') {
              this.time = data.activity.activity_start_time
              this.text = '后开始'
            } else {
              this.time = 0
            }

            this.data.splice(data.length)
            this.data = this.data
            console.log(this.time, 'time')

            data.list.forEach((item, index) => {
              let obj = {
                imgUrl: item.item_pic,
                title: item.item_title,
                price: item.price,
                act_price: item.activity_price,
                goodsId: item.item_id,
                distributor_id: item.distributor_id
              }
              this.data.splice(index, 1, obj)
            })
          })
        }
      },
      deep: true
    }
  },
  mounted () {
    this.colorPrimary = this.$store.getters.color_theme.primary
  },
}
</script>
<style lang="scss" src="./index.scss"></style>