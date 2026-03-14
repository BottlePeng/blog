import { createWebHistory, createRouter } from 'vue-router'
import OverView from '../views/OverView.vue'
import IndexView from '../views/IndexView.vue'
import LocalFile from '../views/LocalFile.vue'
import Acticle from '../views/Acticle.vue'
import Setting from '../views/Setting.vue'

const routes = [
    {
        path: '/',
        name: '/home',
        redirect: '/overview',
        component: IndexView,
        children: [
            {
                // 当 /overview 匹配成功
                // UserProfile 将被渲染到 User 的 <IndexView> 内部
                path: 'overview',
                component: OverView,
            },
            {
                path: 'localfile',
                component: LocalFile,
            },
            {
                path: 'acticle',
                component: Acticle,
            },
            {
                path: 'setting',
                component: Setting,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;