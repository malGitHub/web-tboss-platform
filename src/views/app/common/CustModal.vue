<template>
	<!--选择客户界面-->
	<el-dialog append-to-body width="780px" title="选择客户" :visible.sync="showModal" :before-close="_closeModal">
		<el-row class="inline-row">
			<el-form :inline="true" :model="listQuery">
				<el-form-item label="客户名称">
					<el-input placeholder="客户名称" v-model="listQuery.custName" @change="_changeQuery()"></el-input>
				</el-form-item>
				<el-form-item label="移动电话">
					<el-input placeholder="移动电话" v-model="listQuery.contactPhone" @change="_changeQuery()"></el-input>
				</el-form-item>
			</el-form>
		</el-row>
		<el-row class="mb12">
			<el-table height="300" :data="list" v-loading="listLoading" border fit highlight-current-row class="wh" @setCurrentRow>
				<el-table-column width="60">
					<template slot-scope="scope">
						<el-radio v-model="radio" @change="_select(scope.row)" :label="scope.row.id">&thinsp;</el-radio>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="custName" label="客户名称"></el-table-column>
				<el-table-column align="center" label="客户类型">
					<template slot-scope="scope">
						<span v-if="scope.row.custType =='0'">个人</span>
						<span v-else>公司</span>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="contactPhone" label="移动电话"></el-table-column>
				<el-table-column align="center" width="200" label="证件号">
					<template slot-scope="scope">
						<span v-if="scope.row.custType =='0'">{{ scope.row.idCard }}</span>
						<span v-else>{{ scope.row.unifiedSocialCreditCode }}</span>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-pagination background :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" 
					:total="total" @size-change="_handleSizeChange" @current-change="_handleCurrentChange" 
					layout="total, sizes, prev, pager, next, jumper"></el-pagination>
			</el-col>
		</el-row>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click.native="_selectSubmit">确定</el-button>
			<el-button @click.native="_closeModal">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>
import SaleCustomerApi from '@/api/sale/customer'

export default {
	props: {
		showModal: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			radio: '',
			selectRow: {},
			list: [],
			total: 1,
			listLoading: false,
			listQuery: {
				custName: '',
				contactPhone: '',
				page: 1,
				limit: 10
			}
		}
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
		_query() {
			this.listLoading = true
			SaleCustomerApi.getCustomFilelList(this.listQuery).then(data => {
				this.list = data.rows
				this.total = data.total
				this.listLoading = false
			})
		},
		_select(row = {}) {
			this.selectRow = Object.assign({}, row)
        },
        _selectSubmit() {
	        if (!this.selectRow.id || this.selectRow.id === '') {
	          this.$message.error('请选择客户')
	          return
	        }
	        this.$emit('close', this.selectRow)
      	},
      	_closeModal() {
      		this.$emit('close')
      	}
	},
	watch: {
		showModal(val) {
			if (val) {
				this._query()
			}
		}
	}
}
</script>