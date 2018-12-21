import Mock from 'mockjs'
import loginAPI from './login'
import testApi from './test'
import TreeApi from './tree'
import RecordCarModelMock from './record/carModel'
import SaleCustomerMock from './sale/customer'
import CompanyInfo from './companyInfo'
import RecordGoodsMock from './record/goods'

Mock.setup({
  timeout: '100-500'
})

Mock.mock(/\/test\/tree/, 'post', TreeApi.getTreeDate)
Mock.mock(/\/test\/list/, 'post', testApi.getTestList)
Mock.mock(/\/test\/getById/, 'get', testApi.getById)
Mock.mock(/\/test\/getReadCount/, 'get', testApi.getPv)
Mock.mock(/\/test\/add/, 'post', testApi.createArticle)
Mock.mock(/\/test\/update/, 'post', testApi.updateArticle)

//登入相关
Mock.mock(/\/api\/auth\/oauth\/token/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/api\/auth\/oauth\/token/, 'delete', loginAPI.logout)
Mock.mock(/\/api\/admin\/user\/front\/info/, 'get', loginAPI.getUserInfo)

//业务接口
//车型管理
Mock.mock(/\/record\/carModel\/query/, 'get', RecordCarModelMock.getCarModelList)
Mock.mock(/\/record\/carModel\/add/, 'post', RecordCarModelMock.add)
Mock.mock(/\/record\/carModel\/update/, 'post', RecordCarModelMock.update)
Mock.mock(/\/record\/carModel\/del/, 'delete', RecordCarModelMock.del)

//客户档案
Mock.mock(/\/business\/saleCustomer\/page/, 'get', SaleCustomerMock.getCustomFilelList)
Mock.mock(/\/business\/saleCustomer\/logicDelete/, 'delete', SaleCustomerMock.del)

//公司管理
Mock.mock(/\/company\/companyManage\/query/, 'get', CompanyInfo.getCompanyInfoList)
Mock.mock(/\/company\/companyManage\/addCompany/, 'get', CompanyInfo.createArticle)
Mock.mock(/\/company\/companyManage\/updateCompany/, 'get', CompanyInfo.updateArticle)
Mock.mock(/\/company\/companyManage\/delCompany/, 'delete', CompanyInfo.del)

//商品管理
Mock.mock(/\/doc\/commodity\/page/, 'get', RecordGoodsMock.getGoodsList)
Mock.mock(/\/doc\/vehicletype\/logicDelete/, 'delete', RecordGoodsMock.del)

export default Mock
