<script setup lang="ts">
import LayoutSidebar from './layout-sidebar.vue'
// import LayoutContent from "./layout-content.vue";
// import LayoutHeader from "./layout-header.vue";
// import LayoutTabbar from "./layout-tabbar.vue";
</script>

<template>
  <div class="relative flex min-h-full w-full">
    <el-container>
      <el-aside width="224px">
        <LayoutSidebar />
      </el-aside>

      <el-container>
        <el-header>
          <!-- <LayoutHeader />
          <LayoutTabbar /> -->
        </el-header>

        <el-main>
          <LayoutContent>
            <RouterView />
          </LayoutContent>
        </el-main>

        <el-footer />
      </el-container>
    </el-container>

    <!-- 
    <div class="flex flex-1 flex-col overflow-hidden">
      <div>
        

        

        
      </div>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.el-header {
  padding-left: 8px;
  padding-right: 0;
}
</style>
