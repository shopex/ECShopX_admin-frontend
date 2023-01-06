<style lang="scss" scoped>
.sp-filter-form {
  margin-bottom: 8px;
}
</style>
<template>
  <div>
    <SpFilterForm :model="queryForm" @onSearch="onSearch" @onReset="onSearch">
      <SpFilterFormItem prop="mobile1" label="员工手机号:">
        <el-input v-model="queryForm.mobile1" placeholder="员工手机号" />
      </SpFilterFormItem>
      <SpFilterFormItem prop="mobile2" label="亲友手机号:">
        <el-input v-model="queryForm.mobile2" placeholder="亲友手机号" />
      </SpFilterFormItem>
    </SpFilterForm>

    <SpFinder
      ref="finder"
      no-selection
      :setting="setting"
      :row-actions-align="'left'"
      :hooks="{
        beforeSearch: beforeSearch
      }"
      url="/employeepurchase/activities"
    />
  </div>
</template>

<script>
import { createSetting } from '@shopex/finder'
export default {
  name: '',
  data() {
    return {
      queryForm: {
        mobile1: '',
        mobile2: ''
      },
      setting: createSetting({
        columns: [
          { name: '员工手机号', key: 'name' },
          {
            name: '员工账号',
            key: 'employee_limitfee'
          },
          {
            name: '员工所属公司',
            key: 'relative_limitfee'
          },
          {
            name: '员工昵称',
            key: 'relative_limitfee'
          },
          {
            name: '亲友手机号',
            key: 'relative_limitfee'
          },
          {
            name: '亲友昵称',
            key: 'relative_limitfee'
          },
          {
            name: '亲友已使用额度（¥）',
            key: 'relative_limitfee'
          },
          {
            name: '绑定时间',
            key: 'employee_end_time'
            // formatter: (value, { employee_end_time, employee_begin_time }, col) => {
            //   return `${moment(employee_end_time * 1000).format('YYYY-MM-DD HH:mm:ss')} ~ ${moment(
            //     employee_begin_time * 1000
            //   ).format('YYYY-MM-DD HH:mm:ss')}`
            // }
          }
        ]
      })
    }
  },
  created() {},
  methods: {}
}
</script>
