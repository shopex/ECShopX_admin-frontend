<style lang="scss">
.picker-wxapp {
  .sp-filter-form {
    margin-bottom: 0;
    .filter-form__bd {
      margin-left: 16px;
    }
  }
}
</style>
<template>
  <div class="picker-wxapp">
    <SpFilterForm :model="formData" @onSearch="onSearch" @onReset="onSearch">
      <SpFilterFormItem prop="region">
        <el-select v-model="formData.approve_status" clearable placeholder="请选择">
          <el-option
            v-for="item in wxappList"
            :key="item.value"
            :label="item.title"
            size="mini"
            :value="item.value"
          />
        </el-select>
      </SpFilterFormItem>
    </SpFilterForm>
    <SpFinder
      ref="finder"
      :class="['shop-finder', { 'no-multiple': !multiple }]"
      :other-config="{
        height: 440
      }"
      url="/wxexternalconfigroutes/list"
      :fixed-row-action="true"
      :setting="{
        columns: [
          { name: '小程序名称', key: 'app_name' },
          { name: 'appid', key: 'app_id' },
          { name: '页面名称', key: 'route_name' },
          { name: '页面路径', key: 'route_info' }
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
    onSearch() {
      this.$refs.finder.refresh(true)
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
