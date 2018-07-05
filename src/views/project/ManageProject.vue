<template>
  <div class="manage-project">
    <app-tag title="我负责的项目"></app-tag>
    <el-row class="row1">  
      <div class="search">
        <el-input placeholder="请输入项目名称/申请人" v-model="formData.keyWord">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>        
        </el-input> 
      </div>             
      <ul>
        <li :class="{ act: formData.control.all  }" @click="handleAll">全部({{ this.formData.count.all }})</li>
        <li :class="{ act: formData.control.todo  }" @click="handleTodo">待启动({{ this.formData.count.todo }})</li>
        <li :class="{ act: formData.control.doing  }" @click="handleDoing">进行中({{ this.formData.count.doing }})</li>
        <li :class="{ act: formData.control.done  }" @click="handleDone">已完成({{ this.formData.count.done }})</li>
      </ul>
    </el-row>    
    <div class="row2">
      <div class="header">
        <span class="title"><i></i> 数据列表</span>       
      </div> 
      <div class="list">
        <el-table 
          :data="projects"
          :highlight-current-row=true
          style="width: 100%">
          <el-table-column type="index" label="序号" width="80" sortable></el-table-column>
          <el-table-column prop="title" label="项目名称"></el-table-column>
          <el-table-column prop="creator_name" label="申请人" ></el-table-column>
          <el-table-column prop="creator_id" label="申请摘要"></el-table-column>
          <el-table-column prop="related_dept_name" label="申请科室"></el-table-column>
          <el-table-column 
            prop="startup_time" 
            :formatter = 'formatDate'
            label="项目开始时间"></el-table-column>
          <el-table-column 
            prop="expired_time" 
            :formatter = 'formatDate'
            label="项目截止时间"></el-table-column>
          <el-table-column prop="" label="最后修改时间"></el-table-column>
          <el-table-column prop="" label="里程碑状态"></el-table-column>
          <el-table-column prop="" label="项目负责状态"></el-table-column>
          <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">         
            <el-button
              size="mini"
              type="primary"
              round
              icon="el-icon-edit"              
              @click="handleManage(scope.$index, scope.row)">管理</el-button>
          </template>
          </el-table-column>          
        </el-table>
      </div>                 
    </div>
  </div>
</template>

<script>
import AppTag from "@/components/AppTag";
export default {
  name: 'manage-project',
  data () {
    return {
      formData:{
        keyWord:'',
        screening:'',
        control:{
          all:true,
          todo:false,
          doing:false,
          done:false
        },
        count:{
          all:0,
          todo:0,
          doing:0,
          done:0,
        }
      },
     staff:{},
     projects:[],
    }
  },
  components: {
    "app-tag": AppTag
  },  
  methods:{
    //点击管理
    handleManage(index, row){
      //将当前需要操作的项目保存至状态管理器中
      this.$store.commit('project/setProjectData', row); 
      this.$router.push({name: 'editProjectLink'});
    },
    //格式化日期
    formatDate:(row, column, val, index) => val.slice(0, 10),
    //获取所有项目
    getProjects() {
      this.$axios
        .get(`${this.$api.get_projet_list}?
              organ_id=${this.staff.organ_id}&
              pro_status=${this.formData.screening}&
              search_key=${this.formData.keyWord}&           
              type=my_performer`
              .replace(/ *[\r|\n] */gm, '')
            )
        .then(res => {
          this.$checkResData(res);
          this.projects = res.data.projects.slice(0);
          //console.log(this.projects);
        });
    },
    //计算所有状态项目的数量 
    getProjectAndCount(){
      this.$axios
        .get(`${this.$api.get_projet_list}?
              organ_id=${this.staff.organ_id}&
              type=my_performer&
              pro_status=${this.formData.screening}&
              search_key=${this.formData.keyWord}`
              .replace(/ *[\r|\n] */gm, '')
            )
        .then(res => {
          this.$checkResData(res);
          this.projects = res.data.projects.slice(0);
          let status;
          for(let key in this.projects){
            status = this.projects[key].status
            if(status === 'PE'){
              this.formData.count.todo += 1;
            }else if( status === 'SD'){
              this.formData.count.doing += 1;
            }else if( status === 'DO' ){
              this.formData.count.done += 1;
            }
          }
          this.formData.count.all = this.projects.length;

          //重新封装数据，便于组件循环渲染
          this.projects.forEach(project=>{
            project.isHasFlow = project.attached_flow.id ? true : false;
          })
        })
        .catch(err=>{
          this.$message.error('操作失败');
          console.log(err);
        })        
    },
    //筛选类
    handleSearch(){
      this.getProjects();
      this.formData.control.all =true;
      this.formData.control.todo =false;
      this.formData.control.doing =false;
      this.formData.control.done =false;      
    },
    handleAll(){
      this.formData.control.all =true;
      this.formData.control.todo =false;
      this.formData.control.doing =false;
      this.formData.control.done =false;
      this.formData.screening = '';
      this.getProjects()
    },
    handleTodo(){
      this.formData.control.all =false;
      this.formData.control.todo =true;
      this.formData.control.doing =false;
      this.formData.control.done =false;
      this.formData.screening = 'PE';
      this.getProjects()
    },
    handleDoing(){
      this.formData.control.all =false;
      this.formData.control.todo =false;
      this.formData.control.doing =true;
      this.formData.control.done =false;
      this.formData.screening = 'SD';
      this.getProjects()      
    },
    handleDone(){
      this.formData.control.all =false;
      this.formData.control.todo =false;
      this.formData.control.doing =false;
      this.formData.control.done =true;
      this.formData.screening = 'DO';
      this.getProjects()      
    }, 
    init(){
      this.staff = this.$store.getters["user/getStaff"];
      this.getProjectAndCount();
    }        
  },
  created(){
    this.init();
  }

}
</script>

<style lang="scss" scoped>
.row1 {
  margin-top: 16px;
  background-color: #fff;
  padding: 15px 15px 15px 20px;
  ul {
    display: inline-block;
    li {
      display: inline-block;
      padding: 5px 20px;
      color: $font-color-cz2;
      font-size: 18px;
      cursor: pointer;
      &.act {
        color: $main-color;
        font-weight: bold;
      }
    }
  }
  .el-button {
    display: block;
    float: right;
  }
}
.row2 {
  margin-top:16px;
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
  .list {
    background-color: #fff;
    padding: 20px 40px 40px 40px;
    margin-top: 2px;
  }
}
.search {
  width: 300px;
  display: inline-block;
  padding-right: 20px;
}  
</style>
