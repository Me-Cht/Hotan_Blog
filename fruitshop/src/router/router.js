import Vue from "vue";
import VueRouter from "vue-router";
import register from "@/views/register/index.vue";
import todolist from "@/site/product/todolist/todolist.vue";
import home from "@/pages/Home.vue";
import about from "@/site/about/about.vue";
import blog from "@/pages/Blog.vue";
import product from "@/site/product/mianpage/index.vue";
import github from "@/site/github/github.vue";
import login from "@/views/login/index.vue";
import Dashboard from "@/views/fruit/Dashboard.vue";
import detail from "@/views/fruit/detail/FruitDetail.vue";
import searchView from "@/views/fruit/search/SearchView.vue";
import edit from "@/views/fruit/edit/index.vue";
import add from "@/views/fruit/add/index.vue";
import userdetail from "@/views/user/userdetail/index.vue";
import store from "@/store/store";
import info from "@/pages/Info.vue";
import {head} from "axios";
import header from "@/components/Header.vue";
import mylogin from "@/views/login/mylogin.vue";
import firstPages from "@/components/FirstPages.vue";


Vue.use(VueRouter)
// function isAuthenticated() {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return user && user.token;
// }

const routes = [
    { path:'/' ,redirect:'/firstpages'},
    { path:'/register',component: register},
    {path:'/todolist',component: todolist},
    { path: '/home',component: home,
        children: [
            { path:'/about',component: about},
            { path:'/blog',component: blog},
            { path:'/product',component: product},
            { path: '/info',component: info},
            {path:'/mylogin',component: mylogin},
            {path:'/firstpages',component: firstPages},

            { path:'/github',component: github,
            children:[
            ]}

        ]},
    { path: '/login',component: login},
    { path: '/dashboard',component: Dashboard,
        children:[
            { path:'/detail',component: detail},
            { path: '/search',component: searchView},
            { path:'/edit',component: edit},
            { path:'/add',component: add},
            { path:'/userdetail',component: userdetail}

        ]},
    {path :'/header',component: header}

]

const router = new VueRouter({
    mode:'hash',
    routes,
})
router.beforeEach((to, from, next) => {
    /*检查是否需要认证：根据路由元信息（meta）中的requiresAuth属性，判断当前路由是否需要认证才能访问。*/

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    /*检查是否已认证：从本地存储（localStorage）中获取用户信息，判断是否已认证。*/

    const isAuthenticated = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).token;
    /*控制路由切换：如果当前路由需要认证而用户未认证，则跳转到登录页面；否则，允许路由切换。*/
    if (requiresAuth && !isAuthenticated && to.path !== '/') {
        next('/');
        //next()用于继续路由切换，而next('/')则用于中断路由切换并跳转到指定的路由。
    } else {
        const token = localStorage.getItem('token');
        store.commit('setToken', token);

        next()

    }

}
);

export default router


