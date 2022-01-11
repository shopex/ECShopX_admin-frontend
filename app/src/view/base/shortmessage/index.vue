<template>
  <div class="smsAccountPage">
    <el-row :gutter="20">
      <el-col :lg="4"  v-for="(item, index) in sms" :key="item.title">
        <section class="box-card" @click="tabClick(index)">
          <img :src="item.img" alt="" />
          <span>{{ item.title }}</span>
        </section>
      </el-col>
    </el-row>

    
  </div>
</template>

<script>
const ali = require('@/assets/img/aliNote/aliyun.png')
const shopex = require('@/assets/img/aliNote/shopex.png')

export default {
  data() {
    return {
      sms: [
        {
          title: '阿里云短信',
          img: ali
        },
        {
          title: '商派短信',
          img: shopex
        }
      ]
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.$router
          break;
      
        default:
          break;
      }
      console.log(index)
    }
  }
}
</script>

<style lang="scss" scope>
.smsAccountPage {
  .box-card {
    max-width: 300px;
    position: relative;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    &:hover {
      box-shadow: 2px 2px 10px 4px rgb(0 0 0 / 10%);
    }
    img {
      display: block;
      width: 100%;
    }
    span {
      font-size: 16px;
      font-weight: 600;
      position: absolute;
      top: 50%;
      left: 22%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>