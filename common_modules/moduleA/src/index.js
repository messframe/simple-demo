// import './set-public-path';
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';
import router from './router'
import ElementUI from 'element-ui'
import store from './store'

Vue.use(ElementUI)

Vue.config.productionTip = false;

let el = document.getElementById('app_moduleA')
if(!el) {
  el = document.createElement('div');
  el.id = 'app_moduleA';
  document.body.appendChild(el);
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    router,
    store,
    render: (h) => h(App),
    el: '#app_moduleA',
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
