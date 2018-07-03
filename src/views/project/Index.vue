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
     innerWidth: (window.innerWidth-185)+'px',
     staff:{},
    }
  },
  components:{
    "app-header": AppHeader,
    "app-sidebar": Menu
  },
  methods:{
    //初始化
    init(){
      this.$store.commit('nav/setProjectActive');
      this.staff = this.$store.getters["user/getStaff"];
      this.getProjects();
    },
    //获取待分配项目数据
    getProjects() {
      this.$axios
        .get(`${this.$api.get_projet_list}?organ_id=${this.staff.organ_id}&type=undispatch`)        
        .then(res => {
          this.$checkResData(res);
          //将数据保存至store中
          this.$store.state.project['notAssignedCount'] = res.data.projects.length > 0 ? res.data.projects.length : '';
        })
        .catch(err => {
          console.log(err);
        });
    },    
  },

  created(){
    this.init();
  },
  mounted(){
    window.onresize = res =>{
      this.innerWidth = (window.innerWidth-185)+'px';
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
