<style lang="scss" scoped>
.coupon-wrap {
  width: 100%;
}
.coupon-item {
  display: flex;
}
.coupon {
  flex: 1;
  font-size: 13px;
}
.icon-trash-alt1 {
  color: #888;
  font-size: 13px;
}
</style>
<template>
  <div class="coupon-wrap">
    <div v-for="(item, index) in value" :key="`coupon-item__${index}`" class="coupon-item">
      <SpImagePicker v-model="item.imgUrl" size="small" />
      <div class="coupon">{{ item.title }}</div>
      <div><i class="iconfont icon-trash-alt1" @click="deleteCouponItem(index)" /></div>
    </div>
    <el-button class="btn btn-add" size="small" plain @click="handleClickAdd">
      {{ `添加优惠券(${value.length}/3)` }}
    </el-button>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
export default {
  name: 'CouponItem',
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      localValue: []
    }
  },
  watch: {
    localValue: function (nVal, oVal) {
      this.$emit('input', nVal)
    }
  },
  created() {
    this.localValue = cloneDeep(this.value)
  },
  methods: {
    async handleClickAdd() {
      const { data } = await this.$picker.coupon()
      this.localValue = data.map((item) => {
        debugger
        return {
          amount: 30,
          desc: '满100减30',
          id: '252',
          imgUrl:
            'https://ecshopx1.yuanyuanke.cn/image/1/2022/06/27/1f14b168dc81139d9f6413d8ca15b1f41SVcD2LhcV2mUtc8uSCBRqvKVWE1QUb4',
          title: '满100减30',
          type: 'cash'
        }
      })
    },
    deleteCouponItem(index) {
      this.localValue.splice(index, 1)
    }
  }
}
</script>
