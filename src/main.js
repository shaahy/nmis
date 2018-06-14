import Vue from 'vue'
import VueCookies from 'vue-cookies'       //引入cookie模块
import ElementUI from 'element-ui'         //引入elementUI模块    
import './assets/css/element-variables.scss'
import App from './App'
import {router} from './router'            //引入路由模块
import store from './store'
import {http, http_login, checkResData} from './http';                //引入http模块



Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCookies);
Vue.prototype.$axios_login = http_login;
Vue.prototype.$axios = http;
Vue.prototype.$checkResData = checkResData;



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
