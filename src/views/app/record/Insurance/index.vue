<template>
	<el-container class="view-container">
		<el-row>
			<el-col :span="24" class="filter-header mb5">
				<el-form :inline="true">
					<el-col :span="24">
						<el-form-item label="保险名称">
							<el-input placeholder="保险名称" v-model="listQuery.insuranceName"></el-input>
						</el-form-item>
						<el-form-item label="保险类型">
							<el-select class="filter-item" v-model="listQuery.insuranceType" placeholder="请选择">
								<el-option v-for="item in insuranceTypeOptions" :key="item.id" :label="item.labelDefault" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
							<el-form-item class="fr">
								<el-button type="primary" @click="queryInsurance">查询</el-button>
								<el-button type="primary" @click="act('','add')">新建</el-button>
							</el-form-item>
					</el-col>

				</el-form>
			</el-col>
			<el-col :span="24" class="mb20">
				<el-table :data="list" border v-loading.body="listLoading" border fit highlight-current-row class="wh">
					<el-table-column align="center" width="60" label="序号">
						<template slot-scope="scope">{{scope.$index + 1}}</template>
					</el-table-column>
					<el-table-column align="center" prop="insuranceName" min-width="150" label="保险名称"></el-table-column>
					<el-table-column align="center" prop="insuranceType" width="100" label="保险种类"></el-table-column>
					<el-table-column align="center" prop="enableFlg" label="是否启用">
						<template slot-scope="scope">
							<span v-if="scope.row.enableFlg == 0" style="color:greenyellow">已启用</span>
							<span v-else style="color:darkgray">未启用</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="crtUserName" width="100" label="创建人"></el-table-column>
					<el-table-column align="center" prop="crtTime" label="创建时间"></el-table-column>
					<el-table-column align="center" label="操作" width="240">
						<template slot-scope="scope">
							<el-button type="success" size="mini" @click="act(scope.row,'view')">查看</el-button>
							<el-button type="primary" size="mini" @click="act(scope.row,'edit')">修改</el-button>
							<el-button type="danger" size="mini" @click="remove(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="24">
				<el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" @size-change="_handleSizeChange" @current-change="_handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
			</el-col>
		</el-row>
		<insurance-add :dialog-obj="dialogObj" view-type="" v-on:reset="reset()"></insurance-add>
	</el-container>
</template>

<script>
	import CommonApi from '@/api/common'
	import InsuranceApi from '@/api/record/insurance'
	import InsuranceAdd from './add'

	export default {
		name: 'insuranceIndex',
		components: {
			'insurance-add': InsuranceAdd
		},
		data() {
			return {
				listQuery: {
					insuranceName: '',
					insuranceType: '',
					page: 1,
					limit: 10
				},
				insuranceTypeOptions: [],
				list: [],
				total: 0,
				dialogObj: {
					actionType: '',
					insuranceObj: {
						insuranceType: '',
						insuranceName: '',
						enableFlg: ''
					},
					rowId: '',
					bShowDialog: false,
					bReadonly: false
				},
				listLoading: false
			}
		},
		mounted() {
			this.getDict()
			this.query()
		},
		methods: {
			getDict() {
				CommonApi.getDictByType('insurance_type').then(data => {
					this.insuranceTypeOptions = data.rows
				})
			},
			query() {
				InsuranceApi.getInsuranceList(this.listQuery).then(data => {
					this.list = data.rows
					this.total = data.total
					this.listLoading = false
				})
			},
			queryInsurance() {
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

			act(row = {}, actionType) {
				console.log('actionType=' + actionType)
				if (row && row.id) {
					InsuranceApi.getDetail(row.id).then(data => {
					this.dialogObj.insuranceObj = data	
//					this.dialogObj.insuranceObj.insuranceName = data.insuranceName
//					this.dialogObj.insuranceObj.insuranceType = data.insuranceType
//					this.dialogObj.insuranceObj.enableFlg = data.enableFlg
//					
						if (actionType === 'view') {
							this.dialogObj.bReadonly = true
						}
					})
					this.dialogObj.rowId = row.id
				}

				this.dialogObj.actionType = actionType
				this.dialogObj.bShowDialog = true
			},
			remove(row) {
				this.$confirm('确认删除吗?', '提示', {
					type: 'warning'
				}).then(() => {
					InsuranceApi.del(row.id).then(() => {
						this.query()
						this.$message({
							message: '删除成功',
							type: 'success',
							showClose: true
						})
					})
				})
			},
			reset() {
				this.dialogObj.actionType = ''
				this.dialogObj.bReadonly = false
				this.dialogObj.bShowDialog = false
				this.dialogObj.insuranceObj = {}
				this.query()
			}
		}
	}
</script>

<style>

</style>