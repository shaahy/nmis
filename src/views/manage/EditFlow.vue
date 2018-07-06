<template>
<div class="edit-flow">
  <app-tag title="项目流程管理"></app-tag>
  <div class="create">
    <div class="row1">
      <el-input v-model="addData.flowName" placeholder="请输入流程名称" class="flow-name">
        <label slot="prepend">创建流程</label>
      </el-input>
      <div class="btns">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="info" @click="handleReset">重置</el-button>
      </div>
    </div>
    <div class="row2">
      <div v-for="(step, index) in addData.milestones" :key="index" class="step">
        <el-input v-model="step.title" placeholder="请输入里程碑名称"></el-input>
      </div>
      <el-button icon="el-icon-plus" circle size="medium" @click="handleAddStep"></el-button>
    </div>
  </div>
  <div class="list">
    <div v-for="flow in flows" :key="flow.id" class="item">
      <h2>{{ flow.title }}</h2> 
      <ul class="clearfix">
        <li v-for="step in flow.milestones" :key="step.id">{{ step.title }}<i class="arrow el-icon-arrow-right"></i></li>
      </ul>
      <el-button
        type="danger"
        size="medium"
        round
        icon="el-icon-delete"
        class="delete-btn"              
        @click="handleDelete(flow.id)">删除</el-button>           
    </div>
  </div>
</div>
</template>

<script>
import AppTag from "@/components/AppTag";
export default {
  name: 'edit-flow',
  data () {
    return {
     flows:[],
     addData:{
       flowName:'',
       milestones:[
         {
         index:0,
         title:'',
         }
       ]
     },
    }
  },
  components: {
    "app-tag": AppTag
  },
  methods:{
    //添加里程碑
    handleAddStep(){
      this.addData.milestones.push({index:this.addData.milestones.length, title:''});
      //console.log(this.addData);
    },
    //重置
    handleReset(){
      this.addData = {
        flowName:'',
        milestones:[{ index:0, title:'',}]        
      }
    },
    //提交创建流程
    handleSubmit(){
      this.$axios
        .post(this.$api.create_project_flow, {
          organ_id:this.$store.getters["user/getStaff"].organ_id,
          flow_title: this.addData.flowName,
          milestones: this.addData.milestones
        })
        .then(res=>{
          this.$message({type:'success', message:'流程创建成功！'})
          this.getFlowList();
          console.log(res);
        })
        .catch(err=>{
          console.log(err);
        })
    },
    //删除流程
    handleDelete(flow_id){
      this.$confirm(
        "当前操作将删除流程 , 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      )
      //点击确定
      .then(() => {
        console.log(flow_id);
        this.$axios
          .delete(this.$api.delete_project_flow(flow_id))
          .then(res => {
            this.getFlowList();
            this.$checkResData(res);
            this.$message({ type: "success", message: "流程删除成功!" });
          })
          .catch(err => {
            this.$message({ type: "error", message: err });
            console.log(err);
          });
      })
      //点击取消
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });       
    },
    //获取所有流程列表
    getFlowList(){
      this.$axios
        .get(this.$api.hospital_global_data(this.$store.getters["user/getStaff"].organ_id))
        .then(res=>{
          this.$checkResData(res);
          console.log(res);
          this.flows = res.data.flows;
        })
        .catch(err=>{
          console.log(err);
        })
    }
  },
  created(){
    this.getFlowList();
  }
}
</script>

<style lang="scss" scoped>
.create{
  background-color: #fff;
  padding:20px;
  .row1{
    .flow-name{
      max-width:500px;
    }
    .btns{
      float:right;
    }
  }
  .row2{
    .step{
      display: inline-block;
      width:188px;
      padding:25px 10px 0px 0px;
    }
  }
}
.list{
  position: relative;
  .item{
    position: relative;
    background-color: #fff;
    margin-top: 10px;
    padding:20px;
    h2{
      font-size: 18px;
      color:#333;
      margin-top:0;
    }
    ul{
      width:calc(100% - 200px);
      li{
        display: inline-block;
        background-color:$main-color;
        margin-right:7px;
        margin-left:7px;
        padding:10px 40px 10px 30px;
        color:#fff;
        position: relative;
        .arrow{
        color: #fff;
        position: absolute;
        right:10px;
        top:35%;
      }
      }
    }
    .delete-btn{
    position: absolute;
    right: 20px;
    top:35%;
  }
  }
}
</style>
