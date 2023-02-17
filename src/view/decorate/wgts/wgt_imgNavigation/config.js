import ImgNavigationPanel from './attr-imagepanel';

export default {
    name: 'navigation',
    setting: [
        { label: '组件间距', key: 'padded', component: 'switch', value: true },
        {
            label: '导航项', key: 'data', component: function (h, { key }) {
                console.log('this.value[key]',this.value[key])
                return <ImgNavigationPanel v-model={this.value[key]} />
            },
            value: [{
                content:'基础护肤',
                imgUrl:''
            },{
                content:'彩妆香水',
                imgUrl:''
            },{
                content:'营养保健',
                imgUrl:''
            },{
                content:'满减优惠',
                imgUrl:''
            },{
                content:'分享拼单',
                imgUrl:''
            }]
        }
    ],
    transformIn: (v) => {
        const { name, base, config, data } = v
        return {
            name,
            ...base,
            ...config,
            data
        }
    },
    transformOut: (o) => {
        const {name,base,data} = o;
        return {
            name,base,data
        }
    }
}