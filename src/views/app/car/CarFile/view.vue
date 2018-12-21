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
							<el-form-item label="车牌号">{{ row.vehiclePlate }}</el-form-item>
							<el-form-item label="vin">{{ row.vin }}</el-form-item>
							<el-form-item label="车辆品牌">{{ row.vehicleBrandId }}</el-form-item>
							<el-form-item label="车辆系列">{{ row.vehicleSeriesId }}</el-form-item>
							<el-form-item label="车辆类型">{{ row.vehicleTypeId }}</el-form-item>
							<el-form-item label="公告型号">{{ row.publicityCode }}</el-form-item>
							<el-form-item label="燃油类型">
								<el-select v-model="row.fuelTypeId" placeholder="燃油类型" disabled>
									<el-option v-for="fuel_type in fuelTypes" :label="fuel_type.labelDefault" :value="fuel_type.id" :key="fuel_type.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="马力">{{ row.power }}</el-form-item>
							<el-form-item label="驱动形式">
								<el-select v-model="row.driveType" placeholder="驱动形式" disabled>
									<el-option v-for="mode in drivingModes" :label="mode.labelDefault" :value="mode.id" :key="mode.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="颜色">
								<el-select v-model="row.colour" placeholder="颜色" disabled>
									<el-option v-for="color in colors" :label="color.labelDefault" :value="color.id" :key="color.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="选择挂靠公司">
								<el-select ref="companyId" v-model="row.companyId" placeholder="挂靠公司" disabled>
									<el-option v-for="company in companies" :label="company.organization_name" :value="company.id" :key="company.id"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="选择绑定车主">{{ row.ownerName }}</el-form-item>
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
							<el-form-item label="车辆合格证">{{ row.vehicleCertification }}</el-form-item>
							<el-form-item label="合格证照片">
								<img v-if="row.vehicleCertificationPic" :src="row.vehicleCertificationPic" class="avatar-img" alt="合格证照片">
								<div class="image-tip">合格证照片</div>
							</el-form-item>
							<el-form-item label="销售发票">{{ row.invoiceNumber }}</el-form-item>
							<el-form-item label="销售发票照片">
								<img v-if="row.invoicePic" :src="row.invoicePic" class="avatar-img" alt="销售发票照片">
								<div class="image-tip">销售发票照片</div>
							</el-form-item>
							<el-form-item label="挂靠协议">
								<div class="img-albums" v-for="(item, index) in depPicArr" :key="item.uid">
									<img :src="item.url" class="avatar-img" alt="挂靠协议图片">
								</div>
							</el-form-item>
							<el-form-item label="安全协议">
								<div class="img-albums" v-for="(item, index) in secPicArr" :key="item.uid">
									<img :src="item.url" class="avatar-img" alt="安全协议图片">
								</div>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" size="medium" @click.native="$router.back(-1)">返回</el-button>
							</el-form-item>
						</el-col>
					</el-card>
				</el-col>
			</el-row>
		</el-form>			
	</el-container>
</template>
<script>
import CarFileApi from '@/api/car/carFile'
import CommonApi from '@/api/common'

export default {
	data() {
		return {
			id: '',
			fuelTypes: [],
			drivingModes: [],
			colors: [],
			companies: [],
			row: {
				vehiclePlate: '',
				vin: '',
				ownerName: '',
				vehicleBrandId: '',
				vehicleSeriesId: '',
				vehicleTypeId: '',
				publicityCode: '',
				fuelTypeId: '',
				power: '',
				driveType: '',
				colour: '',
				companyId: '11',
				vehicleCertification: '',
				vehicleCertificationPic: '',
				invoiceNumber: '',
				invoicePic: '',
				dependencePic: '',
				secureProtocolPic: ''
			},
			depPicArr: [],
			secPicArr: []
		}
	},
	created() {
		this.id = this.$route.query.id
	},
	mounted() {
		this._getData()
		this._getDetail(this.id)
	},
	methods: {
		_getData() {
			CommonApi.getDictByType('car_color').then(data => { //颜色
				this.colors = data.rows
			})
			CommonApi.getDictByType('drive_type').then(data => { //驱动
				this.drivingModes = data.rows
			})
			CommonApi.getDictByType('fuel_type').then(data => { //燃油
				this.fuelTypes = data.rows
			})
		},
		_getDetail(id) {
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
		}
	}
}
</script>

<style lang="scss" scoped>
.img-albums {
	display: inline-block;
	margin-right: 10px;
}
.avatar-img {
	width: 280px;
	height: 200px;
}
</style>