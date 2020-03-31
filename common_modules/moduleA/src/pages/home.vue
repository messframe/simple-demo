<template>
    <section class="moduleA-home">
        <el-alert
            title="欢迎尝试基于single-spa封装的脚手架：mess-cli"
            type="success"
            :closable="false"
            show-icon>
        </el-alert>
        <p style="margin-top: 10px">
            <el-tag effect="dark" :type='auth === "visitor" ? "" : "warning"'>这个人的权限是： {{auth}}</el-tag>
        </p>
        <el-card class="moduleA-home-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>
                    这是一个基于
                    <el-tag type="success">single-spa-vue</el-tag>
                    构建的
                    <el-tag type="success">vue</el-tag>
                    模块，名叫：
                    <el-tag>moduleA</el-tag>
                </span>
                <el-button style="float: right; padding: 3px 0" type="text">这是一个假按钮</el-button>
            </div>
            <div class="moduleA-home-card-content">
                <p>
                    1. <el-tag>moduleA</el-tag>的UI库是<el-tag type="success">element-ui</el-tag>。
                    但是有一个值得注意的是！这个网页中，一共有两个vue项目，包括左边的侧边菜单，它们共用一个<el-tag type="success">element-ui</el-tag>
                    的样式文件，并且我们可以方便地修改这个样式文件，来让这个网站上的所有<el-tag type="success">element-ui</el-tag>达到相同的主题，并可以进行主题色的同步。
                    <el-tag type="success">详细的请移步右上角的色彩选择器，换肤试下吧！</el-tag>
                </p>
                <p>
                    2. 当然还有其他亮点操作！这个网站上的所有vue项目，只需要<el-tag>引入一个vue的依赖文件</el-tag>即可，
                    当然对于<el-tag>moment</el-tag>，<el-tag>vue-rouer</el-tag>，<el-tag>axios</el-tag>等使用率
                    较高的依赖库，都可以将它们抽离出来，只需要引入一份，你就可以在所有依赖它们的项目中使用！
                </p>
                <p>
                    3. 对single-spa感兴趣？<el-tag>single-spa官网：<el-link href="https://single-spa.js.org" target="_blank">https://single-spa.js.org</el-link></el-tag>，
                    或者对mess-cli感兴趣？<el-tag>mess-cli官网：<el-link href="https://www.messcli.cn/#/" target="_blank">https://www.messcli.cn/#/</el-link></el-tag>
                </p>
            </div>
        </el-card>
        <el-button style="margin-top: 20px" @click="goTo('subHomePage')">这个页面还有个子路由，点击看看</el-button>
        <router-view></router-view>
    </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'home',
    computed: {
        ...mapState({
            'auth': state => state.auth
        })
    },
    methods: {
        goTo (name) {
            if (!name) return
            this.$router.push({ name: name })
        }
    }
}
</script>

<style lang='less' scoped>
.moduleA-home {
    &-card {
        margin-top: 20px;
        &-content {
            p {
                margin: 10px 0;
                line-height: 45px;
            }
        }
    }
}
</style>