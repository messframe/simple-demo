<template>
    <div class="main-container" ref="mainContainer" id="mainContainer">
        <div id="app_moduleA"></div>
        <div id="app_moduleB"></div>
        <div id="app_moduleC"></div>
    </div>
</template>

<script>
let preUrl = ''
export default {
    name: 'main-container',
    methods: {
        
    }
}
</script>

<style lang="less" scoped>
.main-container {
    padding: 70px 0 0 200px;
    height: 100%;
    width: 100%;
    & > div {
        width: 100%;
        height: 100%;
    }
}
</style>