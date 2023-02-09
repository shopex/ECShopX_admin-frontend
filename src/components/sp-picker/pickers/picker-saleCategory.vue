<style lang="scss">
.picker-sale-category {
  .el-cascader-menu__wrap {
    height: 560px;
  }
}
</style>
<template>
  <div class="picker-sale-category">
    <el-cascader-panel style="height: 560px" :options="options" :props="props" />
  </div>
</template>

<script>
import district from '@/common/district.json'
import BasePicker from './base'
import PageMixin from '../mixins/page'
export default {
  name: 'PickerSaleCategory',
  extends: BasePicker,
  mixins: [PageMixin],
  config: {
    title: '选择销售分类'
  },
  props: ['value'],
  data() {
    return {
      props: {
        label: 'category_name',
        value: 'category_id',
        children: 'children'
      },
      options: [],
      multiple: this.value?.multiple ?? true
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$api.goods.getCategory()
      this.options = res
    },
    onSelect(selection, row) {
      if (this.multiple) {
        // this.updateVal(selection)
      } else {
        const { finderTable } = this.$refs.finder.$refs
        console.log('finderTable:', finderTable)
        finderTable.clearSelection()
        setTimeout(() => {
          finderTable.$refs.finderTable.setSelection([row])
          // this.updateVal([row])
        })
      }
    },
    onSelectionChange(selection) {
      this.updateVal(selection)
    }
  }
}
</script>
