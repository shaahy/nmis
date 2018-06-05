import Vue from 'vue'
import App from './App'
import {router} from './router' //引入路由模块
import axios from './http'; //引入http模块

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
