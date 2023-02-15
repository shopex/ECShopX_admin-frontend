<style lang="scss" scoped>
.article-item {
  display: flex;
  margin-bottom: 10px;

  .el-input {
    margin: 0 10px;
  }
}
</style>
<template>
  <div>
    <draggable v-model="list" class="article" :options="dragItemsOptions" @end="onEnd">
      <div v-for="(item, index) in data" :key="index" class="article-item">
        <i class="iconfont icon-stream drag-handler" />
        <el-input v-model="item.title" size="small" />
        <div class="iconfont icon-trash-alt btn-remove" @click="handleRemove(index)" />
      </div>
    </draggable>
    <el-button class="btn btn-add" size="small" plain @click="handleClickAdd">
      添加文本
    </el-button>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'AttrHotSetting',
  data() {
    return {
      list: [],
      data: [],
      temp: '',
      dragItemsOptions: {
        animation: 300,
        forceFallback: false,
        scroll: true,
        handle: '.drag-handler'
      }

    }
  },
  watch: {
    data: function (nVal, oVal) {
      this.$emit('input', nVal)
    },
    direction: function (nVal, oVal) {
      if (nVal != oVal) {
        this.data = []
      }
    }
  },
  props: {
    value: {
      type: Array
    },
    direction: {
      type: String
    }
  },
  components: {
    draggable
  },
  created() {
    this.list = this.value
    this.data = this.value
  },
  methods: {
    onEnd(evt) {
      this.temp = this.data[evt.oldIndex]
      this.data.splice(evt.oldIndex, 1)
      this.data.splice(evt.newIndex, 0, this.temp)
    },
    handleClickAdd() {
      this.data.push({ title: '' })
    },
    handleRemove(index) {
      this.$confirm('确认移除当前文本?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.data.splice(index, 1)
        })
        .catch(() => {
          return
        })
    },
  }
}
</script>
