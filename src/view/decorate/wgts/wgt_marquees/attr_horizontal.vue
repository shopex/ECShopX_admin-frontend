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
    <CompTodoList v-model="localValue" :max="20" @onAddItem="handleAddTabs">
      <template slot="myslot" slot-scope="scope">
        <div class="cate-item">
          <el-input v-model="scope.data.title" class="cate-name" size="small" />
        </div>
      </template>
    </CompTodoList>
  </div>
</template>

<script>
import CompTodoList from '../../comps/comp-todoList'

export default {
  name: 'AttrHotSetting',
  data() {
    return {
      localValue: [],
    }
  },
  watch: {
    localValue: {
      handler(nVal) {
        this.$emit('input', nVal)
      },
      deep: true
    },
  },
  props: {
    value: {
      type: Array
    },
  },
  components: {
    CompTodoList
  },
  created() {
    this.localValue = this.value
  },
  methods: {
    handleAddTabs() {
      this.localValue.push({ title: '' })
    },
  }
}
</script>
