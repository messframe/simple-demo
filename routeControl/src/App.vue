<template>
	<div id="app">
		<MainHeader></MainHeader>
		<MainMenu :active='activeMenu' ref="mainMenu"></MainMenu>
		<MainContainer></MainContainer>
	</div>
</template>

<script>
	import MainMenu from './components/menu.vue'
	import MainHeader from './components/header'
	import MainContainer from './components/container'
	let preUrl = ''
	export default {
		name: 'App',
		data () {
			return {
				activeMenu: '',
				intervalId: '',
			}
		},
		components: {
			MainMenu,
			MainHeader,
			MainContainer
		},
		beforeMount() {
			this.removeNodeById('app_moduleA')
			this.removeNodeById('app_moduleB')
			this.removeNodeById('app_moduleC')
			clearInterval(this.intervalId)
		},
		mounted() {
			this.watchRouter()
			this.hashChangeFire()
		},
		methods: {
			removeNodeById(id) {
				let dom = document.getElementById(id)
				if (document.getElementById(id)) dom.parentNode.removeChild(document.getElementById(id))
			},
			watchRouter () {
				if (this.$singleSpa.routerMode === 'hash') {
					/**
					 * 监听浏览器hash路由变化
					 * 动态隐藏不应该显示的模块
					 */
					if (("onhashchange" in window) && ((typeof document.documentMode === "undefined") || document
							.documentMode ==
							8)) {
						// 浏览器支持onhashchange事件
						window.onhashchange = this.hashChangeFire; // TODO，对应新的hash执行的操作函数
					} else {
						// 不支持则用定时器检测的办法
						this.intervalId = setInterval(() => {
							let ischanged = this.isHashChanged(); // TODO，检测hash值或其中某一段是否更改的函数
							if (ischanged) {
								this.hashChangeFire(); // TODO，对应新的hash执行的操作函数
							}
						}, 150);
					}
				} else if (this.$singleSpa.routerMode === 'history') {
					if (window.onpopstate) {
						window.onpopstate = this.hashChangeFire
					} else {
						// 不支持则用定时器检测的办法
						this.intervalId = setInterval(() => {
							let ischanged = this.isHashChanged(); // TODO，检测hash值或其中某一段是否更改的函数
							if (ischanged) {
								this.hashChangeFire(); // TODO，对应新的hash执行的操作函数
							}
						}, 150);
					}　
				}
			},
			hashChangeFire() {
				if (window.location.hash === '#/' ||
					(window.location.pathname === '/' && window.location.hash === '')
					) {
					this.$singleSpa.router.push('/moduleA/home')
					return
				}
				let moduleName = (window.location.hash || window.location.pathname).split('/')[1]
				this.resetModuleStyle(moduleName)
				this.activeMenu = Math.random()
			},
			/**
			 * 重置子模块容器的样式
			 */
			resetModuleStyle (moduleName) {
				let containerDom = document.querySelector('#mainContainer')
				for (let i = 0; i < containerDom.childNodes.length; i++) {
					let node_ = containerDom.childNodes[i]
					if (node_.id !== `app_${moduleName}`) {
						node_.style.display = 'none'
					} else {
						node_.style.display = 'block'
					}
				}
			},
			isHashChanged() {
				const curUrl = window.location.href;
				if (curUrl !== preUrl) {
					preUrl = curUrl
					return true
				}
				return false
			}
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		background: #eee;
	}

	body,
	html,
	#app,
	#app_routeControl {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
	}
</style>