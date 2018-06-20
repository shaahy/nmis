import Vue from 'vue'
import VueRouter from 'vue-router';
//一级路由
import Login from '@/views/Login' //登陆页
import ProjectIndex from '@/views/project/Index'; //项目管理
import ManageIndex from '@/views/manage/Index'; //系统管理

//二级路由
import Myproject from '@/views/project/Myproject'; //我的项目
import AssignedProject from '@/views/project/AssignedProject'; //项目分配
import EditFlow from '@/views/project/EditFlow'; //项目流程编辑
import ManageRole from '@/views/manage/Role'; //角色管理
import ManageStaff from '@/views/manage/Staff'; //人员管理
import ManageDepartment from '@/views/manage/DepartMent'; //部门管理


//三级路由

//全局使用
Vue.use(VueRouter)

//路由节点配置
export const router = new VueRouter({
  routes:
  [
    {
      path:"/",
      component: Login,
      name:"loginLink"
    },
    {
      path:"/project",
      component: ProjectIndex,
      name: "projectIndexLink",
      redirect: "/project/my-project",
      children:[
        {
          path:"/project/my-project",
          component: Myproject,
          name: "myProjectLink"
        },
        {
          path:"/project/assigned-project",
          component: AssignedProject,
          name: "assignedProjectLink"
        },
        {
          path:"/project/edit-flow",
          component: EditFlow,
          name: "editFlowLink"
        }
      ]
    },    
    {
      path:"/manage",
      component: ManageIndex,
      name: "manageIndexLink",
      redirect: "/manage/role",
      children:[
        {
          path:"/manage/role",
          component: ManageRole,
          name: "manageRoleLink"
        },
        {
          path:"/manage/staff",
          component: ManageStaff,
          name: "manageStaffLink"
        },
        {
          path:"/manage/department",
          component: ManageDepartment,
          name: "manageDepartmentLink"
        }
      ]      
    }
  ],
  mode:'history',
}) 

/*
全局路由守卫
1、进入所有路由前，判断登陆状态
*/
router.beforeEach((to, from, next)=>{
  var isLogin = localStorage.getItem('isLogin')
  if(to.path == '/'){ 
    //如果是进入登陆页
    next()
  }else{
    //如果是进入非登陆页,判断登陆状态
    if(isLogin == 'true'){
      next()
    }else{
      alert('请先登陆')
      next('/')
    }
  }
})