import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home' //示例
import Test from '@/pages/Test' //测试用
import Login from '@/pages/Login' //载入登陆页

Vue.use(VueRouter)

//配置一
export const router =  new VueRouter({
  routes:[
    {
      path:"/",
      component: Login,
      name:"LoginLink"
    },
    {
      path:"/home",
      component: Home
    },    
    {
      path:"/test",
      component: Test
    }
  ],
  mode: "history"
});

