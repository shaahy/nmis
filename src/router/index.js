import Vue from 'vue'
import VueRouter from 'vue-router'
import AddBlog from '@/pages/AddBlog'  //示例
import ShowBlogs from '@/pages/ShowBlogs' //示例
import Home from '@/pages/Home' //示例

Vue.use(VueRouter)

//配置一
export const router =  new VueRouter({
  routes:[
    {
      path:"/",
      component: Home
    },
    {
      path:"/show-blog",
      component: ShowBlogs
    },
    {
      path:"/add-blog",
      component: AddBlog
    }
  ],
  mode: "history"
});

