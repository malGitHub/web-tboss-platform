import Layout from '@/views/layout/Layout'

export default {
	id: 'sale',
	path: '/sale',
	component: Layout,
	redirect: '/sale/custFile',
	name: 'SaleMent',
	meta: {
		title: '销售管理',
		icon: 'form'
	},
	children: [{
			id: 'role_sales_customer_file',
			path: 'custFile',
			name: 'custFile',
			component: () =>
				import('@/views/app/sale/CustFile/index'),
			meta: {
				title: '客户档案'
			}
		}, {
			id: 'role_sales_customer_file',
			path: 'custFile/Add',
			name: 'custFileAdd',
			hidden: true,
			component: () =>
				import('@/views/app/sale/CustFile/add'),
			meta: {
				title: '新建',
				father_path: '/sale/custFile',
				father_title: '客户档案'
			}
		},
		{
			id: 'role_sales_customer_file',
			path: 'custFile/view',
			name: 'custFileView',
			hidden: true,
			component: () =>
				import('@/views/app/sale/CustFile/view'),
			meta: {
				title: '查看',
				father_path: '/sale/custFile',
				father_title: '客户档案'
			}
		},
		{
			id: 'role_sales_sales_order',
			path: 'SaleOrder',
			name: 'SaleOrder',
			component: () =>
				import('@/views/app/sale/SaleOrder/index'),
			meta: {
				title: '销售订单'
			}
		}
//		{
//			id: 'role_sales_sales_order',
//			path: 'salesadd',
//			name: 'Salesadd',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/salesorder/salesadd'),
//			meta: {
//				title: '销售订单 - 新建',
//				father_path: '/sale/index',
//				father_title: '销售订单'
//			}
//		}, {
//			id: 'role_sales_sales_order',
//			path: 'depositaudit',
//			name: 'Depositaudit',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/salesorder/depositaudit'),
//			meta: {
//				title: '销售订单 - 审批',
//				father_path: '/sale/index',
//				father_title: '销售订单'
//			}
//		}, {
//			id: 'role_sales_sales_order',
//			path: 'depositauditc',
//			name: 'Depositauditc',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/salesorder/depositauditc'),
//			meta: {
//				title: '销售订单 - 审批',
//				father_path: '/sale/index',
//				father_title: '销售订单'
//			}
//		}, {
//			id: 'role_sales_sales_order',
//			path: 'paymentauditadd',
//			name: 'PaymentauditAdd',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/salesorder/paymentauditadd'),
//			meta: {
//				title: '销售订单 - 审批',
//				father_path: '/sale/index',
//				father_title: '销售订单'
//			}
//		}, {
//			id: 'role_sales_sales_order',
//			path: 'paymentauditnow',
//			name: 'Paymentauditnow',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/salesorder/paymentauditnow'),
//			meta: {
//				title: '销售订单 - 审批',
//				father_path: '/sale/index',
//				father_title: '销售订单'
//			}
//		}, {
//			id: 'role_sales_sales_order',
//			path: 'serviceauditadd',
//			name: 'Serviceaudtiadd',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/salesorder/serviceauditadd'),
//			meta: {
//				title: '销售订单 - 审批',
//				father_path: '/sale/index',
//				father_title: '销售订单'
//			}
//		}, {
//			id: 'role_sales_sales_order',
//			path: 'serviceaudit',
//			name: 'Serviceaudti',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/salesorder/serviceaudit'),
//			meta: {
//				title: '销售订单 - 审批',
//				father_path: '/sale/index',
//				father_title: '销售订单'
//			}
//		}, {
//			id: 'role_sales_sales_order',
//			path: 'salesView',
//			name: 'SalesView',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/salesorder/salesView'),
//			meta: {
//				title: '销售订单 - 审批',
//				father_path: '/sale/index',
//				father_title: '销售订单'
//			}
//		}, {
//			id: 'role_sales_purchase_order',
//			path: 'purchaseorder',
//			name: 'PurchaseOrder',
//			component: () =>
//				import('@/views/app/sale/purchaseorder/index'),
//			meta: {
//				title: '新车采购订单'
//			}
//		}, {
//			id: 'role_sales_purchase_order',
//			path: 'purchaseorder/depositePending',
//			name: 'DepositePending',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/purchaseorder/depositePending'),
//			meta: {
//				title: '待提交',
//				father_path: '/sale/purchaseorder',
//				father_title: '新车采购订单'
//			}
//		}, {
//			id: 'role_sales_purchase_order',
//			path: 'purchaseorder/depositeVerifying',
//			name: 'DepositeVerifying',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/purchaseorder/depositeVerifying'),
//			meta: {
//				title: '审核',
//				father_path: '/sale/purchaseorder',
//				father_title: '新车采购订单'
//			}
//		}, {
//			id: 'role_sales_purchase_order',
//			path: 'purchaseorder/balancePending',
//			name: 'BalancePending',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/purchaseorder/balancePending'),
//			meta: {
//				title: '待提交',
//				father_path: '/sale/purchaseorder',
//				father_title: '新车采购订单'
//			}
//		}, {
//			id: 'role_sales_purchase_order',
//			path: 'purchaseorder/balanceVerifying',
//			name: 'BalanceVerifying',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/purchaseorder/balanceVerifying'),
//			meta: {
//				title: '审核',
//				father_path: '/sale/purchaseorder',
//				father_title: '新车采购订单'
//			}
//		}, {
//			id: 'role_sales_purchase_order',
//			path: 'purchaseorder/orderFinished',
//			name: 'OrderFinished',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/purchaseorder/orderFinished'),
//			meta: {
//				title: '完善信息',
//				father_path: '/sale/purchaseorder',
//				father_title: '新车采购订单'
//			}
//		}, {
//			id: 'role_sales_refund_verify_management',
//			path: 'refundaudit',
//			name: 'Refundaudit',
//			component: () =>
//				import('@/views/app/sale/refundaudit/index'),
//			meta: {
//				title: '退款审核管理'
//			}
//		}, {
//			id: 'role_sales_refund_verify_management',
//			path: 'refundaudit/allexamine',
//			name: 'Allexamine',
//			hidden: true,
//			component: () =>
//				import('@/views/app/sale/refundaudit/allexamine'),
//			meta: {
//				title: '审批',
//				father_path: '/sale/refundaudit',
//				father_title: '退款审核管理'
//			}
//		}
	]
}