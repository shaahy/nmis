<template>
  <div class="">
    <app-tag title="项目详情"></app-tag>
    <div class="row1 clearfix">
      <div class="item">申请人：{{ staff.staff_name }}</div>
      <div class="item">申请科室：{{ staff.dept_name }}</div>
      <el-button type="primary" @click='onSubmit' v-if="isEdit">保 存</el-button>
      <el-button type="danger" @click='onEdit' v-if="!isEdit && formData.isEditable">修 改</el-button>
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
              <el-option label="转交办理" value='AG'></el-option>
              <el-option label="自行办理" value='SE'></el-option>
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
              <span class="delete-device" @click="onDelete(dev)" v-if="isEdit"><i class="el-icon-close"></i></span>
            </div> 
            <div class="add-btn"  v-if="isEdit">
              <el-button icon="el-icon-plus" plain @click="addDevice">添加设备</el-button>
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
        type_spec:"",
        num: null,
        measure: '',
        planned_price: null,
        purpose: ''
      })
    },
    //删除设备
    onDelete(dev){
      console.log(this.project);
      this.$confirm('此操作将删除设备  <strong style="color:#f47475;font-size:14px;">'+dev.name+'</strong> , 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: "warning"
      }).then(() => {
        this.$axios
          .delete(this.$api.delete_device_for_project(this.project.id, dev.id))
          .then(res=>{
            this.$checkResData(res);
            let index = this.project.ordered_devices.indexOf(dev);
            this.project.ordered_devices.splice(index, 1);
            this.$message({ type: "success", message: "操作成功" });
          })
          .catch(err=>{
            this.$message.error('操作失败');
            console.log(err);
          })
        this.$message({ type: 'success', message: '删除成功!' });
      }).catch(() => {
        this.$message({ type: 'info',message: '已取消删除'});          
      });      
    },
    //提交项目修改
    onSubmit(){
      //转换需要提交的数据格式
      let added_devices=[], updated_devices=[];
      let devList =  this.formData.devList;
      for(let key in this.formData.devList){
        if(devList[key].id){
          //修改的设备列表
          updated_devices.push(devList[key])
        }else{
          //添加的设备列表
          added_devices.push(devList[key])
        }
      }
      console.log(updated_devices);
      console.log(added_devices);
      this.$axios
        .put(this.$api.update_project_plan(this.project.id),{
        organ_id: this.staff.organ_id,
        handing_type: this.formData.projectType, 
        project_title: this.formData.projectName,
        purpose: this.formData.resion,
        added_devices: added_devices,
        updated_devices:updated_devices,
      })
        .then(res=>{
          console.log(res);
          this.$checkResData(res);
          this.$message({type:'success', message:'项目修改成功'})
          this.isEdit = false;
          this.updateProject();
        })
        .catch(err=>{
          this.$message.error('操作失败')
          console.log(err);
        })
    },
    //更新项目数据 
    updateProject(){
      this.$axios
        .get(`${this.$api.get_project_detail(this.project.id)}?organ_id=${this.staff.organ_id}`)
        .then(res=>{
          this.$checkResData(res);
          this.project = res.data.project;
          this.formData.projectName = this.project.title;
          this.formData.projectType = this.project.handing_type;
          this.formData.resion = this.project.purpose;
          this.formData.devList = this.project.ordered_devices;          
        })
        .catch(err=>{
          this.$message.error('数据更新失败！');
          console.log(err);
        })
    },
    //初始化数据 
    init(){
      this.staff = this.$store.getters['user/getStaff'];
      this.project = this.$store.getters["project/getProjectData"];
      this.formData.projectName = this.project.title;
      this.formData.projectType = this.project.handing_type;
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
      .useage { width:160%;}
          
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
      .useage { width:155%;}
      .delete-device { 
        width: 15%; 
        text-align: 
        center; font-size: 
        24px; 
        line-height: 46px;
        cursor: pointer;
        i{
          transition: 0.5s;
          color:#333;
          &:hover{
            color:#f56c6c;
            transform: rotate(180deg);
          }
        }
      }  
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

