<style lang="scss"></style>
<template>
  <div>
    <el-button type="text" @click="onSelectZiti">选择自提点</el-button>
    <SpFinder
      ref="finder"
      no-selection
      :data="finderData"
      :url="finderUrl"
      :setting="setting"
      :hooks="{
        beforeSearch: beforeSearch,
        afterSearch: afterSearch
      }"
    />
  </div>
</template>

<script>
import { createSetting } from '@shopex/finder'
export default {
  name: 'DaoDianZiti',
  data() {
    return {
      finderData: [],
      finderUrl: '',
      setting: createSetting({
        actions: [
          {
            name: '移除',
            key: 'apply',
            type: 'button',
            buttonType: 'text',
            action: {
              handler: async ([row]) => {
                if (this.distributor_id) {
                  await this.$api.pickuplocation.unbindZitiLocation({
                    id: row.id,
                    rel_distributor_id: this.distributor_id
                  })
                  this.$refs['finder'].refresh()
                } else {
                  const index = this.finderData.findIndex((item) => item.id == row.id)
                  this.finderData.splice(index, 1)
                  this.zitiList = this.finderData
                  this.$nextTick(() => {
                    this.$refs['finder'].refresh()
                  })
                }
              }
            }
          }
        ],
        columns: [
          { name: '自提点名称', key: 'name' },
          {
            name: '地址',
            render: (h, { row }) =>
              h('span', {}, `${row.province}${row.city}${row.area}${row.address}`)
          },
          { name: '联系电话', key: 'contract_phone' }
        ]
      })
    }
  },
  created() {},
  methods: {
    beforeSearch(params) {
      params = {
        ...params,
        rel_distributor_id: this.distributor_id
      }
      return params
    },
    afterSearch(response) {
      const { list } = response.data.data
      this.zitiList = list
    }
  }
}
</script>
