<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, useSlots } from 'vue'
import ExIcon from '@/components/ex-icon/index.vue'
import { useAccessStore } from '@/stores'
// import { Menu } from "lucide-vue-next";

interface Props {
  /**
   * 横屏
   */
  fullWidth: boolean
  /**
   * 高度
   */
  height: number
  /**
   * 是否显示
   */
  show: boolean
  /**
   * 侧边菜单宽度
   */
  sidebarWidth: number
  theme: string
}

const props = withDefaults(defineProps<Props>(), {})

const slots = useSlots()

const accessStore = useAccessStore()

const style = computed((): CSSProperties => {
  const { fullWidth, height, show } = props
  const right = !show || !fullWidth ? undefined : 0

  return {
    height: `${height}px`,
    marginTop: show ? 0 : `-${height}px`,
    right
  }
})

// const logoStyle = computed((): CSSProperties => {
//   return {
//     minWidth: `${props.isM}`
//   }
// })
</script>

<template>
  <div :class="theme" :style="style" class="flex h-[50px] items-center justify-between">
    <div class="flex items-center gap-2">
      <!-- 菜单控制 -->

      <!-- 刷新 -->
      <!-- <Menu /> -->
      <ExIcon type="button" name="Menu" :size="20" />

      <!-- 面包屑 -->
      <el-breadcrumb>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="flex items-center gap-2">
      <GlobalSearch :menus="accessStore.accessMenus" />

      <ExIcon type="button" name="Settings" :size="20" />

      <ExIcon fill="black" type="button" name="Moon" :size="20" />

      <ExIcon type="button" name="Sun" :size="20" />

      <ExIcon type="button" name="Codesandbox" :size="20" />

      <ExIcon type="button" name="Languages" :size="20" />

      <ExIcon type="button" name="Bell" :size="20" />
    </div>
  </div>
</template>

<style scoped></style>
