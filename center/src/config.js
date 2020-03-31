import isActive from './activityFns.js'
import * as singleSpa from 'single-spa'
import config from '../config.js'
import EventBus from './tools/eventBus'

window.eventBus = new EventBus()
window.EventBus = EventBus

/**
 * 根据配置文件，
 * 注册single-spa模块：registerApplication
 * 注入router判断逻辑
 */
for (let component in config.components) {
    if (component === 'center') continue
    let componentObj = config.components[component]
    singleSpa.registerApplication(component, () => SystemJS.import(componentObj.moduleName), () => {
        if (componentObj.router === true) {
            return componentObj.router
        } else {
            return isActive(componentObj.router || component)
        }
    })
}
singleSpa.start()
