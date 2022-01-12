<template>
  <div>
    <div v-if="$route.path.indexOf('editor') === -1">
      <el-table :data="dataLists" style="width: 100%" :height="wheight - 305" v-loading="loading">
        <el-table-column prop="name" label="模版名称" width="240"> </el-table-column>
        <el-table-column prop="key_name" label="模版英文名" width="240"></el-table-column>
        <el-table-column label="绑定状态" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.authorizer && scope.row.authorizer.authorizer_appid">
              <el-tag type="success" size="mini">已绑定</el-tag>
            </div>
            <div v-else>
              <el-tag type="gray" size="mini">未绑定</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-if="scope.row.authorizer && scope.row.authorizer.authorizer_appid"
              @click="bindWxapp(scope.row)"
              >绑定</el-button
            >
            <el-button size="mini" type="text" v-else :disabled="true">绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="total_count > pageLimit" class="content-padded content-center">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total_count"
          :page-size="pageLimit"
        >
        </el-pagination>
      </div>
    </div>
    <router-view></router-view>
    <sideBar :visible.sync="show_sideBar" :title="'绑定小程序'">
        <el-form-item label="小程序授权类型">
          <el-radio-group v-model="authorize_type">
            <el-radio :label="direct_link">直连小程序</el-radio>
            <el-radio :label="third_party">第三方授权</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="authorize_type == 'direct_link'">
          <el-form>
            <el-form-item label="小程序名称：">
              <el-col :span="18">
                <el-input placeholder="请输入小程序名称" v-model="directLinkForm.nick_name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="appid：">
              <el-col :span="18">
                <el-input
                  placeholder="请输入小程序appid"
                  v-model="directLinkForm.authorizer_appid"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="appsecret：">
              <el-col :span="18">
                <el-input
                  placeholder="请输入小程序appsecret"
                  v-model="directLinkForm.authorizer_appsecret"
                  show-password
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="小程序描述：">
              <el-col :span="18">
                <el-input placeholder="请输入小程序描述" v-model="directLinkForm.signature"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmitWxapp">保 存</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template v-if="authorize_type == 'third_party'">
        </template>
        
    </sideBar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import {
  gettemplateweapplist,
  gettemplateweappdetail
} from '@/api/minimanage'
import { addWxapp } from '@/api/wxa'
export default {
  provide() {
    return {
      refresh: this.getDataList
    }
  },
  data() {
    return {
      dataLists: [],
      loading: false,
      pageLimit: 10,
      total_count: 0,
      params: {},
      show_sideBar: false,
      authorize_type: 'third_party',
      directLinkForm: {
          template_name:'',
          authorizer_appid:'',
          authorizer_appsecret:'',
          signature:'',
          nick_name:'',
      }
    }
  },
  computed: {
    ...mapGetters(['wheight'])
  },
  methods: {
    getDataList() {
      this.loading = true
      gettemplateweapplist().then((response) => {
        this.dataLists = response.data.data.list
        this.total_count = response.data.data.total_count
        this.loading = false
      })
    },
    handleCurrentChange(page_num) {
      this.params = { page: page_num, pageSize: this.pageLimit }
      this.getDataList()
    },
    reshandleCurrentChange(page_num) {
      let resparams = { page_no: page_num, page_size: this.pageLimit, is_valid: true }
    },
    bindWxapp(data) {
      this.show_sideBar = true
      this.directLinkForm = {
          template_name: data.key_name,
          authorizer_appid:'',
          authorizer_appsecret:'',
          signature:'',
          nick_name:'',
      }
    },
    bindUpdateWxapp(data) {
      this.show_sideBar = true
      this.directLinkForm = {
          template_name: data.key_name,
          authorizer_appid: data.authorizer.authorizer_appid,
          authorizer_appsecret: data.authorizer.authorizer_appsecret,
          signature:data.authorizer.signature,
          nick_name:data.authorizer.nick_name,
      }
    },
    handleSubmitWxapp() {
      addWxapp(this.directLinkForm).then((response) => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 2 * 1000
        })
        this.directLinkForm = {}
        this.show_sideBar = false
        this.getDataList()
      })
    }
  },
  mounted() {
    this.params = { page: 1, pageSize: this.pageLimit }
    let resparams = { page_no: 1, page_size: this.pageLimit, is_valid: true }
    this.getDataList()
  }
}
</script>
<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
</style>
<style lang="scss">
</style>
