import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from "element-plus";

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/index.html',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/home.vue')
    },
    {
        path: '/login:catchAll(.*)',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/goods:catchAll(.*)',
        component: () => import('@/components/goods.vue')
    },
    {
        path: '/goodCar:catchAll(.*)',
        component: () => import('@/views/goodCar.vue')
    },
    {
        path: '/getSubItem',
        component: () => import('@/views/carousel.vue')
    },
    {
        path: '/breakfast',
        component: () => import('@/components/zzocang.vue')
    },
    {
        path: '/hotel',
        component: () => import('@/components/jiudian.vue')
    },
    {
        path: '/household',
        component: () => import('@/components/jiazheng.vue')
    },
    {
        path: '/wellness',
        component: () => import('@/components/kangyang.vue')
    },
    {
        path: '/supermaker',
        component: () => import('@/components/superMaker.vue')
    },
    {
        path: '/detail:catchAll(.*)',
        component: () => import('@/views/detail.vue')
    },
    {
        path: '/queryOrder',
        component: () => import('@/components/queryOrder.vue')
    },
    {
        path: '/changeP',
        component: () => import('@/utils/changeP.vue')
    },
    {
        path: '/join',
        component: () => import('@/components/joinus.vue'),
        children: [
            {
                path: 'introduction',
                component: () => import('@/components/introduction.vue')
            },
            {
                path: 'culture',
                component: () => import('@/components/culture.vue')
            },
            {
                path: 'model',
                component: () => import('@/components/model.vue')
            },
            {
                path: 'charitable',
                component: () => import('@/components/charitable.vue')
            },
            {
                path: 'join',
                component: () => import('@/components/jiaruwomen.vue')
            },
        ]
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('@/utils/404.vue')
    }

]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})
router.beforeEach((to, from, next) => {
    //对于登录页面,主页，商城页不拦截
    if (to.path === '/login' || to.path === '/home' || to.path ==='/supermaker') {
        // 接下来的函数
        next();
    }
    else {
        //   //var会将作用域放大，let只是局部的作用域
        let username = window.sessionStorage.getItem('token');
        //   //用户访问认证后页面时 必须校验用户信息是否存在，不存在去登陆页
        if (username === null || username === '') {

            window.sessionStorage.setItem("returnUrl",to.fullPath)
            ElMessage({
                showClose: true,
                message: "请先登录!",
                type: "warning",
            });
            return next(`/login?l=signin&r=${to.fullPath}`);
        } else {
            next();
        }
    }
})
export default router