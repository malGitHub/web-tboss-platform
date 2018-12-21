<template>
	<!--选择车型界面-->
	<el-dialog append-to-body width="780px" title="选择车型" :visible.sync="showModal" :before-close="_closeModal">
		<el-row class="inline-row">
			<el-form :inline="true" :model="listQuery">
				<el-form-item label="车辆品牌">
					<el-select style="width: 150px" @change="_brandsChange(listQuery.vehicleBrandId)" v-model="listQuery.vehicleBrandId" clearable filterable placeholder="车辆品牌">
						<el-option v-for="item in brands" :label="item.vehicleBrandId" :value="item.id" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车辆系列">
					<el-select style="width: 150px" @change="_vehicleSeries(listQuery.vehicleSeriesId)" v-model="listQuery.vehicleSeriesId" clearable filterable placeholder="车辆系列">
						<el-option v-for="item in series" :label="item.vehicleSeriesId" :value="item.id" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车辆类型">
					<el-select style="width: 150px" v-model="listQuery.vehicleTypeId" clearable filterable placeholder="车辆类型">
						<el-option v-for="item in typeArr" :label="item.vehicleTypeId" :value="item.id" :key="item.value"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-row>
		<el-row class="mb12">
			<el-table height="300" :data="list" v-loading="listLoading" border fit highlight-current-row class="wh" @setCurrentRow>
				<el-table-column align="center" width="60">
					<template slot-scope="scope">
						<el-radio v-model="radio" @change="_select(scope.row)" :label="scope.row.id">&thinsp;</el-radio>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="vehicleBrandId" label="车辆品牌">
				</el-table-column>
				<el-table-column align="center" prop="vehicleSeriesId" label="车辆系列">
				</el-table-column>
				<el-table-column align="center" prop="vehicleTypeId" label="车辆类型">
				</el-table-column>
			</el-table>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-pagination background :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" 
					:total="total" @size-change="_handleSizeChange" @current-change="_handleCurrentChange" 
					layout="total, sizes, prev, pager, next, jumper"></el-pagination>
			</el-col>
		</el-row>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click.native="_selectSubmit">确定</el-button>
			<el-button @click.native="_closeModal">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>
import CarModelApi from '@/api/record/carModel'
import CommonApi from '@/api/common'

export default {
	props: {
		showModal: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			radio: '',
			brands: [],
			series: [],
			typeArr: [],
			selectRow: {},
			list: [],
			total: 1,
			listLoading: false,
			listQuery: {
				vehicleBrandId: '',
				vehicleSeriesId: '',
				vehicleTypeId: '',
				page: 1,
				limit: 10
			}
		}
	},
//	mounted() {
//		this._query
//	},
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
		_handleSizeChange(val) {
			this.listQuery.limit = val
			this._query()
		},
		_handleCurrentChange(val) {
			this.listQuery.page = val
			this._query()
		},
		_query() {
			this.listLoading = true
			CarModelApi.getCarModelList(this.listQuery).then(data => {
				this.list = data.rows
				this.total = data.total
				this.listLoading = false
			}).catch(() => {
				this.listLoading = false
			})
		},
		_select(row = {}) {
			this.selectRow = Object.assign({}, row)
        },
        _selectSubmit() {
	        if (!this.selectRow.id || this.selectRow.id === '') {
	          this.$message.error('请选择车型')
	          return
	        }
	        this.$emit('close', this.selectRow)
      	},
      	_closeModal() {
      		this.$emit('close')
      	},
      	_brandsChange(val) {
      		if (val === '') {
      			this.listQuery.vehicleSeriesId = ''
      			this.listQuery.vehicleTypeId = ''
      			this._getTypeLevel('vehicleBrand', -1)
      		} else {
      			this._getTypeLevel('vehicleBrand', val)
      		}
			this._query()
      	},
      	_vehicleSeries(val) {
      		if (val === '') {
      			this.listQuery.vehicleTypeId = ''
      			this._getTypeLevel('vehicleSeries', -1)
      		} else {
      			this._getTypeLevel('vehicleSeries', val)
      		}
			this._query()
      	}
	},
	watch: {
		showModal(val) {
			if (val) {
				this.listQuery.vehicleBrandId = ''
				this.listQuery.vehicleSeriesId = ''
      			this.listQuery.vehicleTypeId = ''
				this._query()
				const param = {
					vehicleBrand: -1,
					vehicleSeries: -1,
					vehicleType: -1
				}
				this._getTypeLevel(param)
			}
		}
	}
}
</script>