<template>
	<el-container class="view-container">
		<el-row>
			<el-col :span="24" class="filter-header mb5">
				<el-form :inline="true" :model="listQuery" label-width="80px">
					<el-col :span="18">
						<el-form-item label="车主姓名">
							<el-input v-model="listQuery.ownerName" placeholder="车主姓名"></el-input>
						</el-form-item>
						<el-form-item label="证件号">
							<el-input v-model="listQuery.IDCard" placeholder="证件号"></el-input>
						</el-form-item>
						<el-form-item label="移动电话">
							<el-input v-model="listQuery.phoneNumber" placeholder="移动电话"></el-input>
						</el-form-item>
						<el-form-item label="挂靠公司">
							<el-select v-model="listQuery.companyId" clearable placeholder="请选择">
								<el-option v-for="(item, index) in optionsGroup.compArr" :label="item.text" :value="item.value" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="名下车辆">
							<el-select v-model="listQuery.ownerCar" clearable placeholder="请选择">
								<el-option v-for="(item,index) in optionsGroup.ownerArr" :label="item.text" :value="item.value" :key="index"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="search-btn-group">
						<el-col :span="24">
							<el-form-item class="fr">
								<el-button type="primary" size="medium" icon="el-icon-search" @click="_clickQuery">查询</el-button>
								<el-button type="primary" size="medium" icon="el-icon-document" @click="_export">导出</el-button>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item class="fr">
								<el-button type="primary" size="medium" icon="el-icon-plus" @click="_edit()">新建</el-button>
							</el-form-item>
						</el-col>
					</el-col>
				</el-form>
			</el-col>
			<el-col :span="24" class="mb20">
				<el-table :data="list" border v-loading.body="listLoading" border fit highlight-current-row class="wh">
					<el-table-column align="center" width="60" label="序号" fixed>
						<template slot-scope="scope">{{scope.$index + 1}}</template>
					</el-table-column>
					<el-table-column align="center" prop="ownerName" width="120" label="车主姓名" />
					<el-table-column align="center" width="150" label="车主类型">
						<template slot-scope="scope">
							<span v-if="scope.row.ownerType =='0'">个人</span>
							<span v-else>公司</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="contantName" width="100" label="联系人" />
					<el-table-column align="center" prop="contactPhone" min-width="220" label="移动电话" />
					<el-table-column align="center" prop="idcard" width="150" label="证件号">
						<template slot-scope="scope">
							<span v-if="scope.row.ownerType =='0'">{{scope.row.IDCard}}</span>
							<span v-else>{{scope.row.unifiedSocialCreditCode}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="carCount" width="150" label="名下车辆" />
					<el-table-column align="center" label="操作" width="240" fixed="right">
						<template slot-scope="scope">
							<el-button type="success" size="mini" @click="_view(scope.row.id)">查看</el-button>
							<el-button type="primary" size="mini" @click="_edit(scope.row.id)">修改</el-button>
							<el-button type="danger"  size="mini" @click="_del(scope.row.id)">删除</el-button>
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
import CarOwnerApi from '@/api/car/carOwner'

export default {
	name: 'CarOwner',
	data() {
		return {
			optionsGroup: {
				compArr: [],
				ownerArr: [
					{
						id: '0',
						value: '有正常车辆挂靠'
					},
					{
						id: '1',
						value: '无正常车辆挂靠'
					},
					{
						id: '2',
						value: '无挂靠车辆'
					}
				]
			},
			listQuery: {
				ownerName: '',
				IDCard: '',
				phoneNumber: '',
				companyId: '',
				ownerCar: '',
				page: 1,
				limit: 10
			},
			list: [],
			total: 0,
			listLoading: false
		}
	},
	mounted() {
		this._query()
	},
	methods: {
		_handleSizeChange(val) {
			this.listQuery.limit = val
			this._query()
		},
		_handleCurrentChange(val) {
			this.listQuery.page = val
			this._query()
		},
		_clickQuery() {
			this.listQuery.page = 1
			this._query()
		},
		_query() {
			this.listLoading = true
			CarOwnerApi.getList(this.listQuery).then(data => {
				this.list = data.rows
				this.total = data.total
				this.listLoading = false
			})
		},
		_edit(id = '') {
			const route = {
				path: '/car/carOwner/add',
				query: {
					type: 'add'
				}
			}
			if (id && id !== '') {
				route.query.id = id
				route.query.type = 'update'
			}
			this.$router.push(route)
		},
		_view(id = '') {
			this.$router.push({
				path: '/car/carOwner/view',
				query: {
					id: id
				}
			})
		},
		_del(id) {
			this.$confirm('确认删除吗?', '提示', { type: 'warning' }).then(() => {
		      	CarOwnerApi.del(id).then(() => {
		      		this.$message({ message: '删除成功', type: 'success', showClose: true })
		        	this._query()
		        })
		    })
		},
		_export() {
		}
	}
}
</script>

<style lang="scss" scoped>
	
</style>