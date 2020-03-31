import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        auth: ''
    },
    mutations: {
        setAuth (state, data) {
            state.auth = data
        }
    }
})