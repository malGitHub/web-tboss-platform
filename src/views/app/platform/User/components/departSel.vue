<template>
	<div>
		<el-row>
    		<el-col :span="24"> 
				<el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
				<el-tree class="filter-tree" node-key="id" default-expand-all ref="mainTree" highlight-current
					:data="mainTreeData" :props="defaultProps" 
					:expand-on-click-node="false" :filter-node-method="filterNode"  
					@node-click="getTreeNodeData" style="height: 350px; margin-top: 5px; overflow-y: auto;"></el-tree>
		 	</el-col>
  		</el-row> 
	</div>
</template>

<script>
import { getDepartTree } from '@/api/auth'

export default {
	data() {
		return {
			filterText: '',
			currentTreeNodeId: undefined,
			currentTreeNode: {},
			mainTreeData: [],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		}
	},
	created() {
		this.initmainTreeData()
		// 加载树
		// this.departManager_btn_user_del = this.elements['departManager:btn_user_del'];
	},
	methods: {
		filterNode(value, data) {
			if(!value) return true
			return data.label.indexOf(value) !== -1
		},
		initmainTreeData() {
			getDepartTree().then(data => {
				this.mainTreeData = data
			})
		},
		getTreeNodeData(data) {
			this.currentTreeNodeId = data.id
			this.currentTreeNode = data
		},
		onSubmit() {
			this.$emit('closeDepartDialog', this.currentTreeNode)
		}
	},
//	computed: {
//		...mapGetters(['elements'])
//	},
	watch: {
		filterText(val) {
			this.$refs.mainTree.filter(val)
		}
	}
}
</script>