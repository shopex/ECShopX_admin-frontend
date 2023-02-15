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
    <el-button class="btn btn-add" size="small" plain @click="showArticle">
      选择软文
    </el-button>
    <articleSelector :visible.sync="articleVisible" :get-status="setArticleStatus" :rel-items-ids="relArticles"
      @change="pickArticle" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import articleSelector from '@/components/function/articleSelector'

export default {
  name: 'AttrVertical',
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
      },
      articleVisible: false,
      setArticleStatus: false,
      relArticles: []
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
    articleSelector,
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
    showArticle() {
      this.setArticleStatus = true
      this.articleVisible = true
    },
    handleRemove(index) {
      this.$confirm('确认移除当前软文?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.data.splice(index, 1)
          this.relArticles.splice(index, 1)
        })
        .catch(() => {
          return
        })
    },
    pickArticle(data) {
      this.relArticles = data
      if (data.length > 0) {
        this.data.splice(0)
        data.forEach((item) => {
          let obj = {
            title: item.title,
            id: item.article_id
          }
          this.data.push(obj)
        })
      }
    }
  }
}
</script>
