<template>
  <aside :style="style">
    <!-- Logo -->
    <div class="menu-item flex h-12 items-center px-3">
      <el-avatar :size="36">
        <img
          src="https://shopex-onex-yundian-image.oss-cn-shanghai.aliyuncs.com/demo-ecshopx/image/38/2025/04/01/9a5087ce16d15ec7fc7b4cd326aa55161743460927000.亚朵47.png"
        >
      </el-avatar>
      <span class="text-foreground font-semibold text-nowrap">管理后台</span>
    </div>

    <!-- 菜单 -->
    <el-menu class="test-menu">
      <!-- <renderSubMenuItems :menus="menus" /> -->
    </el-menu>
  </aside>
</template>

<script>
// import { MENU_ICON_MAP } from '@/constants'
// import { preferences } from '../../preferences'

export default {
  name: 'LayoutSidebar'
}
</script>

<style scoped lang="scss">
:deep(.el-menu-item) {
  border-radius: var(--el-border-radius-base);
  height: 42px;
  margin: 0 8px 2px;
  padding-right: 12px !important;
}

:deep(.el-sub-menu__title) {
  border-radius: var(--el-border-radius-base);
  margin: 0 8px 2px;
  background: 216 14% 93% !important;
}
</style>
