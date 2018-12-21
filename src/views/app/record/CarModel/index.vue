<template>
	<el-container>
		<el-row>
			<el-col :span="24">
				<el-form :inline="true" :model="listQuery">
					<el-form-item label="车辆品牌">
						<el-select @change="_brandsChange(listQuery.vehicleBrandId)" v-model="listQuery.vehicleBrandId" clearable filterable placeholder="车辆品牌">
							<el-option v-for="item in brands" :label="item.vehicleBrandId" :value="item.id" :key="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="车辆系列">
						<el-select @change="_seriesChange(listQuery.vehicleSeriesId)" v-model="listQuery.vehicleSeriesId" clearable filterable placeholder="车辆系列">
							<el-option v-for="item in series" :label="item.vehicleSeriesId" :value="item.id" :key="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="车辆类型">
						<el-select v-model="listQuery.vehicleTypeId" clearable filterable placeholder="车辆类型">
							<el-option v-for="item in typeArr" :label="item.vehicleTypeId" :value="item.id" :key="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="fr">
						<el-button type="primary"  icon="el-icon-search" @click="clickQuery">查询</el-button>
						<el-button type="primary"  icon="el-icon-plus" @click="_edit">新建</el-button>
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
					<el-table-column align="center" prop="vehicleBrandId" label="车辆品牌" min-width="180"></el-table-column>
					<el-table-column align="center" prop="vehicleSeriesId" label="车辆系列" min-width="180"></el-table-column>
					<el-table-column align="center" prop="vehicleTypeId" label="车辆类型" min-width="180"></el-table-column>
					<el-table-column align="center" label="操作" width="220" fixed="right">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="_edit(scope.row)">编辑</el-button>
							<el-button type="danger" size="mini"  @click="_delete(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="24">
				<el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total"
					@size-change="handleSizeChange" @current-change="handleCurrentChange"
					layout="total, sizes, prev, pager, next, jumper"></el-pagination>
			</el-col>
		</el-row>

		<el-dialog :title="edit.modalTitle" :visible.sync="edit.modalShow" width="500px" @close="_closeDialog">
			<el-form :rules="edit.rules" ref="dataForm" :model="edit.modalForm" label-postion="left" label-width="100px" style="width: 400px; margin-left: 20px">
				<el-form-item label="车辆品牌" prop="vehicleBrandId">
					<el-select style="width: 220px" v-model="edit.modalForm.vehicleBrandId" clearable filterable placeholder="车辆品牌">
						<el-option v-for="item in brandsArr" :label="item.labelDefault" :value="item.code" :key="item.value"></el-option>
					</el-select>
			    </el-form-item>
				<el-form-item label="车辆系列" prop="vehicleSeriesId">
					<el-select style="width: 220px" v-model="edit.modalForm.vehicleSeriesId" clearable filterable placeholder="车辆系列">
						<el-option v-for="item in seriesArr" :label="item.labelDefault" :value="item.code" :key="item.value"></el-option>
					</el-select>
			    </el-form-item>
				<el-form-item label="车辆类型" prop="vehicleTypeId">
					<el-select style="width: 220px" v-model="edit.modalForm.vehicleTypeId" clearable filterable placeholder="车辆类型">
						<el-option v-for="item in typeArrArr" :label="item.labelDefault" :value="item.code" :key="item.value"></el-option>
					</el-select>
			    </el-form-item>
			    <el-form-item label="状态">
			    	<el-radio-group v-model="edit.modalForm.status">
			    		<el-radio :label="0">启用</el-radio>
			    		<el-radio :label="1">停用</el-radio>
			    	</el-radio-group>
			    </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="ok">确认</el-button>
				<el-button @click="edit.modalShow = false">取消</el-button>
			</div>
		</el-dialog>
	</el-container>
</template>
<script>
import CommonApi from '@/api/common'
import CarModelApi from '@/api/record/carModel'

export default {
	name: 'carModel',
	data() {
		return {
			brands: [],
			series: [],
			typeArr: [],
			brandsArr: [],
			seriesArr: [],
			typeArrArr: [],
			tableKey: 0,
			list: [],
			total: 0,
			listQuery: {
		        vehicleBrandId: '',
		        vehicleSeriesId: '',
		        vehicleTypeId: '',
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
			        vehicleTypeId: '',
      				status: 0
				},
				rules: {
		          	vehicleBrandId: [{ required: true, message: '请选择车辆品牌', trigger: 'change' }],
		          	vehicleSeriesId: [{ required: true, message: '请选择车辆系列', trigger: 'change' }],
		          	vehicleTypeId: [{ required: true, message: '请选择车辆类型', trigger: 'change' }]
				}
			}
		}
	},
	mounted() {
		this.query()
		this._getData()
		if(this.brands.length === 0) {
			const param = {
				vehicleBrand: -1,
				vehicleSeries: -1,
				vehicleType: -1
			}
			this._getTypeLevel(param)
		}
	},
	methods: {
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
      	_vehicleSeries(val) {
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
		clickQuery() {
			this.listQuery.page = 1
			this.query()
		},
		query() {
			this.listLoading = true
			CarModelApi.getCarModelList(this.listQuery).then(data => {
				this.list = data.rows
				this.total = data.total
				this.listLoading = false
			})
		},
		_edit(obj = {}) {
			this.edit.modalShow = true
			if (obj && obj.id) {
				this.edit.modalForm = Object.assign({}, obj)
			}
			this.edit.modalTitle = obj.id ? '修改车型' : '新建车型'
		},
		_restFormData() {
			this.edit.modalForm = {
				id: '',
		        vehicleBrandId: '',
		        vehicleSeriesId: '',
		        vehicleTypeId: '',
		        status: 0
			}
		},
		_closeDialog() {
			this.$nextTick(() => {
				this.$refs.dataForm.resetFields()
				this._restFormData()
			})
		},
		ok() {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					const method = this.edit.modalForm.id === '' ? 'add' : 'update'
					const message = this.edit.modalForm.id === '' ? '创建成功' : '修改成功'
					this.fullscreenLoading = true
          			CarModelApi[method].apply(CarModelApi, [this.edit.modalForm]).then(() => {
						this.fullscreenLoading = false
						this.edit.modalShow = false
						this.$message({ showClose: true, message: message, type: 'success' })
            			this.query()
					}).catch(() => {
						this.fullscreenLoading = false
					})
				}
			})
		},
		_delete(row) {
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		    }).then(() => {
		        CarModelApi.del(row.id).then(() => {
        			this.$message({ showClose: true, message: '删除成功', type: 'success', duration: 2000 })
		            this.query()
		        })
		    })
		},
		_getData() {
			CommonApi.getDictByType('car_brand').then(data => {
				this.brandsArr = data.rows
			})
			CommonApi.getDictByType('car_series').then(data => {
				this.seriesArr = data.rows
			})
			CommonApi.getDictByType('car_categary').then(data => {
				this.typeArrArr = data.rows
			})
		}
	}
}
</script>
