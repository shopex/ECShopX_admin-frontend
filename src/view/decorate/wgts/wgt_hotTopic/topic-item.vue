<template>
  <div>
    <div v-for="(item, index) in value" :key="`topic_item_${index}`" class="topic_item_edit">
      <el-input v-model="item.topic" size="small" class="topic_input"/>
      <CompPickerLink :value="item" @change="(e) => onChangeLink(e, index)" />
      </div>
    <el-button class="btn btn-add" size="small" plain @click="handleClickAdd">
      添加话题
    </el-button>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import Vue from 'vue'
import CompPickerLink from '../../comps/comp-pickerLink'
export default {
  name: 'TopicItem',
  components: {
    CompPickerLink
  },
  props: ['value'],
  data() {
    return {
      localValue: []
    }
  },
  watch: {
    localValue: function (nVal, oVal) {
      this.$emit('input', nVal)
    }
  },
  created() {
    this.localValue = cloneDeep(this.value)
  },
  methods: {
    onChangeLink(e, index) {
      const v = cloneDeep(this.localValue[index])
      Vue.set(this.localValue, index, {
        ...v,
        ...e
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.topic_item_edit{
  margin-bottom: 20px;
  .topic_input{
    margin-block: 5px;
  }
}
</style>
