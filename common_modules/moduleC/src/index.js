import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import { property } from 'lodash'
import setPublicPath from './set-public-path.js'
import rootComponent from './root.component'

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent,
  domElementGetter,
})

export const bootstrap = [
  () => {
    return setPublicPath()
  },
  reactLifecycles.bootstrap,
]

export const mount = [
  reactLifecycles.mount,
]

export const unmount = [
  reactLifecycles.unmount,
]

export const unload = [
  reactLifecycles.unload,
]

function domElementGetter() {
  let el = document.getElementById("app_moduleC");
  if (!el) {
    el = document.createElement('div');
    el.id = 'app_moduleC';
    document.body.appendChild(el);
  }

  return el;
}
