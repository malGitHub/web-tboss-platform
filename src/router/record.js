import Layout from '@/views/layout/Layout'

export default {
	id: 'record',
	path: '/record',
	component: Layout,
	redirect: '/record/carModel',
	name: 'record',
	meta: {
		title: '档案管理',
		icon: 'tree'
	},
	children: [{
			id: 'record_platform',
			path: 'carModel',
			name: 'carModel',
			component: () =>
				import('@/views/app/record/carModel/index'),
			meta: {
				title: '车型管理'
			}
		}, {
			id: 'record_platform',
			path: 'goods',
			name: 'goods',
			component: () =>
				import('@/views/app/record/goods/index'),
			meta: {
				title: '商品管理'
			}
		}, {
			id: 'record_platform',
			path: 'goods/Add',
			name: 'goodsAdd',
			hidden: true,
			component: () =>
				import('@/views/app/record/goods/add'),
			meta: {
				title: '新建',
				father_path: '/record/goods',
				father_title: '商品管理'
			}
		}, {
			id: 'supplier_platform',
			path: 'supplier',
			name: 'supplier',
			component: () =>
				import('@/views/app/record/supplier/index'),
			meta: {
				title: '供应商管理'
			}
		}, {
			id: 'supplier_platform',
			path: 'supplier/Add',
			name: 'supplierAdd',
			hidden: true,
			component: () =>
				import('@/views/app/record/supplier/add'),
			meta: {
				title: '新建',
				father_path: '/record/supplier',
				father_title: '供应商管理'
			}
		}, {
			id: 'insurance_platform',
			path: 'insurance',
			name: 'insurance',
			component: () =>
				import('@/views/app/record/insurance/index'),
			meta: {
				title: '保险管理'
			}
		}

	]
}
