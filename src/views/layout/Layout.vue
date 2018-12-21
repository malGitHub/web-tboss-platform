<template>
	<el-container class="app-wrapper" :class="classObj">
		<el-header height="50px">
			<navbar></navbar>
		</el-header>
		<el-container>
			<div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
			<sidebar class="sidebar-container"></sidebar>
			<app-main class="main-container"></app-main>
		</el-container>
	</el-container>
</template>

<script>
	import { Navbar, Sidebar, AppMain } from './components'
	import ResizeMixin from './mixin/ResizeHandler'

	export default {
		name: 'layout',
		components: {
			Navbar,
			Sidebar,
			AppMain
		},
		mixins: [ResizeMixin],
		computed: {
			sidebar() {
				return this.$store.state.app.sidebar
			},
			device() {
				return this.$store.state.app.device
			},
			classObj() {
				return {
					hideSidebar: !this.sidebar.opened,
					withoutAnimation: this.sidebar.withoutAnimation,
					mobile: this.device === 'mobile'
				}
			}
		},
		methods: {
			handleClickOutside() {
				this.$store.dispatch('CloseSideBar', {
					withoutAnimation: false
				})
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
		@include clearfix;
		position: relative;
		height: auto;
		width: 100%;
		min-height: 100%;
	}
	.drawer-bg {
		background: #000;
		opacity: 0.3;
		width: 100%;
		top: 0;
		height: 100%;
		position: absolute;
		z-index: 999;
	}
	.el-header {
		padding: 0;
		position: fixed;
		overflow: hidden;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1002;
	}
	.mobile {
		.el-header {
			z-index: 7;
		}
	}
</style>