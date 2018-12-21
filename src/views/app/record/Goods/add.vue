<template>
	<el-container class="view-form">
		<el-form class="wh" :rules="edit.rules" label-width="220px" ref="dataForm" :model="edit.modalForm">
			<el-row type="flex" justify="center">
				<el-col :span="24" class="mb12">
					<el-card shadow="hover">
						<div slot="header">
							<template v-if="actionType==='add'">
								<span>新建商品档案</span>
							</template>
							<template v-if="actionType==='edit'">
								<span>修改商品档案</span>
							</template>
							<template v-if="actionType==='view'">
								<span>查看商品档案</span>
							</template>
						</div>
						<el-col :span="18" :offset="2">
							<el-form-item label="选择车型" required>
								<el-button style="width: 280px" @click="_selectVehicle">请选择车型</el-button>
							</el-form-item>
							<el-form-item label="车辆品牌">
								<el-input v-model="edit.modalForm.vehicleBrandId" :readonly="true"></el-input>
							</el-form-item>
							<el-form-item label="车辆系列">
								<el-input v-model="edit.modalForm.vehicleSeriesId" :readonly="true"></el-input>
							</el-form-item>
							<el-form-item label="车辆类型">
								<el-input v-model="edit.modalForm.vehicleTypeId" :readonly="true"></el-input>
							</el-form-item>
							<el-form-item label="公告型号" prop="publicityCode">
								<el-input v-model="edit.modalForm.publicityCode" :readonly="bReadonly"></el-input>
							</el-form-item>
							<el-form-item label="燃油类型">
								<el-select class="filter-item" v-model="edit.modalForm.oilType" placeholder="请选择" :disabled="bReadonly">
									<el-option v-for="item in oilTypeOptions" :key="item.id" :label="item.labelDefault" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="马力">
								<el-input v-model="edit.modalForm.power" :readonly="bReadonly"></el-input>
							</el-form-item>
							<el-form-item label="驱动形式">
								<el-select class="filter-item" v-model="edit.modalForm.driveType" placeholder="请选择" :disabled="bReadonly">
									<el-option v-for="item in driveTypeOptions" :key="item.id" :label="item.labelDefault" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="车身颜色" prop="colour">
								<el-select class="filter-item" v-model="edit.modalForm.colour" placeholder="请选择" :disabled="bReadonly">
									<el-option v-for="item in colorTypeOptions" :key="item.id" :label="item.labelDefault" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="采购单价" prop="purchasePrice">
								<el-input ref="purchasePrice" v-model="edit.modalForm.purchasePrice" :readonly="bReadonly"></el-input>
							</el-form-item>
							<el-form-item label="销售单价" prop="salesPrice">
								<el-input ref="salesPrice" v-model="edit.modalForm.salesPrice" :readonly="bReadonly"></el-input>
							</el-form-item>
							<el-form-item>
								<div v-if="!bReadonly" id="btnGroup">
									<el-button type="primary" size="medium" @click="ok()">确认</el-button>
									<el-button size="medium" @click.native="$router.back(-1)">取消</el-button>
								</div>
							</el-form-item>
						</el-col>
					</el-card>
				</el-col>
			</el-row>
		</el-form>
		<car-model-select v-on:close="_closeModal" :show-modal="showModal"></car-model-select>
	</el-container>
</template>
<script>
	import CommonApi from '@/api/common'
	import GoodsApi from '@/api/record/goods'
	import carModelSelect from '@/views/app/common/CarTypeModal'
	import { checkNumber } from '@/utils/rules'

	export default {
		name: 'goodsAdd',
		components: {
			'car-model-select': carModelSelect
		},
		data() {
			return {
				actionType: '',
				bReadonly: false,
				fullscreenLoading: false,
				showModal: false,
				driveTypeOptions: [],
				oilTypeOptions: [],
				colorTypeOptions: [],
				edit: {
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
							},
							{
								validator: checkNumber,
								trigger: 'blur'
							}
						],
						salesPrice: [{
								required: true,
								message: '请输入销售单价',
								trigger: 'change'
							},
							{
								validator: checkNumber,
								trigger: 'blur'
							}
						]
					}
				}
			}
		},
		created() {
			this.id = this.$route.query.id
			this.actionType = this.$route.query.type

			if (this.actionType) {
				if (this.actionType === 'edit') {
					this.$route.meta.title = '修改'
					this.edit.modalForm = Object.assign({}, this.$route.query.editObj)
				} else if (this.actionType === 'view') {
					this.$route.meta.title = '查看'
					this.edit.modalForm = Object.assign({}, this.$route.query.viewObj)
					this.bReadonly = true
				} else {
					this.$route.meta.title = '新增'
				}
			}
		},
		mounted() {
			this.getDict()
			this.$refs['dataForm'].resetFields()
		},
		methods: {
			getDict() {
				CommonApi.getDictByType('drive_type').then(data => {
					this.driveTypeOptions = data.rows
				})
				CommonApi.getDictByType('fuel_type').then(data => {
					this.oilTypeOptions = data.rows
				})
				CommonApi.getDictByType('car_color').then(data => {
					this.colorTypeOptions = data.rows
				})
			},
			ok() {
				this.$refs['dataForm'].validate((valid, obj) => {
					if (valid) {
						const method = this.actionType === 'edit' ? 'update' : 'add'
						const message = this.actionType === 'edit' ? '修改成功' : '创建成功'
						const arg = this.actionType === 'edit' ? [this.id, this.edit.modalForm] : [this.edit.modalForm]
						this.fullscreenLoading = true
						GoodsApi[method].apply(GoodsApi, arg).then(() => {
							this.fullscreenLoading = false
							this.$router.back(-1)
							this.$message({
								showClose: true,
								message: message,
								type: 'success'
							})
						}).catch(() => {
							this.fullscreenLoading = false
						})
					} else {
						this.fullscreenLoading = false
					}
				})
			},
			_selectVehicle() {
				this.showModal = true
			},
			_closeModal(data) {
				this.showModal = false
				if (data) {
					this.edit.modalForm.vehicleBrandId = data.vehicleBrandId
					this.edit.modalForm.vehicleSeriesId = data.vehicleSeriesId
					this.edit.modalForm.vehicleTypeId = data.vehicleTypeId
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>