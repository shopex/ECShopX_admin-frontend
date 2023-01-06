<style lang="scss"></style>
<template>
  <div>
    <div v-for="(item, index) in value" :key="`slider-item__${index}`" class="slider-item">
      <SpImagePicker />
      <CompPickerLink />
    </div>
    <el-button class="btn btn-add" plain @click="handleClickAdd"> 添加图片(0/5) </el-button>
  </div>
</template>

<script>
export default {
  name: 'AttrSliderItem',
  props: ['value'],
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
  created() {},
  methods: {
    async handleClickAdd() {
      const { data } = await this.$picker.image({
        data: [],
        multiple: true
      })
      this.localValue = data
    }
  }
}
</script>
