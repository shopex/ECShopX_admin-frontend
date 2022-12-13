<style lang="scss">
.marketing-employee-purchase {
  .activity-name,
  .activity-title {
    max-width: 480px;
  }
  .company-list {
    width: 480px;
    .el-input {
      max-width: 480px;
    }
    .el-select__tags {
      max-width: 100% !important;
    }
  }
  .activity-time-field {
    margin-top: 10px;
    .form-item-content {
      margin-top: 10px;
      label {
        margin-right: 10px;
      }
    }
    .el-range-input {
    }
    .el-range-separator {
      width: 30px;
    }
  }
  .activity-limit-field {
    margin-top: 10px;
    .content-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      label {
        margin-right: 10px;
      }
      .sp-input {
        flex: 1;
      }
      .item-wrap {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
<template>
  <div class="marketing-employee-purchase">
    <el-card class="el-card--normal" header="基础信息">
      <SpForm
        ref="formBase"
        v-model="formBase"
        class="base-form"
        :form-list="formBaseList"
        :submit="false"
      />
    </el-card>
    <el-card class="el-card--normal" header="活动规则">
      <SpForm
        ref="formBase"
        v-model="activityRule"
        class="base-form"
        :form-list="activityRuleList"
        :submit="false"
      />
    </el-card>
    <el-card class="el-card--normal" header="活动商品" />

    <div class="footer-container">
      <el-button
        @click="
          () => {
            this.$router.go(-1)
          }
        "
      >
        取消
      </el-button>
      <el-button
        type="primary"
        @click="
          () => {
            this.$refs['form'].handleSubmit()
          }
        "
      >
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      formBase: {
        name: '',
        title: '',
        linkHome: '',
        pic: []
      },
      formBaseList: [
        {
          label: '活动名称',
          className: 'activity-name',
          key: 'name',
          type: 'input',
          required: true,
          maxlength: 30,
          placeholder: '活动名称，管理活动用，不对消费者展示，最多30个字',
          message: '活动名称不能为空'
        },
        {
          label: '活动标题',
          className: 'activity-title',
          key: 'title',
          type: 'input',
          required: true,
          maxlength: 16,
          placeholder: '活动标题，再活动列表展示，最多16个字',
          message: '活动标题不能为空'
        },
        {
          label: '活动首页',
          key: 'name',
          component: () => (
            <div>
              <span></span>
              <el-button type='text' on-click={this.onPickerTemp}>
                选择首页
              </el-button>
            </div>
          )
        },
        {
          label: '分享活动',
          key: 'name',
          component: () => (
            <div>
              <span></span>
              <SpImagePicker />
            </div>
          )
        }
      ],
      activityRule: {
        companyList: [],
        personnel: [],
        activityTime: {
          employee: [],
          relatives: []
        },
        limit: {
          employee: '',
          relatives: {
            type: 1,
            limit: 100,
            shareLimit: 100
          }
        },
        orderMiniAmount: '',
        modifyReceiveAddress: ''
      },
      activityRuleList: [
        {
          label: '参与企业',
          key: 'companyList',
          type: 'input',
          required: true,
          component: () => (
            <el-select
              v-model={this.activityRule.companyList}
              class='company-list'
              multiple
              filterable
              placeholder='请选择企业'
            >
              {this.companyList.map((item) => (
                <el-option key={item.value} label={item.label} value={item.value}></el-option>
              ))}
            </el-select>
          ),
          placeholder: '活动名称，管理活动用，不对消费者展示，最多30个字',
          message: '活动名称不能为空'
        },
        {
          label: '参与人员',
          key: 'personnel',
          type: 'checkbox',
          options: [
            { name: '员工', label: '1' },
            { name: '亲友', label: '2' }
          ],
          message: '活动名称不能为空'
        },
        {
          label: '活动时间',
          key: 'time',
          component: () => (
            <div class='activity-time-field'>
              <div class='form-item-tip'>活动人员在设置的时间段内可参与活动</div>
              <div class='form-item-content'>
                <div class='content-item'>
                  <label>员工</label>
                  <el-date-picker
                    v-model={this.activityRule.activityTime.employee}
                    type='daterange'
                    range-separator='至'
                    start-placeholder='开始时间'
                    end-placeholder='结束时间'
                  ></el-date-picker>
                </div>
                <div class='content-item'>
                  <label>亲友</label>
                  <el-date-picker
                    v-model={this.activityRule.activityTime.relatives}
                    type='daterange'
                    range-separator='至'
                    start-placeholder='开始时间'
                    end-placeholder='结束时间'
                  ></el-date-picker>
                </div>
              </div>
            </div>
          ),
          message: '活动名称不能为空'
        },
        {
          label: '购买额度',
          key: 'time',
          component: () => (
            <div class='activity-limit-field'>
              <div class='form-item-tip'>活动人员在设置的时间段内可参与活动</div>
              <div class='form-item-content'>
                <div class='content-item'>
                  <label>员工</label>
                  <SpInput width='100px' prefix='每人最多可购买额度' suffix='元' />
                </div>
                <div class='content-item'>
                  <label>亲友</label>
                  <div class='content-item-field'>
                    <div class='item-wrap'>
                      <el-radio v-model={this.activityRule.limit.relatives.type} />
                      <SpInput width='100px' prefix='每人最多可购买额度' suffix='元' />
                    </div>
                    <div class='item-wrap'>
                      <el-radio v-model={this.activityRule.limit.relatives.type} />
                      <SpInput width='100px' prefix='所有亲友共享额度' suffix='元' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
          message: '活动名称不能为空'
        },
        {
          label: '订单最低金额',
          key: 'orderMiniAmount',
          component: () => <SpInput width='100px' prefix='单笔订单不低于' suffix='元' />
        },
        {
          label: '修改收货地址',
          key: 'modifyReceiveAddress',
          component: () => (
            <SpInput width='100px' prefix='活动结束后' suffix='小时内买家可修改收货地址' />
          ),
          tip: '请输入≥0的整数，从活动结束时间开始开始计算，例如24代表活动结束后24个小时(1天)内买家都可以修改收货地'
        }
      ],
      companyList: [
        {
          value: '1',
          label: '企业1'
        },
        {
          value: '2',
          label: '企业2'
        },
        {
          value: '3',
          label: '企业3'
        }
      ]
    }
  },
  created() {},
  methods: {
    onPickerTemp() {}
  }
}
</script>
