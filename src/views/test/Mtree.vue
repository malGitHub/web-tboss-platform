<template>
	<div>
		<blockquote class="explain-txt">show</blockquote>
		<!--<div style="position: relative; height: 28px; margin-bottom: 5px;">
			<input type="text" placeholder="search" v-model="filterText">
		</div>-->
		<we-tree ref="tree" :data="treeData" :options="treeOptions" onlyKey="shopId" @node-click="handleNodeClick"></we-tree>
		<!--<a href="javascript:void(0);" class="btn btn-success" @click="getInfo">获取选中项</a>-->
		<el-container class="view-form">
			<el-row>
				<el-col :span="24">
					<el-card shadow="hover">
						<div slot="header">
							<span>父子组件数据绑定</span>
						</div>
						<el-col :span="24">
							<input type="text" v-model="name">
							<input type="text" v-model="childObj.money">
							<son :_name="name" :_child-obj="childObj"></son>
						</el-col>
					</el-card>
				</el-col>
			</el-row>
		</el-container>
	</div>
</template>

<script>
import { getTreeData } from '@/api/test'
import Tree from '@/components/WeTree/Tree'
import Son from './Son'

export default {
	name: 'weTree',
	components: {
		'we-tree': Tree,
		'son': Son
	},
	data() {
		return {
			treeData: [],
			filterText: '',
			treeOptions: {
				label: 'label',
				children: 'children',
				isUnfold: false
			},
			name: 'aaa',
			childObj: {
				money: 10000,
				dollar: 300
			}
		}
	},
	mounted() {
		getTreeData().then(res => {
			this.treeData = res.list
		})
	},
	methods: {
		handleNodeClick(model) {
			console.log(model)
		},
		getInfo() {
			console.log(this.$refs.tree.getCheckedNodes())
		},
		renderContent(h, { node, model }) {
			return (
				<div class={'tree-label'} style={{ display: 'inline-block' }}>
					<span>{model.label}</span>
					<span>
		              	<a onClick={() => this.remove(node, model)}>Delete</a>
		            </span>
		        </div>
			)
		},
		remove() {}
	},
	watch: {
		filterText(txt) {
			this.$ref.tree.filter(txt)
		}
	}
}

</script>

<style lang="scss" scoped="">

</style>