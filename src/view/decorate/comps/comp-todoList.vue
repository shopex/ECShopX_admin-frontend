<style lang="scss">
.comp-todolist {
  .todo-list {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  // .item-bd {
  //   flex: 1;
  // }
  .item-fd {
    margin-left: 10px;
  }
  .icon-th-list {
    margin-right: 8px;
  }
}
</style>
<template>
  <div class="comp-todolist">
    <div v-for="(item, index) in localValue" :key="`todo-item__${index}`" class="todo-list">
      <div class="item-bd">
        <slot name="myslot" :data="item" />
      </div>
      <div class="item-fd">
        <i class="iconfont icon-th-list" />
        <i v-if="index > 0" class="iconfont icon-th-list" @click="onRemoveItem(index)" />
      </div>
    </div>
    <el-button type="text" @click="handleAddItem">添加</el-button>
  </div>
</template>

<script>
export default {
  name: 'CompTodoList',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      localValue: []
    }
  },
  created() {
    this.localValue = this.value
  },
  methods: {
    handleAddItem() {
      this.$emit('onAddItem')
    },
    onRemoveItem(index) {
      this.localValue.splice(index, 1)
    }
  }
}
</script>
