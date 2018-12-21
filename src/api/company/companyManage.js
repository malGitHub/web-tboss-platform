import RequestService from '@/utils/request'
export default{
  getCompanyInfoList: id => RequestService.get('/company/companyManage/query', { id: id }),
  addCompany: obj => RequestService.post('/company/companyManage/addCompany', obj),
  updateCompany: obj => RequestService.post('/company/companyManage/updateCompany', obj),
  delCompany: id => {
    return RequestService.request({
      url: '/company/companyManage/delCompany',
      method: 'delete',
      data: {
        id: id
      }
    })
  }
}

// export function getCompanyInfoList(param) {
// 	return RequestService.request({
// 		url: '/company/companyManage/query',
// 		method: 'get',
//     param
// 	})
// }
//
// export function addCompany(param) {
// 	return RequestService.request({
// 		url: '/company/companyManage/addCompany',
// 		method: 'get',
// 		param
// 	})
// }
//
// export function updateCompany(param) {
// 	return RequestService.request({
// 		url: '/company/companyManage/updateCompany',
// 		method: 'get',
// 		param
// 	})
// }
// export function delCompany(param) {
// 	return RequestService.request({
// 		url: '/company/companyManage/delCompany',
// 		method: 'delete',
// 		param
// 	})
// }
// getCompanyInfoList: query => {
// 	return RequestService.request({
// 		url: '/api/company/companyManage/query',
// 		method: 'post',
// 		data: query
// 	})
// }
