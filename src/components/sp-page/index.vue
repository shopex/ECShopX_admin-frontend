<template>
  <div
    class="sp-page p-4 h-full flex flex-col overflow-y-auto"
    :class="{ 'sp-page--no-header': !title && !$slots['page-header'] }"
    ref="pageContainer"
  >
    <div
      v-if="title || $slots['page-header']"
      class="sp-page__header py-4 pl-5 pr-4 flex items-center bg-white"
      :class="{ 'sp-page__header--sticky': isSticky }"
      ref="header"
    >
      <div class="sp-page__header-title">{{ title }}</div>
      <div class="sp-page__header-toolbar flex-1">
        <slot name="page-header" />
      </div>
    </div>
    <div class="sp-page__content p-4 bg-white flex-1">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpPage',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isSticky: false
    }
  },
  created() {},
  mounted() {
    this.initStickyHeader()
  },
  beforeDestroy() {
    this.removeScrollListener()
  },
  methods: {
    initStickyHeader() {
      if (!this.$refs.pageContainer || !this.$refs.header) return

      this.$refs.pageContainer.addEventListener('scroll', this.handleScroll)
    },
    handleScroll() {
      if (!this.$refs.header) return

      if (this.$refs.pageContainer.scrollTop > 14) {
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    },
    removeScrollListener() {
      if (this.$refs.pageContainer) {
        this.$refs.pageContainer.removeEventListener('scroll', this.handleScroll)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sp-page {
  &__header {
    border-radius: 6px 6px 0 0;
    transition: all 0.3s ease;

    &-title {
      font-size: 22px;
      color: #333;
    }

    &--sticky {
      position: sticky;
      top: -14px;
      z-index: 100;
      // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
    }
  }

  &__content {
    border-radius: 0 0 6px 6px;
  }

  &--no-header {
    .sp-page__content {
      border-radius: 6px;
    }
  }
}
</style>
