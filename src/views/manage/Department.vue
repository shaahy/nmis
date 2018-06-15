<template>
  <div class="manage-department">
    <app-tag title="部门管理"></app-tag>
    <div class="row1">
      <div class="header">
        <span class="title"><i></i> 数据列表</span>
        <el-button type="primary" @click="handleAdd">+ 添加部门</el-button>
        <el-button type="primary">导入</el-button>
      </div>
      <div class="list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="80" sortable></el-table-column>
          <el-table-column prop="name" label="部门名称" width="150"></el-table-column>
          <el-table-column prop="saffNumber" label="成员个数（人）" width="150" sortable></el-table-column>
          <el-table-column prop="desc" label="职能描述"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              round
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              round
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
          </el-table-column>          
        </el-table>
      </div>
    </div>

    <!-- 添加部门 -->
    <el-dialog title="添加部门" :visible.sync="addVisible" width="600px" @close="closeAdd('addForm')">
      <el-form :model="addData" :rules="rules" ref="addForm">
        <el-form-item label="部门属性" label-width='80px' prop="attri">
          <el-select v-model="addData.attri" placeholder="请选择部门属性">
            <el-option label="医技" value="ME"></el-option>
            <el-option label="后勤" value="SU"></el-option>
            <el-option label="行政" value="OF"></el-option>
            <el-option label="其它" value="OT"></el-option>
          </el-select>
        </el-form-item>        
        <el-form-item label="部门名称" label-width='80px' prop="name">
          <el-input auto-complete="off" v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="职能描述" label-width='80px'> 
          <el-input auto-complete="off" v-model="addData.desc" type="textarea" rows=5></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAdd('addForm')">确 定</el-button>
        <el-button type="info" @click="cancelAdd('addForm')" >取 消</el-button>
      </div>
    </el-dialog>    


    <!-- 编辑 -->
    <el-dialog title="编辑部门" :visible.sync="editVisible" width="600px" @close="closeEdit('editForm')">
      <el-form :model="editData" :rules="rules" ref="editForm">
        <el-form-item label="部门属性" label-width='80px' prop='attri'>
          <el-select v-model="editData.attri" placeholder="请选择部门属性">
            <el-option label="医技" value="ME"></el-option>
            <el-option label="后勤" value="SU"></el-option>
            <el-option label="行政" value="OF"></el-option>
            <el-option label="其它" value="OT"></el-option>
          </el-select>
        </el-form-item>          
        <el-form-item label="部门名称" label-width='80px' prop='name'>
          <el-input auto-complete="off" v-model="editData.name"></el-input>
        </el-form-item>
        <el-form-item label="职能描述" label-width='80px'>
          <el-input auto-complete="off" v-model="editData.desc" type="textarea" rows=5></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmEdit('editForm')">提 交</el-button>
        <el-button type="info" @click="cancelEdit('editForm')" >取 消</el-button>
      </div>
    </el-dialog>    
  </div>
</template>

<script>
import AppTag from '@/components/AppTag';
export default {
  name: 'manage-department',
  data () {
    return {
     tableData:[],
     /* tableData中的数据格式
      [{
          "id": 10001001  #科室ID,
          "created_time": "2018-06-06 15:00:00"  #创建时间,
          "name": "设备科"  #科室名称,
          "contact": "13458892738"  #科室联系方式,
          "desc": ""  #科室描述,
          "attri": "SU"  #科室属性（ME：医技；SU：后勤；OF：行政）,
          "organ": "20180606医院ID"
      }]     
     */
     addVisible:false,
     editVisible:false,
     editData:{
       name:'',
       desc:'',
       attri:''
     },
     addData:{
       name:'',
       desc:'',
       attri:''
     },
     //验证规则
     rules:{
      name:[
        { required: true, message:'请填写部门名称', trigger: 'blur'}
      ],
      attri:[
        { required:true, message:'请选择部门属性', trigger:'change'}
      ]
     }
    }
  },
  components:{
    "app-tag": AppTag
  },
  methods: {
    /** 添加部门操作 **/
    handleAdd(){
      this.addVisible = true;
    },
    cancelAdd(addForm){
      this.addData = {};
      this.$refs[addForm].clearValidate();
      this.addVisible = false;
    },
    closeAdd(addForm){
      this.addData = {};
      this.$refs[addForm].clearValidate();
      this.addVisible = false;
    },
    confirmAdd(addForm){
      this.$refs[addForm].validate(valid=>{
        if(valid){
          this.$axios.post('/nmis/v1/hospitals/'+this.$store.getters['user/getStaff'].hospital+'/departments/create', {
            name:this.addData.name,
            desc:this.addData.desc,
            attri:this.addData.attri
          })
          .then(res=>{
            this.$checkResData(res);//先检查返回数据，若有错误则会抛出错误信息，此函数封闭在http/index.js中
            this.addVisible = false;
            this.$message({ type: 'success',  message: '部门添加成功!'});
            this.getDepartmentList();
          })
          .catch(err=>{
            this.$message.error(err);
            console.log(err);
          })
          this.addVisible = false;
          this.addData = {}
        }else{
          //表单验证失败
          console.log('表单验证失败！');
          return false;
        }
      })

    },

    /** 编辑部门操作 **/
    handleEdit(index, row) {
      this.editData = JSON.parse(JSON.stringify(row)); //复制对象，需JSON这序列化，否则会赋值引用
      this.editVisible = true;
    },
    cancelEdit(editForm){
      this.editData = {}
      this.$refs[editForm].clearValidate();
      this.editVisible = false;
    },
    closeEdit(editForm){
      this.editData = {}
      this.$refs[editForm].clearValidate();
      this.editVisible = false;
    },
    confirmEdit(editForm){
      this.$refs[editForm].validate(valid=>{
        if(valid){
          this.$axios.put('/nmis/v1/hospitals/'+this.editData.organ+'/departments/'+this.editData.id,{
            name:this.editData.name,
            desc:this.editData.desc,
            attri:this.editData.attri        
          })
              .then(res=>{
                this.$checkResData(res);
                this.getDepartmentList();
                this.$message({ type: 'success',  message: '编辑成功!'});        
                this.editVisible = false;
              })
              .catch(err=>{
                this.$message({ type: 'error',  message: err});
              })   
        }else{
          console.log('表单验证失败');
          return false;
        }
      })
   
    },

    /** 删除部门操作 **/
    handleDelete(index, row) {
      console.log(row);
      this.$confirm('此操作将删除部门: <strong style="color:#f47475;font-size:14px;"> 《'+row.name+'》</strong> , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        //点击确定
        .then(() => {
          this.$axios.delete('/nmis/v1/hospitals/'+row.organ+'/departments/'+row.id)
              .then(res=>{
                this.$checkResData(res);
                this.getDepartmentList();
                this.$message({ type: 'success',  message: '删除成功!'});
              })
              .catch(err=>{
                this.$message({ type: 'error',  message: err});
              })
        
        })
        //点击取消
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });      
    },
    //获取部门数据 
    getDepartmentList(){
      this.$axios.get('/nmis/v1/hospitals/'+this.$store.getters['user/getStaff'].hospital+'/departments')
          .then(res=>{
            this.$checkResData(res);
            this.tableData = res.data.dept;
          })
          .catch(err=>{
            console.log(err);
      })
    }
  },
  created(){
    this.getDepartmentList();
  }



}
</script>

<style lang="scss" scoped>
.row1{
  .header{
    background-color: #fff;
    padding:20px;
    span.title{
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      color:#333;
      i{
        display: inline-block;
        width:20px;
        height: 20px;
        background-image: url("../../assets/img/icons.png");
        background-position: -147px -42px;
        position: relative;
        top:3px;
      }
    }
    .el-button{ 
      float:right; 
      margin-right: 15px;
    }    
  }
  .list{
    background-color: #fff;
    padding:20px 40px 40px 40px;;
    margin-top:2px;
  }
}

</style>
