import React from 'react'
import PropTypes from 'prop-types'
import {PageHeader, List, Avatar} from 'antd'
import './page1.less'
import avatar from '../../assets/avatar.png'

class Page1 extends React.Component {
    render () {
        const data = [
            '为你封装了一个基于single-spa核心服务模板，通过一个配置文件，可以注册APP、子模块的路由管理、全局的事件总线、公共依赖抽离.',
            '为你封装了一个基于single-spa-vue的vue项目模板，并为你配置好了webpack的多种打包模式，包含依赖于核心服务的本地运行、打包和不依赖核心服务的本地运行模式.',
            '为你封装了一个基于single-spa-react的react项目模板，并为你配置好了webpack的多种打包模式，包含依赖于核心服务的本地运行、打包和不依赖核心服务的本地运行模式.',
            '将以上三种模板集成到一个脚手架中，名为mess-cli，让你不需要花费较多的事件在编写子模块注册、打包的配置等，快速上手.',
            '模板直接暴露所有的配置文件及相关源码，使用者可以在这基础上，参考single-spa的官网，个性化配置每一个子模块的注册、打包、公共依赖添加等逻辑.',
            '综上所述，mess-cli只是为你做了机械的配置步骤，并允许你直接修改核心服务的配置文件，对整个网站进行定制化修改.',
        ];
        const data2 = [
            {
              title: 'mess-cli',
            }
        ];
        return (
            <div className="moduleC-page1">
                <PageHeader
                    className="site-page-header"
                    title="moduleC-page1"
                    subTitle="现在是moduleC的page1页面"
                />
                <List
                    itemLayout="horizontal"
                    dataSource={data2}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src={avatar} />}
                            title={<a href="github.com/messframe/mess-cli" target='blank'>{item.title}</a>}
                            description="mess-cli提供的功能并不多，它只是将集成一个single-spa的通用配置，制作成了一个脚手架而已~"
                            />
                        </List.Item>
                    )}
                />
                <List
                    size="large"
                    header={<div>mess-cli所提供的功能</div>}
                    footer={<div>完毕</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </div>
        )
    }
}

export default Page1