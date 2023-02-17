<template>
    <div :class="{'wgt-goods-scroll': true, 'padded': value.padded}">
        <div class="component-body with-padding">
            <div class="navigation">
                <div class="nav-item" v-for="item in value.data" :key="item.imgUrl+item.content">
                    <SpImage class="goods-img" :src="item.imgUrl" />
                     <div v-if="item.content" class="nav-item--content">{{item.content}}</div>
                </div>
               
            </div>
        </div>

    </div>
</template>
<script>
import './index.scss'
import config from './config'
export default {
    name: 'navigation',
    wgtName: '图片导航',
    wgtDesc: '',
    wgtIcon: 'wgt-img-navigation',
    config,
    props:{
         value: []
    },
    mounted(){
        console.log('value--------',this.value)
    }
}
</script>

