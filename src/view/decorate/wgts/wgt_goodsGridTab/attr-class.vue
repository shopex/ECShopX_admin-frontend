<style lang="scss">
.attr-class {
  .comp-todolist {
    margin-bottom: 10px;
  }
  .cate-item {
    display: flex;
  }
  .comp-button {
    min-width: 80px;
  }
  .cate-name {
    width: 120px;
    margin-right: 10px;
  }
}
</style>
<template>
  <div class="attr-class">
    <!-- <div v-for="(item, index) in list" :key="index" class="goods-classify">
      <el-input v-model="item.tabTitle" class="cate-name" size="small" />
      <CompButton
        :clearable="item.goodsList.length > 0"
        @click="setGoods(index)"
        @remove="onRemove"
      >
        {{ item.goodsList.length > 0 ? `已选: ${item.goodsList.length}` : `选择商品` }}
      </CompButton>
      <el-button size="mini" plain @click="setGoods(index)">
        {{ `添加商品(${item.goodsList.length}/100)` }}
      </el-button>
      <el-button
        v-if="list.length > 1"
        class="close"
        type="text"
        icon="iconfont el-icon-close"
        @click="removeItem(index)"
      />
    </div> -->
    <!-- {{ localValue }} -->
    <CompTodoList v-model="localValue" @onAddItem="handleAddTabs">
      <template slot="myslot" slot-scope="scope">
        <div class="cate-item">
          <el-input v-model="scope.data.tabTitle" class="cate-name" size="small" />
          <CompButton
            :clearable="scope.data.goodsList.length > 0"
            @click="handleSelectGoods(scope.$index)"
            @remove="onRemoveItem"
          >
            {{
              scope.data.goodsList.length > 0 ? `已选: ${scope.data.goodsList.length}` : `选择商品`
            }}
          </CompButton>
        </div>
      </template>
    </CompTodoList>

    <!-- <classifyDialog ref="classify" :value="value" @submit="handleSubmit" /> -->
  </div>
</template>

<script>
// import classifyDialog from "./classifyDialog.vue"
import { cloneDeep } from 'lodash'
import CompButton from '../../comps/comp-button'
import CompTodoList from '../../comps/comp-todoList'
export default {
  name: 'AttrClass',
  components: { CompButton, CompTodoList },
  props: ['value'],
  data() {
    return {
      list: null,
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
    async handleSelectGoods(index) {
      const { data } = await this.$picker.goods({
        multiple: true
      })
      let values = []
      data &&
        data.forEach((item) => {
          if (item.itemId) {
            console.log(JSON.stringify(item))
            let obj = {
              imgUrl: item.pics[0],
              title: item.itemName,
              goodsId: item.itemId,
              brand: item.brand_logo,
              price: item.price,
              distributor_id: item.distributor_id,
              itemEnName: item.item_en_name,
              promotionActivity: item.promotion_activity
            }
            values.push(obj)
          }
        })
      this.list[index].goodsList = values
    },
    handleAddTabs() {
      this.localValue.push({ tabTitle: '标签', goodsList: [] })
    },
    onRemoveItem(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>
