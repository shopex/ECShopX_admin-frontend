<style lang="scss"></style>
<template>
  <div>
    {{ this.form }}
    <SpForm
      v-model="form"
      :form-list="formList"
      @onSubmit="onSaveConfig"
    />
  </div>
</template>

<script>
import settlementCycle from './comps/settlementCycle'
export default {
  name: '',
  data () {
    return {
      form: {
        cycle: null
      },
      formList: [
        {
          label: '结算周期',
          key: 'cycle',
          component: () => <settlementCycle v-model={this.form.cycle} />,
          validator: (rule, value, callback) => {
            if (!this.form.cycle) {
              debugger
              callback(new Error('不能为空'))
            } else {
              callback()
            }
          }
        }
      ]
    }
  },
  created () {},
  methods: {
    onSaveConfig () {}
  }
}
</script>
