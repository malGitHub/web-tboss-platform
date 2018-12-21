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
							<el-form-item label="客户类型">
								<el-radio-group v-model="ownerType" @change="_handleRadioChange">
									<el-radio label="0">个人车主</el-radio>
									<el-radio label="1">公司车主</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="车主名称" prop="ownerName">
								<el-input ref="ownerName"v-model="row.ownerName" auto-complete="off"></el-input>
							</el-form-item>
							<div v-if='c_isPerOrCom'>
								<el-form-item label="性别">
									<el-radio-group v-model="row.sex">
										<el-radio label="1">男</el-radio>
										<el-radio label="0">女</el-radio>
									</el-radio-group>
								</el-form-item>
							</div>
							<div v-else>
								<el-form-item label="联系人" prop="contactName">
									<el-input ref="contactName" v-model="row.contactName"></el-input>
								</el-form-item>
							</div>
							<el-form-item label="移动电话" prop="contactPhone">
								<el-input ref="contactPhone" v-model="row.contactPhone"></el-input>
							</el-form-item>
							<el-form-item label="固定电话" prop="fixedLineNumber">
								<el-input ref="fixedLineNumber" v-model="row.fixedLineNumber"></el-input>
							</el-form-item>
							<el-form-item :label="c_isPerOrCom ? '家庭住址' : '公司住址'" prop="address">
								<el-input ref="address" v-model="row.address"></el-input>
							</el-form-item>
							<el-form-item v-if='c_isPerOrCom' label="籍贯" prop="origin">
								<el-input ref="origin" v-model="row.origin"></el-input>
							</el-form-item>
							<el-form-item label="紧急联系人" prop="emergencyContractPerson">
								<el-input ref="emergencyContractPerson" v-model="row.emergencyContractPerson"></el-input>
							</el-form-item>
							<el-form-item label="紧急联系方式" prop="emergencyContractPhone">
								<el-input ref="emergencyContractPhone" v-model="row.emergencyContractPhone"></el-input>
							</el-form-item>
							<el-form-item label="紧急联系人地址" prop="emergencyContractAddress">
								<el-input ref="emergencyContractAddress" v-model="row.emergencyContractAddress"></el-input>
							</el-form-item>
						</el-col>
					</el-card>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :span="24" class="mb12">
					<el-card shadow="hover">
						<div slot="header">
							<span>认证信息</span>
						</div>
						<el-col :span="18" :offset="2">
							<div v-if="c_isPerOrCom">
								<el-form-item label="身份证号" prop="idCard">
									<el-input ref="idCard" v-model="row.idCard" @blur="_birthForIdCard(row.idCard)" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="出生日期">{{ birthDate }}</el-form-item>
								<el-form-item label="身份证照片" required>
									<el-col :span="12">
										<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
											:before-upload="_beforeUpload" :on-success="_uploadSucFrontPic" :on-progress="_progress">
											<div class="img-hover" v-if="row.idCardFrontPic && row.idCardFrontPic !== ''">
												<img :src="row.idCardFrontPic" class="avatar-img" alt="身份证正面照">
											</div>
											<i v-else class="el-icon-plus"></i>
										</el-upload>
										<div class="image-tip">身份证正面照</div>
									</el-col>
									<el-col :span="12">
										<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
											:before-upload="_beforeUpload" :on-success="_uploadSucBackPic" :on-progress="_progress">
											<div class="img-hover" v-if="row.idCardBackPic && row.idCardBackPic !== ''">
												<img :src="row.idCardBackPic" class="avatar-img" alt="身份证反面照">
											</div>
											<i v-else class="el-icon-plus"></i>
										</el-upload>
										<div class="image-tip">身份证反面照</div>
									</el-col>
								</el-form-item>
								<el-form-item label="户口本户号" prop="householdRegisterNumber">
									<el-input ref="householdRegisterNumber" v-model="row.householdRegisterNumber" auto-complete="off"></el-input>
								</el-form-item>
								<el-form-item label="户口本照片">
									<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
											:before-upload="_beforeUpload" :on-success="_uploadSucHousePic" :on-progress="_progress">
										<div class="img-hover" v-if="row.householdRegisterPic && row.householdRegisterPic !== ''">
											<img :src="row.householdRegisterPic" class="avatar-img" alt="户口本照片">
										</div>
										<i v-else class="el-icon-plus"></i>
									</el-upload>
									<div class="image-tip">户口本照片</div>
								</el-form-item>
							</div>
							<div v-else>
								<el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode">
									<el-input ref="unifiedSocialCreditCode" v-model="row.unifiedSocialCreditCode"></el-input>
								</el-form-item>
								<el-form-item label="营业执照照片">
									<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
											:before-upload="_beforeUpload" :on-success="_uploadSucSocialPic" :on-progress="_progress">
										<div class="img-hover" v-if="row.businessLicensePic && row.businessLicensePic !== ''">
											<img :src="row.businessLicensePic" class="avatar-img" alt="营业执照照片">
										</div>
										<i v-else class="el-icon-plus"></i>
									</el-upload>
									<div class="image-tip">营业执照照片</div>
								</el-form-item>
								<el-form-item v-if="pageType === 'add'">
									<el-button class="operat-btn" v-loading.fullscreen.lock="fullscreenLoading" type="primary" size="medium" @click.native="_ok('form')">确认</el-button>
									<el-button class="operat-btn" size="medium" @click.native="$router.back(-1)">取消</el-button>
								</el-form-item>
							</div>
						</el-col>
					</el-card>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center" v-if="c_isPerOrCom">
				<el-col :span="24" class="mb12">
					<el-card shadow="hover">
						<div slot="header">
							<span>从业资格信息</span>
						</div>
						<el-col :span="18" :offset="2">
							<!--<el-col :span="24" class="form-inline-layout">
								<el-col :span="12">
									<el-form-item label="驾驶证号" prop="drivingLicence">
										<el-input ref="drivingLicence" v-model="row.drivingLicence" auto-complete="off"></el-input>
									</el-form-item>	
								</el-col>
								<el-col :span="12">
									<el-form-item label="驾驶证日期">									
										<el-date-picker v-model="row.drivingLicencePeriod" align="right" type="date" value-format="yyyy-MM-dd" placeholder="驾驶证日期"></el-date-picker>
									</el-form-item>
								</el-col>
							</el-col>-->
							<el-form-item label="驾驶证号" prop="drivingLicence" class="form-inline-layout">
								<el-input ref="drivingLicence" v-model="row.drivingLicence" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="驾驶证日期" class="form-inline-layout"s>									
								<el-date-picker v-model="row.drivingLicencePeriod" align="right" type="date" value-format="yyyy-MM-dd" placeholder="驾驶证日期"></el-date-picker>
							</el-form-item>
							
							<el-form-item label="准驾车型">
								<el-select v-model="row.permittedDrivingTypeId" placeholder="准驾车型" clearable filterable>
									<el-option v-for="fuel_type in permitDrivArr" :label="fuel_type.labelDefault" :value="fuel_type.id" :key="fuel_type.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="驾驶证照片">
								<el-col :span="12">
									<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
										:before-upload="_beforeUpload" :on-success="_uploadSucDlFrontPic" :on-progress="_progress">
										<div class="img-hover" v-if="row.drivingLicenceFrontPic && row.drivingLicenceFrontPic !== ''">
											<img :src="row.drivingLicenceFrontPic" class="avatar-img" alt="驾驶证照片正面">
										</div>
										<i v-else class="el-icon-plus"></i>
									</el-upload>
									<div class="image-tip">驾驶证照片正面</div>
								</el-col>
								<el-col :span="12">
									<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
										:before-upload="_beforeUpload" :on-success="_uploadSucDlBackPic" :on-progress="_progress">
										<div class="img-hover" v-if="row.drivingLicenceBackPic && row.drivingLicenceBackPic !== ''">
											<img :src="row.drivingLicenceBackPic" class="avatar-img" alt="驾驶证照片反面">
										</div>
										<i v-else class="el-icon-plus"></i>
									</el-upload>
									<div class="image-tip">驾驶证照片反面</div>
								</el-col>
							</el-form-item>
							<el-col :span="12">
								<el-form-item label="从业资格证号" prop="qualificationCertificate">
									<el-input ref="qualificationCertificate" v-model="row.qualificationCertificate" auto-complete="off"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="驾驶证期限">									
									<el-date-picker v-model="row.qualificationCertificatePeriod" align="right" type="date" value-format="yyyy-MM-dd" placeholder="驾驶证期限"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-form-item label="从业资格证号照片">
								<el-col :span="12">
									<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
										:before-upload="_beforeUpload" :on-success="_uploadSucQuaFrontPic" :on-progress="_progress">
										<div class="img-hover" v-if="row.qualificationCertificateFrontPic && row.qualificationCertificateFrontPic !== ''">
											<img :src="row.qualificationCertificateFrontPic" class="avatar-img" alt="驾驶证照片正面">
										</div>
										<i v-else class="el-icon-plus"></i>
									</el-upload>
									<div class="image-tip">从业资格证号照片正面</div>
								</el-col>
								<el-col :span="12">
									<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
										:before-upload="_beforeUpload" :on-success="_uploadSucQuaBackPic" :on-progress="_progress">
										<div class="img-hover" v-if="row.qualificationCertificateBackPic && row.qualificationCertificateBackPic !== ''">
											<img :src="row.qualificationCertificateBackPic" class="avatar-img" alt="驾驶证照片反面">
										</div>
										<i v-else class="el-icon-plus"></i>
									</el-upload>
									<div class="image-tip">从业资格证号照片反面</div>
								</el-col>
							</el-form-item>
							<el-form-item v-if="pageType === 'add'">
								<el-button class="operat-btn" v-loading.fullscreen.lock="fullscreenLoading" type="primary" size="medium" @click.native="_ok('form')">确认</el-button>
								<el-button class="operat-btn" size="medium" @click.native="$router.back(-1)">取消</el-button>
							</el-form-item>
						</el-col>
					</el-card>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center" v-if="pageType !== 'add'">
				<el-col :span="24" class="mb12">
					<el-card shadow="hover">
						<div slot="header">
							<span>名下车辆列表</span>
						</div>
						<el-col :span="24">
							<el-table :data="list" border border fit highlight-current-row class="wh mb12">
								<el-table-column align="center" width="60" label="序号" fixed>
									<template slot-scope="scope">{{scope.$index + 1}}</template>
								</el-table-column>
								<el-table-column align="center" prop="vehiclePlate" width="120" label="车牌号" fixed />
								<el-table-column align="center" prop="vin" width="220" label="vin号" fixed />
								<el-table-column align="center" prop="companyId" width="150" label="颜色" />
								<el-table-column align="center" prop="companyId" min-width="220" label="挂靠公司" />
								<el-table-column align="center" prop="crtTime" width="160" label="加入时间" />
								<el-table-column align="center" label="操作" width="240" fixed="right">
									<template slot-scope="scope">
										<el-button type="danger"  size="mini" @click="_del(scope.row.id)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
							<el-pagination background :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" 
								:total="total" @size-change="_handleSizeChange" @current-change="_handleCurrentChange" 
								layout="total, sizes, prev, pager, next, jumper"></el-pagination>
						</el-col>
						<el-form-item class="mb5" style="margin-left: 180px">
							<el-button class="operat-btn mt25" v-loading.fullscreen.lock="fullscreenLoading" type="primary" size="medium" @click.native="_ok('form')">确认</el-button>
							<el-button class="operat-btn mt25" size="medium" @click.native="$router.back(-1)">取消</el-button>
						</el-form-item>
					</el-card>
				</el-col>
			</el-row>
		</el-form>
	</el-container>
</template>
<script>
import CarOwnerApi from '@/api/car/carOwner'
import CarFileApi from '@/api/car/carFile'
import CommonApi from '@/api/common'
import { validatImg } from '@/utils/validate'
import { birthForIdCard } from '@/utils'
import { checkString, checkPhone, checkFixedPhone, checkCreditCode } from '@/utils/rules'

export default {
	name: 'carOwnerAdd',
	data() {
		return {
			id: '',
			pageType: '',
			ownerType: '',
			finishUpload: true,
			fullscreenLoading: false,
			permitDrivArr: [],
			birthDate: '',
			row: {
				sex: '1',
				ownerName: '',
				contactName: '',
				contactPhone: '',
				fixedLineNumber: '',
				address: '',
				idCard: '',
				drivingLicence: '',
				origin: '',
				householdRegisterNumber: '',
				unifiedSocialCreditCode: '',
				emergencyContractPerson: '',
				emergencyContractPhone: '',
				emergencyContractAddress: '',
				idCardFrontPic: '',
				idCardBackPic: '',
				drivingLicenceFrontPic: '',
				drivingLicenceBackPic: '',
				householdRegisterPic: '',
				businessLicensePic: '',
				drivingLicencePeriod: '',
				permittedDrivingTypeId: '',
				qualificationCertificate: '',
				qualificationCertificatePeriod: '',
				qualificationCertificateBackPic: '',
				qualificationCertificateFrontPic: ''
			},
			list: [],
			total: 0,
			listQuery: {
				page: 1,
				limit: 10
			},
			rules: {
				ownerName: [
					{ required: true, message: '请输入车主名称', trigger: 'change' },
					{ validator: checkString, trigger: 'change' }
				],
				contactName: [
					{ required: true, message: '请输入联系人', trigger: 'change' },
					{ validator: checkString, trigger: 'change' }
				],
				contactPhone: [
					{ required: true, message: '请输入移动电话', trigger: 'change' },
					{ validator: checkPhone, trigger: 'change' }
				],
				fixedLineNumber: [
					{ required: false, validator: checkFixedPhone, trigger: 'change' }
				],
				address: [
					{ required: true, message: this.c_isPerOrCom ? '请输入家庭住址' : '请输入公司住址', trigger: 'change' },
					{ validator: checkString, trigger: 'change' }
				],
				origin: [
					{ required: true, message: '请输入籍贯', trigger: 'change' },
					{ validator: checkString, trigger: 'change' }
				],
				emergencyContractPerson: [
					{ required: true, message: '请输入紧急联系人', trigger: 'change' },
					{ validator: checkString, trigger: 'change' }
				],
				emergencyContractPhone: [
					{ required: true, message: '请输入紧急移动电话', trigger: 'change' },
					{ validator: checkPhone, trigger: 'change' }
				],
				emergencyContractAddress: [
					{ required: true, message: '紧急联系人地址', trigger: 'change' },
					{ validator: checkString, trigger: 'change' }
				],
				idCard: this.RULE.idCard,
				householdRegisterNumber: this.RULE.illegalNumber,
				unifiedSocialCreditCode: [
					{ validator: checkCreditCode, trigger: 'change' }
				],
				drivingLicence: this.RULE.illegalNumber,
				qualificationCertificate: this.RULE.illegalNumber
			}
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
			this.ownerType = '0'
		}
		this._getData()
	},
	methods: {
		_getData() {
			CommonApi.getDictByType('allowed_type').then(data => { //燃油
				this.permitDrivArr = data.rows
			})
		},
		_reset() {
			this.birthDate = ''
			this.row = {
				sex: '1',
				ownerName: '',
				contactName: '',
				contactPhone: '',
				fixedLineNumber: '',
				address: '',
				idCard: '',
				drivingLicence: '',
				origin: '',
				householdRegisterNumber: '',
				unifiedSocialCreditCode: '',
				emergencyContractPerson: '',
				emergencyContractPhone: '',
				emergencyContractAddress: '',
				idCardFrontPic: '',
				idCardBackPic: '',
				drivingLicenceFrontPic: '',
				drivingLicenceBackPic: '',
				householdRegisterPic: '',
				businessLicensePic: '',
				drivingLicencePeriod: '',
				permittedDrivingTypeId: '',
				qualificationCertificate: '',
				qualificationCertificatePeriod: '',
				qualificationCertificateBackPic: '',
				qualificationCertificateFrontPic: ''
			}
		},
		_handleRadioChange() {
			this._reset()
			this.$nextTick(() => {
				this.$refs.form.clearValidate()
			})
		},
		_detail(id) {
			CarOwnerApi.getDetail(id).then(data => {
				this.row = data
				this.ownerType = data.ownerType
				this.listQuery.ownerName = this.row.ownerName
				this._birthForIdCard(this.row.idCard)
				this._query()
			})
		},
		_query() {
			CarFileApi.getList(this.listQuery).then(data => {
				this.list = data.rows
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
		_progress() {
			this.finishUpload = false
		},
		_beforeUpload(file) {
			return validatImg(file)
		},
		_uploadSucFrontPic(res) {
			this.finishUpload = true
			if (res.status === 200) {
				this.row.idCardFrontPic = res.data.fullPath
			} else {
				this.row.idCardFrontPic = ''
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_uploadSucBackPic(res) {
			this.finishUpload = true
			if (res.status === 200) {
				this.row.idCardBackPic = res.data.fullPath
			} else {
				this.row.idCardBackPic = ''
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_uploadSucHousePic(res) {
			this.finishUpload = true
			if (res.status === 200) {
				this.row.householdRegisterPic = res.data.fullPath
			} else {
				this.row.householdRegisterPic = ''
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_uploadSucSocialPic(res) {
			this.finishUpload = true
			if (res.status === 200) {
				this.row.businessLicensePic = res.data.fullPath
			} else {
				this.row.businessLicensePic = ''
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_uploadSucDlFrontPic(res) {
			this.finishUpload = true
			if (res.status === 200) {
				this.row.drivingLicenceFrontPic = res.data.fullPath
			} else {
				this.row.drivingLicenceFrontPic = ''
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_uploadSucDlBackPic(res) {
			this.finishUpload = true
			if (res.status === 200) {
				this.row.drivingLicenceBackPic = res.data.fullPath
			} else {
				this.row.drivingLicenceBackPic = ''
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_uploadSucQuaFrontPic(res) {
			this.finishUpload = true
			if (res.status === 200) {
				this.row.qualificationCertificateFrontPic = res.data.fullPath
			} else {
				this.row.qualificationCertificateFrontPic = ''
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_uploadSucQuaBackPic(res) {
			this.finishUpload = true
			if (res.status === 200) {
				this.row.qualificationCertificateBackPic = res.data.fullPath
			} else {
				this.row.qualificationCertificateBackPic = ''
				this.$message.error('网络服务异常，文件上传失败')
			}
		},
		_birthForIdCard(str = '') {
			this.birthDate = birthForIdCard(str)
		},
		_ok(formName) {
			this.$refs[formName].validate((valid, obj) => {
				if (!this.finishUpload) {
					this.$message.error('请等待图片上传完成')
				}
				if (this.ownerType === '0') {						
					if (this.row.idCardFrontPic === '') {
						this.$message.error('请上传身份证正面照片')
						return
					}
					if (this.row.idCardBackPic === '') {
						this.$message.error('请上传身份证正背面照片')
						return
					}
				}
				if (valid) {
					this.row.ownerType = this.ownerType
					const method = this.pageType === 'update' ? 'update' : 'add'
					const message = this.pageType === 'update' ? '修改成功' : '创建成功'
					const arg = this.pageType === 'update' ? [this.id, this.row] : [this.row]
					this.fullscreenLoading = true
					CarOwnerApi[method].apply(CarOwnerApi, arg).then(() => {
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
		}
	},
	computed: {
		c_isPerOrCom() {
			return this.ownerType === '0'
		}
	}
}
</script>

<style lang="scss">
.image-tip {
	font-size: 12px;
}
</style>