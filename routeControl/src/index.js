import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';
import ELementUI from 'element-ui'
Vue.use(ELementUI)

Vue.config.productionTip = false;

let el = document.getElementById('app_routeControl')
if(!el) {
  el = document.createElement('div');
  el.id = 'app_routeControl';
  document.body.appendChild(el);
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h) => h(App),
    el: '#app_routeControl',
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
