import Layout from '@/views/layout/Layout'

export default {
	id: 'car',
	path: '/car',
	component: Layout,
	redirect: '/car/carFile',
	name: 'CarFile',
	meta: {
		title: '车务管理',
		icon: 'table'
	},
	children: [{
			id: 'role_car_business_file',
			path: 'carFile',
			name: 'carFile',
			component: () =>
				import('@/views/app/car/CarFile/index'),
			meta: {
				title: '车辆档案'
			}
		}, {
			id: 'role_car_business_file',
			path: 'carFile/Add',
			name: 'carFileAdd',
			hidden: true,
			component: () =>
				import('@/views/app/car/CarFile/add'),
			meta: {
				title: '新建',
				father_path: '/car/carFile',
				father_title: '车辆档案'
			}
		}, {
			id: 'role_car_business_file',
			path: 'carFile/View',
			name: 'carFileView',
			hidden: true,
			component: () =>
				import('@/views/app/car/CarFile/view'),
			meta: {
				title: '查看',
				father_path: '/car/carFile',
				father_title: '车辆档案'
			}
		}, {
			id: 'role_car_business_file',
			path: 'carOwner',
			name: 'carOwner',
			component: () =>
				import('@/views/app/car/CarOwer/index'),
			meta: {
				title: '车主档案'
			}
		}, {
			id: 'role_car_business_file',
			path: 'carOwner/Add',
			name: 'carOwnerAdd',
			hidden: true,
			component: () =>
				import('@/views/app/car/CarOwer/add'),
			meta: {
				title: '新建',
				father_path: '/car/carOwner',
				father_title: '车主档案'
			}
		}, {
			id: 'role_car_business_file',
			path: 'carOwner/View',
			name: 'carOwnerView',
			hidden: true,
			component: () =>
				import('@/views/app/car/CarOwer/view'),
			meta: {
				title: '查看',
				father_path: '/car/carOwner',
				father_title: '车主档案'
			}
		}
//		{
//			id: 'car_insurance_index',
//			path: 'carIns',
//			name: 'carIns',
//			component: () =>
//				import('@/views/app/car/CarInsurance/index'),
//			meta: {
//				title: '保险业务'
//			}
//		}
	]
}