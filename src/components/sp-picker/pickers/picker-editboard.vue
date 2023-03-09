<style lang="scss">
.picker-edit-board {
  padding: 18px 10px 10px 10px;
  display: flex;
  flex-wrap: wrap;
  .drag-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .board-item {
    margin: 0 10px 20px 0;
    position: relative;
    &:nth-child(7n + 7) {
      margin-right: 0;
    }
    .ecx-icon {
      display: none;
    }
    &:hover {
      .btn-tool {
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
      }
      .ecx-icon {
        display: block;
      }
    }
  }
  .btn-tool {
    height: 26px;
    display: flex;
    align-items: center;
    background-color: transparent;
    padding: 0 2px;
    width: 0;
    transition: width 0.3s ease-in;
    .ecx-icon {
      color: #fff;
      margin-right: 6px;
    }
  }
  .btn-add {
    width: 120px;
    height: 120px;
    border: 1px dashed #cdcdcd;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
<!-- <template>
  <div class="picker-edit-board">
    <div>
      <el-button type="primary">添加</el-button>
    </div>
    <draggable
      class="drag-container"
      :list="localValue"
      :options="dragOptions"
      style="width: 100%"
      handle=".icon-quanping"
    >
      <slot >{{ value.template() }}</slot>
      <div v-for="(item, index) in localValue" :key="`item__${index}`" class="board-item">
        <SpImage :src="item.imgUrl" width="120" height="120" />
        <i class="ecx-icon icon-quanping" />
      </div>
      <div class="btn-add" @click="onAddItem">
        <i class="ecx-icon icon-jia" />
        <p>添加商品</p>
      </div>
    </draggable>
  </div>
</template> -->

<script>
import draggable from 'vuedraggable'
import { cloneDeep } from 'lodash'
import BasePicker from './base'
export default {
  name: 'PickerEditBoard',
  components: {
    draggable
  },
  extends: BasePicker,
  config: {
    title: '查看商品'
  },
  props: ['value'],
  data() {
    return {
      localValue: [],
      dragOptions: {
        animation: 300,
        forceFallback: false,
        scroll: true
      }
    }
  },
  watch: {
    localValue: function (nVal, oVal) {
      this.updateVal(nVal)
    }
  },
  created() {
    this.localValue = cloneDeep(this.value.data)
  },
  methods: {
    async onAddItem() {
      const { data } = await this.$picker.goods()
      if (data) {
        this.localValue.push(data)
      }
    }
  },
  render() {
    const { localValue, dragOptions } = this
    return (
      <div class='picker-edit-board'>
        <div>
          <el-button type='primary'>添加</el-button>
        </div>
        <draggable
          class='drag-container'
          list={localValue}
          options={dragOptions}
          style='width: 100%'
          handle='.icon-quanping'
        >
          {localValue.map((item, index) => (
            <div key={`item__${index}`} class='board-item'>
              {this.value.template(item)}
              <div class='btn-tool'>
                <i class='ecx-icon icon-quanping' />
                <i class='ecx-icon icon-shanchu' />
              </div>
            </div>
          ))}
        </draggable>
      </div>
    )
  }
}
</script>
