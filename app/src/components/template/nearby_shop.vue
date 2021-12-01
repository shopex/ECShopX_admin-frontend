<template>
  <div class="component-wrap" :class="{ 'component-padded': base.padded, 'active': active }">
    <div class="current-active"></div>
    <div v-if="base.title" class="component-header">
      <div class="component-title">
        <div>{{ base.title }}</div>
      </div>
      <div class="component-more" style="flex: 1;text-align:right;justify-content: end;">
        <div class="more">查看更多 ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    res: {
      type: Object,
      default: {}
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      base: {}
    }
  },
  mounted() {
    this.setData(this.res)
  },
  methods: {
    setData(val) {
      this.base = val.base
    }
  }
}
</script>

<style lang="scss" scoped>
.component-wrap {
  .component-more {
      
  }
}
</style>