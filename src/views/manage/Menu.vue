<template>
  <div class="sidebar" :style="{ height:sidebarHeight }">
    <router-link to="/manage/role" exact>角色管理</router-link>
    <router-link to="/manage/staff" exact>人员管理</router-link>
    <router-link to="/manage/department" exact>部门管理</router-link>
  </div>
</template>

<script>
export default {
  name: "sidebar", 
  data(){
   return{
    sidebarHeight:(window.innerHeight-58)+'px'
   } 
  },
  mounted(){
    window.onresize = res =>{
      this.sidebarHeight = (window.innerHeight-58)+'px';
    }
  }

}
</script>


<style lang="scss" scoped>
.sidebar{
  width: $sidebar-width;
  padding-top:30px;
  background-color: #fff;
  a{
    display: block;
    padding: 15px 0;
    text-align: center;
    color:#333;
    margin:3px 0;
    &:hover{
      background-color: $main-color;
      color:#fff;
    }
    transition: 0.3s;
    &.router-link-active{
      background-color: $main-color;
      color:#fff;
    }
  }
}

</style>
