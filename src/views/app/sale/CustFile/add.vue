<template>
	<el-container class="view-form">
		<el-form :rules="rules" class="wh" label-width="220px" :model="row" ref="form">
			<el-row type="flex" justify="center">
				<el-col :span="24" class="mb12">
					<el-card shadow="hover">
						<div slot="header">
							<span>基本信息</span>
						</div>
						<el-col :span="18" :offset="2">
							<el-form-item label="客户类型">
								<el-radio-group v-model="custType" @change="_handleRadioChange">
									<el-radio label="0">个人</el-radio>
									<el-radio label="1">公司</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="客户名称" prop="custName">
								<el-input ref="custName" v-model="row.custName"></el-input>
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
				<el-col :span="24">
					<el-card shadow="hover">
						<div slot="header">
							<span>认证信息</span>
						</div>
						<el-col :span="18" :offset="2">
							<div v-if="c_isPerOrCom">
								<el-form-item label="身份证号" prop="idCard">
									<el-input ref="idCard" v-model="row.idCard" @blur="_birthForIdCard(row.idCard)"></el-input>
								</el-form-item>
								<el-form-item label="出生日期">{{ birthDate }}</el-form-item>
								<el-form-item label="身份证照片" required>
									<el-col :span="12">
										<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
											:before-upload="_beforeUpload" :on-success="_uploadSucFrontPic" :on-progress="_progress">
											<div class="img-hover" v-if="row.idCardFrontPic !== ''">
												<img :src="row.idCardFrontPic" class="avatar-img" alt="身份证正面照">
											</div>
											<i v-else class="el-icon-plus"></i>
										</el-upload>
										<div class="image-tip">身份证正面照</div>
									</el-col>
									<el-col :span="12">
										<el-upload :show-file-list="false" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" 
											:before-upload="_beforeUpload" :on-success="_uploadSucBackPic" :on-progress="_progress">
											<div class="img-hover" v-if="row.idCardBackPic !== ''">
												<img :src="row.idCardBackPic" class="avatar-img" alt="身份证反面照">
											</div>
											<i v-else class="el-icon-plus"></i>
										</el-upload>
										<div class="image-tip">身份证反面照</div>
									</el-col>
								</el-form-item>
								<el-form-item label="户口本户号" prop="householdRegisterNumber">
									<el-input ref="householdRegisterNumber" v-model="row.householdRegisterNumber"></el-input>
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
							</div>
							<el-form-item>
								<el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" size="medium" @click.native="_ok('form')">确认</el-button>
								<el-button size="medium" @click.native="$router.back(-1)">取消</el-button>
							</el-form-item>
						</el-col>
					</el-card>
				</el-col>
			</el-row>
		</el-form>				
	</el-container>
</template>

<script>
import CustormFileApi from '@/api/sale/customer'
import { validatImg } from '@/utils/validate'
import { checkString, checkPhone, checkFixedPhone, checkCreditCode } from '@/utils/rules'
import { birthForIdCard } from '@/utils'

export default {
	data() {
		return {
			id: '',
			pageType: '',
			finishUpload: true,
			custType: '',
			fullscreenLoading: false,
			birthDate: '',
			row: {
				sex: '1',
				idCard: '',
				idCardFrontPic: '',
				idCardBackPic: '',
				householdRegisterNumber: '',
				householdRegisterPic: '',
				origin: '', //籍贯（个人）
				contactName: '', //公司
				businessLicensePic: '', //公司营业执照照片（公司）
				unifiedSocialCreditCode: '', //统一社会信用代码（公司）
				custName: '',
				contactPhone: '',
				fixedLineNumber: '',
				address: '', //家庭住址/公司住址
				emergencyContractPerson: '',
				emergencyContractPhone: '',
				emergencyContractAddress: ''
			},
			rules: {
				custName: [
					{ required: true, message: '请输入客户名称', trigger: 'change' },
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
				address: this.RULE.illegalString,
				origin: this.RULE.illegalString,
				emergencyContractPerson: this.RULE.illegalString,
				idCard: this.RULE.idCard,
				householdRegisterNumber: this.RULE.illegalNumber,
				fixedLineNumber: [{ required: false, validator: checkFixedPhone, trigger: 'change' }],
				emergencyContractPhone: [{ required: false, validator: checkPhone, trigger: 'change' }],
				emergencyContractAddress: this.RULE.illegalString,
				unifiedSocialCreditCode: [
					{ validator: checkCreditCode, trigger: 'change' }
				]
			}
		}
	},
	mounted() {
		this.pageType = this.$route.query.type
		this.id = this.$route.query.id
		if (this.pageType !== 'add') {
			this._getDetail(this.id)
			this.$route.meta.title = this.pageType === 'update' ? '修改' : '查看'
		} else {
			this.custType = '0'
			this.$route.meta.title = '新建'
		}
	},
	methods: {
		_handleRadioChange() {
			this._reset()
			this.$nextTick(() => {
				this.$refs.form.clearValidate()
			})
		},
		_reset() {
			this.birthDate = ''
			this.row = {
				sex: '1',
				idCard: '',
				idCardFrontPic: '',
				idCardBackPic: '',
				householdRegisterNumber: '',
				householdRegisterPic: '',
				origin: '', //籍贯（个人）
				contactName: '', //公司
				businessLicensePic: '', //公司营业执照照片（公司）
				unifiedSocialCreditCode: '', //统一社会信用代码（公司）
				custName: '',
				contactPhone: '',
				fixedLineNumber: '',
				address: '', //家庭住址/公司住址
				emergencyContractPerson: '',
				emergencyContractPhone: '',
				emergencyContractAddress: ''
			}
		},
		_getDetail(id) {
			CustormFileApi.getDetail(id).then(data => {
				if (data) {
					this.custType = data.custType.toString()
					if (this.custType !== '1') {
						data.sex = data.sex.toString()
					}
					this.row = data
					this._birthForIdCard(data.idCard)
					this.$nextTick(() => {
						this.$refs.form.clearValidate()
					})
				}
			})
		},
		_ok(formName) {
			this.$refs[formName].validate((valid, obj) => {
				if (valid) {
					if (!this.finishUpload) {
						this.$message.error('请等待图片上传完成')
						return
					}
					if (this.custType === '0') {						
						if (this.row.idCardFrontPic === '') {
							this.$message.error('请上传身份证正面照片')
							return
						}
						if (this.row.idCardBackPic === '') {
							this.$message.error('请上传身份证正背面照片')
							return
						}
					}
					const method = this.pageType === 'update' ? 'update' : 'add'
					const message = this.pageType === 'update' ? '修改成功' : '创建成功'
					const arg = this.pageType === 'update' ? [this.id, this.row] : [this.row]
					this.fullscreenLoading = true
					this.row.custType = this.custType
					CustormFileApi[method].apply(CustormFileApi, arg).then(() => {
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
		_birthForIdCard(str) {
			this.birthDate = birthForIdCard(str || '')
		}
	},
	computed: {
		c_isPerOrCom() {
			return this.custType === '0'
		}
	}
}
</script>