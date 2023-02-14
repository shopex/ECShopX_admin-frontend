<template>
  <div class="goods-scroll-select">
    <el-select
      v-model="selectValue"
      placeholder="请选择活动"
    >
      <el-option
        v-for="(item, index) in selectList"
        :key="index"
        :label="item.activity_name"
        :value="item.seckill_id"
      />
    </el-select>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { seckillActivityGetList } from '@/api/promotions'

export default {
  name: 'CopmSelect',
  data() {
    return {
      moreLink: null,
      selectList: [],
      selectValue: ''
    }
  },
  props: ['value', 'type'],
  watch: {
    value: {
      handler(val) {
        this.selectValue = val
      },
      deep: true,
      immediate: true
    },
    type: {
      handler(val) {
        if (val === 'seckill') {
          this.getSeckillActivityList()
        } else if (val === 'limitTimeSale') {
          this.getLimitTimeSaleList()
        }
        this.$emit('input', '')
      },
      deep: true,
      immediate: true
    },
    selectValue: function (nVal, oVal) {
      if (nVal) {
        this.$emit('input', nVal)
      }
    }
  },
  methods: {
    async getSeckillActivityList () {
      await seckillActivityGetList({
        page: 1,
        pageSize: 20,
        status: 'not_end'
      }).then((response) => {
        this.selectList = response.data.data.list || []
      })
    },
    async getLimitTimeSaleList () {
      await seckillActivityGetList({
        page: 1,
        pageSize: 20,
        status: 'valid',
        seckill_type: 'limited_time_sale'
      }).then((response) => {
        this.selectList = response.data.data.list || []
      })
    }
  }
}
</script>
