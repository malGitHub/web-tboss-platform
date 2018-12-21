import RequestService from '@/utils/request'

export default {
	//获取供应商列表
	getSupplierList: query => RequestService.get('/business/docSupplier/page', query),
	//查询单个供应商信息
	getDetail: id => RequestService.get('/business/docSupplier/' + id),
	//删除供应商
	del: id => {
		return RequestService.request({
			url: '/business/docSupplier/logicDelete/' + id,
			method: 'delete',
			data: {
				id: id
			}
		})
	},
	//新增供应商
	add: obj => RequestService.post('/business/docSupplier', obj),
	//修改供应商
	update: (id, obj) => RequestService.put('/business/docSupplier/' + id, obj)
}
