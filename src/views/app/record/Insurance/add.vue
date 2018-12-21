<template>
	<div id="win">

		<el-dialog title="保险档案信息" :rules="rules" :visible.sync="dialogObj.bShowDialog" width="480px" :before-close="fade">

			<el-form ref="dataForm" :rules="rules" :model="dialogObj.insuranceObj" label-postion="left" label-width="100px" style="margin-left: 20px">
				<el-form-item label="保险类型" prop="insuranceType">
					<el-select class="filter-item" v-model="dialogObj.insuranceObj.insuranceType" placeholder="请选择" :disabled="dialogObj.bReadonly">
						<el-option v-for="item in insuranceTypeOptions" :key="item.id" :label="item.labelDefault" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="保险名称" prop="insuranceName">
					<el-input v-model="dialogObj.insuranceObj.insuranceName" ref="insuranceName" style="width:210px" :readonly="dialogObj.bReadonly"></el-input>
				</el-form-item>
				<el-form-item label="是否启用" prop="enableFlg">
					<el-switch v-model="switchVal" active-text="启用" inactive-text="停用" :disabled="dialogObj.bReadonly">
					</el-switch>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
			<template v-if="dialogObj.actionType === 'add'">
				<el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="add()">新增</el-button>
			    <el-button @click="fade()">取 消</el-button>
		    </template>
	   		<template v-if="dialogObj.actionType === 'edit'">
				<el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="edit()">修改</el-button>
			    <el-button @click="fade()">取 消</el-button>
	   		</template>
	   		<template v-else>
			</template>
	  </span>
		</el-dialog>
	</div>
</template>

<script>
	import CommonApi from '@/api/common'
	import InsuranceApi from '@/api/record/insurance'
	import { checkString } from '@/utils/rules'

	export default {
		props: {
			dialogObj: {
				default: {},
				type: Object
			}

		},
		data() {
			return {
				insuranceTypeOptions: [],
				fullscreenLoading: false,
				switchVal: true,
				rules: {
					insuranceType: [{
						required: true,
						message: '类型不能为空',
						trigger: 'change'
					}],
					insuranceName: [{
							required: true,
							message: '名称不能为空',
							trigger: 'blur'
						},
						{
							validator: checkString,
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {
			this.getDict()
		},
		computed: {
			switching() {
				return this.dialogObj.insuranceObj.enableFlg
			}
		},
		watch: {
			switching(val) {
				if (val == 0) {
					this.switchVal = true
				}
				if (val == 1) {
					this.switchVal = false
				}
			}
		},
		methods: {
			getDict() {
				CommonApi.getDictByType('insurance_type').then(data => {
					this.insuranceTypeOptions = data.rows
				})
			},
			add() {
				this.$refs['dataForm'].validate((valid, obj) => {
					if (valid) {
						this.dialogObj.insuranceObj.enableFlg = (this.switchVal) ? '0' : '1'
						InsuranceApi.add(this.dialogObj.insuranceObj).then(() => {
							this.$message({
								showClose: true,
								message: '新增成功',
								type: 'success'
							})
							setTimeout(() => {
								this.fade()
							}, 200)
						})
					} else {
						this.$refs[Object.keys(obj)[1]].focus()
					}
				})
			},
			edit() {
				this.$refs['dataForm'].validate((valid, obj) => {
					if (valid) {
						this.dialogObj.insuranceObj.enableFlg = (this.switchVal) ? '0' : '1'
						InsuranceApi.update(this.dialogObj.rowId, this.dialogObj.insuranceObj).then(() => {
							this.$message({
								showClose: true,
								message: '修改成功',
								type: 'success'
							})
							setTimeout(() => {
								this.fade()
							}, 200)
						})
					} else {
						this.$refs[Object.keys(obj)[0]].focus()
					}
				})
			},
			fade() {
				this.$refs['dataForm'].resetFields()
				this.$emit('reset')
			}
		}
	}
</script>