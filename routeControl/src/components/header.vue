<template>
    <div class='header'>
        <div class='header-left'>
            Mess-cli DEMO
        </div>
        <div class="header-center">
            如果觉得赞！！请在github上给我一颗星吧！右上角github链接，THANKS!
        </div>
        <div class='header-right'>
            <el-avatar class="user-avatar" shape="square" :size="50" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
            <el-dropdown class="user-dropdown">
                <span class="el-dropdown-link">
                    用户名<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon='el-icon-back'>退出 </el-dropdown-item>
                    <el-dropdown-item icon='el-icon-s-tools'>设置 </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-select class="auth-select" size='small' v-model="auth" placeholder="请选择权限">
                <el-option value='visitor' label='游客'></el-option>
                <el-option value='admin' label='管理员'></el-option>
            </el-select>
            <ColorPick></ColorPick>
            <div class="header-right-link" @click="this.openWindow('https://github.com/messframe/simple-demo')">
                <span>DEMO</span>
                <i class="el-icon-link"></i>
            </div>
            <div class="header-right-link" @click="this.openWindow('https://github.com/messframe/mess-cli')">
                <span>mess-cli</span>
                <i class="el-icon-link"></i>
            </div>
        </div>
    </div>
</template>

<script>
import ColorPick from './colorPick'
export default {
    name: 'main-header',
    components: {
        ColorPick
    },
    data () {
        return {
            auth: 'visitor'
        }
    },
    mounted () {
        setTimeout(() => {
            window.eventBus.trigger('authChange', this.auth)
        })
    },
    watch: {
        auth: {
            handler (val) {
                this.$message.success('设置当前的权限为： ' + val);
                window.eventBus.trigger('authChange', val)
            },
            openWindow (url) {
                window.open(url)
            }
        }
    }
}
</script>

<style lang="less">
@import url('../assets/varibles.less');
.header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 70px;
    border-bottom: 1px #eee solid;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: @themColor2;
    box-shadow: 0 0 5px lightgray;
    &-left {
        color: @themColor6;
    }
    &-right {
        display: flex;
        align-items: center;
        .user-avatar {
            margin-right: 20px;
        }
        .user-dropdown {
            margin-right: 20px;
        }
        .el-dropdown-link {
            cursor: pointer;
            color: @themColor;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
        .auth-select {
            width: 100px;
            margin-right: 10px;
        }
        &-link {
            margin-left: 10px;
            color: @themColor;
            cursor: pointer;
            transition: color .3s;
            &:hover {
                color: @themColor8;
            }
            span, i {
                vertical-align: middle;
            }
            i {
                font-size: 18px;
            }
        }
    }
}
</style>