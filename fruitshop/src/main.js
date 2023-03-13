import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import FruitsView from "@/views/FruitsView.vue";
import EditFruitView from "@/views/EditFruitView.vue";
import AddFruit from "@/views/AddFruitView.vue";
import SearchView from "@/views/SearchView.vue";
import Login from "@/views/login/index.vue";

Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [
  { path: '/', component: FruitsView },
  { path: '/edit/:id', component: EditFruitView },
  { path: '/add', component: AddFruit},
  {path:'/search',component: SearchView},
  {path:'/login',component: Login}
];

const router = new VueRouter({
  mode: 'hash', // 修改为hash模式
  routes,
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
