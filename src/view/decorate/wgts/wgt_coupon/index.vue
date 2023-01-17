<style lang="scss">
.wgt-coupon {
  &.padded {
    padding: 10px 0;
  }
  .wgt-hd {
    padding: 10px;
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
    .sub-title {
      color: #666;
      margin-left: 4px;
    }
  }
}
</style>
<template>
  <div
    :class="{
      'wgt-coupon': true,
      'padded': value.padded
    }"
  >
    <div v-if="value.title || value.subtitle" class="wgt-hd">
      <span class="title">{{ value.title }}</span>
      <span class="sub-title">{{ value.subtitle }}</span>
    </div>
    <div
      class="wgt-bd"
      :class="{
        'spaced': value.spaced
      }"
    >
      coupon
    </div>
  </div>
</template>

<script>
import config from './config'
export default {
  name: 'Coupon',
  wgtName: '优惠券',
  wgtDesc: '',
  wgtIcon: 'wgt-coupon',
  config: config,
  props: {
    value: [Object, Array]
  },
  data() {
    return {
      currentIndex: 1
    }
  },
  computed: {
    sourceUrl() {
      const { data } = this.value
      return data?.url || ''
    }
  },
  created() {},
  methods: {}
}
</script>
