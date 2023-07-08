import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import store from "@/store/store";
import router from './router/router'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store:store,

  render: h => h(App),
}).$mount('#app')
