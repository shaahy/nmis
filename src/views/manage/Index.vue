<template>
  <el-row>
    <app-header></app-header>
    <div class="clearfix">
      <div class="left">
        <app-sidebar></app-sidebar>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </el-row>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import Menu from './Menu';
export default {
  name: 'my-project',
  data () {
    return {
     
    }
  },
  components:{
    "app-header": AppHeader,
    "app-sidebar": Menu
  },
  created(){
    this.$store.commit('nav/setManageActive');
  }
}
</script>

<style lang="scss" scoped>
.left{
  float: left;
  width:$sidebar-width;
}
.right{
  float:left;
  padding: 30px;
}
</style>
