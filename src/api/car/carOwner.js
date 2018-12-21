import RequestService from '@/utils/request'

export default {
	getList: query => RequestService.get('/business/vehicleOwner/pageList', query),
	getDetail: id => RequestService.get('/business/vehicleOwner/owner/' + id),
	add: obj => RequestService.post('/business/vehicleOwner', obj),
	update: (id, obj) => RequestService.put('/business/vehicleOwner/' + id, obj),
	del: id => {
		return RequestService.request({
			url: '/business/vehicleOwner/logicDelete/' + id,
			method: 'delete',
			data: {
				id: id
			}
		})
	}
}