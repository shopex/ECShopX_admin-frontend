<style lang="scss" scope>
.sp-filter-form {
  margin-bottom: 16px;
}
</style>
<template>
  <div class="page-mall-communitygoods">
    <div class="action-container">
      <el-button
        type="primary"
        @click="handleAddGoods"
      >
        添加商品
      </el-button>
    </div>

    <SpFilterForm
      :model="params"
      @onSearch="onSearch"
      @onReset="onSearch"
    >
      <SpFilterFormItem
        prop="keywords"
        label="商品名称:"
      >
        <el-input
          v-model="params.keywords"
          placeholder="请输入商品名称"
        />
      </SpFilterFormItem>
      <SpFilterFormItem
        prop="item_bn"
        label="商品编号:"
      >
        <el-input
          v-model="params.item_bn"
          placeholder="请输入商品编号"
        />
      </SpFilterFormItem>
      <SpFilterFormItem
        prop="barcode"
        label="条形码:"
      >
        <el-input
          v-model="params.barcode"
          placeholder="请输入商品编号条形码"
        />
      </SpFilterFormItem>
      <SpFilterFormItem
        prop="approve_status"
        label="商品状态:"
      >
        <el-select
          v-model="params.approve_status"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in statusOption"
            :key="item.value"
            :label="item.title"
            size="mini"
            :value="item.value"
          />
        </el-select>
      </SpFilterFormItem>
      <SpFilterFormItem
        prop="brand_id"
        label="品牌:"
      >
        <el-select
          v-model="params.brand_id"
          placeholder="请选择"
          remote
          filterable
          clearable
          :remote-method="getGoodsBranchList"
        >
          <el-option
            v-for="item in goodsBranchList"
            :key="item.attribute_id"
            :label="item.attribute_name"
            :value="item.attribute_id"
          />
        </el-select>
      </SpFilterFormItem>
      <SpFilterFormItem
        prop="category"
        label="商品分类:"
      >
        <el-cascader
          v-model="params.category"
          placeholder="请选择"
          clearable
          :options="categoryList"
          :props="{ value: 'category_id', checkStrictly: true }"
        />
      </SpFilterFormItem>
      <SpFilterFormItem
        prop="activity_name"
        label="活动:"
      >
        <el-input
          v-model="params.activity_name"
          placeholder="请输入商品名称"
        />
      </SpFilterFormItem>
    </SpFilterForm>

    <el-tabs
      v-model="params.activity_status"
      type="card"
      @tab-click="onSearch"
    >
      <el-tab-pane
        v-for="item in activity_status"
        :key="item.value"
        :label="item.title"
        :name="item.value"
      />

      <el-table
        v-loading="loading"
        border
        :data="tableList"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" align="center" label="全选" /> -->
        <el-table-column
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="deleteItem(scope.row)"
            >
              删除
            </el-button>
            <el-button
              type="text"
              @click="modifyItem(scope.row)"
            >
              设置起送量
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          prop="activity_id"
          label="商品ID"
        />
        <el-table-column
          prop="activity_name"
          label="商品名称"
        />
        <el-table-column
          width="120"
          prop="activity_name"
          label="最低起送量"
        />
        <el-table-column
          width="100"
          prop="activity_name"
          label="标签"
        />
        <el-table-column
          width="100"
          prop="activity_name"
          label="排序编号"
        />
        <el-table-column
          width="60"
          prop="activity_name"
          label="库存"
        />
        <el-table-column
          width="100"
          prop="activity_name"
          label="原价（¥）"
        />
        <el-table-column
          width="100"
          prop="activity_name"
          label="销售价（¥）"
        />
        <el-table-column
          width="100"
          prop="activity_name"
          label="状态"
        />
        <el-table-column
          width="100"
          prop="activity_name"
          label="商品分类"
        />
      </el-table>

      <div class="content-padded content-center">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="page.pageIndex"
          :page-sizes="[10, 20, 50]"
          :total="page.total"
          :page-size="page.pageSize"
          @current-change="onCurrentChange"
          @size-change="onSizeChange"
        />
      </div>
    </el-tabs>

    <!-- 设置起送量 -->
    <SpDialog
      ref="sendNumDialogRef"
      v-model="sendNumDialog"
      title="设置起送量"
      :form="sendNumForm"
      :form-list="sendNumFormList"
      @onSubmit="onSendNumSubmit"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mixin from '@/mixins'
import moment from 'moment'
import { pageMixin } from '@/mixins'
import { VERSION_STANDARD, isArray, VERSION_B2C, VERSION_IN_PURCHASE } from '@/utils'
import { getCommunityActivity, communityDeliver, communityOrderExport } from '@/api/promotions'
import { SALES_STATUS, ORDER_STATUS, PICKER_DATE_OPTIONS } from '@/consts'

export default {
  mixins: [mixin, pageMixin],
  data () {
    return {
      loading: false,
      tableList: [{}],
      params: {
        item_type: 'normal',
        templates_id: '',
        keywords: '',
        item_bn: '',
        category: 0,
        is_warning: false,
        tag_id: '',
        is_gift: false,
        type: 0,
        barcode: '',
        distributor_id: 0,
        regions_id: [],
        brand_id: ''
      },
      statusOption: SALES_STATUS,
      goodsBranchList: [],
      goodsBranchParams: {
        page: 1,
        pageSize: 1000,
        attribute_type: 'brand',
        attribute_name: ''
      },
      categoryList: [],
      activity_status: [
        {
          title: '全部商品',
          value: 0
        },
        {
          title: '活动中的商品',
          value: 1
        }
      ],
      sendNumDialog: false,
      sendNumFormList: [
        {
          label: '起送量:',
          key: 'num',
          type: 'input',
          placeholder: '请输入商品起送量',
          required: true,
          message: '不能为空'
        }
      ],
      sendNumForm: {
        num: 1
      }
    }
  },
  computed: {
    ...mapGetters(['shopId'])
  },
  mounted () {
    this.getCategory()
    // this.onSearch()
  },
  methods: {
    async handleAddGoods () {
      const { data } = await this.$picker.goods({
        data: 100,
        shopid: this.shopId
      })
      console.log(`handleAddGoods:`, data)
    },
    async fetchList ({ pageIndex, pageSize }) {
      this.loading = true
      let params = {
        page: pageIndex,
        pageSize
      }
      const { list, total_count } = await this.$api.promotions.getCommunityActivity(params)
      this.tableList = list
      this.page.total = total_count
      this.loading = false
    },
    async getGoodsBranchList (searchVal = '') {
      this.goodsBranchParams.attribute_name = searchVal
      const { list } = await this.$api.goods.getGoodsAttr(this.goodsBranchParams)
      this.goodsBranchList = list
    },
    async getCategory () {
      const res = await this.$api.goods.getCategory({ is_show: false })
      this.categoryList = res
    },
    async deleteItem (row) {
      await this.$confirm('请确认是否删除商品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    },
    modifyItem (row) {
      this.sendNumDialog = true
    },
    async onSendNumSubmit () {},
    handleSelectionChange (rows) {
      this.activity_id = []
      if (rows) {
        rows.forEach((row) => {
          if (row) {
            this.activity_id.push(row.activity_id)
          }
        })
      }
    }
  }
}
</script>
