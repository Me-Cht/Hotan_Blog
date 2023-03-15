import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import FruitsView from "@/views/fruit/FruitsView.vue";
import EditFruitView from "@/views/fruit/EditFruitView.vue";
import AddFruit from "@/views/fruit/AddFruitView.vue";
import SearchView from "@/views/fruit/SearchView.vue";
import Login from "@/views/login/index.vue";

Vue.use(ElementUI);
Vue.use(VueRouter);
function isAuthenticated() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.token;
}

const routes = [
  { path: '/', component: FruitsView, meta: { requiresAuth: true } },
  { path: '/edit/:id', component: EditFruitView },
  { path: '/add', component: AddFruit},
  {path:'/search',component: SearchView},
  {path:'/login',component: Login}
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
