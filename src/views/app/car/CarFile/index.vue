<template>
	<el-container class="view-container">
		<el-row>
			<el-col :span="24" class="filter-header mb5">
				<el-form :inline="true" :model="listQuery" label-width="80px">
					<el-col :span="18">
						<el-form-item label="车牌号">
							<el-input v-model="listQuery.vehiclePlate" placeholder="车牌号"></el-input>
						</el-form-item>
						<el-form-item label="车主">
							<el-input v-model="listQuery.ownerName" placeholder="车主"></el-input>
						</el-form-item>
						<el-form-item label="车辆类型">
							<el-select v-model="listQuery.vehicleTypeId" clearable placeholder="请选择">
								<el-option v-for="(item, index) in optionsGroup.carType" :label="item.labelDefault" :value="item.id" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="挂靠公司">
							<el-select v-model="listQuery.companyId" clearable placeholder="请选择">
								<el-option v-for="(item, index) in optionsGroup.company" :label="item.text" :value="item.value" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="挂靠关系">
							<el-select v-model="listQuery.isDependence" clearable placeholder="">
								<el-option v-for="(item,index) in optionsGroup.hangUp" :label="item.text" :value="item.value" :key="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="车辆状态">
							<el-select v-model="listQuery.status" clearable placeholder="">
								<el-option v-for="(item,index) in optionsGroup.carStatus" :label="item.text" :value="item.value" :key="index"></el-option>
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
								<!--<el-button type="primary" size="medium" @click="modal.modalShow = true">绑定车主</el-button>-->
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
					<el-table-column align="center" prop="vehiclePlate" width="120" label="车牌号" fixed />
					<el-table-column align="center" prop="vin" width="220" label="vin号" fixed />
					<el-table-column align="center" prop="isDependence" width="100" label="挂靠关系">
						<template slot-scope="scope">
							<span v-if="scope.row.isDependence =='0'">挂靠</span>
							<span v-else>不挂靠</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="companyId" min-width="220" label="挂靠公司" />
					<el-table-column align="center" prop="ownerName" width="150" label="车主" />
					<!--<el-table-column align="center" prop="bindingDriverId" width="150" label="绑定司机" />-->
					<el-table-column align="center" prop="vehicleBrandId" width="150" label="车辆品牌" />
					<el-table-column align="center" prop="publicityCode" width="220" label="公告型号" />
					<el-table-column align="center" prop="status" width="100" label="车辆状态">
						<template slot-scope="scope">
							<span v-if="scope.row.status =='0'">正常</span>
							<span v-else-if="scope.row.status =='1'">转出</span>
							<span v-else>报废</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="crtTime" width="160" label="创建时间" />
					<el-table-column align="center" label="操作" width="240" fixed="right">
						<template slot-scope="scope">
							<!--<el-button type="success" size="mini" @click="_view(scope.row)" icon="el-icon-plus"></el-button>
							<el-button type="info" size="mini" @click="_bindOwner(scope.row)">查看</el-button>
							<el-button type="primary" size="mini" @click="_edit(scope.row)" icon="el-icon-edit-outline"></el-button>
							<el-button type="danger"  size="mini" @click="_del(scope.row.id)" icon="el-icon-delete"></el-button>-->
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
		
		<!--<el-dialog title="绑定车主" :visible.sync="modal.modalShow" width="500px" @close="_closeDialog">
			<el-form :rules="modal.rules" ref="dataForm" :model="modal.modalForm" label-width="100px" style="width: 400px; margin-left: 20px">				
				<el-form-item label="绑定车主" prop="owner">
					<el-select v-model="modal.modalForm.owner" clearable placeholder="请选择">
						<el-option v-for="(item, index) in modal.modalOption" :label="item.text" :value="item.value" :key="index"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="_ok">确认</el-button>
				<el-button @click="modal.modalShow = false">取消</el-button>
			</div>
		</el-dialog>-->
	</el-container>
</template>
<script>
import CarFileApi from '@/api/car/carFile'
import CommonApi from '@/api/common'

export default {
	name: 'carFile',
	data() {
		return {
			tableKey: 0,
			optionsGroup: {
				carType: [],
				company: [],
				hangUp: [
					{ value: '0', text: '挂靠' },
					{ value: '1', text: '不挂靠' },
					{ value: '', text: '全部' }
				],
				carStatus: [
					{ value: '0', text: '正常' },
					{ value: '1', text: '转出' },
					{ value: '2', text: '报废' },
					{ value: '', text: '全部' }
				]
			},
			list: [],
			total: 0,
			listQuery: {
				vehiclePlate: '',
				ownerName: '',
				vehicleTypeId: '',
				companyId: '',
				isDependence: '',
				status: '',
				page: 1,
				limit: 10
			},
			listLoading: false
//			fullscreenLoading: false,
//			modal: {
//				modalShow: false,
//				modalOption: [],
//				modalForm: {
//					id: '',
//					owner: ''
//				},
//				rulers: { owner: [{ required: true, message: '请选择想要绑定的车主', trigger: 'change' }] }
//			}
		}
	},
//	created() {},
	mounted() {
		this._getData()
		this._query()
	},
	methods: {
		_getData() {
//			CommonApi.getCarModel().then(data => {
//				this.carType = data
//			})
			CommonApi.getDictByType('car_categary').then(data => {
				this.optionsGroup.carType = data.rows
			})
		},
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
			CarFileApi.getList(this.listQuery).then(data => {
				this.list = data.rows
				this.total = data.total
				this.listLoading = false
			}).catch(() => {
				this.listLoading = false
			})
		},
		_edit(id = '') {
			const route = {
				path: '/car/carFile/add',
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
				path: '/car/carFile/view',
				query: {
					id: id
				}
			})
		},
		_del(id) {
			this.$confirm('确认删除吗?', '提示', { type: 'warning' }).then(() => {
		      	CarFileApi.del(id).then(() => {
		      		this.$message({ message: '删除成功', type: 'success', showClose: true })
		        	this._query()
		        })
		    })
		},
		_export() {
		}
//		_ok() {
//		},
//		_bindOwner(obj = {}) {
//			this.modal.modalForm.id = obj.id
//			this.modal.modalShow = true
//		},
//		_closeDialog() {
//			this.$nextTick(() => {
//				this.$refs.dataForm.resetFields()
//				this.modal.modalForm.id = ''
//				this.modal.modalForm.owner = ''
//			})
//		}
	}
}
</script>

<style lang="scss" scoped>

</style>