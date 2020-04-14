<template>
    <section class="moduleA-sub-home">
        <el-page-header @back="goBack" content="我是Home页面的子页面">
        </el-page-header>
        <el-link style="margin-top: 20px; font-size: 16px" @click="goPath('/moduleA/about')">跳转到moduleA的about页面</el-link>
        <br>
        <el-link style="margin-top: 20px; font-size: 16px" @click="goTo(-2)">跳转到上上个页面</el-link>
    </section>
</template>

<script>
export default {
    name: 'sub-home',
    methods: {
        goBack () {
            this.$singleSpa.router.back()
        },
        goTo(n) {
            this.$singleSpa.router.go(n)
        },
        goPath (path) {
            this.$singleSpa.router.push(path)
        }
    }
}
</script>

<style lang='less' scoped>
.moduleA-sub-home {
    margin-top: 20px;
}
</style>