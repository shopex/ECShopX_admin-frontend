<style lang="scss">
.goods-index {
  .el-form-item__content {
    min-width: 260px;
  }
  .el-cascader {
    width: 100%;
    .el-input {
      width: 100%;
      max-width: initial;
    }
  }
}
</style>
<template>
  <div class="goods-index">
    mainCategory: {{ form.specParams }}
    <SpForm v-model="form" label-width="100px" :form-list="formList" :submit="false" />

    <div class="footer-container">
      <el-button @click.native="handleCancel"> 取消 </el-button>
      <el-button
        v-if="!VERSION_STANDARD || (!IS_DISTRIBUTOR && VERSION_STANDARD)"
        type="primary"
        :loading="submitLoading"
        @click="() => {}"
      >
        {{ submitLoading ? '提交中' : '保存' }}
      </el-button>
    </div>
  </div>
</template>

<script>
import CmGoodsParams from './comps/CmGoodsParams'
import CmSpecParams from './comps/CmSpecParams'
import CmSkuParams from './comps/CmSkuParams'
export default {
  name: '',
  provide() {
    return {
      refresh: this.getShopsList
    }
  },
  data() {
    const cascaderProps = {
      props: { multiple: true }
    }
    return {
      form: {
        mainCategory: [],
        itemName: '',
        brief: '',
        templatesId: '',
        brandId: '',
        itemUnit: '',
        sort: '',
        regionsId: [],
        taxRate: '',
        isGift: false,
        salesCategory: [],
        paramsData: [],
        isSpecs: false, // 多规格
        specParams: {
          approve_status: 'onsale',
          store: 1,
          item_bn: '',
          weight: '',
          volume: '',
          price: '',
          cost_price: '',
          market_price: '',
          barcode: '',
          point_num: 0
        },
        skuParams: {
          skus: [],
          skuItemImages: [],
          specItems: []
        },
        mode: 'richText',
        intro: '',
        content: [],
        title: '', // pc页面标题
        mate_description: '', // pc页面标题
        mate_keywords: '' // pc页面标题
      },
      formList: [
        {
          label: '管理分类',
          type: 'group'
        },
        {
          label: '管理分类',
          key: 'mainCategory',
          width: '360px',
          component: ({ key }, value) => {
            return (
              <el-cascader
                v-model={value[key]}
                options={this.categoryList}
                on-change={this.onChangeMainCategory}
              />
            )
          }
        },
        {
          label: '基础信息',
          type: 'group'
        },
        {
          label: '商品标题',
          key: 'itemName',
          type: 'input',
          display: 'inline'
        },
        {
          label: '副标题',
          key: 'brief',
          type: 'input',
          display: 'inline'
        },
        {
          label: '运费模板',
          key: 'templatesId',
          type: 'select',
          options: [],
          display: 'inline'
        },
        {
          label: '品牌',
          key: 'brandId',
          type: 'select',
          options: [],
          display: 'inline'
        },
        {
          label: '计量单位',
          key: 'itemUnit',
          type: 'input',
          display: 'inline'
        },
        {
          label: '排序编号',
          key: 'sort',
          type: 'input',
          display: 'inline'
        },
        {
          label: '产地',
          key: 'regionsId',
          component: () => <el-cascader options={this.categoryList} />,
          display: 'inline'
        },
        {
          label: '商品税率',
          key: 'taxRate',
          type: 'input',
          display: 'inline'
        },
        {
          label: '赠品',
          key: 'isGift',
          type: 'switch',
          tip: '开启后前台不可购买'
        },
        {
          label: '销售分类',
          key: 'salesCategory',
          width: '720px',
          component: () => (
            <el-cascader clearable {...{ props: cascaderProps }} options={this.saleCategoryList} />
          )
        },
        {
          label: '商品图',
          key: 'salesCategory',
          component: () => <SpImagePicker />,
          tip: `1. 最多可上传9个图片，文件格式为bmp、png、jpeg、jpg或gif，大小不超过2M（建议尺寸：500px * 500px）<br />2. 拖动图片进行可排序<br />3. 相册图朋友圈分享是否生成小程序码`
        },
        {
          label: '商品参数',
          type: 'group',
          isShow: (item, { paramsData }) => {
            return paramsData.length > 0
          }
        },
        {
          key: 'paramsData',
          component: ({ key }, value) => {
            return <CmGoodsParams v-model={value[key]} />
          },
          isShow: (item, { paramsData }) => {
            return paramsData.length > 0
          }
        },
        {
          label: '商品规格',
          type: 'group'
        },
        {
          label: '多规格',
          key: 'isSpecs',
          type: 'switch',
          onChange: () => {}
        },
        {
          key: 'specParams',
          component: ({ key }, value) => {
            return <CmSpecParams v-model={value[key]} />
          },
          isShow: (item, { isSpecs }) => {
            return !isSpecs
          }
        },
        {
          key: 'skuParams',
          component: ({ key }, value) => {
            return <CmSkuParams v-model={value[key]} />
          }
        },
        {
          label: 'PC关键词搜索引擎',
          type: 'group'
        },
        {
          label: '页面标题',
          key: 'title',
          type: 'input'
        },
        {
          label: '页面描述',
          key: 'mate_description',
          type: 'textarea',
          width: '720px'
        },
        {
          label: '关键词',
          key: 'mate_keywords',
          type: 'textarea',
          placeholder: '关键词之间请用半角”,”分隔',
          width: '720px'
        },
        {
          label: '图文详情',
          type: 'group'
        },
        {
          label: '',
          key: 'mode',
          type: 'radio',
          options: [
            { label: 'richText', name: '富文本' },
            { label: 'component', name: '组件式' }
          ]
        },
        {
          label: '',
          key: 'intro',
          type: 'richText'
        }
      ],
      categoryList: [],
      saleCategoryList: [],
      goodsSpec: [],
      submitLoading: false
    }
  },
  created() {
    this.getShippingTemplates()
    this.getBrandList()
    this.getSaleCategory()
    this.getMainCategory()
  },
  methods: {
    // 获取管理分类
    async getMainCategory() {
      const { itemId } = this.$route.params
      const category = await this.$api.goods.getCategory({ is_main_category: true })
      function deepMainCategory(cate, temp) {
        cate.forEach((item) => {
          const _temp = {
            label: item.category_name,
            value: item.category_id
          }
          if (item.children) {
            _temp['children'] = []
            deepMainCategory(item.children, _temp.children)
          }
          temp.push(_temp)
        })
      }
      deepMainCategory(category, this.categoryList)
      if (itemId) {
        this.fetchDetail()
      }
    },
    // 获取销售分类
    async getSaleCategory() {
      const res = await this.$api.goods.getCategory({ is_show: false })
      function deepMainCategory(cate, temp) {
        cate.forEach((item) => {
          const _temp = {
            label: item.category_name,
            value: item.category_id
          }
          if (item.children) {
            _temp['children'] = []
            deepMainCategory(item.children, _temp.children)
          }
          temp.push(_temp)
        })
      }
      deepMainCategory(res, this.saleCategoryList)
    },
    async fetchDetail() {
      const { itemId } = this.$route.params
      const {
        item_name,
        brief,
        templates_id,
        brand_id,
        item_unit,
        sort,
        regions_id,
        tax_rate,
        is_gift,
        nospec,
        // 单规格数据
        approve_status,
        store,
        item_bn,
        weight,
        volume,
        price,
        cost_price,
        market_price,
        barcode,
        point_num,
        item_category_main,
        item_spec_list
      } = await this.$api.goods.getItemsDetail(itemId)
      this.deepMainCategory(item_category_main[0], this.form.mainCategory)
      this.form.itemName = item_name
      this.form.brief = brief
      this.form.templatesId = templates_id.toString()
      this.form.brandId = brand_id
      this.form.itemUnit = item_unit
      this.form.sort = sort
      this.form.regionsId = regions_id
      this.form.taxRate = tax_rate
      this.form.isGift = is_gift
      this.form.isSpecs = !nospec

      this.form.specParams = {
        approve_status: approve_status,
        store,
        item_bn,
        weight,
        volume,
        price: price / 100,
        cost_price: cost_price / 100,
        market_price: market_price / 100,
        barcode,
        point_num
      }

      this.resolveSkuParams(item_spec_list)
      {
        /*
        salesCategory: [],
        paramsData: [],
        isSpecs: false, // 多规格
        skuParams: {
          skus: [],
          skuItemImages: [],
          specItems: []
        },
        mode: 'richText',
        intro: '',
        content: [],
        title: '', // pc页面标题
        mate_description: '', // pc页面标题
        mate_keywords: '' // pc页面标题 */
      }
    },
    // 递归管理分类
    deepMainCategory({ category_id, children }, mainCategory) {
      mainCategory.push(category_id)
      if (children) {
        this.deepMainCategory(children[0], mainCategory)
      }
    },
    // 获取邮费模板
    async getShippingTemplates() {
      const { list } = await this.$api.shipping.getShippingTemplatesList({
        page: 1,
        pageSize: 99
      })
      if (list.length > 0) {
        this.formList[5].options = list.map((item) => {
          return {
            value: item.template_id,
            title: item.name
          }
        })
      } else {
        this.$message.error('请先添加运费模板')
      }
    },
    // 获取品牌列表
    async getBrandList() {
      const { list } = await this.$api.goods.getGoodsAttr({
        page: 1,
        pageSize: 1000,
        attribute_type: 'brand'
        // attribute_name: searchVal
      })
      this.formList[6].options = list.map(({ attribute_id, attribute_name }) => {
        return {
          value: attribute_id,
          title: attribute_name
        }
      })
    },
    async onChangeMainCategory(val) {
      const { goods_params, goods_spec = [] } = await this.$api.goods.getCategoryInfo(
        val[val.length - 1]
      )
      this.form.paramsData = goods_params.map(({ attribute_name, attribute_values: { list } }) => {
        return {
          label: attribute_name,
          value: '',
          children: list.map(({ attribute_value_id, attribute_value }) => {
            return {
              value: attribute_value_id,
              label: attribute_value
            }
          })
        }
      })
      this.resolveSkuParams(goods_spec)
      //
    },
    resolveSkuParams(goodsSpec) {
      this.form.skuParams.skus = goodsSpec.map(
        ({ attribute_id, attribute_name, is_image, attribute_values: { list } }) => {
          return {
            skuId: attribute_id,
            skuName: attribute_name,
            isImage: Boolean(is_image),
            skuValue: list.map(
              ({ image_url, attribute_value_id, custom_attribute_value, attribute_value }) => {
                return {
                  attribute_value_id,
                  attribute_value,
                  custom_attribute_value,
                  image_url
                }
              }
            ),
            checkedSku: []
          }
        }
      )
    },
    handleCancel() {},
    onSaveConfig() {}
  }
}
</script>
