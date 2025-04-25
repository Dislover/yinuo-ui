# My UI Components

一个基于 Vue 3 的轻量级 UI 组件库

## 安装

```bash
npm install my-ui-npm
```

## 使用

### 完整引入

```javascript
import { createApp } from 'vue'
import MyUI from 'my-ui-npm'
import App from './App.vue'

const app = createApp(App)
app.use(MyUI)
app.mount('#app')
```

### 按需引入

```javascript
import { createApp } from 'vue'
import { MyButton } from 'my-ui-npm'
import App from './App.vue'

const app = createApp(App)
app.component('MyButton', MyButton)
app.mount('#app')
```

## 组件

### Button 按钮
基础的按钮组件，支持多种状态和样式。

#### 基础用法
```vue
<template>
  <my-button>默认按钮</my-button>
  <my-button type="primary">主要按钮</my-button>
  <my-button type="success">成功按钮</my-button>
  <my-button type="warning">警告按钮</my-button>
  <my-button type="danger">危险按钮</my-button>
</template>
```

#### Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 按钮类型 | string | default/primary/success/warning/danger | default |
| plain | 是否朴素按钮 | boolean | - | false |
| round | 是否圆角按钮 | boolean | - | false |
| disabled | 是否禁用 | boolean | - | false |

#### Events
| 事件名 | 说明 | 回调参数 |
|------|------|------|
| click | 点击按钮时触发 | event: MouseEvent |

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建组件库
npm run build
```

## License

[MIT](LICENSE)
