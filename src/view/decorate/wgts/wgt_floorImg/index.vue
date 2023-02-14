<style lang="scss">
.wgt-floorImg {
  // width: 100%;
  overflow-x: auto;
  /* border: red 1px solid; */
  /* background-color: red; */
  &.padded {
    padding: 10px 0;
  }
  .wgt-hd {
    padding: 10px;
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
    .sub-title {
      color: #666;
      margin-left: 4px;
    }
  }
  .wgt-bd {
    position: relative;
    display: flex;
    padding: 10px;

    &.spaced {
      padding: 0 10px;
    }
    .img-item {
      margin-right: 20px;
      text-align: center;
      .title-image {
        img {
          height: 120px !important;
          width: 120px !important ;
        }
        display: inline-block;
      }
    }
  }
}
</style>
<template>
  <div
    :class="{
      'wgt-floorImg': true,
      'padded': value.padded
    }"
  >
    <div :style="{ backgroundImage: `url(${value.openBackImg && value.backgroundImg})` }">
      <div v-if="value.title || value.subtitle" class="wgt-hd">
        <span class="title">{{ value.title }}</span>
        <span class="sub-title">{{ value.subtitle }}</span>
      </div>
      <div
        class="wgt-bd"
        :class="{
          'spaced': value.spaced
        }"
      >
        <div
          v-for="(item, index) in value.data"
          :key="index"
          class="img-item"
          :style="{ color: `${value.WordColor}` }"
        >
          <sp-image :src="item.imgUrl" class="title-image" />
          {{ item.ImgTitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from './config'
export default {
  name: 'FloorImg',
  wgtName: '楼层图片',
  wgtDesc: '',
  wgtIcon: 'wgt-floorImg',
  config: config,
  props: {
    value: [Object, Array]
  },
  data() {
    return {}
  },
  computed: {
    sliderHeight() {}
  },
  created() {
    console.log(123, this.value)
  },
  methods: {}
}
</script>
