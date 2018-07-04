<template>
  <div class="sidebar" :style="{ height:sidebarHeight }">
    <router-link to="/project/all-project" exact v-if="staff.is_admin">项目总览</router-link>
    <router-link to="/project/my-project" exact>我申请的项目</router-link>
    <router-link to="/project/manage-project" exact>我负责的项目</router-link>
    <router-link to="/project/assigned-project" exact v-if="isAssigner || staff.is_admin">
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
    isAssigner:false,
    staff:{},
   } 
  },
  methods:{
    init(){
      this.staff = this.$store.getters["user/getStaff"];
      this.isAssigner = this.staff.group_cate === "GPA" ? true : false;
    }
  },
  created() {
    this.init();
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

