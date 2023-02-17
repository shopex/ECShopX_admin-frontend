<template>
    <div class="setting-wrap">
        <div
            class="setting-item"
            v-for="(item,index) in value"
            :key="item.id"
        >
            <SpImagePicker
                v-model='item.imgUrl'
                size='small'
            />
            <div class="setting-item-link">
                <div class="setting-item-link--title">
                    <el-input
                        placeholder="导航名称"
                        v-model="item.content"
                    ></el-input>
                </div>
                <div class="goods-select">
                    <CompPickerLink
                        :value="item"
                        @change='(e)=>{
                             handleChangeGoods(e,index)
                         }'
                    />
                </div>
            </div>
            <div class="settimg-item--del">
                <i
                    class="iconfont icon-trash-alt1"
                    @click='()=>{
                     handleDel(index)
                     }'
                />
            </div>
        </div>
    </div>

</template>

<script>

import CompPickerLink from '../../comps/comp-pickerLink';
export default {
      components: { CompPickerLink },
    props:{
        value:[Object,Array]
    },
    data(){
        return {
            localValue: null
        }
    },
    mounted(){
        console.log('val========',this.value)
    },
    methods:{
        handleDel(index){
            this.value.splice(index,1)
        },
        handleChangeGoods(e,index){
            this.value = this.value.map((item,i)=>{
                if(index=== i ){
                    return {...item,...e}
                }
                return item
            })        
        }
    }
    
}
</script>
<style lang="scss">
.setting-item {
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  position: relative;

  &-link {
    flex: 1;
    padding: 0 15px;
    &--title {
      margin-bottom: 5px;
    }
  }
  .sp-image {
    width: 80px;
    height: 80px;
  }
}
</style>

