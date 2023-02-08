<style lang="scss">
.picker-pages {
  .sp-filter-form {
    padding: 8px 8px 0px 8px;
  }
  .sp-finder-hd {
    display: none;
  }
  .sp-finder {
    &.no-multiple {
      .sp-finder-bd {
        .el-table__fixed-header-wrapper {
          table thead {
            tr {
              th {
                &:nth-child(1) {
                  .el-checkbox {
                    display: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .el-pagination {
    margin: 0;
    padding: 10px;
  }
}
</style>
<template>
  <div class="picker-pages">
    <SpFilterForm :model="formData" size="small" @onSearch="onSearch" @onReset="onSearch">
      <SpFilterFormItem prop="region">
        <SpFilterFormItem prop="keywords">
          <el-input v-model="formData.keywords" placeholder="请输入页面名称" />
        </SpFilterFormItem>
      </SpFilterFormItem>
    </SpFilterForm>
    <SpFinder
      ref="finder"
      :class="['shop-finder', { 'no-multiple': !multiple }]"
      :other-config="{
        height: 460
      }"
      url="/wxa/customizepage/list"
      :fixed-row-action="true"
      :setting="{
        columns: [
          { name: '页面ID', key: 'id' },
          { name: '页面名称', key: 'page_name' },
          { name: '页面描述', key: 'page_description' }
        ]
      }"
      :hooks="{
        beforeSearch: beforeSearch,
        afterSearch: afterSearch
      }"
      @select="onSelect"
      @selection-change="onSelectionChange"
    />
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      formData: {},
      wxappList: []
    }
  },
  created() {
    this.getOtherWxapp()
  },
  methods: {
    beforeSearch(params) {
      return params
    },
    afterSearch() {},
    onSearch() {
      this.$refs.finder.refresh(true)
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
    },
    async getOtherWxapp() {
      const { list } = await this.$api.wxa.getWxLinkListSetting()
      this.wxappList = list.map(({ app_id, app_name }) => {
        return {
          title: app_name,
          value: app_id
        }
      })
    }
  }
}
</script>
