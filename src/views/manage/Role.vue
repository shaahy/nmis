<template>
  <div class="manage-department">
    <app-tag title="角色管理"></app-tag>
    <div class="row1">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <i class="icon_user"></i>
            <span class='role_name'>项目分配者</span>
          </template>          
          <div class="content">
            <el-switch
              v-model="value1"
              active-text="项目分配权限">
            </el-switch>
            <el-switch
              v-model="value2"
              active-text="普通员工权限">
            </el-switch>            
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <i class="icon_user"></i>
            <span class='role_name'>普通员工</span>
          </template>          
          <div class="content">
            <el-switch
              v-model="value3"
              active-text="项目分配权限">
            </el-switch>
            <el-switch
              v-model="value4"
              active-text="普通员工权限">
            </el-switch>            
          </div>
        </el-collapse-item>
        
      </el-collapse>      
    </div>
  </div>
</template>

<script>
import AppTag from '@/components/AppTag';
export default {
  name: 'manage-role',
  data () {
    return {
      value1:true,
      value2:true,
      value3:false,
      value4:true,
      activeNames:['1','2']
    }
  },
  components:{
    "app-tag": AppTag
  },

}
</script>

<style lang="scss" scoped>
.el-collapse {
  padding-left: 20px;
  padding-bottom: 20px;
  background-color: #fff;
  .el-collapse-item{
    padding-top:7px;
    padding-bottom: 7px;
    .el-collapse-item__header{
      .role_name{
        font-size: 16px;
        color:#333;
        font-weight: bold;
      }
      .icon_user{
        width:12px;
        height:17px;
        display: inline-block;
        position: relative; 
        top:3px;
        background-image: url("../../assets/img/icons.png");
        background-position: -108px -43px;
        margin-right: 8px;               
      }
    }    
    .content{
      padding-left:20px;
      padding-right: 20px;
      padding-top: 15px;
      .el-switch{
        margin-right:20px;
      }
    }
  }

}

</style>
