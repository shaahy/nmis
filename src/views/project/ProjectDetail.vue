<template>
  <div class="">
    <app-tag title="项目详情"></app-tag>
    <div class="row1 clearfix">
      <div class="item">申请人1：{{ staff.staff_name }}</div>
      <div class="item">申请科室：{{ staff.dept_name }}</div>
      <el-button type="primary" @click='onSubmit' v-if="isEdit">提 交</el-button>
      <el-button type="primary" @click='onEdit' v-if="formData.isEditable">修 改</el-button>
    </div>
    <div class="row2">
      <el-form  label-width="80px" :model="formData" class="clearfix">
        <div class="left">
          <div class="b-title">申请基本信息</div>
          <el-form-item label="项目名称" class="name" required>
            <el-input v-model="formData.projectName" :disabled="!isEdit"></el-input>
          </el-form-item>
          <el-form-item label="交办选项" class="type" required>
            <el-select v-model="formData.projectType" placeholder="请选择" :disabled="!isEdit">
              <el-option label="转交办理" value='1'></el-option>
              <el-option label="自行办理" value='2'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请原因" class="resion">
            <el-input 
              type="textarea"  
              v-model="formData.resion"
              rows='7'
              :disabled="!isEdit"
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="right">
            <div class="b-title">申请购买列表</div>
            <div class="head">
              <span class="name" >设备名</span>
              <span class="type">设备型号</span>
              <span class="num">设备数量</span>
              <span class="measure">单位</span>
              <span class="price">预计单价(元)</span>
              <span class="useage">用途</span>
            </div>
            <div class="item" v-for="(dev, index) in formData.devList" :key="index">
              <el-input placeholder="请输入设备名" class="only-bottom-border name" v-model="dev.name" :disabled="!isEdit"></el-input>
              <el-input placeholder="请输入设备型号" class="only-bottom-border type"  v-model="dev.type_spec" :disabled="!isEdit"></el-input>
              <el-input placeholder="设备数量" class="only-bottom-border num"  v-model="dev.num" :disabled="!isEdit"></el-input>
              <el-input placeholder="请输入单位" class="only-bottom-border measure"  v-model="dev.measure" :disabled="!isEdit"></el-input>
              <el-input placeholder="请输入预计单价" class="only-bottom-border price"  v-model="dev.planned_price" :disabled="!isEdit"></el-input>
              <el-input placeholder="请输入用途" class="only-bottom-border useage"  v-model="dev.purpose" :disabled="!isEdit"></el-input>
            </div> 
            <div class="add-btn">
              <el-button icon="el-icon-plus" plain @click="addDevice" v-if="isEdit">添加设备</el-button>
            </div>                      
        </div>
      </el-form>    
    </div>    
  </div>
</template>

<script>
import AppTag from "@/components/AppTag";
export default {
  name: 'create-device',
  data () {
    return {
      staff:{},
      project:{},
      formData:{
        projectName:'',
        projectType:'',
        isEditable: false, //是否可编辑
        resion:'',
        devList:[]
      },
      isEdit:false,
    }
  },
  components:{
    "app-tag": AppTag
  },
  methods:{
    //点击进入修改状态
    onEdit(){
      this.isEdit = true;
    },

    //添加设备
    addDevice(){
      this.formData.devList.push({
        name:"",
        type:"",
        num: null,
        measure: '',
        price: null,
        useage: ''
      })
    },
    //提交项目申请
    onSubmit(){
      //转换需要提交的数据格式
      var devs = []
      var dev = {}
      for(let key in this.formData.devList){
        dev.name = this.formData.devList[key].name;
        dev.type_spec = this.formData.devList[key].type;
        dev.num = parseInt(this.formData.devList[key].num);
        dev.measure = this.formData.devList[key].measure;
        dev.purpose = this.formData.devList[key].useage;
        dev.planned_price = parseFloat(this.formData.devList[key].price);
        devs.push(dev)
      }
      this.$axios.post(this.$api.create_project_plan,{
        organ_id: this.staff.organ_id,
        project_title: this.formData.projectName,
        purpose: this.formData.resion,
        creator_id: this.staff.id,
        related_dept_id: this.staff.dept_id,
        ordered_devices:devs
      })
        .then(res=>{
          this.$checkResData(res);
          console.log(res);
          this.$message({type:'success', message:'项目申请成功'})
          this.$router.push({name: 'myProjectLink'})
        })
        .catch(err=>{
          this.$message.error('操作失败')
          console.log(err);
        })
    },
    //初始化数据 
    init(){
      this.staff = this.$store.getters['user/getStaff'];
      this.project = this.$store.getters["project/getProjectData"];
      this.formData.projectName = this.project.title;
      this.formData.projectType = '';
      this.formData.resion = this.project.purpose;
      this.formData.devList = this.project.ordered_devices;
      this.formData.isEditable = !this.project.isHasFlow;
    }

  },
  created(){
    this.init();
  }
  
}
</script>

<style lang="scss" scoped>
.row1 {
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  line-height: 40px;
  .item{
    display: inline-block;
    margin-right: 10%;
  }
  .el-button{
    float:right;
    margin-right:15px;
  }
}
.row2{
  margin-top: 20px;
  padding-top: 20px;
  background-color: #fff;
  width: 100%;
  position: relative;
  .left{
    display: block;
    float:left;
    width:30%;
    padding: 20px;
    .el-select{
      width: 100%;
    }
  }
  .right{
    display: block;
    float: right;
    width:70%;
    padding:20px;
    .head{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      background-color: #eee;
      color: #109187;
      font-weight: bold;  
      margin-bottom: 10px;    
      span{
        padding: 3px;
        text-align: center;
      }
      .name { width:100%;}
      .type{ width:90%; }
      .num {width:70%;}
      .measure{ width:60% }
      .price{ width:80%; }
      .useage { width:180%;}      
    }
    .item{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      //justify-content: space-between;
      .el-input{
        padding: 3px;
      }
      .name { width:100%;}
      .type{ width:90%; }
      .num {width:70%;}
      .measure{ width:60% }
      .price{ width:80%; }
      .useage { width:180%;}
    }
    .add-btn{
      text-align: center;
      margin-top:30px;
    }
  }
}
.b-title{
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    text-align: center;
    padding: 5px;
}
/* 响应式部分 */
@media screen and (max-width:1366px) {/* PC */
  .row2 .left, .row2 .right{
    width:100%;
  }
}
</style>
<style lang="scss">
  .only-bottom-border{
    input{
      border:none;
      border-bottom: 1px solid #aaa;
      border-radius: 0;
    }
  }
</style>

