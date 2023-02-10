<style lang="scss">

</style>
<template>
  <div class="goods-select">
    <CompPickerLink :value="localValue" @change="(e) => onChangeLink(e)" />
  </div>
</template>

<script>
import CompPickerLink from '../../comps/comp-pickerLink'
import { cloneDeep } from 'lodash'

export default {
  name: 'GoodsLink',
  components: { CompPickerLink },
  props: ['value'],
  data() {
    return {
      localValue: null
    }
  },

  watch: {
    value: {
      handler(val) {
        this.localValue = val ? cloneDeep(val) :
          { "linkType": 0, "linkUrl": "", "linkPage": "", "id": "", "title": "" }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async onChangeLink(e) {
      this.$emit('input', e)
    }
  }
}
</script>
