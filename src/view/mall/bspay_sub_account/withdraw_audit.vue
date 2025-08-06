<template>
  <SpPage>
    <div class="zyk_withdraw_audit">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>提现审核</span>
        </div>
        <div class="content">
          <div class="list">
            <SpFinder
              ref="finder"
              :no-selection="true"
              :setting="setting"
              url="/bspay/withdraw/lists"
              :hooks="{
                afterSearch: afterSearch
              }"
            />
          </div>
        </div>
      </el-card>
    </div>
  </SpPage>
</template>

<script>
import setting_ from './finder/audit_setting'
import loadingBtn from '@/components/loading-btn'

export default {
  components: {
    loadingBtn
  },
  data() {
    return {
      search_options: []
    }
  },
  computed: {
    setting() {
      return setting_(this)
    }
  },
  methods: {
    afterSearch({ data }) {
      const { search_options = {} } = data.data
      this.search_options = search_options.status
    },
    
    async handleAudit(row, action) {
      try {
        // 弹出确认对话框
        const confirmText = action === 'approve' ? '确认通过此提现申请？' : '确认拒绝此提现申请？'
        const actionText = action === 'approve' ? '通过' : '拒绝'
        
        await this.$confirm(confirmText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: action === 'approve' ? 'success' : 'warning'
        })
        
        // 弹出备注输入框
        const { value: remark } = await this.$prompt('请输入审核备注', '审核备注', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '备注不能为空'
        })
        
        // 调用审核接口
        const params = {
          apply_id: row.id,
          action: action,
          remark: remark
        }
        console.log('params',params)
        const result = await this.$api.bspay.withdrawAudit(params)
        
        if (result.status) {
          this.$message.success(`${actionText}成功`)
          // 刷新列表
          this.$refs.finder.refresh(true)
        } else {
          this.$message.error(`${actionText}失败`)
        }
      } catch (error) {
        if (error !== 'cancel') {
          console.error('审核失败:', error)
          this.$message.error('审核失败')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.zyk_withdraw_audit {
  .clearfix span {
    font-weight: 700;
  }
}
</style> 