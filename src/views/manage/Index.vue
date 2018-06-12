<template>
  <el-row>
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <div class="main-container" :style="{width:innerWidth}">
      <router-view></router-view>
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
     innerWidth: (window.innerWidth-185)+'px'
    }
  },
  components:{
    "app-header": AppHeader,
    "app-sidebar": Menu
  },
  created(){
    this.$store.commit('nav/setManageActive');
  },
  mounted(){
    window.onresize = res =>{
      this.innerWidth = (window.innerWidth-185)+'px';
      console.log(window.innerWidth)
    }
  }  
}
</script>

<style lang="scss" scoped>

</style>
