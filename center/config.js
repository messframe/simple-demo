module.exports = {
    "title": "center",
    "routerMode": 'history',
    "components": {
        "center": {
            "moduleName": "@center/config",
            "origin": "http://localhost:8233",
            "entry": "/config.js"
        },
        "routeControl": {
            "moduleName": "@center/routeControl",
            "origin": "http://localhost:8237",
            "entry": "/routeControl.js",
            "router": true
        },
        "moduleA": {
            "moduleName": "@center/moduleA",
            "origin": "http://localhost:8238",
            "prodOrigin": "https://mess-c.winerlu.com/moduleA",
            "entry": "/moduleA.js"
        },
        "moduleB": {
            "moduleName": "@center/moduleB",
            "origin": "http://localhost:8239",
            "prodOrigin": "https://mess-c.winerlu.com/moduleB",
            "entry": "/moduleB.js"
        },
        "moduleC": {
            "moduleName": "@center/moduleC",
            "origin": "http://localhost:8240",
            "prodOrigin": "https://mess-c.winerlu.com/moduleC",
            "entry": "/moduleC.js"
        }
    },
    "common-deps": {
        "development": {
            "react": "/react.development.js",
            "react-dom": "/react-dom.development.js",
            "react-dom/server": "/react-dom-server.browser.development.js",
            "redux": "/redux.js",
            "react-redux": "/react-redux.js",
            "single-spa": "/single-spa.min.js",
            "lodash": "/lodash.js",
            "rxjs": "/rxjs.umd.js",
            "vue": "/vue.js",
            "vuex": "/vuex.js",
            "vue-router": "/vue-router.js",
            "axios": "/axios.js"
        },
        "production": {
            "react": "/react.production.min.js",
            "react-dom": "/react-dom.production.min.js",
            "react-dom/server": "/react-dom-server.browser.production.min.js",
            "redux": "/redux.min.js",
            "react-redux": "/react-redux.min.js",
            "single-spa": "/single-spa.min.js",
            "lodash": "/lodash.min.js",
            "rxjs": "/rxjs.umd.min.js",
            "vue": "/vue.min.js",
            "vuex": "/vuex.min.js",
            "vue-router": "/vue-router.min.js",
            "axios": "/axios.min.js"
        }
    },
    "common-deps-origin": {
        "development": "http://localhost:8200",
        "production": "./common-deps-static"
    },
    "common-deps-conf": {
        "development": "http://localhost:8234",
        "production": "./common-deps"
    }
}