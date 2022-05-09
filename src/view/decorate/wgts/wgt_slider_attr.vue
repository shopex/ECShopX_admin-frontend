<script>
export default {
  name: 'WgtSliderAttr',
  props: ['value'],
  methods: {
    async handleClickAdd () {
      const { data } = await this.$picker.image({
        data: 100
        // multiple: true
      })
      debugger
    }
  },
  render () {
    const { value } = this
    return (
      <div class='wgt-slider-attr'>
        {value.base.map((item) => (
          <CompCell info={item} v-model={item.value} />
        ))}
        {value.config.map((item) => (
          <CompCell info={item} v-model={item.value} />
        ))}
        <div class=''>
          <div>轮播项</div>
          {value.data.map((item) => (
            <View></View>
          ))}
          <el-button plain full on-click={this.handleClickAdd.bind(this)}>
            添加背景
          </el-button>
        </div>
      </div>
    )
  }
}
</script>
