<template>
    <section class="moduleA-about">
        <div class="moduleA-about-sym">
            <el-avatar class="moduleA-about-sym-avatar" :src="avatar" :size='150'></el-avatar>
            <div>
                <el-tag>Element-ui</el-tag> 太好用啦！<el-tag>antd-design</el-tag>也一样！
                <p style="margin-top: 10px">
                    <el-tag effect="dark" :type='auth === "visitor" ? "" : "warning"'>这个人的权限是： {{auth}}</el-tag>
                </p>
            </div>
        </div>
        <el-divider content-position="left">更多有关VUE项目的详细信息介绍</el-divider>
        <div class="moduleA-about-content">
            <el-collapse class="moduleA-about-content-collapse" v-model="activeName" accordion>
                <el-collapse-item title="vue-router" name="1">
                    <div>1. 在vue项目中，各个模块的路由，只由模块内部自身维护</div>
                    <div>2. 跳转页面尽量使用 <el-tag>内置的router对象</el-tag>来进行跳转，
                        <el-tag type='warning'>不要通过vue-router的path属性来跳转</el-tag>，这种方式不会触发浏览器onhashchange事件</div>
                </el-collapse-item>
                <el-collapse-item title="vuex" name="2">
                    <div>每个模块都有各自的vuex实例，<el-tag type='warning'>模块之间是不共享store的</el-tag></div>
                    <div>如果非要进行子模块间的通信，建议使用全局的<el-tag type='success'>eventBus</el-tag>对象进行通信。
                    详情请参考: <el-link type="success" target="_blank" href='https://www.messcli.cn/#/eventBus'>mess-cli: 事件总线</el-link>，
                    或者<el-tag>操作右上角的权限选择器</el-tag>，它将由<el-tag>菜单子模块下发权限值到各个子模块</el-tag>，各个子模块得到这个权限值，并进行处理，
                    例如保存在各自的状态管理工具中(<el-tag>vuex, redux</el-tag>)
                    </div>
                </el-collapse-item>
            </el-collapse>
            <el-card class="moduleA-about-content-card">
                <div>请减少模块间的耦合程度！！</div>
                <div>请减少模块间的耦合程度！！</div>
                <div>请减少模块间的耦合程度！！</div>
                <div>重要的事情讲三遍！</div>
                 <el-alert
                    title="如果各个模块间存在各种互相传值等强耦合代码，那么前端微服务对你的项目没有任何意义，反而加重了工作量，建议这种情况，将它们合到一个模块内。"
                    type="warning"
                    :closable="false">
                </el-alert>
                如果有些需要在全局使用的值，多个子模块想
                通过这个值来进行一些逻辑处理，那么建议使
                用事件总线功能，由一个消息中心，下发所有全局变量，
                子模块注册全局变量变化事件，再各自做出相应的处理。
            </el-card>
        </div>
        
    </section>
</template>

<script>
import avatar from '../assets/avatar.png'
import {mapState} from 'vuex'
export default {
    name: 'about',
    data () {
        return {
            activeName: '1'
        }
    },
    computed: {
        avatar () {return avatar},
        ...mapState({
            'auth': state => state.auth
        })
    }
}
</script>

<style lang='less' scoped>
.moduleA-about {
    &-sym {
        display: flex;
        align-items: center;
        &-avatar {
            margin-right: 50px;
        }
    }
    &-content {
        margin-top: 20px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        &-collapse {
            width: 50%;
        }
        &-card {
            width: 40%;
        }
    }
}
</style>