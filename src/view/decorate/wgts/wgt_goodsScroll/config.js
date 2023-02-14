import { pickBy } from '@/utils'
import AttrSelect from './attr-select.vue'

export default {
  name: 'goodsScroll',
  setting: [
    { label: '标题', key: 'title', component: 'input', value: '当地必买' },
    { label: '副标题', key: 'subtitle', component: 'input', value: '看看大家都在买什么' },
    { label: '组件间距', key: 'padded', component: 'switch', value: true },
    {
      label: '商品类型',
      key: 'type',
      component: 'radio',
      options: [
        { name: '单商品', label: 'goods' },
        { name: '秒杀活动', label: 'seckill' },
        { name: '限时特惠', label: 'limitTimeSale' }
      ],
      value: 'goods'
    },
    {
      label: '开启排行榜',
      key: 'leaderboard',
      component: 'switch',
      value: true,
      isShow: function () {
        return this.value.type == 'goods'
      }
    },
    { label: '显示价格', key: 'showPrice', component: 'switch', value: false },
    {
      label: '选择活动',
      key: 'seckillId',
      component: function (h, { key }) {
        return (<AttrSelect type={this.value.type} v-model={this.value[key]} />)
      },
      value: '',
      isShow: function () {
        return this.value.type != 'goods'
      }
    },
    {
      label: '选择商品',
      key: 'data',
      isShow: function () {
        return this.value.type == 'goods'
      },
      component: function (h, { key }) {
        const handleSelectGoodsDialog = async () =>{
          const { data } = await this.$picker.goods()
          const values = []
          data?.length && data.forEach((item) => {
            if (item.itemId) {
              const obj = {
                imgUrl: item.pics[0],
                title: item.itemName,
                goodsId: item.itemId,
                brand: item.brand_logo,
                price: item.price,
                distributor_id: item.distributor_id,
                itemEnName: item.item_en_name,
                promotionActivity: item.promotion_activity
              }
              values.push(obj)
            }
          })
          this.value[key] = values
        }
        return (
          <el-button plain size="small" onClick={ handleSelectGoodsDialog }>选择商品</el-button>
        )

      },
      value: []
    },
    {
      label:'更多链接',
      key:'moreLink',
      component:  function (h, { key }) {
        return
      }
    },
    {
      label: '更多图片',
      key: 'backgroundImg',
      component: function (h, { key }) {
        return <SpImagePicker v-model={this.value[key]} size='small' />
      },
      value: ''
    },
  ],
  transformIn: (v) => {
    const { name, base, config, data } = v
    return {
      name,
      ...base,
      ...config,
      data
    }
  },
  transformOut: (v) => {
    return pickBy(v, {
      name: 'name',
      base: (v) => {
        return pickBy(v, {
          title: 'title',
          subtitle: 'subtitle',
          padded: 'padded',
          backgroundImg: 'backgroundImg'
        })
      },
      config: (v) => {
        return pickBy(v, {
          leaderboard: 'leaderboard',
          moreLink: 'moreLink',
          seckillId: 'seckillId',
          showPrice: 'showPrice',
          type: 'type'
        })
      },
      data: 'data'
    })
  }
}
