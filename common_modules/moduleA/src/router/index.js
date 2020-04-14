import Vue from 'vue'
import Router from 'vue-router'

import modulesA from './modulesA'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        ...modulesA
    ]
})

export default router