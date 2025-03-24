<template>
  <div class="section section-white">
    <el-form
      ref="recorddata"
      :model="recorddata"
      label-width="150px"
      label-position="right"
      class="demo-ruleForm"
    >
      <div class="section-header with-border">
        活动报名信息
      </div>
      <div class="section-body">
        <el-form-item label="活动名称">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item
          label="活动有效时间"
          prop="activity_time"
        >
          {{ recorddata.start_date }} ~ {{ recorddata.end_date }}
        </el-form-item>
        <el-form-item label="活动状态">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="活动城市">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="活动地址">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="详情地址">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="是否进白名单">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="昵称">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="手机号">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="获取积分">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="可重复报名">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="是否审核">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="线下核销">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="允许取消报名">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="活动群组编号">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="进内购企业白名单">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="适用会员">
          {{ recorddata.activity_name }}
        </el-form-item>
        <el-form-item label="适用店铺">
          <SpFinder
            :noSelection='true'
            :setting="shopSetting"
            :data="recorddata.distributor_list"
            url=""
            v-if="recorddata.distributor_list?.length > 0"
            style="width:80%"
          />
        </el-form-item>
        <el-form-item label="企业">
          <SpFinder
            :noSelection='true'
            :setting="setting"
            :data="recorddata.enterprise_list"
            url=""
            v-if="recorddata.enterprise_list?.length > 0"
            style="width:80%"
          />
        </el-form-item>
      </div>
      <div class="section-header with-border">
        报名登记信息
      </div>
      <div class="section-body">
        <el-form-item
          label="审核结果"
          prop="status"
        >
          <el-tag
            v-if="recorddata.status == 'pending'"
            type="warning"
            size="mini"
          >
            待审核
          </el-tag>
          <el-tag
            v-if="recorddata.status == 'passed'"
            type="success"
            size="mini"
          >
            已通过
          </el-tag>
          <el-tag
            v-if="recorddata.status == 'rejected'"
            type="danger"
            size="mini"
          >
            已拒绝
          </el-tag>
        </el-form-item>
        <el-form-item label="报名问卷">
          <el-card
            v-for="(item, index) in recorddata.content"
            :key="index"
            class="box-card"
          >
            <div
              slot="header"
              class="clearfix"
            >
              <span>{{ item.title }}</span>
            </div>
            <div
              v-for="(item, key) in item.formdata"
              :key="key"
              class="text item"
            >
              {{ item.field_title }}: {{ item.answer }}
            </div>
          </el-card>
        </el-form-item>
      </div>
      <div class="section-header with-border">
        上传的证照信息
      </div>
      <div class="section-body"></div>
      <div class="section-header with-border">
        活动报名审核
      </div>
      <div class="section-body">
        <el-form-item
          v-if="recorddata.status == 'pending'"
          label="是否同意"
        >
          <el-switch v-model="form.status" />
        </el-form-item>
        <el-form-item
          v-if="form.status === false && recorddata.status == 'pending'"
          label="拒绝原因"
        >
          <el-input
            v-model="form.reason"
            type="textarea"
          />
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          v-if="recorddata.status == 'pending'"
          type="primary"
          @click="submitAction"
        >
          提交审核
        </el-button>
        <el-button @click="handleCancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { regActivityRecordinfo, registrationReview } from '@/api/selfhelpform'
import { createSetting } from '@shopex/finder'

export default {
  inject: ['refresh'],
  data () {
    return {
      activity_date: [],
      form: {
        record_id: '',
        status: true,
        reason: ''
      },
      recorddata: {},
      shopSetting: {
        columns: [
          { name: 'ID', key: 'distributor_id'  },
          { name: '名称', key: 'name' },
          { name: 'address', key: '地址' },
        ]
      },
      setting: {
        columns: [
          { name: '企业ID', key: 'id'  },
          { name: '企业名称', key: 'enterprise_sn' },
          { name: '登录类型', key: 'enterprise_sn' },
          { name: '来源店铺', key: 'enterprise_sn' },
        ]
      }
    }
  },
  mounted () {
    if (this.$route.query.id) {
      let filter = { record_id: this.$route.query.id }
      regActivityRecordinfo(filter).then((res) => {
        this.recorddata = res.data.data
        this.form.record_id = this.recorddata.record_id
      })
    }
  },
  methods: {
    submitAction () {
      const that = this
      registrationReview(that.form).then((res) => {
        if (res.data.data.status) {
          that.$router.go(-1)
        }
      })
    },
    handleCancel () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 1px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 480px;
}
</style>
