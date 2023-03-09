<style lang="scss" scoped>
.slider-item {
  display: flex;
  .comp-picker-link {
    flex: 1;
  }
}
</style>
<template>
  <CompButton
    placeholder="选择标签"
    format="{0}个标品"
    :disabled="disabledBtn"
    :value="value.length"
    @click="handleClickAdd"
    @remove="onRemove"
  />
</template>

<script>
import Vue from 'vue'
import { cloneDeep } from 'lodash'
import CompButton from '../../comps/comp-button'
export default {
  name: 'AttrLabel',
  components: { CompButton },
  props: ['value', 'distributor'],
  data() {
    return {
      localValue: []
    }
  },
  computed: {
    disabledBtn() {
      const { id } = this.distributor
      return id === ''
    }
  },
  watch: {
    localValue: function (nVal, oVal) {
      this.$emit('input', nVal)
    },
    distributor: function (nVal, oVal) {
      if (JSON.stringify(nVal) != JSON.stringify(oVal)) {
        this.localValue = []
      }
    }
  },
  created() {
    this.localValue = cloneDeep(this.value)
  },
  methods: {
    async handleClickAdd() {
      const ids = this.value.map(({ tag_id }) => tag_id)
      const { data } = await this.$picker.tag({
        data: ids,
        params: {
          distributor_id: this.distributor.id
        }
      })
      this.localValue = data
    },
    onRemove() {
      this.localValue = []
    }
  }
}
</script>
