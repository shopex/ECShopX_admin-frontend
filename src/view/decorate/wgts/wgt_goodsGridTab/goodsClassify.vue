<style lang="scss">
.goods-classify {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;

  &:hover {
    .close {
      display: block;
    }
  }

  .close {
    display: none;
  }
}
</style>
<template>
  <div>
    <div v-for="(item, index) in list" :key="index" class="goods-classify">
      <el-input v-model="item.tabTitle" size="mini" style="margin-right:15px" clearable maxlength="10"
        show-word-limit />
      <el-button size="mini" plain @click="setGoods(index)">
        {{ `添加商品(${item.goodsList.length}/100)` }}
      </el-button>
      <el-button v-if="list.length>1" class="close" type="text" icon="iconfont el-icon-close" @click="removeItem(index)"/>
    </div>

    <el-button type="text" @click="handleAddTabs">添加</el-button>
    <!-- <classifyDialog ref="classify" :value="value" @submit="handleSubmit" /> -->
  </div>
</template>

<script>
// import classifyDialog from "./classifyDialog.vue"
export default {
  name: 'GoodsClassify',
  // components: { classifyDialog },
  props: ['value'],
  data() {
    return {
      list: null
    }
  },
  watch: {
    value: {
      handler(val) {
        this.list = val
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async setGoods(index) {
      const { data } = await this.$picker.goods()
      let values = []
      data && data.forEach((item) => {
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
      this.list.push({ tabTitle: 'newTable', goodsList: [] })
    },
    removeItem(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>
