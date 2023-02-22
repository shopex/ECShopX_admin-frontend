<style lang="scss">
.merchant-store {
  .el-form-item {
    width: 360px;
  }
  // .el-form-item__content {
  //   width: 260px;
  // }
  .start-time,
  .end-time {
    width: 120px;
  }
  .separator {
    margin: 0 7px;
  }
  .lng-lat-block {
    display: flex;
    align-items: center;
    .el-input {
      width: 120px;
    }
    .separator {
      margin: 0 7px;
    }
  }
  .address-block {
    display: flex;
    align-items: center;
    .regions {
      margin-right: 10px;
      width: 260px;
    }
    .address {
      width: 400px;
      max-width: inherit;
      margin-right: 10px;
    }
  }
  #qqmap_rslist {
    border-right: 1px solid #e7e7eb;
  }
  #qqmap_container {
    width: 800px;
    height: 400px;
  }
}
</style>
<template>
  <div class="merchant-store">
    <SpForm
      ref="form"
      v-model="form"
      show-message
      label-width="100px"
      :form-list="formList"
      :submit="false"
    />

    <div class="footer-container">
      <el-button @click.native="handleCancel"> 取消 </el-button>
      <el-button
        v-if="!VERSION_STANDARD || (!IS_DISTRIBUTOR && VERSION_STANDARD)"
        type="primary"
        :loading="submitLoading"
        @click="onFormSubmit"
      >
        {{ submitLoading ? '提交中' : '保存' }}
      </el-button>
    </div>
  </div>
</template>

<script>
import _uniqBy from 'lodash/uniqBy'
import richTextEditor from '@/components/function/richTextEditor'
import { isObject, isArray, isEmpty } from '@/utils'
import Pages from '@/utils/pages'
import district from '@/common/district.json'
import DaoDianZiti from './components/DaoDianZiti'
// import CmSpecParams from './comps/CmSpecParams'
// import CmSkuParams from './comps/CmSkuParams'
// import sku from '../../store/modules/sku'
export default {
  data() {
    let distributionTypeOptions = [
      {
        title: '自营',
        value: 0
      }
    ]
    if (!this.VERSION_STANDARD) {
      distributionTypeOptions.push({
        title: '加盟',
        value: 1
      })
    }
    return {
      form: {
        distribution_type: 0, // 店铺类型： 0=自营；1=加盟
        merchant_id: '',
        shop_code: '',
        contact: '',
        mobile: '',
        contract_phone: '',
        startTime: '',
        endTime: '',
        is_delivery: false,
        is_audit_goods: false,
        auto_sync_goods: false,
        is_require_subdistrict: false,
        is_require_building: false,
        logo: '',
        banner: '',
        lng: '116.397128',
        lat: '39.916527'
      },
      formList: [
        {
          label: '店铺类型',
          type: 'group'
        },
        {
          label: '店铺类型',
          key: 'distribution_type',
          type: 'select',
          options: distributionTypeOptions
        },
        {
          label: '所属商户',
          key: 'merchant_id',
          type: 'select',
          component: ({ key }, value) => {
            return (
              <el-select
                v-model={value[key]}
                v-scroll={() => this.pageQuery.nextPage()}
                clearable
                on-clear={() => this.onRemoteGetMerchant()}
                on-focus={() => this.onRemoteGetMerchant()}
                filterable
                loading={this.remoteLoading}
                remote
                remote-method={(e) => this.onRemoteGetMerchant(e)}
                placeholder='输入商户名称搜索'
              >
                {this.merchantList.map((item, index) => (
                  <el-option
                    key={`option-item__${index}`}
                    label={item.merchant_name}
                    value={item.id}
                  />
                ))}
              </el-select>
            )
          }
        },
        {
          label: '基础信息',
          type: 'group'
        },
        {
          label: '店铺号',
          key: 'shop_code',
          type: 'input',
          display: 'inline',
          placeholder: '请输入店铺号',
          required: true
        },
        {
          label: '店铺名称',
          key: 'name',
          type: 'input',
          display: 'inline',
          placeholder: '请输入店铺名称',
          required: true
        },
        {
          label: '联系人姓名',
          key: 'contact',
          type: 'input',
          display: 'inline',
          placeholder: '请输入联系人姓名',
          required: true
        },
        {
          label: '联系方式',
          key: 'mobile',
          type: 'input',
          display: 'inline',
          placeholder: '请输入联系人手机号',
          required: true
        },
        {
          label: '固定座机',
          key: 'contract_phone',
          type: 'input',
          display: 'inline',
          placeholder: '请输入联系人座机号'
        },
        {
          label: '经营时间',
          // key: 'contract_phone',
          display: 'inline',
          component: ({ key }, value) => {
            return (
              <div>
                <el-time-select
                  v-model={value['startTime']}
                  class='start-time'
                  placeholder='起始时间'
                  picker-options={{
                    start: '00:00',
                    step: '00:30',
                    end: '23:59'
                  }}
                />
                <span class='separator'>-</span>
                <el-time-select
                  v-model={value['endTime']}
                  class='end-time'
                  placeholder='结束时间'
                  picker-options={{
                    start: '00:00',
                    step: '00:30',
                    end: '23:59',
                    minTime: value.startTime
                  }}
                />
              </div>
            )
          }
        },
        {
          label: '是否快递',
          key: 'is_delivery',
          type: 'switch',
          display: 'inline'
        },
        {
          label: '审核商品',
          key: 'is_audit_goods',
          type: 'switch',
          display: 'inline',
          tip: '开启后，店铺添加的自有商品，需要平台审核通过后才可以上架'
        },
        {
          label: '同步商品',
          key: 'auto_sync_goods',
          type: 'switch',
          display: 'inline',
          tip: '自动同步商品至店铺'
        },
        {
          label: '街道居委',
          key: 'is_require_subdistrict',
          type: 'switch',
          display: 'inline',
          tip: '下单是否需要选择街道居委'
        },
        {
          label: '楼号房号',
          key: 'is_require_building',
          type: 'switch',
          display: 'inline',
          tip: '下单是否需要填写楼号房号'
        },
        {
          label: '店铺图片',
          type: 'group',
          tip: '（只能上传jpg/png文件，且不超过2M）'
        },
        {
          label: '店铺Logo',
          key: 'logo',
          display: 'inline',
          component: ({ key }, value) => {
            return <SpImagePicker v-model={value[key]} />
          }
        },
        {
          label: '店铺背景',
          key: 'banner',
          display: 'inline',
          component: ({ key }, value) => {
            return <SpImagePicker v-model={value[key]} />
          }
        },
        {
          label: '店铺位置',
          type: 'group',
          tip: '（店铺定位后保存店铺经纬度，才可以开启自提，否则店铺不支持自提功能）'
        },
        {
          label: '店铺经纬度',
          component: ({ key }, value) => {
            return (
              <div class='lng-lat-block'>
                <el-input v-model={value.lng} readonly placeholder='经度' />
                <span class='separator'>-</span>
                <el-input v-model={value.lat} readonly placeholder='纬度' />
              </div>
            )
          }
        },
        {
          label: '地理位置',
          width: '1000px',
          component: ({ key }, value) => {
            return (
              <div class='address-block'>
                <el-cascader v-model={value['regions_id']} class='regions' options={district} />
                <el-input
                  v-model={value['address']}
                  class='address'
                  placeholder='请输入详细地址（去除省市县）'
                />
                <el-button type='primary' on-click={this.searchKeyword}>
                  搜索定位
                </el-button>
              </div>
            )
          }
        },
        {
          label: '',
          component: ({ key }, value) => <div id='qqmap_container' />
        },
        {
          label: '同城配',
          type: 'group',
          tip: '（需先选择店铺地理位置，系统根据店铺位置判断该地区是否支持同城配）'
        },
        {
          label: '达达同城配',
          key: 'is_dada',
          type: 'switch',
          width: 'auto',
          tip: '开启后有店铺订单时需要改店铺人员手动接单，接单后系统会自动在达达平台下单'
        },
        {
          label: '业务类型',
          key: 'business',
          type: 'select',
          options: []
        },
        {
          label: '到店自提',
          type: 'group'
        },
        {
          label: '到店自提',
          key: 'is_ziti',
          type: 'switch',
          width: 'auto',
          tip: '启用到店自提功能后，买家下单时可选择下方地址自提，下单后你需要尽快将商品配送至指定自提点；下方自提地址共享该店铺库存。'
        },
        {
          label: '到店自提',
          key: 'is_ziti',
          type: 'switch',
          width: 'auto',
          component: () => <DaoDianZiti />
        }
      ],
      merchantList: [],
      remoteLoading: false,
      regions: district,
      submitLoading: false,
      searchService: null
    }
  },
  created() {
    this.pageQuery = new Pages({
      pageSize: 10,
      fetch: this.getMerchantList
    })
    this.getDadaInfo()
  },
  mounted() {
    this.$nextTick(() => {
      this.qqmapinit()
    })
  },
  methods: {
    async getMerchantList({ page, pageSize }, keywords) {
      let params = {
        pageSize,
        page
      }
      if (!isEmpty(keywords)) {
        params = {
          ...params,
          merchant_name: keywords
        }
      }
      if (page == 1) {
        this.remoteLoading = true
      }
      const { list, total_count } = await this.$api.marketing.getMerchantsList(params)
      if (page == 1) {
        this.remoteLoading = false
      }
      this.pageQuery.setTotal(total_count)
      this.merchantList = this.merchantList.concat(list)
    },
    onRemoteGetMerchant(e) {
      this.merchantList = []
      this.pageQuery.reset(e)
    },
    searchKeyword() {},
    async getDadaInfo() {
      const { business_list, is_open } = await this.$api.dada.getDadaInfo()
      const typeList = Object.keys(business_list).reduce((total, current, index) => {
        return total.concat({
          value: Number(current),
          title: business_list[current]
        })
      }, [])
      this.formList.forEach((item) => {
        if (item.key == 'business') {
          item.options = typeList
        }
      })
    },
    qqmapinit() {
      const { lat, lng } = this.form
      const center = new qq.maps.LatLng(lat, lng)
      console.log(document.getElementById('qqmap_container'))
      const map = new qq.maps.Map(document.getElementById('qqmap_container'), {
        center: center,
        zoom: 13
      })
      //创建marker
      new qq.maps.Marker({
        position: center,
        map: map
      })
      var that = this
      //设置Poi检索服务，用于本地检索、周边检索
      this.searchService = new qq.maps.SearchService({
        panel: document.getElementById('qqmap_rslist'),
        //检索成功的回调函数
        complete: function (results) {
          //设置回调函数参数
          var pois = results.detail.pois
          var infoWin = new qq.maps.InfoWindow({
            map: map
          })
          if (!pois) {
            return that.$message.error('您输入的位置有误')
          }
          var latlngBounds = new qq.maps.LatLngBounds()
          for (var i = 0, l = pois.length; i < l; i++) {
            var poi = pois[i]
            //扩展边界范围，用来包含搜索到的Poi点
            latlngBounds.extend(poi.latLng)
            ;(function (n) {
              var marker = new qq.maps.Marker({
                map: map
              })
              marker.setPosition(pois[n].latLng)

              marker.setTitle(i + 1)
              that.markers.push(marker)
              qq.maps.event.addListener(marker, 'click', function () {
                infoWin.open()
                that.qqmap_infowin_flag = true

                that.poi_info = pois[n] //将选点位置信息存入poi_info
                infoWin.setContent(document.getElementById('qqmap_infowin'))
                infoWin.setPosition(pois[n].latLng)
                that.content.baseForm.address = pois[n].name
                console.log(pois[n])
              })
            })(i)
          }
          map.fitBounds(latlngBounds)
        },
        //若服务请求失败，则运行以下函数
        error: function () {
          this.$message({
            message: '未查询到数据',
            type: 'error'
          })
        }
      })
    },
    handleCancel() {},
    onFormSubmit() {}
  }
}
</script>
