<template>
  <div class="manage-staff">
    <app-tag title="人员管理"></app-tag>
    <div class="row1">
      <div class="header">
        <span class="title"><i></i> 数据列表</span>
        <el-button type="primary" @click="handleAdd">+ 添加员工</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="primary">分配角色</el-button>
      </div>
      <div class="list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="80" sortable></el-table-column>
          <el-table-column prop="username" label="成员账号" width="150"></el-table-column>
          <el-table-column prop="staff_name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
          <el-table-column prop="contact_phone" label="手机号" width="150"></el-table-column>
          <el-table-column prop="dept" label="所属部门"></el-table-column>
          <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              icon="el-icon-view"        
              @click="handleInfo(scope.$index, scope.row)">详情</el-button>            
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

    <!-- 添加员工窗体 -->
    <el-dialog title="添加员工" :visible.sync="addVisible" width="600px">
      <el-form :model="addData" :rules="rules" ref="ruleForm">      
        <el-form-item label="成员账号" label-width='80px' prop='username'>
          <el-input auto-complete="off" v-model="addData.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width='80px' prop='staff_name'>
          <el-input auto-complete="off" v-model="addData.staff_name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width='80px' prop="email">
          <el-input auto-complete="off" v-model="addData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width='80px' prop='contact_phone'> 
          <el-input auto-complete="off" v-model="addData.contact_phone"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" label-width='80px' prop='dept'>
          <el-select v-model="addData.dept" placeholder="请选择所属于部门">
            <el-option v-for="dept in depts" :key="dept.id" :label="dept.name" :value="dept.id"></el-option>
          </el-select>
        </el-form-item>          
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd" type="danger">取 消</el-button>
        <el-button type="primary" @click="confirmAdd('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>  


    <!-- 编辑 -->
    <el-dialog title="修改员工信息" :visible.sync="editVisible" width="600px">
      <el-form :model="editData" :rules="rules" ref="ruleForm">      
        <el-form-item label="成员账号" label-width='80px' prop='username'>
          <el-input auto-complete="off" v-model="editData.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width='80px' prop='staff_name'>
          <el-input auto-complete="off" v-model="editData.staff_name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width='80px' prop="email">
          <el-input auto-complete="off" v-model="editData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width='80px' prop='contact_phone'> 
          <el-input auto-complete="off" v-model="editData.contact_phone"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" label-width='80px' prop='dept'>
          <el-select v-model="editData.dept" placeholder="请选择所属于部门">
            <el-option v-for="dept in depts" :key="dept.id" :label="dept.name" :value="dept.id"></el-option>
          </el-select>
        </el-form-item>          
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit" type="danger">取 消</el-button>
        <el-button type="primary" @click="confirmEdit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>      
  </div>
</template>

<script>
import AppTag from '@/components/AppTag';
export default {
  name: 'manage-staff',
  data () {
    return {
     tableData:[],
     /* tableData中的数据格式
      [{
        "id": 20181001,
        "hospital": 20180606,
        "hospital_name": "东都第一人民医院",
        "dept": 10001001,
        "dept_name": "信息科",
        "staff_name": "腾主任1",
        "staff_title": "信息科主任",
        "user": 20101212,
        "username": "yulaishini",
        "is_admin": false,
        "group": null,
        "group_name": "",
        "group_cate": "",
        "contact_phone": "13899212321",
        "email": "teng@exmple.com",
        "created_time": "2018-06-06 15:00:00"
      }]     
     */
     addVisible:false,
     editVisible:false,
     depts:[],
     editData:{},
     addData:{},
     rules:{
      email:[
        { type:'email', required: true, message: '请填写正确的邮箱格式', trigger: 'blur' }
      ],
      username:[
        { required: true, message:'请填写用户名', trigger: 'blur'}
      ],
      staff_name:[
        { required: true, message:'请填写姓名', trigger: 'blur'}
      ],
      contact_phone:[
        { required: true, message:'必填项，不能为空', trigger: 'blur'},
        { type:'string', len:11, message:'请填写11号电话号码', trigger: 'blur'}
      ],
      dept:[
        { required:true, message:'请选择所属部门', trigger:'change'}
      ]
     }
    }
  },
  components:{
    "app-tag": AppTag
  },
  methods: {
    /* 查看员工详情 */
    handleInfo(){
    },
    /* 添加员工 */
    handleAdd(){
      this.addVisible = true;
    },
    cancelAdd(){
      this.addData = {};
      this.addVisible = false;
    },
    confirmAdd(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          //表单验证成功
          this.$axios.post('/nmis/v1/hospitals/'+this.$store.getters['user/getStaff'].hospital+'/staffs/create', {
            username:this.addData.username,
            dept_id:this.addData.dept,
            staff_name:this.addData.staff_name,
            contact_phone: this.addData.contact_phone,
            email: this.addData.email,
            password:'111111'
          })
          .then(res=>{
            this.$checkResData(res);//先检查返回数据，若有错误则会抛出错误信息，此函数封闭在http/index.js中
            this.addVisible = false;
            this.$message({ type: 'success',  message: '员工添加成功!'});
            this.getStaffList();
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
    /* 编辑员工 */
    handleEdit(index, row){
      this.editData = JSON.parse(JSON.stringify(row)); //复制对象，需JSON这序列化，否则会赋值引用
      this.editVisible = true;      
    },
    cancelEdit(){
      this.editData = {}
      this.editVisible = false;
    }, 
    confirmEdit(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          this.$axios.put('/nmis/v1/hospitals/'+this.$store.getters['user/getStaff'].hospital+'/staffs/'+this.editData.id, {
            username:this.editData.username,
            dept_id:this.editData.dept,
            staff_name:this.editData.staff_name,
            contact_phone: this.editData.contact_phone,
            email: this.editData.email,
          })
          .then(res=>{
            this.$checkResData(res);//先检查返回数据，若有错误则会抛出错误信息，此函数封闭在http/index.js中
            this.editVisible = false;
            this.$message({ type: 'success',  message: '员工修改成功!'});
            this.getStaffList();
          })
          .catch(err=>{
            this.$message.error(err);
            console.log(err);
          })
          this.editVisible = false;
          this.editData = {}
        }else{
          console.log('表单验证失败');
          return false;
        }
      })
    },       
    /* 删除员工 */
    handleDelete(index, row){
      console.log(row);
      this.$confirm('此操作将删除员工: <strong style="color:#f47475;font-size:14px;"> 《'+row.username+'》</strong> , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        //点击确定
        .then(() => {
          this.$axios.delete('/nmis/v1/hospitals/'+row.hospital+'/staffs/'+row.id)
              .then(res=>{
                this.$checkResData(res);
                this.getStaffList();
                this.$message({ type: 'success',  message: '员工删除成功!'});
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
    //从后端获取员工信息
    getStaffList(){
      this.$axios.get('/nmis/v1/hospitals/'+this.$store.getters['user/getStaff'].hospital+'/staffs')
          .then(res=>{
            this.$checkResData(res);
            this.tableData = res.data.staff.slice(0);
          })
          .catch(err=>{
            console.log(err);
      })      
    },
    //获取部门数据 
    getDepartmentList(){
      this.$axios.get('/nmis/v1/hospitals/'+this.$store.getters['user/getStaff'].hospital+'/departments')
          .then(res=>{
            this.$checkResData(res);
            this.depts = res.data.dept.slice(0);
          })
          .catch(err=>{
            console.log(err);
      })
    }
  },
  created(){
    this.getStaffList();
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
