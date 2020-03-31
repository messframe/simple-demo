<template>
    <el-menu :default-active="activeMenu" class="main-menu" @select='menuClick'>
        <el-submenu v-for="(item, index) in menus" :key="index" :index='index + ""'>
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.name}}</span>
            </template>
            <el-submenu v-for="(e, i) in item.children" :key="i" :index='i + ""'>
                <span slot="title">{{e.name}}</span>
                <el-menu-item v-for="(leaf, leafKey) in e.children" :key="leafKey" :index="leaf.path">
                    {{leaf.name}}
                </el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        props: ['active'],
        data() {
            return {
                menus: [{
                    name: '不同框架',
                    type: 'submenu',
                    children: [{
                            name: 'vue',
                            children: [{
                                    name: 'moduleA-home',
                                    path: '/moduleA/home'
                                },
                                {
                                    name: 'moduleA-about',
                                    path: '/moduleA/about'
                                }
                            ]
                        },
                        {
                            name: 'moduleB',
                            children: [{
                                name: 'moduleB',
                                path: '/moduleB'
                            }]
                        },
                        {
                            name: 'moduleC',
                            children: [{
                                    name: 'page1',
                                    path: '/moduleC/page1'
                                },
                                {
                                    name: 'page2',
                                    path: '/moduleC/page2'
                                }
                            ]
                        }
                    ]
                }],
                activeMenu: ''
            };
        },
        watch: {
            active: {
                handler () {
                    const hash = window.location.hash
                    this.activeMenu = hash.split('#')[1]
                }
            }
        },
        methods: {
            menuClick(item) {
                window.location.href = '/#' + item
            }
        }
    }
</script>

<style lang="less">
.main-menu {
    position: fixed;
    left: 0;
    top: 70px;
    height: calc(100% - 70px);
}

.main-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>