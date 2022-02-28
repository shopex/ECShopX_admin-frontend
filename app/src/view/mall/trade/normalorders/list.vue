<template>
  <div class="page-body">
    <div v-if="$route.path.indexOf('detail') === -1 && $route.path.indexOf('process') === -1">
      <SpFilterForm :model="params" @onSearch="onSearch" @onReset="onSearch">
        <SpFilterFormItem prop="mobile" label="手机号:"
          ><el-input placeholder="请输入客户手机号码" v-model="params.mobile"
        /></SpFilterFormItem>
        <SpFilterFormItem prop="item_bn" label="订单号:"
          ><el-input placeholder="请输入订单号" v-model="params.item_bn"
        /></SpFilterFormItem>
        <SpFilterFormItem prop="salesman_mobile" label="导购手机号:" v-if="login_type != 'merchant'"
          ><el-input placeholder="请输入导购手机号码" v-model="params.salesman_mobile"
        /></SpFilterFormItem>
        <SpFilterFormItem prop="receipt_type" label="配送类型:" v-if="!isMicorMall"
          ><el-select v-model="params.receipt_type" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in distributionType"
              :key="item.value"
              :label="item.title"
              :value="item.value"
            ></el-option> </el-select
        ></SpFilterFormItem>
        <!-- <SpFilterFormItem prop="source" label="订单来源:"
          ><el-input placeholder="请输入订单来源" v-model="params.source"
        /></SpFilterFormItem> -->
        <SpFilterFormItem prop="order_status" label="订单类型:"
          ><el-select v-model="params.order_status" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in orderType"
              :key="item.value"
              :label="item.title"
              :value="item.value"
            ></el-option> </el-select
        ></SpFilterFormItem>
        <SpFilterFormItem prop="is_invoiced" label="开票状态:" v-if="!isMicorMall"
          ><el-select v-model="params.is_invoiced" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in invoiceStatus"
              :key="item.value"
              :label="item.title"
              :value="item.value"
            ></el-option> </el-select
        ></SpFilterFormItem>
        <SpFilterFormItem prop="create_time" label="下单时间:"
          ><el-date-picker
            unlink-panels
            type="daterange"
            align="right"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            prefix-icon="null"
            v-model="params.create_time"
            :picker-options="pickerOptions"
          >
          </el-date-picker
        ></SpFilterFormItem>
        <SpFilterFormItem prop="distributor_type" label="订单分类:"
          ><el-select v-model="params.distributor_type" clearable placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in orderCategory"
              :key="item.value"
              :label="item.title"
              :value="item.value"
            ></el-option> </el-select
        ></SpFilterFormItem>
        <SpFilterFormItem
          prop="distributor_id"
          label="店铺:"
          v-if="!isMicorMall || login_type != 'distributor'"
        >
          <SpSelectShop clearable placeholder="请选择" v-model="params.distributor_id" />
        </SpFilterFormItem>
      </SpFilterForm>

      <div class="action-container">
        <el-dropdown>
          <el-button type="primary" plain
            >导出<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <export-tip @exportHandle="exportItemsWxappCode('wxa')"
                >未开票订单</export-tip
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><export-tip @exportHandle="exportItemsWxappCode('h5')"
                >主订单</export-tip
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><export-tip @exportHandle="exportItemsWxappCode('h5')"
                >子订单</export-tip
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-tabs type="card" v-model="params.order_status" @tab-click="onSearch">
        <el-tab-pane
          v-for="item in orderStatus"
          :label="item.title"
          :name="item.value"
          :key="item.value"
        />
        <el-table border v-loading="loading" :data="tableList">
          <el-table-column width="220" prop="order_id" label="订单信息">
            <template slot-scope="scope">
              <div class="order-num">
                {{ scope.row.order_id }}
                <el-tooltip effect="dark" content="复制" placement="top-start">
                  <i
                    v-clipboard:copy="scope.row.order_id"
                    v-clipboard:success="onCopySuccess"
                    class="el-icon-document-copy"
                  ></i>
                </el-tooltip>
              </div>
              <div v-if="scope.row.distributor_id !== '0'" class="order-store">
                <el-tooltip effect="dark" content="店铺名" placement="top-start">
                  <i class="el-icon-office-building"></i>
                </el-tooltip>
                {{ scope.row.distributor_name }}
              </div>
              <div class="order-time">
                <el-tooltip effect="dark" content="下单时间" placement="top-start">
                  <i class="el-icon-time"></i>
                </el-tooltip>
                {{ scope.row.create_time | datetime('YYYY-MM-DD HH:mm:ss') }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="total_fee" width="120" label="订单金额（¥）">
            <template slot-scope="scope">
              {{ (scope.row.total_fee / 100).toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column width="100" label="运费（¥）">
            <template slot-scope="scope">
              {{ (scope.row.freight_fee || 0) / 100 }}
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="客户手机号">
            <template slot-scope="scope">
              <template v-if="!scope.row.user_delete && login_type !== 'merchant'">
                <router-link
                  target="_blank"
                  :to="{
                    path: `${
                      login_type != 'distributor'
                        ? '/member/member/detail'
                        : '/shopadmin/member/member/detail'
                    }`,
                    query: { user_id: scope.row.user_id }
                  }"
                  >{{ scope.row.mobile }}</router-link
                >
                <el-tooltip
                  v-if="datapass_block == 0"
                  effect="dark"
                  content="复制"
                  placement="top-start"
                >
                  <i
                    v-clipboard:copy="scope.row.mobile"
                    v-clipboard:success="onCopySuccess"
                    class="el-icon-document-copy"
                  ></i>
                </el-tooltip>
              </template>
              <template slot-scope="scope" v-else>
                <span>{{ scope.row.mobile }}</span>
                <el-tooltip
                  v-if="datapass_block == 0"
                  effect="dark"
                  content="复制"
                  placement="top-start"
                >
                  <i
                    v-clipboard:copy="scope.row.mobile"
                    v-clipboard:success="onCopySuccess"
                    class="el-icon-document-copy"
                  ></i>
                </el-tooltip>
              </template>
            </template>
          </el-table-column>
          <template v-if="login_type != 'merchant'">
            <el-table-column label="订单类型" v-if="!isMicorMall">
              <template slot-scope="scope">
                {{ getOrderType(scope.row) }}
              </template>
            </el-table-column>
          </template>
          <el-table-column prop="order_status" label="订单状态">
            <template slot-scope="scope">
              {{ scope.row.order_status_msg }}
            </template>
          </el-table-column>

          <el-table-column label="配送方式">
            <template slot-scope="scope">
              {{ getDistributionType(scope.row) }}
            </template>
          </el-table-column>

          <!-- <el-table-column prop="source_name" label="来源"></el-table-column> -->
          <el-table-column label="操作" fixed="left">
            <template slot-scope="scope">
              <el-button type="text">
                <router-link
                  :to="`${$route.path}/detail?orderId=${scope.row.order_id}&resource=${$route.path}`"
                  >详情</router-link
                >
              </el-button>
              STANDARD:{{STANDARD}}
              <el-popover placement="right" width="450" trigger="hover">
                <div class="operating-icons">
                  
                </div>
                <el-button type="text" slot="reference"
                  >更多<i class="iconfont icon-angle-double-right"></i
                ></el-button>
              </el-popover>

              <!-- 非同城配的取消订单按钮 -->
              <template v-if="scope.row.distributor_id == '0' || login_type == 'distributor'">
                <el-button
                  type="text"
                  v-if="
                    (system_mode == 'standard' ||
                      is_distributor ||
                      scope.row.distributor_id == 0) &&
                    scope.row.receipt_type != 'dada' &&
                    scope.row.cancel_status == 'NO_APPLY_CANCEL' &&
                    (scope.row.order_status == 'NOTPAY' || scope.row.order_status == 'PAYED') &&
                    scope.row.ziti_status != 'DONE'
                  "
                  @click="cancelOrderAction(scope.row.order_id)"
                  >取消订单</el-button
                >
                <!-- 同城配的取消订单按钮 -->
                <el-button
                  type="text"
                  v-if="
                    (system_mode == 'standard' ||
                      is_distributor ||
                      scope.row.distributor_id == 0) &&
                    scope.row.receipt_type == 'dada' &&
                    scope.row.cancel_status == 'NO_APPLY_CANCEL' &&
                    (scope.row.order_status == 'NOTPAY' || scope.row.order_status == 'PAYED') &&
                    scope.row.ziti_status != 'DONE' &&
                    (scope.row.dada.dada_status == '0' || scope.row.dada.dada_status == '1')
                  "
                  @click="cancelOrderAction(scope.row.order_id)"
                  >取消订单</el-button
                >

                <el-button type="text">
                  <router-link
                    :to="{
                      path: matchHidePage('process'),
                      query: { orderId: scope.row.order_id, resource: $route.path }
                    }"
                    >日志</router-link
                  >
                </el-button>

                <el-button
                  type="text"
                  v-if="
                    (system_mode == 'standard' ||
                      is_distributor ||
                      scope.row.distributor_id == 0) &&
                    scope.row.order_status == 'PAYED' &&
                    scope.row.receipt_type == 'ziti' &&
                    scope.row.ziti_status == 'PENDING'
                  "
                  @click="writeoffOrderAction(scope.row.order_id)"
                  >核销</el-button
                >
                <el-button
                  type="text"
                  v-if="
                    (system_mode == 'standard' ||
                      is_distributor ||
                      scope.row.distributor_id == 0) &&
                    scope.row.receipt_type == 'dada' &&
                    (scope.row.cancel_status == 'NO_APPLY_CANCEL' ||
                      scope.row.cancel_status == 'FAILS') &&
                    scope.row.order_status == 'PAYED' &&
                    scope.row.delivery_status != 'DONE' &&
                    scope.row.dada.dada_status == '0'
                  "
                  @click="businessReceiptAction(scope.row)"
                  >接单</el-button
                >

                <el-button
                  type="text"
                  v-if="
                    (system_mode == 'standard' ||
                      is_distributor ||
                      scope.row.distributor_id == 0) &&
                    scope.row.receipt_type == 'dada' &&
                    scope.row.pay_status == 'PAYED' &&
                    scope.row.dada.dada_status == '9'
                  "
                  @click="confirmBack(scope.row)"
                  >确认退回</el-button
                >

                <template
                  v-if="
                    !IsBind &&
                    (system_mode == 'standard' || is_distributor || scope.row.distributor_id == 0)
                  "
                >
                  <el-button
                    type="text"
                    v-if="
                      (scope.row.receipt_type == 'logistics' || scope.row.is_logistics) &&
                      scope.row.receipt_type != 'dada' &&
                      scope.row.order_status == 'PAYED' &&
                      scope.row.delivery_status != 'DONE' &&
                      scope.row.receipt_type != 'ziti'
                    "
                    @click="deliveryAction(scope.row)"
                    >发货</el-button
                  >

                  <el-button
                    type="text"
                    v-if="
                      scope.row.cancel_status == 'WAIT_PROCESS' && scope.row.order_status == 'PAYED'
                    "
                    @click="confirmCancelOrderAction(scope.row.order_id)"
                    >退款</el-button
                  >
                </template>
                <el-button
                  type="text"
                  v-if="scope.row.is_invoiced == '0' && scope.row.invoice"
                  @click="IsInvoiced(scope.row, 1)"
                  >待开票</el-button
                >

                <el-button type="text" @click="clickShowRemark(scope.row, 'normalList')"
                  >备注</el-button
                >
              </template>
            </template>
          </el-table-column>
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

      <!-- 发货-开始 -->
      <!-- <ListDeliveryDialog
        :visible="deliveryVisible"
        :newVisible="deliveryVisibleNew"
        @onChangeData="handleChangeData"
        @onSuccessDelivery="getOrders"
        @onCancel="handleCancel"
        :deliveryData="deliveryData"
        :IsDisabled="IsDisabled"
        :dlycorps="dlycorps"
        :selectItemType="selectItemType"
        :deliveryInfo="deliveryInfo"
      /> -->

      <!-- 取消订单退款审核-开始 -->
      <!-- <ListCancelAuditDialog
        :visible="cancelVisible"
        @onChangeData="handleChangeData"
        @refreshList="getOrders"
        :cancelData="cancelData"
        :info="cancelInfo"
      /> -->

      <!-- 取消订单 -->
      <!-- <ListCancelOrderDialog
        :visible="cancelOrderVisible"
        :info="cancelOrderInfo"
        @onChangeData="handleChangeData"
        @refreshList="getOrders"
        :cancelOrderData="cancelOrderData"
      /> -->

      <!-- 自提订单核销 -->
      <!-- <ListWriteoffOrder
        :visible="writeoffOrderVisible"
        :writeoffOrderData="writeoffOrderData"
        :form="writeoffOrderForm"
        @refreshList="getOrders"
        @onChangeData="handleChangeData"
      /> -->
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mixin from '@/mixins'
import { pageMixin } from '@/mixins'
import { STANDARD } from '@/utils'
import {
  DISTRIBUTION_TYPE,
  ORDER_STATUS,
  ORDER_TYPE,
  INVOICE_STATUS,
  ORDER_CATEGORY,
  PICKER_DATE_OPTIONS
} from '@/consts'

export default {
  mixins: [mixin, pageMixin],
  data() {
    return {
      loading: false,
      params: {
        mobile: '',
        order_id: '',
        order_class_exclude: 'drug,pointsmall',
        salesman_mobile: '',
        receipt_type: '', // 配送类型
        order_status: '', // 订单状态
        order_class: '', // 订单类型
        is_invoiced: '', // 开票状态
        time_start_begin: '', //
        time_start_end: '',
        distributor_type: '', // 订单分类
        distributor_id: '' // 店铺
      },
      datapass_block: 1,
      filterParams: {},
      cancelOrderData: {
        orderInfo: {}
      },
      deliveryData: {
        orderInfo: {}
      },
      cancelData: {
        orderInfo: {}
      },
      writeoffOrderData: {
        items: {}
      },
      dataSource: {
        total_count: 0,
        list: [],
        loading: false,
        // 是否为数据脱敏
        datapass_block: 1
      },
      deliveryVisible: false,
      dlycorps: [],
      cancelVisible: false,
      cancelOrderVisible: false,
      writeoffOrderVisible: false,
      deliveryVisibleNew: false,
      writeoffOrderForm: {
        order_id: '',
        pickupcode: ''
      },
      size: 'small',
      // 选择发货订单的类型，老订单还是新订单
      selectItemType: '',
      distributionType: DISTRIBUTION_TYPE,
      orderStatus: ORDER_STATUS,
      orderType: ORDER_TYPE,
      invoiceStatus: INVOICE_STATUS,
      orderCategory: ORDER_CATEGORY,
      pickerOptions: PICKER_DATE_OPTIONS
    }
  },
  computed: {
    ...mapGetters(['login_type', 'isMicorMall'])
  },
  mounted() {
    const { tab } = this.$route.query
    if (tab) {
      this.params.order_status = tab
    }
    this.fetchList()
  },
  methods: {
    async fetchList() {
      this.loading = true
      const { pageIndex: page, pageSize } = this.page
      let params = {
        page,
        pageSize,
        order_type: 'normal',
        ...this.params
      }
      const { list, pager, datapass_block } = await this.$api.trade.getOrderList(params)
      
      this.tableList = list.map(item => {
        const actionBtns = []
        const { distributor_id, receipt_type } = item
        if(distributor_id == 0 || this.login_type == 'distributor') {
          if(STANDARD) {
          }
          actionBtns.push({ name: '备注', key: 'remark' })
        }

        // <el-button
        //           type="text"
        //           v-if="
        //             (system_mode == 'standard' ||
        //               is_distributor ||
        //               scope.row.distributor_id == 0) &&
        //             scope.row.receipt_type != 'dada' &&
        //             scope.row.cancel_status == 'NO_APPLY_CANCEL' &&
        //             (scope.row.order_status == 'NOTPAY' || scope.row.order_status == 'PAYED') &&
        //             scope.row.ziti_status != 'DONE'
        //           "
        //           @click="cancelOrderAction(scope.row.order_id)"
        //           >取消订单</el-button
        //         >
        return {
          ...item,
          actionBtns
        }
      })
      this.page.total = pager ? pager.count : 0
      this.datapass_block = datapass_block
      this.loading = false
    },
    getOrderType({ order_class, type }) {
      if (order_class == 'normal') {
        return type == '1' ? '跨境订单' : '普通订单'
      }
      const fd = ORDER_TYPE.find((item) => item.value == order_class)
      if (fd) {
        return fd.title
      }
    },
    getDistributionType({ receipt_type }) {
      const fd = DISTRIBUTION_TYPE.find((item) => item.value == receipt_type)
      if (fd) {
        return fd.title
      }
    },
    handleChangeData(changeField, changeValue) {
      if (typeof changeValue === 'boolean' || typeof changeValue === 'string') {
        this[changeField] = changeValue
      } else {
        this[changeField] = {
          ...this[changeField],
          ...changeValue
        }
      }
      if (changeField === 'params') {
        this.getOrders(this.params)
      }
    },
    getOrders() {
      this.dataSource.loading = true
      getOrderList({ ...this.params, ...this.filterParams }).then((response) => {
        const { list, pager, datapass_block } = response.data.data
        this.dataSource = {
          list,
          total_count: Number(pager.count),
          loading: false,
          datapass_block
        }
      })
    },
    handleCancel() {
      this.deliveryVisible = false

      this.deliveryVisibleNew = false

      this.IsDisabled = false
    }
  }
}
</script>
<style lang="scss" scope>
.sp-filter-form {
  margin-bottom: 16px;
}
</style>
