import { createWebHistory, createRouter } from 'vue-router'
import OverView from '../views/OverView.vue'
import IndexView from '../views/IndexView.vue'
import LocalFile from '../views/LocalFile.vue'
import Acticle from '../views/Acticle.vue'
import Setting from '../views/Setting.vue'

export const routes = [
    {
        path: '/',
        redirect: '/view',
        component: IndexView,
        children: [
            {
                path: '/view',
                component: OverView,
            },
            {
                path: '/view/file',
                component: LocalFile,
            },
            {
                path: '/view/acticle',
                component: Acticle,
            },
            {
                path: '/view/setting',
                component: Setting,
            },
        ],
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;