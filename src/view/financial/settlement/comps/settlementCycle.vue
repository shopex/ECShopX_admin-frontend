<style lang="scss" scoped>
.comp-cycle {
  .label {
    margin-right: 10px;
  }
  .cycle-input {
    margin-right: 10px;
    width: 140px;
  }
}
</style>
<template>
  <div class="comp-cycle">
    <span class="label">每</span>
    <el-input
      v-model="cycle"
      class="cycle-input"
      type="text"
      placeholder="请输入结算周期数"
    />
    <el-select
      v-model="unit"
      clearable
      placeholder="请选择"
    >
      <el-option
        v-for="item in units"
        :key="item.value"
        size="mini"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      units: [
        { label: '天', value: 'day' },
        { label: '周', value: 'week' },
        { label: '月', value: 'month' }
      ],
      cycle: '',
      unit: ''
    }
  },
  created () {},
  methods: {}
}
</script>
