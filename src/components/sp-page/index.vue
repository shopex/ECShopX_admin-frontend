<template>
  <div
    class="sp-page p-4 h-full flex flex-col"
    :class="{
      'sp-page--no-header': !hasHeader,
      'sp-page--no-footer': !hasFooter,
      'sp-page--sticky': !noSticky
    }"
    ref="pageContainer"
  >
    <div class="bg-white rounded-[6px]">
      <div class="sp-page__header py-4 pl-5 pr-4 flex items-center" ref="header">
        <div class="sp-page__header-title">{{ title }}</div>
        <div class="sp-page__header-toolbar flex-1">
          <slot name="page-header" />
        </div>
      </div>
      <div class="sp-page__content p-4 flex-1">
        <slot />
      </div>
      <div class="sp-page__footer">
        <div class="footer-content py-4">
          <slot name="page-footer" />
        </div>
      </div>
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
    },
    noSticky: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    hasHeader() {
      return !!this.title || this.$scopedSlots['page-header']
    },
    hasFooter() {
      return this.$scopedSlots['page-footer']
    }
  },
  created() {},
  mounted() {
    // !this.noSticky && this.initStickyHeader()
  },
  beforeDestroy() {
    // this.removeScrollListener()
  },
  methods: {
    // initStickyHeader() {
    //   document.getElementById('page-container').addEventListener('scroll', this.handleScroll)
    // },
    // handleScroll() {
    //   if (!this.$refs.header) return
    //   if (document.getElementById('page-container').scrollTop > 60) {
    //     this.isSticky = true
    //   } else {
    //     this.isSticky = false
    //   }
    // },
    // removeScrollListener() {
    //   if (document.getElementById('page-container')) {
    //     document.getElementById('page-container').removeEventListener('scroll', this.handleScroll)
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.sp-page {
  &--sticky {
    .sp-page__footer {
      position: sticky;
      bottom: 0;
      z-index: 100;
    }
  }
  &--no-header {
    .sp-page__header {
      display: none;
    }
  }
  &--no-footer {
    .sp-page__footer {
      display: none;
    }
  }

  &__header {
    &-title {
      font-size: 22px;
      color: #333;
    }
  }

  &__footer {
    overflow: hidden;
    transition: all 0.3s ease;
    .footer-content {
      background: color-mix(in srgb, var(--primary) 8%, transparent);
    }
  }
}
</style>
