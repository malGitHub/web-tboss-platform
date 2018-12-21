<template>
	<el-container class="view-container">
		<el-row>
			<el-col :span="24" class="filter-header mb5">
				<el-form :inline="true" :model="listQuery">
					<el-col :span="18">
						<el-form-item label="用户名称">
							<el-input placeholder="用户名称" auto-complete="off" v-model="listQuery.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="search-btn-group">
						<el-col :span="24">
							<el-form-item class="fr">
								<el-button type="primary" @click="_clickQuery">查询</el-button>
								<el-button v-if="userManager_btn_add" type="primary" @click="_edit()">新建</el-button>
							</el-form-item>
						</el-col>
					</el-col>
				</el-form>
			</el-col>
			<el-col :span="24" class="mb20">
				<el-table :data="list" border v-loading.body="listLoading" border fit highlight-current-row class="wh">
					<el-table-column align="center" width="60" label="序号" fixed="left">
						<template slot-scope="scope">{{scope.$index + 1}}</template>
					</el-table-column>
					<el-table-column align="center" prop="name" width="200" label="姓名" fixed="left"></el-table-column>
					<el-table-column align="center" prop="username" width="110" label="账户"></el-table-column>
					<el-table-column align="center" prop="sex" width="110" label="性别"></el-table-column>
					<el-table-column align="center" width="110" label="身份">
						<template slot-scope="scope">
							<el-tag :type="scope.row.isSuperAdmin === '0' ? 'primary' : 'warning'" close-transition>
								<span v-if="scope.row.isSuperAdmin === '0'">普通身份</span>
								<span v-else-if="scope.row.isSuperAdmin === '1'">超级管理员</span>
							</el-tag>
						</template>				
					</el-table-column>
					<el-table-column align="center" prop="description" width="300" label="备注"></el-table-column>
					<el-table-column align="center" prop="updTime" width="180" label="最后时间"></el-table-column>
					<el-table-column align="center" prop="updUserName" width="200" label="最后更新人"></el-table-column>
					<el-table-column align="center" label="操作" width="180" fixed="right">
						<template slot-scope="scope">
							<el-button v-if="userManager_btn_edit" type="success" size="small" @click="_edit(scope.row)">修改</el-button>
							<el-button v-if="userManager_btn_del" type="danger" size="small" @click="_del(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="24">
				<el-pagination background :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" @size-change="_handleSizeChange" @current-change="_handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
			</el-col>
		</el-row>
		<user-add v-on:close="_closeModal" :show-modal="showAddModal" :row-id="rowId"></user-add>
	</el-container>
</template>
<script>
import UserApi from '@/api/platform/user'
import UserAddComponet from '@/views/app/platform/user/add'

export default {
	components: {
		'user-add': UserAddComponet
	},
	data() {
		return {
			listQuery: {
				name: '',
				page: 1,
				limit: 10
			},
			list: [],
			total: 0,
			listLoading: false,
			userManager_btn_edit: true,
      		userManager_btn_del: true,
      		userManager_btn_add: true,
      		rowId: '',
      		showAddModal: false
		}
	},
	mounted() {
		this._query()
	},
	methods: {
		_handleSizeChange(val) {
			this.listQuery.limit = val
			this._query()
		},
		_handleCurrentChange(val) {
			this.listQuery.page = val
			this._query()
		},
		_clickQuery() {
			this.listQuery.page = 1
			this._query()
		},
		_query() {
			this.listLoading = true
			UserApi.page(this.listQuery).then(data => {
				this.list = data.rows
				this.total = data.total
				this.listLoading = false
			}).catch(() => {
				this.listLoading = false
			})
		},
		_edit(row = {}) {
			this.showAddModal = true
			if (row && row.id) {
				this.rowId = row.id
			} else { //这里不写三元了
				this.rowId = ''
			}
		},
		_del(row = {}) {
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
	        }).then(() => {
		        UserApi.delObj(row.id).then(() => {
	              	this.$notify({ title: '成功', message: '删除成功', type: 'success', duration: 2000 })
	              	this._query()
	            })
		    })
		},
		_closeModal(flag) {
			this.showAddModal = false
			if (flag) {
				this._query()
			}
		}
	}
}
</script>