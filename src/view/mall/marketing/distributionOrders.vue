<template>
  <SpPage>
    <SpRouterView>
      <SpPlatformTip v-if="!VERSION_SHUYUN()" h5 app alipay />
      <el-row class="filter-header" :gutter="20">
        <el-col>
          <el-date-picker
            v-model="create_time"
            type="daterange"
            value-format="yyyy/MM/dd"
            placeholder="选择日期范围"
            @change="dateChange"
          />
          <el-input v-model="identifier" class="input-m" placeholder="手机号/订单号">
            <el-button slot="append" icon="el-icon-search" @click="numberSearch" />
          </el-input>
          <el-select v-model="order_class" placeholder="请选择订单类型" @change="TypeHandle">
            <el-option
              v-for="(item, index) in order_class_array"
              :key="index"
              :label="item.title"
              :value="item.value"
            />
          </el-select>
          <!-- <el-autocomplete
            v-model="source_name"
            class="inline-input"
            :fetch-suggestions="querySearch"
            placeholder="请输入来源"
            @select="sourceSearch"
          /> -->
          <el-select
            v-model="distributor_id"
            placeholder="请选择店铺"
            @change="distributorSelectHandle"
          >
            <el-option
              v-for="(item, index) in distributorList"
              :key="index"
              :label="item.name"
              :value="item.distributor_id"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all" />
        <el-tab-pane label="待发货" name="notship" />
        <el-tab-pane label="已完成" name="done" />
        <el-tab-pane label="未支付" name="notpay" />
        <el-tab-pane label="已取消" name="cancel" />
        <el-table
          v-loading="loading"
          :data="list"
          style="width: 100%"
          :height="wheight - 190"
          element-loading-text="数据加载中"
        >
          <el-table-column prop="order_id" label="订单号">
            <template slot-scope="scope">
              <div class="order-num">
                {{ scope.row.order_id }}
                <el-tooltip effect="dark" content="复制" placement="top-start">
                  <i
                    v-clipboard:copy="scope.row.order_id"
                    v-clipboard:success="onCopy"
                    class="el-icon-document-copy"
                  />
                </el-tooltip>
              </div>
              <div v-if="scope.row.distributor_name" class="order-store">
                <el-tooltip effect="dark" content="店铺名" placement="top-start">
                  <i class="el-icon-office-building" />
                </el-tooltip>
                {{ scope.row.distributor_name }}
              </div>
              <div class="order-time">
                <el-tooltip effect="dark" content="下单时间" placement="top-start">
                  <i class="el-icon-time" />
                </el-tooltip>
                {{ scope.row.create_time | datetime('YYYY-MM-DD HH:mm:ss') }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="运费">
            <template slot-scope="scope">
              <span class="cur">{{ scope.row.fee_symbol }}</span
              >{{ scope.row.freight_fee / 100 }}
            </template>
          </el-table-column>
          <!--
          <el-table-column width="70" label="商品金额">
            <template slot-scope="scope">
              {{scope.row.fee_symbol}}{{scope.row.item_fee / 100}}
            </template>
          </el-table-column>
          -->
          <el-table-column prop="total_fee" label="订单金额">
            <template slot-scope="scope">
              <span class="cur">{{ scope.row.fee_symbol }}</span
              >{{ scope.row.total_fee / 100 }}
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="联系手机">
            <template slot-scope="scope">
              <i class="el-icon-mobile" />
              {{ scope.row.mobile }}
              <el-tooltip
                v-if="datapass_block == 0"
                effect="dark"
                content="复制"
                placement="top-start"
              >
                <i
                  v-clipboard:copy="scope.row.mobile"
                  v-clipboard:success="onCopy"
                  class="el-icon-document-copy"
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="订单类型">
            <template slot-scope="scope">
              {{ getOrderType(scope.row) }}
            </template>
          </el-table-column>
          <!--
          <el-table-column prop="is_distribution" label="是否分销">
            <template slot-scope="scope">
              <span v-if="scope.row.is_distribution == 1"> 是 </span>
              <span v-else> - </span>
            </template>
          </el-table-column>
          -->
          <el-table-column label="状态">
            <template slot-scope="scope">
              <!-- 订单状态 -->
              <el-tag v-if="scope.row.order_status == 'PAYED'" type="success" size="mini">
                已支付
              </el-tag>
              <el-tag v-if="scope.row.order_status == 'NOTPAY'" size="mini"> 未支付 </el-tag>
              <el-tag v-if="scope.row.order_status == 'CANCEL'" type="danger" size="mini">
                已取消
              </el-tag>
              <el-tag
                v-if="scope.row.order_status == 'WAIT_BUYER_CONFIRM'"
                type="danger"
                size="mini"
              >
                待收货
              </el-tag>
              <template v-if="scope.row.order_status != 'CANCEL'">
                <!-- 发货状态 -->
                <el-tag v-if="scope.row.delivery_status == 'DONE'" type="success" size="mini">
                  已发货
                </el-tag>
                <el-tag
                  v-else-if="scope.row.delivery_status == 'PARTAIL'"
                  type="danger"
                  size="mini"
                >
                  部分发货
                </el-tag>
                <el-tag v-else-if="scope.row.ziti_status == 'PENDING'" type="danger" size="mini">
                  待自提
                </el-tag>
                <el-tag v-else-if="scope.row.ziti_status == 'DONE'" type="danger" size="mini">
                  已自提
                </el-tag>
                <el-tag v-else size="mini"> 待发货 </el-tag>
              </template>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="source_name"
            label="来源"
          /> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text">
                <router-link
                  :to="{
                    path: matchRoutePath('detail'),
                    query: { orderId: scope.row.order_id, resource: '/mall/trade/normalorders' }
                  }"
                >
                  详情
                </router-link>
              </el-button>
              <el-button
                v-if="
                  scope.row.receipt_type == 'logistics' &&
                  scope.row.order_status == 'PAYED' &&
                  scope.row.delivery_status != 'DONE' &&
                  !IS_ADMIN()
                "
                type="text"
                @click="deliveryAction(scope.row.order_id)"
              >
                发货
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="content-padded content-center">
          <el-pagination
            layout="prev, pager, next"
            :current-page.sync="params.page"
            :total="total_count"
            :page-size="params.pageSize"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tabs>

      <SearchForm class="mb-4" @submit="handleSearch" />

      <SpTabs :tab-list="tabList" v-model="activeTab" @change="handleTabChange" />

      <SpFinder
        no-selection
        ref="finder"
        url="/orders"
        row-actions-align="left"
        row-actions-fixed-align="left"
        row-actions-width="120px"
        :fixed-row-action="true"
        :setting="finderSetting"
        :hooks="{
          beforeSearch: beforeSearch,
          afterSearch: afterSearch
        }"
      />
    </SpRouterView>
  </SpPage>
</template>

<script>
import { createSetting } from '@shopex/finder'
import _map from 'lodash/map'
import moment from 'moment'
import {
  ORDER_TYPE,
  ORDER_TYPE_STANDARD,
  ORDER_ZITI_STATUS_MAP,
  ORDER_DELIVERY_STATUS_MAP,
  ORDER_STATUS_MAP
} from '@/consts'
import { IS_ADMIN, VERSION_STANDARD, formatPrice } from '@/utils'
import { useForm } from '@/composables'
import hqbdlycorp from '@/common/hqbdlycorp.json'

const LOCAL_ORDER_TYPE = VERSION_STANDARD()
  ? _map(ORDER_TYPE_STANDARD, item => ({ label: item.title, value: item.value }))
  : _map(ORDER_TYPE, item => ({ label: item.title, value: item.value }))

const [SearchForm, SearchFormApi] = useForm({
  formType: 'searchForm',
  formItems: [
    {
      component: 'DateTimePicker',
      componentProps: {
        type: 'datetimerange'
      },
      fieldName: 'create_time',
      formItemClass: 'col-span-2',
      label: '订单时间',
      value: []
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入手机号'
      },
      fieldName: 'mobile',
      formItemClass: 'col-start-3',
      label: '手机号',
      value: ''
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入订单号'
      },
      fieldName: 'order_id',
      label: '订单号',
      value: ''
    },
    {
      component: 'Select',
      componentProps: {
        placeholder: '请选择订单类型',
        options: LOCAL_ORDER_TYPE
      },
      fieldName: 'order_class',
      label: '订单类型',
      value: ''
    },
    {
      component: ({ h, value, onInput }) => {
        return (
          <SpSelectShop
            value={value}
            size="small"
            placeholder="请选择店铺"
            onChange={val => {
              onInput(val)
            }}
          />
        )
      },
      fieldName: 'distributor_id',
      label: '店铺',
      value: 'test'
    }
  ],
  inline: true
})

const [DeliveryForm, DeliveryFormApi] = useForm({
  formItems: [
    {
      component: ({ h, value }) => {
        return <div>{value}</div>
      },
      label: '订单号',
      fieldName: 'order_id'
    },
    {
      component: ({ h, value }) => {
        return (
          <el-table border data={value} style="width: 100%">
            <el-table-column prop="item_name" label="商品名" />
            <el-table-column prop="num" label="数量" width="80" />
            <el-table-column
              label="总价"
              width="160"
              scopedSlots={{
                default: scope => <span>{formatPrice(scope.row.total_fee)}</span>
              }}
            />
          </el-table>
        )
      },
      label: '商品信息',
      fieldName: 'goods_info',
      value: []
    },
    {
      component: 'Select',
      label: '快递公司',
      fieldName: 'delivery_corp',
      formItemClass: 'w-1/3',
      componentProps: {
        filterable: true,
        options: _map(hqbdlycorp, item => ({
          label: item.name,
          value: item.value
        }))
      },
      rules: [{ required: true, message: '请选择快递公司' }]
    },
    {
      component: 'Input',
      label: '快递单号',
      fieldName: 'delivery_no',
      formItemClass: 'w-1/3',
      rules: [{ required: true, message: '快递单号不能为空' }]
    }
  ],
  showDefaultActions: false
})

export default {
  components: {
    SearchForm: SearchForm
  },
  data() {
    return {
      datapass_block: 1,
      finderSetting: createSetting({
        actions: [
          {
            name: '详情',
            key: 'detail',
            type: 'button',
            buttonType: 'text',
            action: {
              handler: ([row]) => {
                this.$router.push({
                  path: `${this.$route.path}/detail`,
                  query: {
                    orderId: row.order_id,
                    resource: '/mall/trade/normalorders'
                  }
                })
              }
            }
          },
          {
            name: '发货',
            key: 'delivery',
            type: 'button',
            buttonType: 'text',
            action: {
              handler: async ([row]) => {
                const { orderInfo } = await this.$api.trade.getOrderDetail(row.order_id)
                const goodsInfo = orderInfo?.items || []
                await this.$dialog.open({
                  title: '发货',
                  content: (
                    <DeliveryForm
                      value={{
                        order_id: row.order_id,
                        goods_info: goodsInfo
                      }}
                    />
                  ),
                  confirmBefore: async () => {
                    try {
                      await DeliveryFormApi.validate()
                    } catch (error) {
                      throw new Error('表单验证失败')
                    }
                  }
                })
                const res = await DeliveryFormApi.getFieldsValue()
                await this.$api.trade.delivery({
                  order_id: row.order_id,
                  delivery_corp: res.delivery_corp,
                  delivery_code: res.delivery_code
                })
                this.$message.success('发货成功')
                this.$refs.finder.refresh()
              }
            },
            visible: row => {
              return (
                row.receipt_type == 'logistics' &&
                row.order_status == 'PAYED' &&
                row.delivery_status != 'DONE' &&
                !IS_ADMIN()
              )
            }
          }
        ],
        columns: [
          {
            name: '订单号',
            key: 'order_id',
            width: 220,
            render(h, { row }) {
              return (
                <div>
                  <SpClipboard content={row.order_id} />
                  <div class="flex items-center">
                    <SpIcon class="mr-1" name="store" />
                    {row.distributor_name}
                  </div>
                </div>
              )
            }
          },
          {
            name: '订单时间',
            key: 'create_time',
            width: 180,
            formatter: (value, row, col) => {
              return `${moment(row.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')}`
            }
          },
          {
            name: '运费',
            key: 'freight_fee',
            width: 100,
            formatter: (value, row, col) => {
              return `${formatPrice(value || 0)}`
            }
          },
          {
            name: '订单金额',
            key: 'total_fee',
            width: 120,
            formatter: (value, row, col) => `${formatPrice(value)}`
          },
          {
            name: '联系电话',
            key: 'mobile',
            render(h, { row }) {
              return <SpClipboard content={row.mobile} />
            }
          },
          {
            name: '订单类型',
            key: 'order_class',
            formatter: value => {
              return LOCAL_ORDER_TYPE.find(item => item.value == value)?.label
            }
          },
          {
            name: '订单状态',
            key: 'order_status',
            render(h, { row }) {
              return h(
                'el-tag',
                {
                  props: {
                    type:
                      ORDER_STATUS_MAP[row.order_status]?.type ||
                      ORDER_DELIVERY_STATUS_MAP[row.delivery_status]?.type ||
                      ORDER_ZITI_STATUS_MAP[row.ziti_status]?.type,
                    size: 'mini'
                  }
                },
                ORDER_STATUS_MAP[row.order_status]?.lable ||
                  ORDER_DELIVERY_STATUS_MAP[row.delivery_status]?.lable ||
                  ORDER_ZITI_STATUS_MAP[row.ziti_status]?.lable
              )
            }
          }
        ]
      }),
      activeTab: 'all',
      tabList: [
        { label: '全部订单', name: 'all' },
        { label: '待发货', name: 'notship' },
        { label: '已完成', name: 'done' },
        { label: '未支付', name: 'notpay' },
        { label: '已取消', name: 'cancel' }
      ]
    }
  },
  mounted() {},
  methods: {
    beforeSearch(params) {
      const { create_time, mobile, order_id, order_class, distributor_id } =
        SearchFormApi.getFieldsValue()
      const _params = {
        ...params,
        order_type: 'normal',
        order_class_exclude: 'community',
        is_distribution: 1
      }

      if (create_time.length > 0) {
        _params.time_start_begin = create_time[0].getTime() / 1000
        _params.time_start_end = create_time[1].getTime() / 1000
      }

      order_id && (_params.order_id = order_id)
      mobile && (_params.mobile = mobile)
      order_class && (_params.order_class = order_class)
      distributor_id && (_params.distributor_id = distributor_id)

      if (this.activeTab !== 'all') {
        _params['order_status'] = this.activeTab
      }
      return _params
    },
    afterSearch(response) {
      response.data.data['total_count'] = response.data.data.pager.count
      return response
    },
    handleTabChange(tab) {
      this.$refs.finder.refresh(true)
    },
    handleSearch(form) {
      this.$refs.finder.refresh(true)
    }
  }
}
</script>
