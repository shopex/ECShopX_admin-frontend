<template>
  <div>
    <div v-if="$route.path.indexOf('detail') === -1 && $route.path.indexOf('editor') === -1">
      <div class="content-bottom-padded">
        <el-button type="primary" icon="el-icon-circle-plus" @click="addCoupon">新增活动</el-button>
      </div>
      <el-card>
        <el-table :data="cardList" v-loading="loading" @selection-change="handleSelectionChange">
          <el-table-column prop="title" label="活动ID"></el-table-column>
          <el-table-column label="活动名称"></el-table-column>
          <el-table-column prop="get_num" label="员工额度"> </el-table-column>
          <el-table-column prop="use_num" label="家属额度"> </el-table-column>
          <el-table-column prop="source_name" label="活动状态"> </el-table-column>
          <el-table-column width="280" label="活动有效期">
            <template slot-scope="scope">
              <template v-if="scope.row.takeEffect">
                {{ scope.row.takeEffect }}
              </template>
              <template v-else>
                {{ scope.row.begin_time | datetime('YYYY-MM-DD HH:mm:ss') }}
                <template v-if="scope.row.end_time">~</template>
                {{ scope.row.end_time | datetime('YYYY-MM-DD HH:mm:ss') }}
                {{ Date.parse(new Date()) > scope.row.end_time * 1000 ? '已过期' : '' }}
              </template>
            </template>
          </el-table-column>
          <el-table-column width="120" label="操作">
            <template slot-scope="scope">
              <div class="operating-icons">
                <el-button type="text">
                  <router-link
                    :to="{
                      path: matchHidePage('detail'),
                      query: {
                        chooseCardtype: scope.row.card_type,
                        cardId: scope.row.card_id,
                        title: scope.row.title
                      }
                    }"
                    >查看</router-link
                  >
                </el-button>
                <el-button type="text" v-if="scope.row.edit_btn == 'Y'">
                  <router-link
                    :to="{
                      path: matchHidePage('editor'),
                      query: { chooseCardtype: scope.row.card_type, cardId: scope.row.card_id }
                    }"
                    >编辑</router-link
                  >
                </el-button>
                <el-button
                  type="text"
                  v-if="scope.row.status != 'CARD_STATUS_DISPATCH'"
                  @click="deleteCard(scope.row.card_id, scope.$index)"
                  >终止活动</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="content-padded content-center">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="pagers.total"
            :page-size="pageSize"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import { getPurchaseList, endPurchase } from '../../../../api/purchase'
import util from '../../../../common/js/util'
export default {
  provide() {
    return {
      refresh: this.getPurchaseList
    }
  },
  data() {
    return {
      loading: false,
      loadingbtn: false,
      checkedType: {},
      cardList: [],
      pagers: {
        total: 0
      },
      typeId: -1,
      pageSize: 10,
      currentPage: 1,
      params: {},
      fetchParams: {
        activity_status: '',
        purchase_name: '',
        page: 1,
        pageSize: 10
      },
      multipleSelection: []
    }
  },
  filters: {},
  computed: {
    ...mapGetters(['wheight'])
  },
  methods: {
    handleCurrentChange(val) {
      this.fetchParams.page = val
      this.getPurchaseList()
    },
    handleSizeChange(val) {
      this.fetchParams.pageSize = val
      this.getPurchaseList()
    },
    handleClick(tab, event) {},
    addCoupon() {
      this.$router.push({ path: this.matchHidePage('editor') })
    },
    deleteCard(id, index) {
      this.$confirm('确定要终止该活动？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            endPurchase({ 'card_id': id }).then((res) => {
              this.cardList.splice(index, 1)
            })
          }
          done()
        }
      })
    },
    getPurchaseList() {
      this.loading = true
      var params = {
        activity_status: this.fetchParams.activity_status,
        purchase_name: this.fetchParams.purchase_name,
        page: this.fetchParams.page,
        pageSize: this.fetchParams.pageSize
      }
      getPurchaseList(params)
        .then((res) => {
          if (res.data.data.list.length > 0) {
            this.cardList = res.data.data.list
            this.pagers.total = res.data.data.pagers.total
            this.loading = false
          } else {
            this.cardList = []
            this.loading = false
          }
        })
        .catch((error) => {
          this.loading = false
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  },
  mounted() {
    this.getPurchaseList()
  }
}
</script>
<style scoped lang="scss">
.el-icon-edit {
  cursor: pointer;
}
.coupon-list {
  margin-top: 10px;
}
.coupon-item {
  position: relative;
  height: 130px;
  padding: 25px 20px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #dadadd;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  width: 19%;
  float: left;
  margin: 0.5%;
  &.coupon-add {
    padding-top: 20px;
    cursor: pointer;
    i {
      font-size: 40px;
    }
    :last-child {
      margin-top: 10px;
    }
  }
  .price {
    font-size: 24px;
  }
  .color-gray {
    color: #99a9bf;
  }
  .color-gray-deep {
    color: #8492a6;
  }
  .item-code {
    display: inline-block;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span.icon-triangle {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 34px solid #20a0ff;
    border-left: 34px solid transparent;
    color: #fff;
  }
  label {
    position: absolute;
    top: -34px;
    right: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
}
.item-bg {
  position: absolute;
  left: 0;
  bottom: -101%;
  width: 100%;
  height: 100%;
  background: rgba(241, 244, 246, 0.9);
  text-align: left;
  border-radius: 5px;
  padding-top: 8px;
  transition: all 0.4s ease;
  p {
    padding: 0 10px;
  }
  .item-operate {
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    padding: 4px 0;
    text-align: center;
    cursor: pointer;
    a {
      color: #fff;
    }
  }
}
.coupon-item:hover {
  .item-bg {
    bottom: 0;
  }
}
.coupon-type-item {
  position: relative;
  padding: 30px 10px;
  border: 1px solid #ff5000;
  color: #ff5000;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 20px;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  &:first-child {
    font-size: 18px;
  }
  .coupon-type-desc {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: -100%;
    left: 0;
    padding: 10px 0;
    background: #ff5000;
    color: #fff;
    font-size: 18px;
    transition: all 0.4s ease;
    div:last-child {
      width: 70%;
      margin: 8px auto 0;
      font-size: 12px;
    }
  }
  &:hover {
    .coupon-type-desc {
      bottom: 0;
    }
  }
}

.coupon-type-item,
.sendout-item {
  overflow: hidden;
  .icon-checked {
    display: none;
    width: 100px;
    height: 25px;
    transform: rotate(35deg);
    position: absolute;
    font-size: 14;
    top: 5px;
    right: -25px;
    font-size: 20px;
    color: #fff;
    background: #ff5000;
    i {
      transform: rotate(-35deg);
    }
  }
  &.checked {
    .icon-checked {
      display: block;
    }
  }

  &:hover .icon-checked {
    background: #fff;
    i {
      color: #ff5000;
    }
  }
}
.store-pop {
  padding: 20px 15px;
  .store-content {
    margin-bottom: 15px;
  }
}
</style>
