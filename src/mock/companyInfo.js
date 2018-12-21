import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import { restfulApi } from '@/utils/restful'

const List = []
const count = 100
const pvData = [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    companyname: '@cname',
    linkman: '@cname',
    'phone|1': ['13344556677', '18802145677', '18831641794', '13022669987'],
    companyid: '@id',
    remark: '@cname',
    udate: '@datetime("yyyy-MM-dd HH:mm:ss")',
    cdate: '@datetime("yyyy-MM-dd HH:mm:ss")'
  }))
}

export default {
  getCompanyInfoList: config => {
    const { page = 1, limit = 20 } = param2Obj(config.url)
    const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return restfulApi({
      list: pageList,
      total: count
    })
  },
  getPv: () => restfulApi(pvData),
  createArticle: () => restfulApi(),
  updateArticle: () => restfulApi(),
  del: () => restfulApi()
}
