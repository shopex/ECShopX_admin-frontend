<template>
  <div class="MerchantsEditor">
    <h5>选择商家类型</h5>
    <el-divider></el-divider>
    <el-select v-model="form.settled_type" placeholder="请选择">
      <el-option label="企业" value="enterprise"></el-option>
      <el-option label="个体户" value="soletrader"></el-option>
    </el-select>
    <el-divider></el-divider>
    <el-form :model="form" :rules="rules" ref="form" label-width="130px">
      <!-- 企业信息 -->
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span class="theme">企业信息</span>
        </div>
        <section>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="企业全称" prop='merchant_name'>
                <el-input v-model="form.merchant_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码" prop='social_credit_code_id'>
                <el-input v-model="form.social_credit_code_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在省市区" prop="area">
                <el-cascader style="width: 100%" v-model="form.area" :options="AreaJson" clearable
                  :props="{ value: 'value',label: 'label',children: 'children'}">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="详细地址" prop='address'>
                <el-input v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人姓名" prop='legal_name'>
                <el-input v-model="form.legal_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人身份证号" prop='legal_cert_id'>
                <el-input v-model="form.legal_cert_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人手机号" prop='legal_mobile'>
                <el-input v-model="form.legal_mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系邮箱" prop='email'>
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </section>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import AreaJson from '@/common/district.json'
import { MaxRules, requiredRules } from '@/view/base/setting/dealer/tools'
export default {
  data() {
    return {
      AreaJson: AreaJson,
      form: {
        settled_type: '',
        merchant_name:'',
        social_credit_code_id:'',
        address:'',
        legal_name:'',
        legal_cert_id:'',
        legal_mobile:'',
        email:'',
        // merchant_name:'',
        // merchant_name:'',
        // merchant_name:'',
        // merchant_name:'',

        area: ''
      },
      rules: {
        merchant_name:[requiredRules('企业全称')],
        social_credit_code_id:[requiredRules('统一社会信用代码')],
        address:[requiredRules('详细地址')],
        legal_name:[requiredRules('法人姓名')],
        legal_cert_id:[requiredRules('法人身份证号')],
        legal_mobile:[requiredRules('法人手机号')]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.MerchantsEditor {
}
</style>

<style lang="scss">
.MerchantsEditor {
  .theme {
    font-size: 14px;
    font-weight: 700;
  }
  .el-form-item__label {
    font-size: 12px;
    font-weight: 700;
  }
}
</style>