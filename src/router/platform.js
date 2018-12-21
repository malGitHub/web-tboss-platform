import Layout from '@/views/layout/Layout'

export default {
	id: 'platform',
	path: '/platform',
	component: Layout,
	redirect: '/platform/user',
	name: 'platform',
	meta: {
		title: '平台管理',
		icon: 'list'
	},
	children: [{
			id: 'user_platform',
			path: 'user',
			name: 'user',
			component: () =>
				import('@/views/app/platform/user/index'),
			meta: {
				title: '用户管理'
			}
		}, {
			id: 'user_platform',
			path: 'user/Add',
			name: 'userAdd',
			hidden: true,
			component: () =>
				import('@/views/app/platform/user/add'),
			meta: {
				title: '新建',
				father_path: '/platform/user',
				father_title: '用户管理'
			}
		}, {
			id: 'role_platform',
			path: 'role',
			name: 'role',
			component: () =>
				import('@/views/app/platform/role/index'),
			meta: {
				title: '角色管理'
			}
		}, {
			id: 'role_platform',
			path: 'role/Add',
			name: 'roleAdd',
			hidden: true,
			component: () =>
				import('@/views/app/platform/role/add'),
			meta: {
				title: '新建',
				father_path: '/platform/role',
				father_title: '角色管理'
			}
		}, {
			id: 'org_platform',
			path: 'org',
			name: 'org',
			component: () =>
				import('@/views/app/platform/org/index'),
			meta: {
				title: '公司组织机构'
			}
		}, {
			id: 'org_platform',
			path: 'org/Add',
			name: 'orgAdd',
			hidden: true,
			component: () =>
				import('@/views/app/platform/org/add'),
			meta: {
				title: '新建',
				father_path: '/platform/org',
				father_title: '公司组织机构'
			}
		}
	]
}
