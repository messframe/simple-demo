<template>
	<div id="moduleA" class="moduleA">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		created() {
			if (window.eventBus) {
				window.eventBus.on('authChange', this.authChange)
			}
		},
		methods: {
			authChange(auth) {
				this.$notify({
					title: '成功',
					message: 'moduleA接收到权限值为： ' + auth,
					type: 'success'
				});
				this.$store.commit('setAuth', auth)
			}
		}
	}
</script>

<style lang="less">
	@marginWidth: 5px;

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}

	.moduleA {
		width: calc(100% - @marginWidth * 2);
		height: calc(100% - @marginWidth * 2);
		margin: @marginWidth;
		padding: @marginWidth * 4;
		background: white;
		box-shadow: 0 0 5px lightgray;

	}
</style>