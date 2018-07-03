<template>
  <div class="sidebar" :style="{ height:sidebarHeight }">
    <router-link to="/project/all-project" exact>项目总览</router-link>
    <router-link to="/project/my-project" exact>我申请的项目</router-link>
    <router-link to="/project/manage-project" exact>我负责的项目</router-link>
    <router-link to="/project/assigned-project" exact>
    <el-badge :value="this.$store.state.project['notAssignedCount']" :max="10" class="item">
      <span class="take-num">待分配</span>     
    </el-badge>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "sidebar", 
  data(){
   return{
    sidebarHeight: (window.innerHeight-58)+'px',
   } 
  },
  methods:{
  },
  created() {
  },
}
</script>

<style lang="scss" scoped>
span.take-num{
  display: inline-block;
  padding: 0px 12px;
}
</style>
<style>
.el-badge__content{
  border:none;
}
</style>

