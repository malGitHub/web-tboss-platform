import RequestService from '@/utils/request'

export default {
	//获取客户列表
	getCustomFilelList: query => RequestService.get('/business/saleCustomer/fetchSaleCustomerArchives', query),
	//客户档案查看
	getDetail: id => RequestService.get('/business/saleCustomer/' + id),
	//删除客户档案
	del: id => {
		return RequestService.request({
			url: '/business/saleCustomer/logicDelete/' + id,
			method: 'delete',
			data: {
				id: id
			}
		})
	},
	//新增客户档案
	add: obj => RequestService.post('/business/saleCustomer/addSaleCustomer', obj),
	//修改客户档案
	update: (id, obj) => RequestService.put('/business/saleCustomer/updateSaleCustomer/' + id, obj)
}
