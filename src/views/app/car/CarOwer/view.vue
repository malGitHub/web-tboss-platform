<template>
	<el-container class="view-form">
		<el-form class="wh" :model="row" label-width="220px" ref="form">
			<el-row type="flex" justify="center">
				<el-col :span="24" class="mb12">
					<el-card shadow="hover">
						<div slot="header">
							<span>基本信息</span>
						</div>
						<el-col :span="18" :offset="2">
							<el-form-item label="客户类型">{{ ownerType === '0' ? '个人车主' : '公司车主' }}</el-form-item>
							<el-form-item label="车主名称">{{ row.ownerName }}</el-form-item>
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
				<el-col :span="24" class="mb12">
					<el-card shadow="hover">
						<div slot="header">
							<span>认证信息</span>
						</div>
						<el-col :span="18" :offset="2">
							<div v-if="c_isPerOrCom">
								<el-form-item label="身份证号">
									<el-col :span="12">{{ row.idCard }}</el-col>
									<el-col :span="12">
										<label style="width: 220px; padding-right: 12px; color: #606266;">出生日期</label>{{ birthDate }}
									</el-col>
								</el-form-item>
								<el-form-item label="身份证照片">
									<el-col :span="12">
										<img v-if="row.idCardFrontPic" :src="row.idCardFrontPic" class="avatar-img" alt="身份证正面照">
										<div class="image-tip">身份证正面照</div>
									</el-col>
									<el-col :span="12">
										<img v-if="row.idCardBackPic" :src="row.idCardBackPic" class="avatar-img" alt="身份证反面照">
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
							<el-form-item label="驾驶证号">
								<el-col :span="12">{{ row.drivingLicence }}</el-col>
								<el-col :span="12">
									<label style="width: 220px; padding-right: 12px; color: #606266;">驾驶证日期</label>{{ row.drivingLicencePeriod }}
								</el-col>
							</el-form-item>
							<el-form-item label="准驾车型">
								<el-select v-model="row.permittedDrivingTypeId" placeholder="准驾车型" disabled>
									<el-option v-for="fuel_type in permitDrivArr" :label="fuel_type.labelDefault" :value="fuel_type.id" :key="fuel_type.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="驾驶证照片">
								<el-col :span="12">
									<img v-if="row.drivingLicenceFrontPic" :src="row.drivingLicenceFrontPic" class="avatar-img" alt="驾驶证照片正面">
									<div class="image-tip">驾驶证照片正面</div>
								</el-col>
								<el-col :span="12">
									<img v-if="row.drivingLicenceBackPic" :src="row.drivingLicenceBackPic" class="avatar-img" alt="驾驶证照片反面">
									<div class="image-tip">驾驶证照片反面</div>
								</el-col>
							</el-form-item>
							<el-form-item label="从业资格证号">
								<el-col :span="12">{{ row.qualificationCertificate }}</el-col>
								<el-col :span="12">
									<label style="width: 220px; padding-right: 12px; color: #606266;">驾驶证期限</label>{{ row.qualificationCertificatePeriod }}
									<el-date-picker v-model="row.qualificationCertificatePeriod" align="right" type="date" value-format="yyyy-MM-dd" placeholder="驾驶证期限"></el-date-picker>
								</el-col>
							</el-form-item>
							<el-form-item label="从业资格证号照片">
								<el-col :span="12">
									<img v-if="row.qualificationCertificateFrontPic" :src="row.qualificationCertificateFrontPic" class="avatar-img" alt="驾驶证照片正面">
									<div class="image-tip">从业资格证号照片正面</div>
								</el-col>
								<el-col :span="12" v-if="row.qualificationCertificateBackPic && row.qualificationCertificateBackPic !== ''">
									<img v-if="row.qualificationCertificateBackPic" :src="row.qualificationCertificateBackPic" class="avatar-img" alt="驾驶证照片反面">
									<div class="image-tip">从业资格证号照片反面</div>
								</el-col>
							</el-form-item>
						</el-col>
					</el-card>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
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
							</el-table>
							<el-pagination background :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" 
								:total="total" @size-change="_handleSizeChange" @current-change="_handleCurrentChange" 
								layout="total, sizes, prev, pager, next, jumper"></el-pagination>
						</el-col>
						<el-form-item class="mb5" style="margin-left: 180px">
							<el-button class="operat-btn mt25" type="primary" size="medium" @click.native="_ok('form')">确认</el-button>
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
import { birthForIdCard } from '@/utils'

export default {
	data() {
		return {
			id: '',
			ownerType: '',
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
			}
		}
	},
	created() {
		this.id = this.$route.query.id
	},
	mounted() {
		this._detail(this.id)
		this._getData()
	},
	methods: {
		_getData() {
			CommonApi.getDictByType('allowed_type').then(data => { //燃油
				this.permitDrivArr = data.rows
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
		_birthForIdCard(str = '') {
			this.birthDate = birthForIdCard(str)
		}
	},
	computed: {
		c_isPerOrCom() {
			return this.ownerType === '0'
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