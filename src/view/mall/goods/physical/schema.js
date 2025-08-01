import { bindThisForFormSchema } from '@/utils/schemaHelper'

export const createTbAddForm = (vm) =>
  bindThisForFormSchema(
    [
      {
        label: '',
        component() {
          return (
            <div>
              <div style={{ marginBottom: '10px' }}>
                <el-button type='primary' plain icon='iconfont icon-daorucaozuo-01'>
                  淘宝增量同步
                </el-button>
              </div>
              <SpFinder
                ref='finder'
                data={[]}
                setting={{
                  search: [
                    { key: 'name', name: '直播名称' },
                    { key: 'polyv_channel_id', name: '频道号' },
                    {
                      key: 'live_time',
                      name: '开播时间',
                      type: 'date-range',
                      defaultTime: [],
                      startPlaceholder: '开始日期',
                      endPlaceholder: '结束日期',
                      format: 'yyyy-MM-dd HH:mm:ss'
                    }
                  ],
                  columns: [
                    { name: '企业名称', key: 'name' },
                    { name: '企业编码', key: 'enterprise_sn' }
                  ]
                }}
                onSelect={(row) => {
                  console.log(row)
                }}
              ></SpFinder>
            </div>
          )
        }
      }
    ],
    vm
  )
