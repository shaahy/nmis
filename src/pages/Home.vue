<template>
  <el-row class="my-project">
    <h1>测试主页</h1>
      <el-col v-for="(value, key) in staff" :key="key" :span="6">
        {{ key }} : {{ value }}
      </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      staff:{}
    }
  },
  created(){
    //获取用户信息
    this.staff = this.$store.getters['user/getStaff']
  }
}
</script>

<style lang="scss" scoped>

.el-row{
  h1{
    margin: 40px auto;
    text-align: center;
  }
  .el-col{
  font-size: 18px;
  font-weight: bold;
  padding:10px;
}

}

</style>
