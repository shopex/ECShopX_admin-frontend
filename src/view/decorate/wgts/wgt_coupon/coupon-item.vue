<style lang="scss"></style>
<template>
  <div>
    <!-- <div v-for="(item, index) in value" :key="`slider-item__${index}`" class="slider-item">
      <SpImagePicker v-model="item.imgUrl" />
      <CompPickerLink :value="item" @change="(e) => onChangeLink(e, index)" />
    </div> -->
    <el-button class="btn btn-add" size="small" plain @click="handleClickAdd">
      {{ `添加优惠券(${value.length}/5)` }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'CouponItem',
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    async handleClickAdd() {
      await this.$picker.coupon()
    }
  }
}
</script>
