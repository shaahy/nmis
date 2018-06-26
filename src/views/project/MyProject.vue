<template>
  <div class="my-project">
    <app-tag title="我的项目"></app-tag>
    <el-row class="row2">
      <div class="search">
        <el-input placeholder="请输入内容" v-model="form.keyWord">
          <el-button slot="append" icon="el-icon-search"></el-button>        
        </el-input> 
      </div>        
      <ul>
        <li>项目总数（3）</li>
        <li>待启动（1）</li>
        <li class="act">进行中（1）</li>
        <li>已完成（1）</li>
      </ul>
      <el-button type="primary" @click="createProject">+ 新建项目</el-button>
    </el-row>
    <el-row class="row3">
      <div v-for="project in projects" :key='project.id' class="item clearfix">
        <div class="left">
          <div class="portrait">张</div>
          <div class="info">
            <h2 class="project-name"> {{project.title}} </h2>
            <p class="applicant">负责人：<strong> {{ project.performer_name}} </strong></p>
            <p class="date">{{project.created_time | format-date}} 至 {{project.expired_time | format-date}} </p>
          </div>
        </div>
        <div class="right">
          <div class="flow">
            <el-steps :active="1" finish-status="success" align-center space='150px'>
              <el-step 
                v-for="step in project.attached_flow.milestones" 
                :key="step.id" 
                :title="step.title" 
                :description="step.created_time | format-date">
              </el-step>
            </el-steps>              
          </div>
        </div>
      </div>    
    </el-row>
  </div>
</template>

<script>
import AppTag from "@/components/AppTag";
export default {
  name: "my-project",
  props: ["text"],
  data() {
    return {
      staff: {},
      form: {
        region: "",
        keyWord: ""
      },
      projects: []
      /*    { 项目列表数组中的数据字段格式
      "id": 7,
      "title": "设备更新"  #项目主题,
      "purpose": "老化设备需要更新"  #申请原因,
      "status": "SD"  #项目状态,
      "creator_id": 7  #申请人id,
      "creator_name": "test"  #申请人姓名,
      "related_dept_id": 20181020  #申请科室id,
      "related_dept_name": "信息科"  #申请科室名称,
      "performer_id": 21  #项目负责人id,
      "performer_name": "测试124"  #项目负责人名称,
      "current_stone_id": NaN  #里程碑id,
      "attached_flow": "{}"  #项目流程,
      "ordered_devices":    
      }
*/
    };
  },
  components: {
    "app-tag": AppTag
  },
  methods: {
    createProject() {
      this.$router.push("/project/create");
    },
    //获取所有项目
    getProjects() {
      this.$axios
        .get(`${this.$api.my_projet_list}?hospital_id=${this.staff.organ_id}`)
        .then(res => {
          this.$checkResData(res);
          console.log(res);
          this.projects = res.data.projects.slice(0);
        });
    }
  },
  created() {
    this.staff = this.$store.getters["user/getStaff"];
    this.getProjects();
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  background-color: #fff;
  padding: 10px 10px 10px 20px;
}
.row2 {
  margin-top: 16px;
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
  .search {
    width: 300px;
    display: inline-block;
    padding-right: 20px;
  }  
  .el-button {
    display: block;
    float: right;
  }
}
.row3 {
  background: none;
  padding-left: 0;
  padding-right: 0;
  .item {
    margin-top: 10px;
  }
  .left {
    height: 115px;
    width: 285px;
    float: left;
    padding: 0 10px;
    position: relative;
    background-color: #fff;
    .portrait {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
      border-radius: 50%;
      background-color: #dbf2f0;
      color:#109187;
      margin: 0 5px;
      display: block;
      font-weight: bold;
      float:left;
      margin-top: 32px;
    }
    .info{
      width:calc(100% - 90px);
      display: block;
      margin-left:15px;
      float:left;
      .applicant {
        margin-top: 4px;
        margin-bottom: 0px;
        font-size: 14px;
        color:#666;
      }
      .project-name {
        display: block;
        font-size: 16px;
        color: #333;
        margin-top: 22px;
        margin-bottom: 0;
        
      }
      .date {
        font-size: 12px;
        color: #999;
        margin-top:4px;
        margin-bottom:0px;
      }      
    }

  }
  .right {
    min-height: 115px;
    padding: 19px 15px;
    width: calc(100% - 300px);
    overflow: hidden;
    background-color: #fff;
    float: right;
    .flow {

    }
  }
}
@media screen and (max-width:1366px){/* 手机 */
  .row2{
    li{
      padding:5px 10px !important;
    }
  }
}
</style>
<style lang="sass">

</style>

