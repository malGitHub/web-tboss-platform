import RequestService from '@/utils/request'

export default {
  getGoodsList: query => RequestService.get('/business/docCommodity/page', query),
  del: id => {
    return RequestService.request({
      url: '/business/docCommodity/logicDelete/' + id,
      method: 'delete',
      data: {
        id: id
      }
    })
  },

  add: obj => RequestService.post('/business/docCommodity', obj),

  update: (id, obj) => RequestService.put('/business/docCommodity/' + id, obj)

}
