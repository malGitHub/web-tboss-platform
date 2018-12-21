import RequestService from '@/utils/request'

export default {
	//图片上传
	upload: data => RequestService.post(process.env.UPLOAD_URL, data, true),
	//获取公共车型
	getCarModel: params => RequestService.get('/business/docVehicletype/linkfind', params),
	//数据字段接口
	getDictByType: type => RequestService.get('/dict/dictValue/type/' + type, { page: 1, limit: 100 }),
	//查询公司树
	getCompTree: () => RequestService.get('/admin/depart/Companytree')
}
