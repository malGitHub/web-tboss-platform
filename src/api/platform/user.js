import RequestService from '@/utils/request'

export default {
	//获取用户下拉列表
	page: query => RequestService.get('/admin/user/page', query),
	//新增用户
	addObj: obj => RequestService.post('//admin/user', obj),
	//修改用户
	putObj: (id, obj) => RequestService.put('/admin/user/' + id, obj),
	//删除用户
	delObj: id => {
		return RequestService.request({
			url: '/admin/user/' + id,
			method: 'delete'
		})
	},
	//获取当前用户信息
	getObj: id => RequestService.get('/admin/user/' + id)
}
//export function changePassword(data) {
//	return request({
//		url: '/api/admin/user/changePassword',
//		method: 'post',
//		params: data
//	})
//}