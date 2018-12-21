import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import { restfulApi } from '@/utils/restful'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
	List.push(Mock.mock({
		id: '@increment',
    custName: '@cname',
		'custType|1': ['0', '1'],
		'contactPhone|1': ['13344556677', '18802145677', '18831641794', '13022669987'],
    contactName: '@cname',
		idCard: '@id',
		companyCard: '@id',
    crtUserName: '@cname',
		crtTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
	}))
}

export default {
	getCustomFilelList: config => {
		const { page = 1, limit = 20 } = param2Obj(config.url)
		const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))
		return restfulApi({
			rows: pageList,
			total: count
		})
	},
	add: () => restfulApi(),
	update: () => restfulApi(),
	del: () => restfulApi()
}
