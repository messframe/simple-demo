let run_env = process.env.run_env

let babelConfig = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ]
    ]
}
/**
 * 本地单模块运行时，antd的样式表虽然在入口文件引入
 * 但是antd样式文件被添加进head标签的最后一个
 * 覆盖了内部组件的一些样式
 * 这里采用按需加载的方式，保证单个组件内部的样式表顺序正常
 * 
 * 以核心服务运行时，则不需要按需加载，由核心服务统一引入
 * 避免样式重复加载
 */
if (run_env === 'local') {
    babelConfig.plugins.push(
        ["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css" // `style: true` 会加载 less 文件
        }]
    )
}

module.exports = babelConfig