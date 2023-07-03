import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import Dashboard from "@/views/fruit/Dashboard.vue";
import detail from "@/views/fruit/detail/FruitDetail.vue";
import searchView from "@/views/fruit/search/SearchView.vue";
import edit from "@/views/fruit/edit/index.vue";
import add from "@/views/fruit/add/index.vue";
import login from "@/views/login/index.vue";
import userdetail from "@/views/user/userdetail/index.vue";
import register from "@/views/register/index.vue";
import home from "@/site/home/index.vue";
import about from "@/site/about/about.vue";
import product from "@/site/product/mianpage/index.vue";
import todolist from "@/site/product/todolist/todolist.vue";
import blog from "@/site/blog/index.vue";

Vue.use(ElementUI);
Vue.use(VueRouter);
function isAuthenticated() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.token;
}

const routes = [
  { path:'/',redirect:'/login'},
  { path:'/register',component: register},
  { path:'/about',component: about},
  {path:'/todolist',component: todolist},

  { path:'/product',component: product,
  children: [
  ]},
  { path: '/home',component: home},
  { path: '/login',component: login},
  { path: '/dashboard',component: Dashboard,
    children:[
      { path:'/detail',component: detail},
      { path: '/search',component: searchView},
      { path:'/edit',component: edit},
      { path:'/add',component: add},
      { path:'/userdetail',component: userdetail}

    ]},
  { path:'/blog',component: blog}
];



const router = new VueRouter({
  mode: 'hash', // 修改为hash模式
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
    next();
  }

});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
