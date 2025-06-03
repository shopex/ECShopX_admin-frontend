<template>
  <svg
    :class="['sp-icon', customClass]"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      color: color
    }"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
    <!-- 开发环境下显示调试信息 -->
    <text
      v-if="isDev && !iconExists"
      x="50%"
      y="50%"
      text-anchor="middle"
      font-size="12"
      fill="red"
    >
      {{ name }}
    </text>
  </svg>
</template>

<script>
export default {
  name: 'SpIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: 'currentColor'
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      iconExists: true,
      isDev: process.env.NODE_ENV === 'development'
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`
    }
  },
  mounted() {}
}
</script>

<style scoped>
.sp-icon {
  display: inline-block;
  fill: currentColor;
  vertical-align: middle;
}
</style>
