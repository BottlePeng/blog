import { createWebHistory, createRouter } from 'vue-router'
import OverView from '../views/OverView.vue'
import IndexView from '../views/IndexView.vue'
import LocalFile from '../views/LocalFile.vue'
import Acticle from '../views/Acticle.vue'
import Setting from '../views/Setting.vue'
import Login from '../views/Login.vue'
import { isRegisterApi } from '../api/index';
import Signup from '../views/Signup.vue'

export const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },
    {
        path: '/',
        component: IndexView,
        children: [
            {
                path: '',  // 空路径，对应 /
                redirect: '/view'  // 重定向到 /view
            },
            {
                path: 'view',
                component: OverView,
            },
            {
                path: 'view/file',
                component: LocalFile,
            },
            {
                path: 'view/acticle',  // 注意拼写
                component: Acticle,
            },
            {
                path: 'view/setting',
                component: Setting,
            },
        ],
    },
    // 404 页面
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


// 添加路由守卫，检查登录状态
// 记录最后一次请求时间
let lastCheckTime = 0;
const CHECK_INTERVAL = 5000; // 5秒内不重复请求

router.beforeEach(async (to, from, next) => {
    try {
        const now = Date.now();
        let isRegistered;

        // 如果距离上次请求超过5秒，或者没有缓存，才请求 API
        if (now - lastCheckTime > CHECK_INTERVAL) {
            const res = await isRegisterApi();
            isRegistered = res.data?.isRegister === true;

            // 更新最后请求时间
            lastCheckTime = now;

            // 可以临时缓存到localStorage
            localStorage.setItem('isRegistered', isRegistered? "true" : "false");
        } else {
            localStorage.getItem('isRegistered') === "true";
        }

        const isLoggedIn = localStorage.getItem('token');

        // 如果没有注册
        if (!isRegistered) {
            if (to.path === '/signup') {
                next();
                return;
            }
            console.log('未注册，跳转到注册页');
            next('/signup');
            return;
        }

        // 已注册的用户逻辑
        if (isLoggedIn) {
            if (to.path === '/login' || to.path === '/signup') {
                next('/view');
                return;
            }
            console.log('已登录，允许访问');
            next();
            return;
        }

        if (to.path === '/login') {
            next();
            return;
        }

        if (to.path !== '/signup' && to.path !== '/') {
            next('/login');
            return;
        }
        
        next();

    } catch (error) {
        console.error('路由守卫错误:', error);
        if (to.path === '/login' || to.path === '/signup') {
            next();
        } else {
            next('/login');
        }
    }
});

export default router;