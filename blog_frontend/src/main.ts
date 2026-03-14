import { createApp } from 'vue'
import App from './App.vue'

import '@yike-design/ui/es/index.less'
import './style.less'
// 引入全局方法
import { YkMessage, YkNotification } from '@yike-design/ui'
// 全局注入 icon
import Icon from '@yike-design/ui/es/components/svg-icon'

// 路由
import router from './router'

const app = createApp(App)

app.config.globalProperties.$notification = YkNotification
app.config.globalProperties.$message = YkMessage

app
    .use(router)
    .use(Icon)
    .mount('#app')