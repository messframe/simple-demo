import React from 'react'
import PropTypes from 'prop-types'
import {PageHeader, Timeline} from 'antd'
import './page1.less'
import {singleSpa} from '../../utils/singleSpa'

class Page1 extends React.Component {
    render () {
        return (
            <div className="moduleB-page1">
                <PageHeader
                    className="site-page-header"
                    onBack={() => {singleSpa.router.back()}}
                    title="moduleB-page1"
                    subTitle="现在是moduleB的page1页面"
                />
                <Timeline className='moduleB-page1-timeLine'>
                    <Timeline.Item>2020/3/29，mess-cli的小DEMO完成编写</Timeline.Item>
                    <Timeline.Item>2020/3/27，mess-cli.org官网上线</Timeline.Item>
                    <Timeline.Item>2020/3/26，mess-cli发布beta版</Timeline.Item>
                </Timeline>
            </div>
        )
    }
}

export default Page1