<style lang="scss">
.comp-picker-link {
  display: flex;
  .title {
    margin-top: 4px;
    margin-right: 4px;
  }
  .picker-link {
    border-bottom-width: 0;
    .el-submenu {
      &__title {
        padding: 0;
        height: 30px;
        line-height: 30px;
        color: var(--themeColor);
        font-size: 12px;
      }
      &.is-active {
        .el-submenu__title {
          border-bottom-width: 0;
        }
      }
    }
    .el-menu-item {
    }
  }
}
.picker-link-popper {
  .el-menu {
    min-width: 140px;
  }

  .el-menu-item {
    // width: 100px;
    height: 32px !important;
    line-height: 32px !important;
    font-size: 13px;
    &:hover {
      color: var(--themeColor);
      background-color: #f5f5f5;
    }
  }
}
</style>
<template>
  <div
    class="comp-picker-link"
    @click="handlePickerLink"
  >
    <span class="title">链接</span>
    <el-menu
      class="picker-link"
      mode="horizontal"
      @select="onSelectMenu"
    >
      <el-submenu
        class="picker-link-submenu"
        index="0"
        popper-class="picker-link-popper"
      >
        <template slot="title">
          选择跳转到的页面
        </template>

        <el-menu-item
          v-for="(item, index) in navs"
          :key="`menu-item__${index}`"
          :index="item.key"
        >
          {{ item.title }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'CompPickerLink',
  data () {
    return {
      navs: [
        { title: '商品', key: 'goods' },
        { title: '店铺', key: 'store' },
        { title: '分类', key: 'category' },
        { title: '标签', key: 'label' },
        { title: '文章', key: 'article' },
        { title: '软文', key: 'content' },
        { title: '页面', key: 'page' },
        { title: '营销', key: 'marketing' },
        { title: '活动报名', key: 'activity' },
        { title: '秒杀', key: 'seckill' },
        { title: '自定义页面', key: 'customPage' },
        { title: '直播', key: 'live' },
        { title: '外部小程序', key: 'extWeApp' }
      ]
    }
  },
  created () {},
  methods: {
    handlePickerLink () {},
    async onSelectMenu (key) {
      const { data } = await this.$picker[key]({
        data: []
      })
    }
  }
}
</script>
