<template>
	<el-container class="view-form">
		<el-form :rules="rules" class="wh" :model="row" label-width="220px" ref="form">
			<el-row type="flex" justify="center">
				<el-col :span="24" class="mb12">
					<el-card shadow="hover">
						<div slot="header">
							<span>基本信息</span>
						</div>
						<el-col :span="18" :offset="2">
							<el-form-item label="车牌号">
								{{ row.vehiclePlate }}
							</el-form-item>
							<el-form-item label="vin" prop="vin">
								<el-input ref="vin" v-model="row.vin" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="选择车型" required>
								<el-button style="width: 280px" @click="_selectVehicle">请选择车型</el-button>
							</el-form-item>
							<div v-if="row.vehicleBrandId !== ''">
								<el-form-item label="车辆品牌">
									{{ row.vehicleBrandId }}
								</el-form-item>
								<el-form-item label="车辆系列">
									{{ row.vehicleSeriesId }}
								</el-form-item>
								<el-form-item label="车辆类型">
									{{ row.vehicleTypeId }}
								</el-form-item>
							</div>
							<el-form-item label="公告型号" prop="publicityCode">
								<el-input ref="publicityCode" v-model="row.publicityCode" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="燃油类型">
								<el-select v-model="row.fuelTypeId" placeholder="燃油类型" clearable filterable>
									<el-option v-for="fuel_type in fuelTypes" :label="fuel_type.labelDefault" :value="fuel_type.id" :key="fuel_type.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="马力" prop="power">
								<el-input ref="power" v-model="row.power" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="驱动形式">
								<el-select v-model="row.driveType" placeholder="驱动形式" clearable filterable>
									<el-option v-for="mode in drivingModes" :label="mode.labelDefault" :value="mode.id" :key="mode.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="颜色" prop="vehicleColourId">
								<el-select v-model="row.colour" placeholder="颜色" filterable>
									<el-option v-for="color in colors" :label="color.labelDefault" :value="color.id" :key="color.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="选择挂靠公司" prop="companyId">
								<el-select ref="companyId" v-model="row.companyId" placeholder="挂靠公司" filterable>
									<el-option v-for="company in companies" :label="company.label" :value="company.code" :key="company.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="选择绑定车主" prop="ownerName">
								<el-select v-model="row.ownerId" placeholder="绑定车主" filterable>
									<el-option v-for="obj in carOwnerArr" :label="obj.ownerName" :value="obj.id" :key="obj.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-card>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :span="24">
					<el-card shadow="hover">
						<div slot="header">
							<span>认证信息</span>
						</div>
						<el-col :span="18" :offset="2">
							<el-form-item label="车辆合格证" prop="vehicleCertification">
								<el-input ref="vehicleCertification" v-model="row.vehicleCertification" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="合格证照片" required>
								<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
										:before-upload="_beforeUpload" :on-success="_uploadSucCertPic" :on-progress="_progress">
									<div class="img-hover" v-if="row.vehicleCertificationPic && row.vehicleCertificationPic !== ''">
										<img :src="row.vehicleCertificationPic" class="avatar-img" alt="合格证照片">
									</div>
									<i v-else class="el-icon-plus"></i>
								</el-upload>
								<div class="image-tip">合格证照片</div>
							</el-form-item>
							<el-form-item label="销售发票" prop="invoiceNumber">
								<el-input prop="invoiceNumber" v-model="row.invoiceNumber" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="销售发票照片" prop="invoice_pic">
								<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
										:before-upload="_beforeUpload" :on-success="_uploadSuinvoicePic" :on-progress="_progress">
									<div class="img-hover" v-if="row.invoicePic && row.invoicePic !== ''">
										<img :src="row.invoicePic" class="avatar-img" alt="销售发票照片">
									</div>
									<i v-else class="el-icon-plus"></i>
								</el-upload>
								<div class="image-tip">销售发票照片</div>
							</el-form-item>
							<el-form-item label="挂靠协议">
								<el-upload class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" :file-list="depPicArr"
										:before-upload="_beforeUpload" :on-success="_uploadSucDepPic" :on-progress="_progress" :on-remove="_removeDepPic" :limit="9" :on-exceed="_filesBeyond">
									<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>
							<el-form-item label="安全协议">
								<el-upload class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" :file-list="secPicArr"
										:before-upload="_beforeUpload" :on-success="_uploadSucSecPic" :on-progress="_progress" :on-remove="_removeSecPic" :limit="9" :on-exceed="_filesBeyond">
									<i class="el-icon-plus"></i>
								</el-upload>
							</el-form-item>
							<el-form-item>
								<el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" size="medium" @click.native="_ok('form')">确认</el-button>
								<el-button size="medium" @click.native="$router.back(-1)">取消</el-button>
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
import CarFileApi from '@/api/car/carFile'
import CommonApi from '@/api/common'
import CarOwnerApi from '@/api/car/carOwner'
import { validatImg } from '@/utils/validate'
import { checkString } from '@/utils/rules'
import carModelSelect from '@/views/app/common/CarTypeModal'

export default {
	components: {
		'car-model-select': carModelSelect
	},
	data() {
		return {
			id: '',
			pageType: '',
			finishUpload: true,
			fuelTypes: [],
			drivingModes: [],
			colors: [],
			companies: [],
			carOwnerArr: [],
			row: {
				vehiclePlate: '',
				vin: '',
				ownerId: '',
				ownerName: '',
				vehicleBrandId: '',
				vehicleSeriesId: '',
				vehicleTypeId: '',
				publicityCode: '',
				fuelTypeId: '',
				power: '',
				driveType: '',
				colour: '',
				companyId: '',
				vehicleCertification: '',
				vehicleCertificationPic: '',
				invoiceNumber: '',
				invoicePic: '',
				dependencePic: '',
				secureProtocolPic: ''
			},
			rules: {
				vin: [
					{ validator: checkString, trigger: 'change' },
					{ required: true, max: 17, min: 17, message: '请输入17位车辆vin号', trigger: 'change' }
				],
				publicityCode: [
					{ required: true, message: '请输入公告型号', trigger: 'change' },
					{ validator: checkString, trigger: 'change' }
				],
				power: this.RULE.illegalNumber,
				companyId: [{ required: true, message: '请选择挂靠公司', trigger: 'change' }],
				vehicleCertification: [
					{ required: true, message: '请输入车辆合格证', trigger: 'change' },
					{ validator: checkString, trigger: 'change' }
				],
				invoiceNumber: this.RULE.invoice
			},
			depPicArr: [],
			secPicArr: [],
			fullscreenLoading: false,
			showModal: false
		}
	},
	created() {
		this.id = this.$route.query.id
		this.pageType = this.$route.query.type
	},
	mounted() {
		if (this.pageType !== 'add') {
			this._detail(this.id)
			this.$route.meta.title = this.pageType === 'update' ? '修改' : '查看'
		} else {
			this.$route.meta.title = '新建'
		}
		this._getData()
	},
	methods: {
		_getData() {
//			CarOwnerApi.getList({ ownerCar: '2' }).then(data => {
			CarOwnerApi.getList().then(data => {
				this.carOwnerArr = data.rows
			})
			CommonApi.getDictByType('car_color').then(data => { //颜色
				this.colors = data.rows
			})
			CommonApi.getDictByType('drive_type').then(data => { //驱动
				this.drivingModes = data.rows
			})
			CommonApi.getDictByType('fuel_type').then(data => { //燃油
				this.fuelTypes = data.rows
			})
			CommonApi.getCompTree().then(data => { //燃油
//				console.info(data)
				this.companies = data
			})
		},
		_detail(id) {
			CarFileApi.getDetail(id).then(data => {
				if (data) {
					if (data.secureProtocolPic && data.secureProtocolPic !== '') {
						if (data.secureProtocolPic.indexOf(';') !== -1) {
							const arr = data.secureProtocolPic.split(';')
							arr.forEach((e, i) => {
								this.secPicArr.push({ uid: 'uid' + i, url: e })
							})
						} else {
							this.secPicArr.push({ uid: 'uid' + 1, url: data.secureProtocolPic })
						}
					}
					if (data.dependencePic && data.dependencePic !== '') {
						if (data.dependencePic.indexOf(';') !== -1) {
							const arr = data.dependencePic.split(';')
							arr.forEach((e, i) => {
								this.depPicArr.push({ uid: 'uid' + i, url: e })
							})
						} else {
							this.depPicArr.push({ uid: 'uid' + 1, url: data.dependencePic })
						}
					}
					this.row = data
				}
			})
		},
		_progress() {
			this.finishUpload = false
		},
		_beforeUpload(file) {
			return validatImg(file)
		},
		_uploadSucCertPic(res, file) {
			this.finishUpload = true
			if (res.status === 200) {
				this.row.vehicleCertificationPic = res.data.fullPath
			} else {
				this.row.vehicleCertificationPic = ''
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_uploadSuinvoicePic(res, file) {
			this.finishUpload = true
			if (res.status === 200) {
				this.row.invoicePic = res.data.fullPath
			} else {
				this.row.invoicePic = ''
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_uploadSucDepPic(res, file) {
			this.finishUpload = true
			if (res.status === 200) {
				this.depPicArr.push({ uid: file.uid, url: res.data.fullPath })
			} else {
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_uploadSucSecPic(res, file) {
			this.finishUpload = true
			if (res.status === 200) {
				this.secPicArr.push({ uid: file.uid, url: res.data.fullPath })
			} else {
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_filesBeyond() {
			this.$message.warning('最多可上传9张图片')
		},
		_removeDepPic(file) {
			this.depPicArr = this.depPicArr.filter(e => e.uid !== file.uid)
		},
		_removeSecPic(file) {
			this.secPicArr = this.secPicArr.filter(e => e.uid !== file.uid)
		},
		_ok(formName) {
			this.$refs[formName].validate((valid, obj) => {
				if (!this.finishUpload) {
					this.$message.error('请等待图片上传完成')
				}
				if (valid) {
					this.row.ownerName = this.row.ownerId
					if (this.row.vehicleTypeId === '' || this.row.vehicleBrandId === '' || this.row.vehicleSeriesId === '') {
						this.$message.error('请选择车辆类型')
						return
					}
					if (this.row.vehicleCertificationPic === '') {
						this.$message.error('请上传车辆合格证照片')
						return
					}
					this.row.dependencePic = ''
					this.row.secureProtocolPic = ''
					this.depPicArr.forEach(e => {
						this.row.dependencePic += e.url + ';'
					})
					this.secPicArr.forEach(e => {
						this.row.secureProtocolPic += e.url + ';'
					})
					this.row.dependencePic = this.row.dependencePic.substring(0, this.row.dependencePic.length - 1)
					this.row.secureProtocolPic = this.row.secureProtocolPic.substring(0, this.row.secureProtocolPic.length - 1)
					const method = this.pageType === 'update' ? 'update' : 'add'
					const message = this.pageType === 'update' ? '修改成功' : '创建成功'
					const arg = this.pageType === 'update' ? [this.id, this.row] : [this.row]
					this.fullscreenLoading = true
					CarFileApi[method].apply(CarFileApi, arg).then(() => {
						this.fullscreenLoading = false
						this.$router.back(-1)
						this.$message({ showClose: true, message: message, type: 'success' })
					}).catch(() => {
						this.fullscreenLoading = false
					})
				} else {
					this.$refs[Object.keys(obj)[0]].focus()
				}
			})
		},
		_selectVehicle() {
			this.showModal = true
		},
		_closeModal(data) {
			this.showModal = false
			if (data) {
				this.row.vehicleBrandId = data.vehicleBrandId
				this.row.vehicleSeriesId = data.vehicleSeriesId
				this.row.vehicleTypeId = data.vehicleTypeId
			}
		}
	}
}
</script>

<style lang="scss" scoped>

</style>