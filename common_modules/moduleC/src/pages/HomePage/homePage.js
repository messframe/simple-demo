import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Tag, Card, Button } from 'antd'
import './homePage.less'

class HomePage extends React.Component {
    openWindow = (url) => {
        window.open(url)
    }
    rediret = (url) => {
        window.location.href = url
    }
    render () {
        let tagClassName = this.props.auth !== 'admin'  ? 'moduleC-home-primary' : 'moduleC-home-warning'
        return (
            <div className="moduleC-home">
                <Alert message="欢迎尝试基于single-spa封装的脚手架：mess-cli" type="success" showIcon />
                <p style={{marginTop: '20px'}}>
                    <Tag className={tagClassName}>这个人的权限是：{this.props.auth}</Tag >
                </p>
                <Card
                className="moduleC-home-card"
                title={<div>这是一个基于<Tag>single-spa-react</Tag>构建的<Tag>react</Tag>模块，名叫：<Tag>moduleC</Tag></div>}>
                    <p>1. moduleC集成了<Tag>antd-design</Tag>，<Tag>与moduleC共享antd的样式表</Tag>，并且支持一键换肤功能</p>
                    <p>2. moduleC集成了<Tag>redux</Tag>，在入口处，通过<Tag>事件总线监听</Tag>权限的变化，展示不同的样式，同样<Tag>可以用于按钮级别的权限控制</Tag></p>
                    <p>3. 
                        对single-spa感兴趣？
                        <Tag>single-spa官网：
                            <Button type="link" onClick={() => {this.openWindow('https://single-spa.js.org')}}>https://single-spa.js.org</Button>
                        </Tag>，
                        或者对mess-cli感兴趣？
                        <Tag>mess-cli官网：
                            <Button type="link" onClick={() => {this.openWindow('https://www.messcli.cn/#/')}}>https://www.messcli.cn/#/</Button>
                        </Tag>
                    </p>
                </Card>
                <div className='moduleC-home-but'>
                    <Button type='primary' onClick={() => {this.rediret('/#/moduleC/page1')}}>moduleC-page1</Button>
                    <Button type='primary' onClick={() => {this.rediret('/#/moduleC/page2')}}>moduleC-page2</Button>
                </div>
            </div>
        )
    }
}

export default HomePage