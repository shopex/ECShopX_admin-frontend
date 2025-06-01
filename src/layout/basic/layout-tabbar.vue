<template>
  <div :style="style" class="flex w-full border-b transition-all">layout tabbar</div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { preferences } from '../../preferences'

const style = computed((): CSSProperties => {
  return {
    height: `${preferences.tabbar.height}px`
  }
})
</script>

<style scoped></style>
