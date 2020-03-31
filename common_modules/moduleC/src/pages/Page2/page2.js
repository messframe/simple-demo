import React from 'react'
import PropTypes from 'prop-types'
import {PageHeader, Skeleton, Result, Button} from 'antd'
import './page2.less'

class Page2 extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loadingStatus: false
        }
    }
    componentDidMount () {
        this.setState({
            loadingStatus: true
        })
        setTimeout(() => {
            this.setState({
                loadingStatus: false
            })
        }, 2000)
    }
    openWindow = (url) => {
        window.open(url)
    }
    render () {
        return (
            <div className="moduleC-page2">
                <PageHeader
                    className="site-page-header"
                    title="moduleC-page2"
                    subTitle="现在是moduleC的page2页面"
                />
                <Skeleton active loading={this.state.loadingStatus}/>
                <Skeleton active loading={this.state.loadingStatus}/>
                <Skeleton active loading={this.state.loadingStatus}/>
                <div style={{display: this.state.loadingStatus ? 'none' : 'block'}}>
                    <Result
                        status="success"
                        title="成功解锁新姿势!"
                        subTitle="通过这个DEMO，想必你已经大概了解single-spa能够做什么了吧？而mess-cli则是为你封装了一层single-spa的逻辑代码，让你更好上手！."
                        extra={[
                        <Button type="primary" key="1" onClick={() => {this.openWindow('https://single-spa.js.org')}}>
                            去了解一下single-spa
                        </Button>,
                        <Button type="primary" key="2" onClick={() => {this.openWindow('https://www.messcli.cn/#/')}}>
                            去了解一下mess-cli
                        </Button>,
                        <Button key="3">下次一定</Button>,
                        ]}
                    />
                </div>
            </div>
        )
    }
}

export default Page2