import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import { restfulApi } from '@/utils/restful'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
	List.push(Mock.mock({
		id: '@increment',
		a1: '@string("lower", 5)',
		a2: '@string("lower", 6)',
		a3: '@string("lower", 7)',
		a4: '@string("lower", 5)',
		a5: '@string("lower", 9)',
		a6: 0
	}))
}

export default {
	getCarModelList: config => {
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
