import RequestService from '@/utils/request'

export default {
	getCarModelList: query => RequestService.get('/business/docVehicletype/page', query),
	getCarModelDetail: id => RequestService.get('/record/carModel/detail' + id),
	add: obj => RequestService.post('/business/docVehicletype', obj),
	update: (id, obj) => RequestService.put('/business/docVehicletype/' + id, obj),
	del: id => {
		return RequestService.request({
			url: '/business/docVehicletype/logicDelete/' + id,
			method: 'delete',
			data: {
				id: id
			}
		})
	}
}
