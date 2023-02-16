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
          <span>{{ scope.data.title }}</span>
        </div>
      </template>
    </CompTodoList>

    <articleSelector :visible.sync="articleVisible" :get-status="setArticleStatus" :rel-items-ids="relArticles"
      @change="pickArticle" />
  </div>
</template>

<script>
import articleSelector from '@/components/function/articleSelector'
import CompTodoList from '../../comps/comp-todoList'


export default {
  name: 'AttrVertical',
  data() {
    return {
      articleVisible: false,
      setArticleStatus: false,
      relArticles: [],
    }
  },
  watch: {
    localValue: function (nVal, oVal) {
      this.$emit('input', nVal)
    }
  },
  props: {
    value: {
      type: Array
    },
    direction: {
      type: String
    },
    dataArr: {
      type: Array
    }
  },
  components: {
    articleSelector,
    CompTodoList
  },
  created() {
    this.localValue = this.value
  },
  methods: {
    pickArticle(data) {
      this.relArticles = data
      if (data.length > 0) {
        this.localValue.splice(0)
        data.forEach((item) => {
          let obj = {
            title: item.title,
            id: item.article_id
          }
          this.localValue.push(obj)
        })
      }
    },
    handleAddTabs() {
      this.setArticleStatus = true
      this.articleVisible = true
    },
  }
}
</script>
