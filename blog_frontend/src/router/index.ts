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


router.beforeEach(async (to, from, next) => {
    try {
        // 调用 API 检查注册状态
        const res = await isRegisterApi();
        const isRegistered = res.data?.isRegister === true;

        // 如果已经注册，直接跳转到登录页
        if (isRegistered) {
            console.log('已注册，跳转到登录页');

            // 如果已经在登录页，允许访问
            if (to.path === '/login') {
                next();
                return;
            }

            // 其他所有页面都跳转到登录页
            next('/login');
            return;
        }

        // 未注册的用户逻辑
        if (!isRegistered) {
            // 如果已经在注册页，允许访问
            if (to.path === '/signup') {
                next();
                return;
            }
            // 否则跳转到注册页
            console.log('未注册，跳转到注册页');
            next('/signup');
            return;
        }

        // 默认放行（实际上不会执行到这里，因为上面都有 return）
        next();

    } catch (error) {
        console.error('路由守卫错误:', error);
        // 出错时，允许访问登录页和注册页
        if (to.path === '/login' || to.path === '/signup') {
            next();
        } else {
            next('/login');
        }
    }
});

export default router;