<template>
  <div class="assigned-project">
    <app-tag title="项目分配"></app-tag>
    <div class="row1">
      <div class="header">
        <span class="title"><i></i> 数据列表</span>
        <div class="search">
          <el-input placeholder="请输入查询关键字" v-model="keyWord">
            <el-button slot="append" icon="el-icon-search"></el-button>        
          </el-input> 
        </div>        
      </div>
      <div class="list">
        <el-table :data="projects" style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="title" label="项目名称" ></el-table-column>
          <el-table-column prop="creator_name" label="申请人"></el-table-column>
          <el-table-column prop="created_time" label="申请时间"></el-table-column>
          <el-table-column prop="related_dept_name" label="申请科室"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              round
              icon="el-icon-edit"
              @click="AssignedPM(scope.$index, scope.row)">分配负责人</el-button>
          </template>
          </el-table-column>          
        </el-table>
      </div>
    </div>  

    <!-- 分配窗体 -->
    <el-dialog title="分配负责人" :visible.sync="assignedVisible" width="600px">
      <el-form :model="assignedData" :rules="rules" ref="AssignedForm">
        <el-form-item label="负责人" label-width='80px' prop='staff_name'>
          <el-autocomplete
            class="wd65"
            value-key = "staff_name"
            v-model="assignedData.staff_name"
            :fetch-suggestions="querySearch"
            placeholder="请输入关键词..."
            @select="handleSelect">
            <template slot-scope="{ item }">
              <div>{{ item.staff_name }} - <span style="font-size:12px;color:#999;">{{ item.dept_name }}</span></div>
            </template>          
          </el-autocomplete>
        </el-form-item> 
        <el-form-item label="分配流程" label-width='80px' required>
          <el-select v-model="assignedData.flow_id" placeholder="请选择项目流程" class="wd65">
            <el-option v-for="flow in hospitalData.flows" :key="flow.id" :label="flow.title" :value="flow.id"></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="项目时间" label-width='80px' required>
          <el-date-picker
            v-model="assignedData.date"
            type="daterange"
            value-format='yyyy-MM-dd'
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="截止日期"
            class="wd65">
          </el-date-picker>        
        </el-form-item>  
        <el-form-item label="协助人员" label-width='80px'>
          <el-input auto-complete="off" v-model="assignedData.assistant" class="wd65"></el-input>
        </el-form-item>              
      </el-form>       
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAssigned('AssignedForm')">确 定</el-button>
        <el-button type="info" @click="cancelAssigned('AssignedForm')" >取 消</el-button>
      </div>
    </el-dialog>       
  </div>
</template>

<script>
import AppTag from "@/components/AppTag";
export default {
  name: "assigned-project",
  data() {
    return {
      hospitalData:{},
      staff:{},
      keyWord: "",
      projects: [],
      assignedVisible: false,
      assignedData:{},
      allStaff:[],
     //验证规则
     rules:{
      staff_name:[
        { required: true, message:'请指定负责人', trigger:'change'}
      ],
     }      
    };
  },
  components: {
    "app-tag": AppTag
  },
  methods: {
    /* 分配负责人 */
    AssignedPM(index, row){
      this.assignedVisible = true;
      this.assignedData.project_id = row.id
    },
    confirmAssigned(AssignedForm){
      console.log(this.assignedData);
      this.$refs[AssignedForm].validate(valid=>{
        if(valid){
          var url = `${this.$api.dispatch_project_plan(this.assignedData.project_id)}`
          this.$axios
            .post(url, {
              performer_id: this.assignedData.staff.id,
              flow_id: this.assignedData.flow_id,
              expired_time: this.assignedData.date[1]+''
            })
            .then(res=>{
              console.log(res);
              this.$checkResData(res);
              this.$message({ type: 'success',  message: '项目分配成功!'});
              this.assignedData = {};
              this.assignedVisible = false;
              this.getProjects();

            })
            .catch(err=>{
              this.$message.error('项目分配失败');
              console.log(err);
            })
        }
      })
    },
    cancelAssigned(AssignedForm){
      this.assignedData = {};
      this.$refs[AssignedForm].clearValidate();
      this.assignedVisible = false;
    },

    /* 模糊筛选 */
    querySearch(queryString, cb) {
      var allStaff = this.allStaff;
      var results = queryString ? allStaff.filter(this.createFilter(queryString)) : allStaff;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (allStaff) => {
        return (allStaff.staff_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },   
    handleSelect(item){
      //console.log(item);
      this.assignedData.staff = item;
    }, 

    //获取待分配项目数据
    getProjects() {
      this.$axios
        .get(`${this.$api.get_projet_list}?organ_id=${this.staff.organ_id}&type=undispatch`)        
        .then(res => {
          this.$checkResData(res);
          this.projects = res.data.projects.slice(0);
          //将数据保存至store中
          this.$store.state.project['notAssignedCount'] = this.projects.length > 0 ? this.projects.length : '';
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取所有员工数据
    getStaffList() {
      this.$axios.get(this.$api.get_staff_list(this.staff.organ_id))
        .then(res => {
          this.$checkResData(res);
          this.allStaff = res.data.staffs.slice(0);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取医院全局数据（流程种类、部门各类） 
    getHospitalData(){
      this.$axios
        .get(this.$api.hospital_global_data(this.staff.organ_id))
        .then(res=>{
          this.hospitalData = res.data;
        })
        .catch(err=>{
          console.log(err);
        })
    }    
  },
  created() {
    this.staff = this.$store.getters["user/getStaff"];
    this.getProjects();
    this.getStaffList();
    this.getHospitalData();
  }
};
</script>

<style lang="scss" scoped>
.row1 {
  .header {
    background-color: #fff;
    padding: 20px;
    span.title {
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("../../assets/img/icons.png");
        background-position: -147px -42px;
        position: relative;
        top: 3px;
      }
    }
  }
  .search {
    width: 300px;
    float: right;
    padding-right: 20px;
    position: relative;
    top: -7px;
  }
  .list {
    background-color: #fff;
    padding: 20px 40px 40px 40px;
    margin-top: 2px;
  }
}
.wd65 {width:75%;}
</style>
