<script>
export default {
  name: 'WgtSliderAttr',
  props: ['value'],
  methods: {
    async handleClickAdd () {
      const { data } = await this.$picker.image({
        data: [],
        multiple: true
      })
      this.value.data = data.map((item) => {
        return {
          imgUrl: item.url
        }
      })
      console.log(this.value.data)
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
            <div class='slider-item'>
              <SpImagePicker img={item} />
              <CompPickerLink />
            </div>
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

<style lang="scss">
.wgt-slider-attr {
  .slider-item {
    display: flex;
  }
}
</style>
