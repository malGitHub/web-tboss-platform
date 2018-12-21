import RequestService from '@/utils/request'

export default {
	//车辆档案列表
	getList: query => RequestService.get('/business/vehiclearchives/fetchVehicleArchives', query),
	//获取车辆档案详情
	getDetail: id => RequestService.get('/business/vehiclearchives/fetchVehicleArchivesDetail/' + id),
	//新增车辆档案
	add: obj => RequestService.post('/business/vehiclearchives/addVehicleArchives', obj),
	//修改车辆档案
	update: (id, obj) => RequestService.put('/business/vehiclearchives/updateVehicleInfo/' + id, obj),
	//删除车辆档案
	del: id => {
		return RequestService.request({
			url: '/business/vehiclearchives/logicDeleteVehicleInfo/' + id,
			method: 'delete',
			data: {
				id: id
			}
		})
	}
//	//导出车辆
//	export: query => RequestService.get('/vehiclearchives/fetchVehicleArchives', query),
//	//绑定车主
//	bindOwner: id => RequestService.get('/vehiclearchives/fetchVehicleArchives', query),
}