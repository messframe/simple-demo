import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import {Provider} from 'react-redux'
import store from './store/index'
import './css/reset.css'

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    app
);