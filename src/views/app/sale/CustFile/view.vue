<template>
	<el-container class="view-form">
		<el-form class="wh" label-width="220px" :model="row" ref="form">
			<el-row type="flex" justify="center">
				<el-col :span="24" class="mb12">
					<el-card shadow="hover">
						<div slot="header">
							<span>基本信息</span>
						</div>
						<el-col :span="18" :offset="2">
							<el-form-item label="客户类型">{{ custType === '0' ? '个人' : '公司' }}</el-form-item>
							<el-form-item label="客户名称">{{ row.custName }}</el-form-item>
							<div v-if='c_isPerOrCom'>
								<el-form-item label="性别">{{ row.sex === '0' ? '女' : '男' }}</el-form-item>
							</div>
							<div v-else>
								<el-form-item label="联系人">{{ row.contactName }}</el-form-item>
							</div>
							<el-form-item label="移动电话">{{ row.contactPhone }}</el-form-item>
							<el-form-item label="固定电话">{{ row.fixedLineNumber }}</el-form-item>
							<el-form-item :label="c_isPerOrCom ? '家庭住址' : '公司住址'">{{ row.address }}</el-form-item>
							<el-form-item v-if='c_isPerOrCom' label="籍贯">{{ row.origin }}</el-form-item>
							<el-form-item label="紧急联系人">{{ row.emergencyContractPerson }}</el-form-item>
							<el-form-item label="紧急联系方式">{{ row.emergencyContractPhone }}</el-form-item>
							<el-form-item label="紧急联系人地址">{{ row.emergencyContractAddress }}</el-form-item>
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
								<el-form-item label="身份证号">{{ row.idCard }}</el-form-item>
								<el-form-item label="出生日期">{{ birthDate }}</el-form-item>
								<el-form-item label="身份证照片">
									<el-col :span="12">
										<img :src="row.idCardFrontPic" class="avatar-img" alt="身份证正面照">
										<div class="image-tip">身份证正面照</div>
									</el-col>
									<el-col :span="12">
										<img :src="row.idCardBackPic" class="avatar-img" alt="身份证反面照">
										<div class="image-tip">身份证反面照</div>
									</el-col>
								</el-form-item>
								<el-form-item label="户口本户号">{{ row.householdRegisterNumber }}</el-form-item>
								<el-form-item label="户口本照片">
									<img v-if="row.householdRegisterPic" :src="row.householdRegisterPic" class="avatar-img" alt="户口本照片">
									<div class="image-tip">户口本照片</div>
								</el-form-item>
							</div>
							<div v-else>
								<el-form-item label="统一社会信用代码">{{ row.unifiedSocialCreditCode }}</el-form-item>
								<el-form-item label="营业执照照片">
									<img v-if="row.businessLicensePic" :src="row.businessLicensePic" class="avatar-img" alt="营业执照照片">
									<div class="image-tip">营业执照照片</div>
								</el-form-item>
							</div>
							<el-form-item>
								<el-button style="width: 80px" size="primary" @click.native="$router.back(-1)">返回</el-button>
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
import { birthForIdCard } from '@/utils'

export default {
	name: 'cust-file-add',
	data() {
		return {
			id: '',
			birthDate: '',
			custType: '',
			row: {
				sex: '',
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
		}
	},
	created() {
		this.id = this.$route.query.id
	},
	mounted() {
		this._getDetail(this.id)
	},
	methods: {
		_getDetail(id) {
			CustormFileApi.getDetail(id).then(data => {
				if (data) {
					this.custType = data.custType.toString()
					if (this.custType !== '1') {
						data.sex = data.sex.toString()
					}
					this.row = data
					this._birthForIdCard(data.idCard)
				}
			})
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

<style lang="scss" scoped>
.avatar-img {
	width: 280px;
	height: 200px;
}
</style>