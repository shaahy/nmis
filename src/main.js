import Vue from 'vue'
import ElementUI from 'element-ui'         //引入elementUI模块    
import './assets/css/element-variables.scss'
import App from './App'
import {router} from './router'            //引入路由模块
import store from './store'
import {http, http_login, checkResData} from './http';    //引入http模块
import apiConfig from '@/config/api'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios_login = http_login;
Vue.prototype.$axios = http;
Vue.prototype.$checkResData = checkResData;
Vue.prototype.$api = apiConfig.api
console.log(apiConfig.api);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
