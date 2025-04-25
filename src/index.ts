import type { App } from 'vue'
import MyButton from './components/Button.vue'

// 组件列表
const components = [
    MyButton
]

// 定义 install 方法
const install = (app: App): void => {
    // 注册所有组件
    components.forEach(component => {
        if (component.name) {
            app.component(component.name, component)
        }
    })
}

// 导出 install 方法
export default {
    install
}

// 导出单个组件
export { MyButton } 