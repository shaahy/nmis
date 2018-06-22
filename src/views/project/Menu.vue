<template>
  <div class="sidebar" :style="{ height:sidebarHeight }">
    <router-link to="/project/my-project" exact>项目总览</router-link>
    <router-link to="/project/manage-project" exact>项目管理</router-link>
    <router-link to="/project/assigned-project" exact>项目分配</router-link>
    <router-link to="/project/edit-flow" exact>项目流程编辑</router-link>
  </div>
</template>

<script>
export default {
  name: "sidebar", 
  data(){
   return{
    sidebarHeight: (window.innerHeight-58)+'px'
   } 
  }
}
</script>

<style lang="scss" scoped>

</style>
