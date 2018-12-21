<template>
	<!--<el-container>公司管理</el-container>-->
  <div class="app-container">
    <el-container>
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" :model="listQuery">
            <el-form-item label="公司名称">
              <el-input placeholder="公司名称" v-model="listQuery.companyname"></el-input>
            </el-form-item>
            <el-form-item class="fr">
              <el-button type="primary" @click="handleFilter">查询</el-button>
              <el-button type="primary" @click="handleCreate">新建</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24" class="mb20">
          <el-table :data="list" border v-loading.body="listLoading" border fit highlight-current-row class="wh">
            <el-table-column align="center" width="60" label="序号">
              <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="240">
              <template slot-scope="scope">
                <el-button type="success" size="mini" @click="_view(scope.row)">查看</el-button>
                <el-button type="primary" size="mini" @click="_edit(scope.row)">修改</el-button>
                <el-button type="danger"  size="mini" @click="_del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="companyname" min-width="150" label="公司名称"></el-table-column>
            <el-table-column align="center" prop="companyid" width="150" label="公司ID"></el-table-column>
            <el-table-column align="center" prop="linkman" width="150" label="联系人"></el-table-column>
            <el-table-column align="center" prop="phone" width="150" label="联系人方式"></el-table-column>
            <el-table-column align="center" prop="remark" width="260" label="备注"></el-table-column>
            <el-table-column align="center" prop="udate" width="200" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="cdate" width="200" label="更新时间"></el-table-column>

          </el-table>
        </el-col>
        <el-col :span="24">
          <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                         :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        </el-col>
      </el-row>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @close="_closeDialog">
        <el-form :model="dataForm" ref="dataForm" label-postion="left" label-width="70px" style="width: 400px; margin-left: 50px">
          <el-form-item label="公司名称" prop="companyname">
            <el-input v-model="dataForm.companyname"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="linkman">
            <el-input v-model="dataForm.linkman" placeholder="联系人"></el-input>
          </el-form-item>
          <el-form-item label="移动电话" prop="phone">
            <el-input v-model="dataForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dataForm.remark">
            </el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认</el-button>
          <el-button v-else type="primary" @click="updateData">确认</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>

</template>
<script>
  import CompanyApi from '@/api/company/companyManage'
  import waves from '@/directive/waves' // 水波纹指令

export default {
	name: 'role',
  directives: {
    waves
  },
	data() {
		return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        companyName: undefined,
        sort: '+id'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        update: 'Edit',
        create: '新建公司'
      },
      dataForm: {
        companyname: '',
        phone: 1,
        remark: '',
        linkman: ''
      }
		}
	},
  mounted() {
    this.getCompanyInfoList()
	},
	methods: {
    getCompanyInfoList() {
      this.listLoading = true
      CompanyApi.getCompanyInfoList(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getCompanyInfoList()
    },
    resetTemp() {
      this.dataForm = {
        companyname: '',
        phone: 1,
        remark: '',
        linkman: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getCompanyInfoList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getCompanyInfoList()
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
//          this.dataForm.companyname = '测试公司'
//          this.dataForm.linkman = '联系人' // mock a id
//          this.dataForm.phone = '15611110000'
//          this.dataForm.remark = '备注'
          CompanyApi.addCompany(this.dataForm).then(() => {
            this.list.unshift(this.dataForm)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    _restFormData() {
      this.dataForm = {
        companyname: '',
        phone: '',
        remark: '',
        linkman: ''
      }
    },
    _closeDialog() {
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this._restFormData()
      })
    },
    _edit(obj = {}) {
      this.dialogFormVisible = true
      if (obj && obj.id) {
        this.dataForm = Object.assign({}, obj)
      }
      this.dialogStatus = '修改公司名称'
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.dataForm)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          CompanyApi.updateCompany(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.dataForm.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.dataForm)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    _del(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CompanyApi.delCompany(row.id).then(() => {
          this.$message({ showClose: true, message: '删除成功', type: 'success', duration: 2000 })
          this.getCompanyInfoList()
        })
      })
    }
	}
}
</script>

<style scoped lang="scss">
.app-container {
  padding: 20px;
  .components-container {
    margin: 30px 50px;
    position: relative;
  }

  .pagination-container {
    margin-top: 30px;
  }

  .text-center {
    text-align: center
  }

  .sub-navbar {
    height: 50px;
    line-height: 50px;
    position: relative;
    width: 100%;
    text-align: right;
    padding-right: 20px;
    transition: 600ms ease position;
    background: linear-gradient(90deg, rgba(32, 182, 249, 1) 0%, rgba(32, 182, 249, 1) 0%, rgba(33, 120, 241, 1) 100%, rgba(33, 120, 241, 1) 100%);
    .subtitle {
      font-size: 20px;
      color: #fff;
    }
    &.draft {
      background: #d0d0d0;
    }
    &.deleted {
      background: #d0d0d0;
    }
  }

  .link-type,
  .link-type:focus {
    color: #337ab7;
    cursor: pointer;
    &:hover {
      color: rgb(32, 160, 255);
    }
  }

  .filter-container {
    padding-bottom: 10px;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }

  //refine vue-multiselect plugin
  .multiselect {
    line-height: 16px;
  }

  .multiselect--active {
    z-index: 1000 !important;
  }
}
</style>
