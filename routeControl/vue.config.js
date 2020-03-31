const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === 'development' ? 'http://localhost:8237' : '/routeControl',
    lintOnSave: false,
    chainWebpack: config => {
        config.entryPoints.clear()
        config.entry('routeControl').add(process.env.VUE_APP_ENTRY).end()
        if (process.env.VUE_APP_CURRENTMODE === 'center') {
            config.output.filename('routeControl.js').library('routeControl').libraryTarget('amd').end()
        } else {
            config.output.filename('routeControl.js').library('routeControl')
        }
        config.devServer.port(8237).headers({
            "Access-Control-Allow-Origin": "*",
        })
        if (process.env.VUE_APP_CURRENTMODE === 'center') {
            config.externals(['vue', 'vue-router']);
        }
        config.module.rule('images').use('url-loader').loader('url-loader').tap(options => ({
            limit: 4096,
            fallback: {
            loader: 'file-loader',
            options: {
                name: 'img/[name].[ext]'
            }
            }
        }))
    },
    outputDir: path.resolve(__dirname, '../center/build/routeControl')
}