import { createSetting } from '@shopex/finder'
import moment from 'moment'
import { debounce } from 'lodash-es'
import { bindThisForFormSchema } from '@/utils/schemaHelper'

export const tableSchema = (vm) =>
  createSetting({
    actions: [
      {
        name: '编辑',
        key: 'edit',
        type: 'button',
        buttonType: 'text',
        action: {
          handler: debounce(
            ([row]) => {
              vm.editRowHandle(row)
            },
            2000,
            {
              leading: true
            }
          )
        }
      }
    ],
    columns: [
      {
        name: '开票方名称',
        key: 'invoice_apply_bn',
        width: '120'
      },
      {
        name: '开票方税号',
        key: 'invoice_apply_bn',
        width: '120'
      },
      {
        name: '开票方电话',
        key: 'invoice_apply_bn',
        width: '120'
      },
      {
        name: '开票渠道',
        key: 'invoice_apply_bn',
        width: '120'
      },
      {
        name: '管理分类',
        key: 'invoice_apply_bn',
        width: '120'
      },
      {
        name: '税率',
        key: 'invoice_apply_bn',
        width: '80'
      },
      {
        name: '开票人',
        key: 'invoice_apply_bn',
        width: '100'
      },
      {
        name: '收款人',
        key: 'invoice_apply_bn',
        width: '100'
      },
      {
        name: '复核人',
        key: 'invoice_apply_bn',
        width: '100'
      },
      {
        name: '开票方地址',
        key: 'invoice_apply_bn',
        width: '120'
      },
      {
        name: '添加时间',
        key: 'created',
        render(h, { row }) {
          return <span> {moment(row.create_time * 1000).format('yyyy-MM-DD HH:mm:ss')} </span>
        }
      }
    ]
  })

export const formSchema = (vm) =>
  bindThisForFormSchema(
    [
      {
        label: '开票方类型',
        key: 'alipay_fee_type',
        type: 'radio',
        options: [{ name: '平台', label: 'online' }]
      },
      {
        label: '开票人',
        key: 'alipay_fee_type',
        type: 'input',
        required: true
      },
      {
        label: '收款人',
        key: 'alipay_fee_type',
        type: 'input',
        required: true
      },
      {
        label: '复核人',
        key: 'alipay_fee_type',
        type: 'input',
        required: true
      },
      {
        label: '开票方名称',
        key: 'alipay_fee_type',
        type: 'input',
        required: true
      },
      {
        label: '管理分类',
        required: true,
        key: 'main_cat_id',
        component({ key }, value) {
          return (
            <div>
              <el-radio-group v-model={value['category_type']}>
                <el-radio label='1'>全部分类</el-radio>
                <el-radio label='2'>指定分类</el-radio>
              </el-radio-group>
              <div>
                {value['category_type'] == 2 && (
                  <el-cascader
                    v-model={value['main_cat_id']}
                    placeholder='请选择'
                    clearable
                    options={vm.itemCategoryList}
                    props={{
                      props: {
                        value: 'category_id',
                        label: 'category_name',
                        multiple: true,
                        // checkStrictly: true,
                        children: 'children'
                      }
                    }}
                  />
                )}
              </div>
            </div>
          )
        }
      },
      {
        label: '税率',
        key: 'alipay_fee_type',
        type: 'input',
        required: true,
        component({ key }, value) {
          return (
            <div>
              <el-input v-model={value[key]} type='number' min={0} />%
            </div>
          )
        }
      },
      {
        label: '开票方税号',
        key: 'alipay_fee_type',
        type: 'input',
        required: true
      },
      {
        label: '开票方银行',
        key: 'alipay_fee_type',
        type: 'input',
        required: true
      },
      {
        label: '开票方银行账号',
        key: 'alipay_fee_type',
        type: 'input',
        required: true
      },
      {
        label: '开票方联系电话',
        key: 'alipay_fee_type',
        type: 'input',
        required: true
      },
      {
        label: '开票方联系地址',
        key: 'alipay_fee_type',
        type: 'input',
        required: true,
        tip: '联系地址文字长度，请不要超过255'
      }
    ],
    vm
  )
