<style lang="scss">
.cm-sku-params {
  .icon-edit1 {
    font-size: 13px;
    color: var(--color-theme);
    margin: 0 30px 0 10px;
    visibility: hidden;
  }
  .sku-item {
    height: 100%;
    display: inline-block;
    &:hover {
      .icon-edit1 {
        visibility: visible;
      }
    }
  }
  .sku-image {
    .image-item {
      margin: 0 10px 0 0;
    }
  }
}
</style>
<template>
  <div class="cm-sku-params">
    <el-form label-width="100px">
      <el-form-item
        v-for="(item, index) in value.skus"
        :key="`sku-item__${index}`"
        :label="`${item.skuName}:`"
      >
        <el-checkbox-group v-model="item.checkedSku" @change="onSkuChange">
          <span v-for="sku in item.skuValue" :key="sku.attribute_value_id" class="sku-item">
            <el-checkbox :label="sku.attribute_value_id">{{ sku.attribute_value }}</el-checkbox>
            <i class="iconfont icon-edit1" />
          </span>
        </el-checkbox-group>
        <!-- <el-select
        v-model="item.value"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="child in item.children"
          :key="child.value"
          :label="child.label"
          :value="child.value"
        />
      </el-select> -->
      </el-form-item>
    </el-form>
    value.skuItemImages {{ value.skuItemImages }}
    <el-table
      :data="value.skuItemImages"
      border
      style="line-height: initial; width: 100%; margin-bottom: 26px"
    >
      <el-table-column prop="attribute_value" label="规格名称" width="150px" />
      <el-table-column prop="spec_name" label="规格图片">
        <template slot-scope="scope">
          <SpImagePicker class="sku-image" size="small" />
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="bulkFilling" :show-header="false" :highlight-current-row="false">
      <el-table-column>
        <template slot-scope="scope">
          {{ scope.row.custom_attribute_value || scope.row.item_spec }}
        </template>
      </el-table-column>
      <el-table-column label="*状态">
        <template slot-scope="scope">
          <el-select v-model="scope.row.approve_status" size="mini" placeholder="请选择">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.title"
              size="mini"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="库存">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.store"
            type="number"
            required
            min="0"
            size="mini"
            placeholder=""
          />
        </template>
      </el-table-column>
      <el-table-column label="货号">
        <template slot-scope="scope">
          <el-input v-model="scope.row.item_bn" :maxlength="60" size="mini" placeholder="" />
        </template>
      </el-table-column>
      <el-table-column label="重量">
        <template slot-scope="scope">
          <el-input v-model="scope.row.weight" :maxlength="60" size="mini" placeholder="" />
        </template>
      </el-table-column>
      <el-table-column label="体积">
        <template slot-scope="scope">
          <el-input v-model="scope.row.volume" :maxlength="60" size="mini" placeholder="" />
        </template>
      </el-table-column>
      <el-table-column label="销售价">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.price"
            type="number"
            required
            min="0"
            size="mini"
            placeholder=""
          />
        </template>
      </el-table-column>
      <el-table-column label="成本价">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.cost_price"
            type="number"
            required
            min="0"
            size="mini"
            placeholder=""
          />
        </template>
      </el-table-column>
      <el-table-column label="市场价">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.market_price"
            type="number"
            required
            min="0"
            size="mini"
            placeholder=""
          />
        </template>
      </el-table-column>
      <el-table-column label="条形码">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.barcode"
            type="number"
            required
            min="0"
            size="mini"
            placeholder=""
          />
        </template>
      </el-table-column>
      <el-table-column label="获取积分">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.point_num"
            type="number"
            required
            min="0"
            size="mini"
            placeholder=""
          />
        </template>
      </el-table-column>
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="() => {}"> 填充 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="value.specItems" border style="line-height: initial; width: 100%">
      <el-table-column prop="spec_name" label="规格" />
      <el-table-column prop="item_id" label="状态">
        <template slot-scope="scope">
          <el-select v-model="scope.row.approve_status" size="mini" placeholder="请选择">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.title"
              :value="item.value"
              size="mini"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="store" label="库存">
        <template slot-scope="scope">
          <el-input v-model="scope.row.store" type="number" min="0" size="mini" />
        </template>
      </el-table-column>
      <el-table-column prop="item_bn" label="货号">
        <template slot-scope="scope">
          <el-input v-model="scope.row.item_bn" size="mini" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量（kg）">
        <template slot-scope="scope">
          <el-input v-model="scope.row.item_bn" size="mini" />
        </template>
      </el-table-column>
      <el-table-column prop="volume" label="体积（m³）">
        <template slot-scope="scope">
          <el-input v-model="scope.row.volume" size="mini" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="销售价">
        <template slot-scope="scope">
          <el-input v-model="scope.row.price" type="number" min="0" size="mini" />
        </template>
      </el-table-column>
      <el-table-column prop="cost_price" label="成本价">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cost_price" type="number" min="0" size="mini" />
        </template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价">
        <template slot-scope="scope">
          <el-input v-model="scope.row.market_price" type="number" min="0" size="mini" />
        </template>
      </el-table-column>
      <el-table-column prop="barcode" label="条形码">
        <template slot-scope="scope">
          <el-input v-model="scope.row.barcode" size="mini" />
        </template>
      </el-table-column>
      <el-table-column prop="point_num" label="获取积分">
        <template slot-scope="scope">
          <el-input v-model="scope.row.point_num" type="number" min="0" size="mini" />
        </template>
      </el-table-column>
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="() => {}"> 清除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CmSkuParams',
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    let statusOption = [
      {
        title: '前台可销售',
        value: 'onsale'
      },
      {
        title: '前台仅展示',
        value: 'only_show'
      },
      {
        title: '不可销售',
        value: 'instock'
      }
    ]
    if (!this.VERSION_IN_PURCHASE) {
      statusOption.push({
        title: '前台不展示',
        value: 'offline_sale'
      })
    }
    return {
      bulkFilling: [
        {
          approve_status: '',
          store: '',
          item_bn: '',
          price: '',
          cost_price: '',
          market_price: '',
          barcode: '',
          point_num: '',
          weight: '',
          volume: ''
        }
      ],
      statusOption
    }
  },
  created() {},
  methods: {
    cartesianProductOf() {
      var result = Array.prototype.reduce.call(
        arguments,
        function (a, b) {
          var ret = []
          if (b.length > 0) {
            a.forEach(function (a) {
              b.forEach(function (b) {
                ret.push(a.concat([b]))
              })
            })
          } else {
            a[0].length ? ret.push(...a) : (ret = [[]])
          }
          return ret
        },
        [[]]
      )
      if (result.length === 1 && result[0].length === 0) {
        result = []
      }
      return result
    },
    onSkuChange() {
      this.getSkuItemImages()
      this.getSkuItems()
    },
    getSkuItemImages() {
      const { skuValue, checkedSku } = JSON.parse(JSON.stringify(this.value.skus))
        .reverse()
        .find((item) => item.isImage)
      this.value.skuItemImages = skuValue.filter(({ attribute_value_id }) =>
        checkedSku.includes(attribute_value_id)
      )
      console.log('this.value.skuItemImages', this.value.skuItemImages)
    },
    getSkuItems() {
      const skuMartix = this.value.skus.map(({ checkedSku }) => checkedSku)
      const specItems = this.cartesianProductOf(...skuMartix)

      this.value.specItems = specItems.map((item) => {
        const key = item.join('_')
        return {
          sku_id: key,
          spec_name: this.getSpecName(item),
          is_default: false,
          approve_status: '',
          store: '',
          item_bn: '',
          weight: '',
          volume: '',
          price: '',
          cost_price: '',
          market_price: '',
          barcode: '',
          point_num: ''
        }
      })
      console.log('specItems:', this.value.specItems)
    },
    getSpecName(keys) {
      const { skus } = this.value
      const specNames = []
      keys.forEach((key, index) => {
        const { attribute_value, custom_attribute_value } = skus[index].skuValue.find(
          (s) => s.attribute_value_id == key
        )
        specNames.push(custom_attribute_value || attribute_value)
      })
      return specNames.join(' ')
    }
  }
}
</script>
