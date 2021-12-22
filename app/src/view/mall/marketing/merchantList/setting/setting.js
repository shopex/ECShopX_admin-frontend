import { createSetting } from '@shopex/finder'
import { Message, MessageBox } from 'element-ui'
export default (vm) => {
    const formatDate = (timestamp) => {
        var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var YY = date.getFullYear() + '-'
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return YY + MM + DD + ' ' + hh + mm + ss
    }
    return createSetting({
        search: [
            { key: 'merchant_name', name: '商户名称' },
            { key: 'legal_name', name: '联系人' },
            { key: 'legal_mobile', name: '联系电话' },
            { key: 'test', name: '入驻时间', slot: 'date' },
        ],
        columns: [
            { name: '商户名称', key: 'merchant_name' },
            { name: '联系人', key: 'legal_name' },
            { name: '联系电话', key: 'legal_mobile' },
            { name: '入驻时间', key: 'settled_succ_sendsms' },
            {
                name: "商品审核",
                key: "audit_goods",
                showType: "editText",
                componentProps: {
                    action: "link",
                   
                },
            }
        ],
        actions: [
            {
              name: '详情',
              key: 'detail',
              type: 'button',
              buttonType: 'text',
              action: {
                type: 'link',
                handler:async val =>{
                  console.log(val[0].log_id);
                  const result = await vm.$api.adapay.logDetail(val[0].log_id);
                  vm.result = result.data.data.result;
                  vm.params = result.data.data.params;
                  vm.visible = true;
                }
              }
            }
          ],
    })
}
