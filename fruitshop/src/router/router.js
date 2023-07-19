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
import changePass from "@/pages/ChangePass.vue";
import aboutProduct from "@/site/about/aboutProduct.vue";


Vue.use(VueRouter)
// function isAuthenticated() {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return user && user.token;
// }

const routes = [
    { path: '/', redirect: '/login'},
    { path:'/register',component: register},
    {path:'/todolist',component: todolist},
    { path: '/home',component: home,
        // meta:{
        //     requiresAuth:true
        // },

        children: [
            { path:'/about',component: about,meta:{requiresAuth:true}},
            { path:'/blog',component: blog,meta:{requiresAuth:true}},
            { path:'/product',component: product,meta:{requiresAuth:true}},
            { path: '/info',component: info,meta:{requiresAuth:true}},
            {path:'/firstpages',component: firstPages,meta:{requiresAuth:true}},
            { path:'/aboutProduct',component: aboutProduct,meta:{requiresAuth:true}},

            { path:'/github',component: github,
            children:[
            ]}

        ]},
    { path: '/login',component: login},
    { path: '/changePass',component: changePass},
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
    const token = localStorage.getItem('token')

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 需要登录验证的路由
        if (!token) {
            // 存在 token，允许跳转到目标路由
            next('/login')
        } else {
            // 不存在 token，跳转到登录页
            next()
        }
    } else {
        // 不需要登录验证的路由，直接允许跳转
        next()
    }
})

export default router


