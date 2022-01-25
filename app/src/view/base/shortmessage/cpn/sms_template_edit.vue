<template>
  <div class="sms_signatures_edit">
    <h4>添加短信模板</h4>
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
      <el-form-item label="短信类型" prop="template_type">
        <el-radio-group v-model="form.template_type" :disabled="disabled">
          <el-radio label="0">验证码（0.045元 / 条）</el-radio>
          <el-radio label="1">短信通知（0.045元 / 条）</el-radio>
          <el-radio label="2">推广短信（0.055元 / 条）</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="模板名称" prop="template_name">
        <el-input
          :disabled="disabled"
          v-model="form.template_name"
          minlength="1"
          maxlength="30"
          show-word-limit
          placeholder="长度限1-30个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="申请说明" prop="remark">
        <el-input
          :disabled="disabled"
          type="textarea"
          :rows="8"
          v-model="form.remark"
          maxlength="100"
          show-word-limit
          placeholder="短信模板申请说明，请描述您的业务使用场景，长度为1-100个字符。"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="$route.query.type !== 'detail'">
        <!-- <el-button type="primary" @click="submitForm('form')">确定</el-button> -->
        <loadingBtn @clickHandle="submitForm('form')" ref="loadingBtn" />
        <el-button @click="fnBack">取消</el-button>
        <ul class="tips">
          <li>预计两小时完成审核，政企签名预计在 48 小时工作时间内审核</li>
          <li>审核工作时间：周一至周日 9:00-23:00（法定节日顺延）</li>
        </ul>
      </el-form-item>
    </el-form>
    <!-- 图片选择 -->
    <imgPicker
      :dialog-visible="imgDialog"
      :sc-status="isGetImage"
      @chooseImg="pickImg"
      @closeImgDialog="closeImgDialog"
    ></imgPicker>

    <!-- result -->
    <el-dialog :visible="resultVisible" class="result" :show-close="false">
      <el-result icon="success" title="提交成功" subTitle="请根据提示进行操作">
        <template slot="subTitle">
          <h5>签名已提交审核，审核结果可在签名列表中查看。</h5>
          <ul class="tips">
            <li>预计两小时完成审核，政企签名预计在 48 小时工作时间内审核</li>
            <li>审核工作时间：周一至周日 9:00-23:00（法定节日顺延）</li>
          </ul>
        </template>
        <template slot="extra">
          <el-button type="primary" @click="fnBack" size="medium">返回列表</el-button>
          <el-button v-if="!$route.query.type" size="medium" @click="resultVisible = false"
            >再添加一个签名</el-button
          >
        </template>
      </el-result>
    </el-dialog>
  </div>
</template>

<script>
import { requiredRules, MaxRules, MinRules } from '@/utils/validate'
import imgPicker from '@/components/imageselect'
import loadingBtn from '@/components/loading-btn'
import {
  setTheNewSignature,
  getTheSignature,
  editTheSignature,
  deleteTheSignature
} from '@/api/sms'

export default {
  components: {
    imgPicker,
    loadingBtn
  },
  data() {
    return {
      // 页面状态
      disabled: false,
      // 图片选择
      imgDialog: false,
      isGetImage: false,
      pickerImgType: '',
      // result
      resultVisible: false,
      form: {
        sign_name: '', //签名名称
        sign_source: '',
        remark: '',
        sign_file: '', // 证明文件
        delegate_file: '' //委托授权书
      },
      rules: {
        sign_name: [requiredRules('签名名称'), MaxRules(12), MinRules(2)],
        sign_source: [requiredRules('签名来源', 'change')],
        remark: [requiredRules('申请说明'), MaxRules(200)]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { type, id } = this.$route.query
      console.log(type, id)

      if (type) {
        const result = await getTheSignature({ id })
        this.resultHandler(result)
        if (type == 'detail') {
          this.disabled = true
        }
      }
    },
    resultHandler(result) {
      const { sign_name, sign_source, remark, sign_file, delegate_file } = result.data.data
      console.log(sign_name)
      this.form = {
        sign_name,
        sign_source: sign_source + '',
        remark,
        sign_file,
        delegate_file
      }
    },
    submitForm(formName) {
      const { type, id } = this.$route.query
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            if (type == 'edit') {
              const result = await editTheSignature({id,...this.form})
              this.submitFormResult(result)
            } else {
              const result = await setTheNewSignature(this.form)
              this.submitFormResult(result)
            }
          } catch (error) {
            this.$refs['loadingBtn'].closeLoading()
          }
        } else {
          console.log('error submit!!')
          this.$refs['loadingBtn'].closeLoading()
          return false
        }
      })
    },
    submitFormResult(result) {
      if (result.data.data.status) {
        this.resultVisible = true
      }
      this.$refs['loadingBtn'].closeLoading()
    },
    fnBack() {
      this.$router.push({
        path: `/setting/datamessage/ali_sms/sms_signatures`
      })
    },
    /* -------------------------图片选择------------------------- */
    pickImg({ url }) {
      if (url && this.pickerImgType) {
        const that = this.form
        that[this.pickerImgType] = url
        this.imgDialog = false
      }
    },
    closeImgDialog() {
      this.imgDialog = false
      this.isGetImage = false
    },
    handleImgPicker(pickerImgType) {
      if (!this.disabled) {
        this.pickerImgType = pickerImgType
        this.imgDialog = true
        this.isGetImage = true
      }
    }
    /* -------------------------图片选择------------------------- */
  }
}
</script>

<style lang="scss" scoped>
.sms_signatures_edit {
  h4 {
    color: #222;
    position: relative;
    margin-left: 10px;
    &::before {
      position: absolute;
      content: '';
      width: 5px;
      top: 4px;
      bottom: 4px;
      left: -8px;
      background: #1480e3;
    }
  }
  .demo-ruleForm {
    max-width: 960px;
    padding: 20px;
  }
}
</style>
<style lang="scss">
.sms_signatures_edit {
  padding-bottom: 50px;
  .el-radio-group {
    margin-top: 10px;
    .el-radio {
      width: 100%;
      margin-bottom: 15px;
    }
  }
  .upload-box {
    width: 150px;
    height: 150px;
    align-items: center;
    display: flex;
    border: 2px dashed #ccc;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    i {
      font-size: 40px;
      color: #999;
    }
    img {
      max-width: 100%;
      max-height: 140px;
    }
    &:hover {
      border-color: #409eff;
    }
  }
  .tips {
    margin-top: 10px;
    li {
      color: #999;
      font-size: 12px;
      line-height: 16px;
    }
  }
  .el-dialog {
    max-width: 600px;
    .el-dialog__header {
      padding: 0;
      /* padding: 20px 20px 10px; */
    }
    .el-dialog__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    .el-result__subtitle p {
      font-weight: 700;
      font-size: 23px;
    }
    .el-result__subtitle {
      .tips {
        margin-top: 20px;
        li {
          color: #999;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>