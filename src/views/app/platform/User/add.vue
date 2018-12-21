<template>
	<el-dialog append-to-body width="500px" :title="title" :visible.sync="showModal" :before-close="_closeModal">
		<el-form :model="form" :rules="rules" ref="form" label-postion="left" label-width="100px" style="width: 400px;">
			<el-form-item label="姓名" prop="name">
				<el-input ref="name" v-model="form.name" placeholder="请输入姓名"></el-input>
			</el-form-item>
			<el-form-item label="账户" prop="username">
				<el-input ref="username" v-if="dialogStatus == 'create'" v-model="form.username" placeholder="请输入账户"></el-input>
				<el-input v-else v-model="form.username" placeholder="请输入账户" readonly></el-input>
			</el-form-item>
			<el-form-item v-if="dialogStatus == 'create'" label="密码" placeholder="请输入密码" prop="password">
				<el-input ref="password" type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item label="部门" placeholder="请选择部门" prop="departName">
				<el-input ref="departName" readonly type="text" v-model="form.departName">
					<el-button slot="append" icon="el-icon-search" @click="_openDepartDialog"></el-button>
				</el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-select v-model="form.sex" placeholder="请选择性别">
					<el-option v-for="item in sexOptions" :key="item.id" :label="item.labelDefault" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="描述">
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.description"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click.native="_ok('form')">确定</el-button>
			<el-button @click.native="_closeModal">取消</el-button>
		</div>
		<el-dialog title="选择部门" width="30%" :visible.sync="dialogDepartVisible" append-to-body>
			<depart-selector @closeDepartDialog="_closeDepartDialog" ref="departSelector"></depart-selector>
			<span slot="footer" class="dialog-footer">
		        <el-button class="filter-item"  style="margin-left: 10px;" @click="_handlerAddDepart" type="primary" icon="edit">添加</el-button>
		      </span>
		</el-dialog>
	</el-dialog>
</template>
<script>
import UserApi from '@/api/platform/user'
import DepartSel from '@/views/app/platform/User/components/departSel'

export default {
	components: {
		'depart-selector': DepartSel
	},
	props: {
		showModal: {
			type: Boolean,
			default: false
		},
		rowId: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			title: '',
			dialogStatus: '',
			form: {
		        username: '',
		        name: '',
		        sex: '',
		        password: '',
		        description: '',
		        departName: '',
		        departId: ''
	        },
	        rules: {
		        name: [
		          	{ required: true, message: '请输入用户', trigger: 'blur' },
		          	{ min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
		        ],
		        username: [
		          	{ required: true, message: '请输入账户', trigger: 'blur' },
		          	{ min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
		        ],
		        password: [
		          	{ required: true, message: '请输入密码', trigger: 'blur' },
		          	{ min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
		        ],
		        departName: [
		          	{ required: true, message: '请选择部门', trigger: 'blur' }
		        ]
	        },
	        dialogDepartVisible: false,
	        sexOptions: [
	        	{ id: '8571cabddd083a5ab732b1df81bdf392', labelDefault: '男' },
	        	{ id: '657ae6bd192a36729d39446174bcf64c', labelDefault: '女' }
	        ],
	        fullscreenLoading: false
		}
	},
	created() {
		this.dialogStatus = 'create'
		this.title = '新增用户'
	},
	methods: {
		_getDetail(id) {
			UserApi.getObj(id).then(data => {
          		this.form = data
          		try {
            		const depart = JSON.parse(data.departId)
	            	if (typeof depart === 'object' && depart) {
	              		this.form.departName = depart.name
	              		this.form.departId = depart.id
	            	} else {
	              		this.form.departId = data.departId
	              		this.form.departName = data.departId
	            	}
          		} catch (e) {
            		console.log('error：部门转化json失败' + e)
          		}
    		})
		},
		_resetForm() {
			this.form = {
		        username: '',
		        name: '',
		        sex: 'comm_sex_man',
		        password: '',
		        description: '',
		        departName: '',
		        departId: ''
	        }
		},
		_closeModal() {
      		this.$emit('close')
      		this.$refs.form.resetFields()
        },
        _ok(form) {
        	this.$refs[form].validate((valid, obj) => {
				if (valid) {
					const method = this.dialogStatus === 'update' ? 'putObj' : 'addObj'
					const message = this.dialogStatus === 'update' ? '修改成功' : '创建成功'
					const arg = this.dialogStatus === 'update' ? [this.id, this.form] : [this.form]
					this.fullscreenLoading = true
					UserApi[method].apply(UserApi, arg).then(() => {
						this.fullscreenLoading = false
						this.$message({ showClose: true, message: message, type: 'success' })
						this.$emit('close', true)
					}).catch(() => {
						this.fullscreenLoading = false
					})
				} else {
					this.$refs[Object.keys(obj)[0]].focus()
				}
			})
        },
        _openDepartDialog() {
	      	this.dialogDepartVisible = true
	    },
    	_closeDepartDialog(depart) {
	      	this.form.departName = depart.label
	      	this.form.departId = depart.id
	     	this.dialogDepartVisible = false
	    },
	    _handlerAddDepart() {
	      	this.$refs.departSelector.onSubmit()
	    }
	},
	watch: {
		rowId(val) {
			if (val !== '') {
				this.title = '修改用户'
				this.dialogStatus = 'update'
				this._getDetail(val)
			} else {
				this.form.password = ''
				this.dialogStatus = 'create'
				this.title = '新增用户'
			}
		}

	}
}
</script>