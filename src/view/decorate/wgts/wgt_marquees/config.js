import AttrHorizontal from './attr_horizontal'
import AttrVertical from './attr_vertical'
import { pickBy } from '@/utils'


export default {
    name: 'Marquees',
    setting: [
        { label: '组件间距', key: 'padded', component: 'switch', value: true },
        {
            label: '内容',
            key: 'direction',
            component: 'radio',
            options: [
                { name: '软文', label: 'vertical' },
                { name: '文本', label: 'horizontal' },
            ],
            value: 'vertical'
        },
        { label: '背景颜色', key: 'bgcolor', component: 'color', value: '#ffffff' },
        { label: '字体颜色', key: 'fontcolor', component: 'color', value: '#000000' },
        {
            label: '文本', key: 'data1',
            isShow: function () {
                return this.value.direction == 'horizontal'
            },
            component: function (h, { key }) {
                return <AttrHorizontal dataArr={this.value.data2} direction={this.value.direction} v-model={this.value[key]} />
            },
            value: []
        },
        {
            label: '软文', key: 'data2',
            isShow: function () {
                return this.value.direction == 'vertical'
            },
            component: function (h, { key }) {
                return <AttrVertical dataArr={this.value.data1} direction={this.value.direction} v-model={this.value[key]} />
            },
            value: []
        },

    ],
    transformIn: (v) => {
        const { name, base,config, data } = v
        return {
            name,
            ...base,
            ...config,
            data,
            data1: config.direction == 'horizontal' ? data : [],
            data2: config.direction == 'vertical' ? data : []
        }
    },
    transformOut: (v) => {
        return pickBy(v, {
            name: 'name',
            base: (v) => {
                return pickBy(v, {

                    padded: 'padded'
                })
            },
            config: (v) => {
                return pickBy(v, {
                    bgcolor: "bgcolor",
                    direction:"direction",
                    fontcolor:"fontcolor",
                })
            },
            data: ({ direction,data2,data1 }) => direction == 'vertical' ? data2 : data1
        })
    }

}
