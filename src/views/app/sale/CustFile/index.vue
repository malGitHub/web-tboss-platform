<template>
	<el-container class="view-container">
		<el-row>
			<el-col :span="24" class="filter-header mb5">
				<el-form :inline="true" :model="listQuery">
					<el-col :span="18">
						<el-form-item label="客户名称">
							<el-input placeholder="客户名称" v-model="listQuery.custName"></el-input>
						</el-form-item>
						<el-form-item label="移动电话">
							<el-input placeholder="移动电话" v-model="listQuery.contactPhone"></el-input>
						</el-form-item>
						<el-form-item label="证件号">
							<el-input placeholder="证件号" v-model="listQuery.idCardOrSocialCode"></el-input>
						</el-form-item>
						<el-form-item label="客户类型">
							<el-select v-model="listQuery.custType" clearable placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="search-btn-group">
						<el-col :span="24">
							<el-form-item class="fr">
								<el-button type="primary" @click="_clickQuery">查询</el-button>
								<el-button type="primary" @click="_edit">新建</el-button>
							</el-form-item>
						</el-col>
					</el-col>
				</el-form>
			</el-col>
			<el-col :span="24" class="mb20">
				<el-table :data="list" border v-loading.body="listLoading" border fit highlight-current-row class="wh">
					<el-table-column align="center" width="60" label="序号" fixed="left">
						<template slot-scope="scope">{{scope.$index + 1}}</template>
					</el-table-column>
					<el-table-column align="center" prop="custName" min-width="220" label="客户名称" fixed="left"></el-table-column>
					<el-table-column align="center" width="100" label="客户类型">
						<template slot-scope="scope">
							<span v-if="scope.row.custType =='0'">个人</span>
							<span v-else>公司</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="contactName" width="150" label="联系人"></el-table-column>
					<el-table-column align="center" prop="contactPhone" label="移动电话" width="160"></el-table-column>
					<el-table-column align="center" prop="idCard" width="200" label="证件号"></el-table-column>
					<el-table-column align="center" prop="unifiedSocialCreditCode" width="200" label="统一社会信用代码"></el-table-column>
					<el-table-column align="center" prop="crtUserName" width="100" label="创建人"></el-table-column>
					<el-table-column align="center" prop="crtTime" width="160" label="创建时间"></el-table-column>
					<el-table-column align="center" label="操作" width="240" fixed="right">
						<template slot-scope="scope">
							<el-button type="success" size="mini" @click="_view(scope.row)">查看</el-button>
							<el-button type="primary" size="mini" @click="_edit(scope.row)">修改</el-button>
							<el-button type="danger"  size="mini" @click="_del(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="24">
				<el-pagination background :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" 
					:total="total" @size-change="_handleSizeChange" @current-change="_handleCurrentChange" 
					layout="total, sizes, prev, pager, next, jumper"></el-pagination>
			</el-col>
		</el-row>
	</el-container>
</template>
<script>
import SaleCustomerApi from '@/api/sale/customer'

export default {
	data() {
		return {
			options: [{
				label: '全部',
				value: ''
			}, {
				label: '个人',
				value: 0
			}, {
				label: '公司',
				value: 1
			}],
			listQuery: {
				name: '',
				phoneNumber: '',
				idCardOrSocialCode: '',
				clientType: '',
				page: 1,
				limit: 10
			},
			list: [],
			total: 0,
			listLoading: false
		}
	},
	mounted() {
		this.query()
	},
	methods: {
		_handleSizeChange(val) {
			this.listQuery.limit = val
			this.query()
		},
		_handleCurrentChange(val) {
			this.listQuery.page = val
			this.query()
		},
		_clickQuery() {
			this.listQuery.page = 1
			this.query()
		},
		query() {
			this.listLoading = true
			SaleCustomerApi.getCustomFilelList(this.listQuery).then(data => {
				this.list = data.rows
				this.total = data.total
				this.listLoading = false
			})
		},
		_edit(row = {}) {
			const route = {
				path: '/sale/CustFile/add',
				query: {
					type: 'add'
				}
			}
			if (row && row.id) {
				route.query.id = row.id
				route.query.type = 'update'
			}
			this.$router.push(route)
		},
		_view(row) {
			this.$router.push({
				path: '/sale/CustFile/view',
				query: {
					id: row.id
				}
			})
		},
		_del(row) {
		    this.$confirm('确认删除吗?', '提示', { type: 'warning' }).then(() => {
		      	SaleCustomerApi.del(row.id).then(() => {
		        	this.query()
		        	this.$message({ message: '删除成功', type: 'success', showClose: true })
		        })
		    })
		}
	}
}
</script>