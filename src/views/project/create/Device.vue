<template>
  <div class="">
    <div class="row1 clearfix">
      <div class="item">申请人：{{ staff.staff_name }}</div>
      <div class="item">申请科室：{{ staff.dept_name }}</div>
      <el-button type="primary" @click='onSubmit'>提交申请</el-button>
    </div>
    <div class="row2">
      <el-form  label-width="80px" :model="formData" class="clearfix">
        <div class="left">
          <el-form-item label="项目名称" class="name" required>
            <el-input v-model="formData.projectName"></el-input>
          </el-form-item>
          <el-form-item label="交办选项" class="type" required>
            <el-select v-model="formData.projectType" placeholder="请选择">
              <el-option label="转交办理" value='1'></el-option>
              <el-option label="自行办理" value='2'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请原因" class="resion">
            <el-input 
              type="textarea"  
              v-model="formData.resion"
              rows='7'
            >
            </el-input>
          </el-form-item>
        </div>
        <div class="right">
          <div class="title">设备明细列表</div>
            <div class="item" v-for="dev in formData.devList" :key="dev.name">
              <el-input placeholder="设备名" class="only-bottom-border name" v-model="dev.name"></el-input>
              <el-input placeholder="设备型号" class="only-bottom-border type"  v-model="dev.type"></el-input>
              <el-input placeholder="设备数量" class="only-bottom-border num"  v-model="dev.num"></el-input>
              <el-input placeholder="单位" class="only-bottom-border measure"  v-model="dev.measure"></el-input>
              <el-input placeholder="预计单价" class="only-bottom-border price"  v-model="dev.price"></el-input>
              <el-input placeholder="用途" class="only-bottom-border useage"  v-model="dev.useage"></el-input>
            </div> 
            <div class="add-btn">
              <el-button icon="el-icon-plus" plain @click="addDevice">添加设备</el-button>
            </div>                      
        </div>
      </el-form>    
    </div>    
  </div>
</template>

<script>
export default {
  name: 'create-device',
  data () {
    return {
      staff:{},
      formData:{
        projectName:'',
        projectType:'',
        resion:'',
        devList:[
          {
            name:"",
            type:"",
            num:null,
            measure: '',
            price: null,
            useage: ''
          },
        ]
      }
    }
  },
  components:{
  },
  methods:{
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
      // console.log(this.formData.devList);
      // console.log(devs);
      this.$axios.post(this.$api.create_project_plan,{
        hospital_id: this.staff.hospital,
        project_title: this.formData.projectName,
        purpose: this.formData.resion,
        creator_id: this.staff.id,
        related_dept_id: this.staff.dept,
        ordered_devices:devs
      })
        .then(res=>{
          console.log(res);
        })

    }
  },
  created(){
    this.staff = this.$store.getters['user/getStaff']
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
    .title{
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      background-color: #4cbdb4;
      padding: 5px;
      color: #fff;
      margin-bottom: 10px;
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

