import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import FruitsView from "@/views/FruitsView.vue";
import EditFruitView from "@/views/EditFruitView.vue";
Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [
  { path: '/', component: FruitsView },
  { path: '/edit/:id', component: EditFruitView }
];

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
