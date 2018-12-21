<template>
	<el-container>
		<el-row>
			<el-col :span="24">
				<el-form :inline="true" :model="listQuery">
					<el-form-item label="车辆品牌">
						<el-select style="width: 150px" @change="_brandsChange(listQuery.vehicleBrandId)" v-model="listQuery.vehicleBrandId" clearable filterable placeholder="车辆品牌">
							<el-option v-for="item in brands" :label="item.vehicleBrandId" :value="item.id" :key="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="车辆系列">
						<el-select style="width: 150px" @change="_seriesChange(listQuery.vehicleSeriesId)" v-model="listQuery.vehicleSeriesId" clearable filterable placeholder="车辆系列">
							<el-option v-for="item in series" :label="item.vehicleSeriesId" :value="item.id" :key="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="车辆类型">
						<el-select style="width: 150px" v-model="listQuery.vehicleTypeId" clearable filterable placeholder="车辆类型">
							<el-option v-for="item in typeArr" :label="item.vehicleTypeId" :value="item.id" :key="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="驱动形式">
						<el-select style="width: 150px" v-model="listQuery.driveType" filterable placeholder="请选择">
							<el-option v-for="item in driveTypeOptions" :key="item.id" :label="item.labelDefault" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="fr">
						<el-button type="primary" icon="el-icon-search" @click="clickQuery">查询</el-button>
						<el-button type="primary" icon="el-icon-plus" @click="_edit">新建</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="24" class="mb20">
				<el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="加载中" border fit highlight-current-row class="wh">
					<el-table-column align="center" label="序号" width='60' fixed>
						<template slot-scope="scope">
							<span>{{scope.$index+1}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="fullInfo" label="商品信息" min-width="300"></el-table-column>
					<el-table-column align="center" prop="vehicleBrandId" label="车辆品牌" min-width="100"></el-table-column>
					<el-table-column align="center" prop="vehicleSeriesId" label="车辆系列" min-width="100"></el-table-column>
					<el-table-column align="center" prop="publicityCode" label="公告型号" min-width="100"></el-table-column>
					<el-table-column align="center" prop="vehicleTypeId" label="车辆类型" min-width="100"></el-table-column>
					<el-table-column align="center" prop="oilType" label="燃油类型" min-width="100"></el-table-column>
					<el-table-column align="center" prop="power" label="马力" min-width="100"></el-table-column>
					<el-table-column align="center" prop="driveType" label="驱动形式" min-width="100"></el-table-column>
					<el-table-column align="center" prop="colour" label="车身颜色" min-width="100"></el-table-column>
					<el-table-column align="center" prop="purchasePrice" label="采购单价" min-width="100"></el-table-column>
					<el-table-column align="center" prop="salesPrice" label="销售单价" min-width="100"></el-table-column>
					<el-table-column align="center" label="操作" width="220" fixed="right">
						<template slot-scope="scope">
							<el-button type="success" size="mini" @click="_view(scope.row)">查看</el-button>
							<el-button type="primary" size="mini" @click="_edit(scope.row)">编辑</el-button>
							<el-button type="danger" size="mini" @click="_delRow(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="24">
				<el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
			</el-col>
		</el-row>

		<el-dialog :title="edit.modalTitle" :visible.sync="edit.modalShow" width="500px" @close="_closeDialog">
			<el-form :rules="edit.rules" ref="dataForm" :model="edit.modalForm" label-postion="left" label-width="100px" style="width: 400px; margin-left: 20px">
				<el-form-item label="车辆品牌" prop="vehicleBrandId">
					<el-input v-model="edit.modalForm.vehicleBrandId"></el-input>
				</el-form-item>
				<el-form-item label="车辆系列" prop="vehicleSeriesId">
					<el-input v-model="edit.modalForm.vehicleSeriesId"></el-input>
				</el-form-item>
				<el-form-item label="公告型号" prop="publicityCode">
					<el-input v-model="edit.modalForm.publicityCode"></el-input>
				</el-form-item>
				<el-form-item label="车辆类型" prop="vehicleTypeId">
					<el-input v-model="edit.modalForm.vehicleTypeId"></el-input>
				</el-form-item>
				<el-form-item label="燃油类型" prop="oilType">
					<el-input v-model="edit.modalForm.oilType"></el-input>
				</el-form-item>
				<el-form-item label="马力" prop="power">
					<el-input v-model="edit.modalForm.power"></el-input>
				</el-form-item>
				<el-form-item label="驱动形式" prop="driveType">
					<el-input v-model="edit.modalForm.driveType"></el-input>
				</el-form-item>
				<el-form-item label="车身颜色" prop="colour">
					<el-input v-model="edit.modalForm.colour"></el-input>
				</el-form-item>
				<el-form-item label="采购单价" prop="purchasePrice">
					<el-input v-model="edit.modalForm.purchasePrice"></el-input>
				</el-form-item>
				<el-form-item label="销售单价" prop="salesPrice">
					<el-input v-model="edit.modalForm.salesPrice"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary">确认</el-button>
				<el-button @click="edit.modalShow = false">取消</el-button>
			</div>
		</el-dialog>
	</el-container>
</template>
<script>
import CommonApi from '@/api/common'
import GoodsApi from '@/api/record/goods'

export default {
	name: 'goods',
	data() {
		return {
			brands: [],
			series: [],
			typeArr: [],
			driveTypeOptions: [],
			tableKey: 0,
			list: [],
			total: 0,
			listQuery: {
				vehicleBrandId: '',
				vehicleSeriesId: '',
				vehicleTypeId: '',
				driveType: '',
				page: 1,
				limit: 10
			},
			listLoading: false,
			fullscreenLoading: false,
			edit: {
				modalTitle: '',
				modalShow: false,
				modalForm: {
					id: '',
					vehicleBrandId: '',
					vehicleSeriesId: '',
					publicityCode: '',
					vehicleTypeId: '',
					oilType: '',
					power: '',
					driveType: '',
					colour: '',
					purchasePrice: '',
					salesPrice: ''
				},
				rules: {
					vehicleBrandId: [{
						required: true,
						message: '请输入车辆品牌',
						trigger: 'change'
					}],
					vehicleSeriesId: [{
						required: true,
						message: '请输入车辆系列',
						trigger: 'change'
					}],
					publicityCode: [{
						required: true,
						message: '请输入公告型号',
						trigger: 'change'
					}],
					vehicleTypeId: [{
						required: true,
						message: '请输入车辆类型',
						trigger: 'change'
					}],
					oilType: [{
						required: true,
						message: '请输入燃油类型',
						trigger: 'change'
					}],
					power: [{
						required: true,
						message: '请输入马力',
						trigger: 'change'
					}],
					driveType: [{
						required: true,
						message: '请输入公告型号',
						trigger: 'change'
					}],
					colour: [{
						required: true,
						message: '请输入车身颜色',
						trigger: 'change'
					}],
					purchasePrice: [{
						required: true,
						message: '请输入采购单价',
						trigger: 'change'
					}],
					salesPrice: [{
						required: true,
						message: '请输入销售单价',
						trigger: 'change'
					}]
				}
			}
		}
	},
	mounted() {
		this.getDict()
		this.getCarFile()
		this.query()
	},
	methods: {
		getCarFile() {
			if(this.brands.length === 0) {
				const param = {
					vehicleBrand: -1,
					vehicleSeries: -1,
					vehicleType: -1
				}
				this._getTypeLevel(param)
			}
		},
		_getTypeLevel(type, key) {
			let param = {}
			if (key !== undefined) {
				if (type === 'vehicleSeries') {
					param = {
						vehicleSeries: key,
						vehicleBrand: key === -1 ? -1 : this.listQuery.vehicleBrandId
					}
				} else {
					param[type] = key
				}
			} else { //查全部
				param = type
			}
			CommonApi.getCarModel(param).then(data => {
				if (key !== undefined) {
					if (type === 'vehicleBrand') {
						this.series = data.seriesList
						this.typeArr = data.typeList
					} else if (type === 'vehicleSeries') {
						this.typeArr = data.typeList
					}
				} else {
					this.brands = data.brandList
					this.series = data.seriesList
					this.typeArr = data.typeList
				}
			})
		},
		_brandsChange(val) {
      		if (val === '') {
      			this.listQuery.vehicleSeriesId = ''
      			this.listQuery.vehicleTypeId = ''
      			this._getTypeLevel('vehicleBrand', -1)
      		} else {
      			this._getTypeLevel('vehicleBrand', val)
      		}
      	},
      	_seriesChange(val) {
      		if (val === '') {
      			this.listQuery.vehicleTypeId = ''
      			this._getTypeLevel('vehicleSeries', -1)
      		} else {
      			this._getTypeLevel('vehicleSeries', val)
      		}
      	},
		handleSizeChange(val) {
			this.listQuery.limit = val
			this.query()
		},
		handleCurrentChange(val) {
			this.listQuery.page = val
			this.query()
		},
		getDict() {
			CommonApi.getDictByType('drive_type').then(data => {
				this.driveTypeOptions = data.rows
			})
			CommonApi.getDictByType('car_brand').then(data => {
				this.brands = data.rows
			})
		},
		query() {
			this.listLoading = true
			GoodsApi.getGoodsList(this.listQuery).then(data => {
				this.list = data.rows
				this.total = data.total
				this.listLoading = false
			})
		},
		_delRow(row) {
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				GoodsApi.del(row.id).then(() => {
					this.$message({
						showClose: true,
						message: '删除成功',
						type: 'success',
						duration: 2000
					})
					this.query()
				})
			})
		},
		clickQuery() {
			this.listQuery.page = 1
			this.query()
		},
		_restFormData() {
			this.edit.modalForm = {
				id: '',
				vehicleBrandId: '',
				vehicleSeriesId: '',
				publicityCode: '',
				vehicleTypeId: '',
				oilType: '',
				power: '',
				driveType: '',
				colour: '',
				purchasePrice: '',
				salesPrice: ''
			}
		},
		_closeDialog() {
			this.$nextTick(() => {
				this.$refs.dataForm.resetFields()
				this._restFormData()
			})
		},
		_view(row = {}) {
			const route = {
				path: 'goods/Add'
			}
			route.query = {
				type: 'view',
				viewObj: row
			}
			this.$router.push(route)
		},
		_edit(row = {}) {
			const route = {
				path: 'goods/Add'
			}
			let actionType = ''
			if(row && row.id) {
				actionType = 'edit'
				route.query = {
					id: row.id,
					type: actionType,
					editObj: row
				}
			} else {
				actionType = 'add'
				route.query = {
					type: actionType
				}
			}

			this.$router.push(route)
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	padding: 20px;
	.components-container {
		margin: 30px 50px;
		position: relative;
	}
	.pagination-container {
		margin-top: 30px;
	}
	.text-center {
		text-align: center
	}
	.sub-navbar {
		height: 50px;
		line-height: 50px;
		position: relative;
		width: 100%;
		text-align: right;
		padding-right: 20px;
		transition: 600ms ease position;
		background: linear-gradient(90deg, rgba(32, 182, 249, 1) 0%, rgba(32, 182, 249, 1) 0%, rgba(33, 120, 241, 1) 100%, rgba(33, 120, 241, 1) 100%);
		.subtitle {
			font-size: 20px;
			color: #fff;
		}
		&.draft {
			background: #d0d0d0;
		}
		&.deleted {
			background: #d0d0d0;
		}
	}
	.link-type,
	.link-type:focus {
		color: #337ab7;
		cursor: pointer;
		&:hover {
			color: rgb(32, 160, 255);
		}
	}
	.filter-container {
		padding-bottom: 10px;
		.filter-item {
			display: inline-block;
			vertical-align: middle;
			margin-bottom: 10px;
		}
	}
	//refine vue-multiselect plugin
	.multiselect {
		line-height: 16px;
	}
	.multiselect--active {
		z-index: 1000 !important;
	}
}
</style>