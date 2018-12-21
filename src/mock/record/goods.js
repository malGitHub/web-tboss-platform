import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import { restfulApi } from '@/utils/restful'

const List = []
const count = 100

for(let i = 0; i < count; i++) {
	List.push(Mock.mock({
		id: '@increment',
		productInfo: '@string("lower", 5)',
		carBrand: '@string("lower", 6)',
		carSeries: '@string("lower", 7)',
		model: '@string("lower", 5)',
		carType: '@string("number",1)',
		oilType: '@string("number",1)',
		power: '@string("number",1)',
		driveType: '@string("number",1)',
		carColour: '@color',
		purchasePrice: '@string("number",3)',
		saleTotal: '@string("number",2)'
	}))
}

export default {
	getGoodsList: config => {
		const {
			page = 1, limit = 20
		} = param2Obj(config.url)
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