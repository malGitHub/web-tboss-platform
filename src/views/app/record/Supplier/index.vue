<template>
	<el-container class="view-container">
		<el-row>
			<el-col :span="24" class="filter-header mb5">
				<el-form :inline="true">
					<el-col :span="18">
						<el-form-item label="供应商名称">
							<el-input placeholder="供应商名称" v-model="listQuery.supplierName"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input placeholder="联系人" v-model="listQuery.contactName"></el-input>
						</el-form-item>
						<el-form-item label="移动电话">
							<el-input placeholder="移动电话" v-model="listQuery.contactPhone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="search-btn-group">
						<el-col :span="24">
							<el-form-item class="fr">
								<el-button type="primary" @click="querySuppliers">查询</el-button>
								<el-button type="primary" @click="toAddPage">新建</el-button>
							</el-form-item>
						</el-col>
					</el-col>
				</el-form>
			</el-col>
			<el-col :span="24" class="mb20">
				<el-table :data="list" border v-loading.body="listLoading" border fit highlight-current-row class="wh">
					<el-table-column align="center" width="60" label="序号">
						<template slot-scope="scope">{{scope.$index + 1}}</template>
					</el-table-column>
					<el-table-column align="center" prop="supplierName" min-width="150" label="供应商名称"></el-table-column>
					<el-table-column align="center" width="100" label="供应商类型">
						<template slot-scope="scope">
							<span v-if="scope.row.supplierType =='0'">车辆销售方</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="contactName" width="100" label="联系人"></el-table-column>
					<el-table-column align="center" prop="contactPhone" label="移动电话"></el-table-column>
					<el-table-column align="center" prop="address" width="150" label="地址"></el-table-column>
					<el-table-column align="center" prop="crtUserName" width="100" label="创建人"></el-table-column>
					<el-table-column align="center" prop="crtTime" label="创建时间"></el-table-column>
					<el-table-column align="center" label="操作" width="240">
						<template slot-scope="scope">
							<el-button type="success" size="mini" @click="toAddPage(scope.row,'view')">查看</el-button>
							<el-button type="primary" size="mini" @click="toAddPage(scope.row,'edit')">修改</el-button>
							<el-button type="danger" size="mini" @click="deleteSupplier(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="24">
				<el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" @size-change="_handleSizeChange" @current-change="_handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
			</el-col>
		</el-row>
	</el-container>
</template>
<script>
	import SupplierApi from '@/api/record/supplier'

	export default {
		name: 'supplierIndex',
		data() {
			return {
				listQuery: {
					supplierName: '',
					contactName: '',
					contactPhone: '',
					page: 1,
					limit: 10
				},
				list: [],
				total: 0,
				listLoading: false
			}
		},
		created() {
			this.query()
		},
		methods: {
			query() {
				SupplierApi.getSupplierList(this.listQuery).then(data => {
					this.list = data.rows
					this.total = data.total
					this.listLoading = false
				})
			},
			querySuppliers() {
				this.listQuery.page = 1
				this.listLoading = true
				this.query()
			},
			_handleSizeChange(val) {
				this.listQuery.limit = val
				this.query()
			},
			_handleCurrentChange(val) {
				this.listQuery.page = val
				this.query()
			},
			toAddPage(row = {}, actionType) {
				const route = {
					path: '/record/supplier/add'
				}
				if (row && row.id) {
					route.query = {
						id: row.id,
						type: actionType
					}
				}
				this.$router.push(route)
			},
			deleteSupplier(row) {
				this.$confirm('确认删除吗?', '提示', {
					type: 'warning'
				}).then(() => {
					SupplierApi.del(row.id).then(() => {
						this.query()
						this.$message({
							message: '删除成功',
							type: 'success',
							showClose: true
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>