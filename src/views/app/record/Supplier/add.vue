<template>
	<el-container class="view-form">
		<el-form class="wh" :rules="rules" label-width="220px" :model="row" ref="dataForm">
			<el-row type="flex" justify="center">
				<el-col :span="24" class="mb12">
					<el-card shadow="hover">
						<div slot="header">
							<span>基本信息</span>
						</div>
						<el-col :span="12" :offset="2">
							<el-form-item label="供应商名称" prop="supplierName">
								<el-input v-model="row.supplierName" ref="supplierName" :readonly="bReadonly"></el-input>
							</el-form-item>
							<el-form-item label="供应商类型" prop="supplierType">
								<el-select class="filter-item" v-model="row.supplierType" placeholder="请选择" :disabled="bReadonly">
									<el-option v-for="item in supplierTypeOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="联系人" prop="contactName">
								<el-input v-model="row.contactName" ref="contactName" :readonly="bReadonly"></el-input>
							</el-form-item>
							<el-form-item label="移动电话" prop="contactPhone">
								<el-input v-model="row.contactPhone" ref="contactPhone" :readonly="bReadonly"></el-input>
							</el-form-item>
							<el-form-item label="地址" prop="address">
								<el-input v-model="row.address" ref="address" :readonly="bReadonly"></el-input>
							</el-form-item>
							<el-form-item label="收款银行" prop="bankName">
								<el-input v-model="row.bankName" ref="bankName" :readonly="bReadonly"></el-input>
							</el-form-item>
							<el-form-item label="收款账号" prop="bankAccount">
								<el-input v-model="row.bankAccount" ref="bankAccount" :readonly="bReadonly"></el-input>
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
						<el-col :span="12" :offset="2">
							<el-form-item label="统一社会信用代码">
								<el-input v-model="row.unifiedSocialCreditCode" :readonly="bReadonly"></el-input>
							</el-form-item>
							<el-form-item label="营业执照照片">
								<el-upload :show-file-list="false" :disabled="bReadonly" class="img-box" :action="this.UPLOAD_URL" list-type="picture-card" :before-upload="_beforeUpload" :on-success="_uploadSucSocialPic" :on-progress="_progress">
									<div v-if="row.businessPicture && row.businessPicture !== ''" class="img-hover">
										<img :src="row.businessPicture" class="avatar-img" alt="营业执照">
									</div>
									<div v-else class="img-hover">
										<i class="el-icon-plus"></i>
									</div>
								</el-upload>
							</el-form-item>
							<el-form-item>
								<div v-if="bShowBtn" id="btnGroup">
									<el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" size="medium" @click.native="ok('form')">确认</el-button>
									<el-button size="medium" @click.native="$router.back(-1)">取消</el-button>
								</div>
							</el-form-item>
						</el-col>
					</el-card>
				</el-col>
			</el-row>

		</el-form>
	</el-container>
</template>
<script>
	import SupplierApi from '@/api/record/supplier'
	import { validatImg } from '@/utils/validate'
	import { checkString, checkPhone } from '@/utils/rules'

	const supplierTypeOptions = [{
		key: '0',
		val: '车辆销售方'
	}]
	export default {
		name: 'supplierAdd',
		watch: {

		},
		data() {
			return {
				row: {
					supplierName: '',
					supplierType: '',
					contactName: '',
					contactNumber: '',
					address: '',
					bankName: '',
					bankAccount: '',
					unifiedSocialCreditCode: '',
					businessPicture: '' //公司营业执照照片（公司）
				},
				supplierTypeOptions,
				rules: {
					supplierName: [{
							required: true,
							message: '供应商不能为空',
							trigger: 'blur'
						},
						{
							validator: checkString,
							trigger: 'blur'
						}
					],
					supplierType: [{
							required: true,
							message: '类型不能为空',
							trigger: 'change'
						},
						{
							validator: checkString,
							trigger: 'blur'
						}
					],
					contactName: [{
							required: true,
							message: '联系人不能为空',
							trigger: 'blur'
						},
						{
							validator: checkString,
							trigger: 'blur'
						}
					],
					contactPhone: [{
							required: true,
							message: '联系电话不能为空',
							trigger: 'blur'
						},
						{
							validator: checkPhone,
							trigger: 'blur'
						}
					],
					address: [{
							required: true,
							message: '地址不能为空',
							trigger: 'blur'
						},
						{
							validator: checkString,
							trigger: 'blur'
						}
					]
				},
				actionType: 'add',
				bReadonly: false,
				bVisibleBtn: true,
				downloadLoading: false,
				finishUpload: true,
				fullscreenLoading: false,
				bShowBtn: true
			}
		},
		mounted() {
			this.id = this.$route.query.id
			this.actionType = this.$route.query.type
			if (this.id && this.id !== '') {
				this.getSupplier(this.id)
			}
			if (this.actionType) {
				if (this.actionType === 'edit') {
					this.$route.meta.title = '修改'
				} else {
					this.$route.meta.title = '查看'
					this.bReadonly = true
					this.bShowBtn = false
				}
			} else {
				this.$route.meta.title = '新增'
			}
		},
		methods: {
			fetchData() {

			},
			getSupplier(id) {
				SupplierApi.getDetail(id).then(data => {
					this.row = data
				})
			},
			ok() {
				this.$refs['dataForm'].validate((valid, obj) => {
					if (!this.finishUpload) {
						this.$message.error('请等待图片上传完成')
					}
					if (valid) {
						const method = this.actionType === 'edit' ? 'update' : 'add'
						const message = this.actionType === 'edit' ? '修改成功' : '创建成功'
						const arg = this.actionType === 'edit' ? [this.id, this.row] : [this.row]
						this.fullscreenLoading = true
						SupplierApi[method].apply(SupplierApi, arg).then(() => {
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
			_uploadSucSocialPic(res) {
				this.finishUpload = true
				if (res.status === 200) {
					this.row.businessPicture = res.data.fullPath
				} else {
					this.row.businessPicture = ''
					this.$message.error('网络服务异常，文件上传失败')
				}
			}
		}
	}
</script>

<style lang="scss" scoped></style>