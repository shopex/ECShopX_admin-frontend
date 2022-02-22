<style lang="scss">
.sp-select-shop-panel {
  .filter-tools {
    display: flex;
    align-items: center;
    padding: 8px;
  }
  .el-cascader,
  .el-input {
    width: 180px;
    margin-right: 8px;
  }
  .el-button--text {
    font-size: 13px;
  }
}
</style>

<template>
  <div class="sp-select-shop-panel">
    <div class='filter-tools'>
      <el-cascader
        filterable
        clearable
        placeholder="选择地区筛选店铺"
        v-model="region"
        :options="district"
        :props="{ checkStrictly: true }"
        @change="onChangeCascader"
        @visible-change="visibleChange"
      >
      </el-cascader>
      <el-input placeholder="请输入店铺名称搜索"></el-input>
      <el-button type="text">重置</el-button>
    </div>
    <SpFinder
      ref="finder"
      :other-config="{
        showHeader: false
      }"
      :setting="{
        columns: [
          { name: '店铺名称', key: 'name' }
        ]
      }"
      @row-click="onRowClick"
      :hooks="{
        beforeSearch: beforeSearch,
        afterSearch: afterSearch
      }"
      url="/distributors"
    >
    </SpFinder>
  </div>
</template>

<script>
import district from '@/common/district.json'
export default {
  name: 'SpSelectShopPanel',
  props: {
  },
  data() {
    return {
      district,
      region: []
    }
  },
  created() {},
  methods: {
    beforeSearch({ page, finderId }) {
      return {
        page,
        pageSize: 10,
        finderId
      }
    },
    afterSearch(response) {
      
      debugger
      // return 
    },
    onRowClick(e) {
      debugger
    },
    async onChangeCascader() {
      this.$refs.finder.refresh()
    },
    visibleChange(visible) {
      this.$emit('visible-change', visible)
    }
  }
}
</script>

