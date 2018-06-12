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
  }
}
</script>

<style lang="scss" scoped>

</style>
