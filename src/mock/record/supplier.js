import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import { restfulApi } from '@/utils/restful'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
	List.push(Mock.mock({
		id: '@increment',
		supplierName: '@cname',
		'supplierType|1': ['0'],
		contactName: '@cname',
		'contactPhone|1': ['13088888888', '15888888888', '13688888888'],
		'address|1': ['北京', '沈阳', '上海'],
		crtUserName: '@cname',
		crtTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
	}))
}

export default {
	getSupplierList: config => {
		const { page = 1, limit = 20 } = param2Obj(config.url)
		const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))
		return restfulApi({
			rows: pageList,
			total: count
		})
	}
//	add: () => restfulApi(),
//	update: () => restfulApi(),
//	del: () => restfulApi()
}
