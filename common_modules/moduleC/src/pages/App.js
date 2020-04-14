import HomePage from './HomePage/homePage'
import Page1 from './Page1/page1'
import Page2 from './Page2/page2'
import React from 'react'
import {Route,BrowserRouter, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateAuth} from '../store/actions'
import {notification} from 'antd'
import {singleSpa} from '../utils/singleSpa'
import PropTypes from 'prop-types'
import './app.less'

class App extends React.Component {
    constructor(props){
        super(props)
	}
    componentDidMount () {
        if (singleSpa.eventBus) {
            singleSpa.eventBus.on('authChange', this.updateAuth)
        }
    }
    updateAuth = (auth) => {
        notification.success({
            message: 'moduleC成功收到权限变更通知',
            description: '当前权限值为：' + auth,
        });
        this.props.updateAuth(auth)
    }
    render () {
        return (
            <div className='moduleC-content'>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/moduleC" component={(props) => <HomePage {...props} {...this.props}/>}/>
                        <Route exact path="/moduleC/page1" component={(props) => <Page1 {...props} {...this.props}/>}/>
                        <Route exact path="/moduleC/page2" component={(props) => <Page2 {...props} {...this.props}/>}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = {
    updateAuth
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)