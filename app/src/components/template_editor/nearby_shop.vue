<template>
  <section v-if="name === 'nearbyShop'" class="section">
    <div class="section-header with-border">设置</div>
    <div class="section-body">
      <el-form label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="base.title"></el-input>
        </el-form-item>
        <el-form-item label="组件间距">
          <el-switch v-model="base.padded" active-color="#27cc6a" inactive-color="#efefef">
          </el-switch>
        </el-form-item>
        <el-form-item label="商家分类">
          <el-button
            type="default"
            class="iconfont icon-plus-circle banner-button-uploader"
            @click="addTab"
            size="mini"
          >添加标签</el-button>
          <p>
            <span class="tag" v-for="(item,index) in seletedTags" :key="item.id">{{item.tag_name}} <span class="el-icon-close" @click="deleteTag(index)"></span></span>
          </p>
          
        </el-form-item>
        <el-form-item label="显示优惠券">
          <el-switch v-model="base.padded" active-color="#27cc6a" inactive-color="#efefef">
          </el-switch>
        </el-form-item>
        <el-form-item label='商家排序'>
          <span>LBS定位</span>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    res: {
      type: Object,
      default: {}
    }
  },
  watch: {
    res: {
      deep: true,
      handler(value) {
        if (value) {
          this.setData(value)
        }
      }
    }
  },
  data() {
    return {
      name: '',
      base: {},
      config: {},
      data: [],
      seletedTags:[], // tab
      activeName:'',
      tabIndex: 0
    }
  },
  methods: {
    setData(val) {
      console.log('============',val);
      this.name = val.name
      this.base = val.base
      this.config = val.config
      this.data = val.data
      this.seletedTags = val.seletedTags
    },
    addTab(){
      this.$emit('tagSelectVisibleHandle','nearby_shop')
    },
    deleteTag(index){
      this.seletedTags.splice(index,1)
      console.log(index);
    }

  },
  mounted() {
    this.setData(this.res)
  }
}
</script>

<style scoped lang="scss">
.tag{
  margin: 10px;
}
.el-icon-close{
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  border-radius: 50%;
  cursor:pointer
}
 .el-icon-close:before {
    -webkit-transform: scale(.9);
    transform: scale(.9);
    display: inline-block;
}
.el-icon-close:hover {
    background-color: #C0C4CC;
    color: #FFF;

}
.upload-box {
  height: 100px;
  width: 100px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-content: center;
  img {
    width: 100%;
  }
}
.hotzone {
  max-width: 500px;
  margin-bottom: 10px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}
.uploader-setting {
  padding: 0;
}
</style>
