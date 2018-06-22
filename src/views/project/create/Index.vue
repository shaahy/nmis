<template>
  <div class="">
    <app-tag title="新建项目"></app-tag>
    <!-- 暂时隐藏三级路由导航 -->
    <!-- <router-link to="/project/create/device">信息化硬件申请</router-link>
    <router-link to="/project/create/software">信息化软件申请</router-link>
    <router-link to="/project/create/equipment">医疗器材申请</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
import AppTag from '@/components/AppTag';
export default {
  name: 'create-index',
  data () {
    return {

    }
  },
  components:{
    "app-tag": AppTag
  }
}
</script>

<style lang="scss" scoped>

</style>
