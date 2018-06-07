import Vue from 'vue'
import App from './App'
import {router} from './router'            //引入路由模块
import axios from './http';                //引入http模块
import {store} from './store'
import ElementUI from 'element-ui'         //引入elementUI模块    
import './assets/css/element-variables.scss'


Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(ElementUI);


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
