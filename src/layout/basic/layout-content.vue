<template>
  <div>
    layout content
    <el-button @click="onSubmit1">按钮1</el-button>
    <el-button @click="onSubmit2">按钮2</el-button>

    <Modal1 title="标题" width="200px">test1</Modal1>
    <Modal2 title="标题2">test2</Modal2>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useExModal } from '@/components/ex-modal'

const [Modal1, modalApi1] = useExModal()
const [Modal2, modalApi2] = useExModal()

const onSubmit1 = (e: ElementEvent) => {
  modalApi1.open()
}

const onSubmit2 = () => {
  modalApi2.open()
}
</script>

<style scoped></style>
