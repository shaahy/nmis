import Vue from 'vue'
import VueRouter from 'vue-router'
import AddBlog from '@/pages/AddBlog'  //示例
import ShowBlogs from '@/pages/ShowBlogs' //示例
import Home from '@/pages/Home' //示例
import Test from '@/pages/Test' //示例
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
      path:"/show-blog",
      component: ShowBlogs
    },
    {
      path:"/add-blog",
      component: AddBlog
    },
    {
      path:"/test",
      component: Test
    }
  ],
  mode: "history"
});

