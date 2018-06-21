<template>
  <div class="">
    <el-row>
      <el-button type="primary">提交申请</el-button>
    </el-row>
    <el-row class="row1">
      <div class="item">申请人：{{ applyData.staffName }}</div>
      <div class="item">申请科室：</div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'create-device',
  data () {
    return {
      applyData:{

      }
    }
  },
  components:{
  },
  created(){
    this.applyData.staffName = this.$store.getters['user/getStaff'].staff_name
  }
  
}
</script>

<style lang="scss" scoped>
.row1 {
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  .item{
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
