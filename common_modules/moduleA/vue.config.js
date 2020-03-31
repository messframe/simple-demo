const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === 'development' ? 'http://localhost:8238' : 'https://mess-c.winerlu.com/moduleA',
    lintOnSave: false,
    chainWebpack: config => {
        config.entryPoints.clear()
        config.entry('moduleA').add(process.env.VUE_APP_ENTRY).end()
        if (process.env.VUE_APP_CURRENTMODE === 'portal') {
            config.output.filename('moduleA.js').library('moduleA').libraryTarget('amd').end()
        } else {
            config.output.filename('moduleA.js').library('moduleA')
        }
        config.devServer.port(8238).headers({
            "Access-Control-Allow-Origin": "*",
        })
        if (process.env.VUE_APP_CURRENTMODE === 'portal') {
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
    outputDir: path.resolve(__dirname, './build/moduleA')
}