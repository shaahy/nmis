<template>
  <div class="my-project">
    <app-tag title="我的项目"></app-tag>
    <el-row class="row1">
      <el-select v-model="form.region" placeholder="里程碑状态">
        <el-option label="待启动" value="待启动"></el-option>
        <el-option label="项目前期准备" value="项目前期准备"></el-option>
        <el-option label="标书会签" value="标书会签"></el-option>
        <el-option label="合同会签" value="合同会签"></el-option>
        <el-option label="项目实施" value="项目实施"></el-option>
        <el-option label="完成" value="完成"></el-option>
      </el-select>      
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 214px"></el-date-picker>
      <span>至</span>
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 214px"></el-date-picker>
      <div class="search">
        <el-input placeholder="请输入内容" v-model="form.keyWord">
          <el-button slot="append" icon="el-icon-search"></el-button>        
        </el-input> 
      </div>
     
    </el-row>
    <el-row class="row2">
      <ul>
        <li>项目总数（3）</li>
        <li>待启动（1）</li>
        <li class="act">进行中（1）</li>
        <li>已完成（1）</li>
      </ul>
      <el-button type="primary" @click="createProject">新建项目</el-button>
    </el-row>
    <el-row class="row3">
      <div class="item clearfix">
        <div class="left">
          <img src="../../assets/img/portrait.jpg" alt="" class="portrait">
          <p class="applicant">申请人：<strong>张三</strong></p>
          <h2 class="project-name">信息管理服务系统</h2>
          <p class="date">2018年06月01日—2028年06月01日</p>
        </div>
        <div class="right">
          <div class="flow">
            <ul>
              <li class="done">
                <div class="node">
                  <span class="title">待启动</span>
                  <span class="cicle"><i></i></span>
                  <span class="file">文档（2）</span>
                  <span class="date">2018.10.05</span>
                </div>
              </li>
              <li class="doing">
                <div class="node">
                  <span class="title">项目前期准备</span>
                  <span class="cicle"><i></i></span>
                  <span class="file">文档（2）</span>
                  <span class="date">2018.10.05</span>
                </div>
              </li>  
              <li>
                <div class="node">
                  <span class="title">标书会签</span>
                  <span class="cicle"><i></i></span>
                  <span class="file">文档（2）</span>
                  <span class="date">2018.10.05</span>
                </div>
              </li>                                                                   
              <li>
                <div class="node">
                  <span class="title">合同会签</span>
                  <span class="cicle"><i></i></span>
                  <span class="file">文档（2）</span>
                  <span class="date">2018.10.05</span>
                </div>
              </li>                                                                   
              <li>
                <div class="node">
                  <span class="title">已完成</span>
                  <span class="cicle"><i></i></span>
                  <span class="file">文档（2）</span>
                  <span class="date">2018.10.05</span>
                </div>
              </li>                                                                   
            </ul>
          </div>
        </div>
      </div>
      <div class="item clearfix">
        <div class="left">
          <img src="../../assets/img/portrait.jpg" alt="" class="portrait">
          <p class="applicant">申请人：<strong>张三</strong></p>
          <h2 class="project-name">信息管理服务系统</h2>
          <p class="date">2018年06月01日—2028年06月01日</p>
        </div>
        <div class="right">
          <div class="flow">
            <ul>
              <li class="done">
                <div class="node">
                  <span class="title">待启动</span>
                  <span class="cicle"><i></i></span>
                  <span class="file">文档（2）</span>
                  <span class="date">2018.10.05</span>
                </div>
              </li>
              <li class="doing">
                <div class="node">
                  <span class="title">项目前期准备</span>
                  <span class="cicle"><i></i></span>
                  <span class="file">文档（2）</span>
                  <span class="date">2018.10.05</span>
                </div>
              </li>  
              <li>
                <div class="node">
                  <span class="title">标书会签</span>
                  <span class="cicle"><i></i></span>
                  <span class="file">文档（2）</span>
                  <span class="date">2018.10.05</span>
                </div>
              </li>                                                                   
              <li>
                <div class="node">
                  <span class="title">合同会签</span>
                  <span class="cicle"><i></i></span>
                  <span class="file">文档（2）</span>
                  <span class="date">2018.10.05</span>
                </div>
              </li>                                                                   
              <li>
                <div class="node">
                  <span class="title">已完成</span>
                  <span class="cicle"><i></i></span>
                  <span class="file">文档（2）</span>
                  <span class="date">2018.10.05</span>
                </div>
              </li>                                                                   
            </ul>
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
        date1: "",
        date2: "",
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
.row1 {
  color: $font-color-cz3;
  .search {
    width: 300px;
    float: right;
    padding-right: 20px;
  }
}
.row2 {
  margin-top: 16px;
  ul {
    display: inline;
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
.row3 {
  background: none;
  padding-left: 0;
  padding-right: 0;
  .item {
    margin-top: 16px;
  }
  .left {
    height: 250px;
    width: 250px;
    float: left;
    position: relative;
    background-color: #fff;
    .portrait {
      width: 100px;
      border-radius: 50%;
      margin: 0 auto;
      display: block;
      margin-top: 38px;
      border: 5px solid $main-color;
    }
    .applicant {
      text-align: center;
      margin-top: 8px;
    }
    .project-name {
      font-size: 18px;
      color: #333;
      text-align: center;
      margin-top: 16px;
    }
    .date {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      text-align: center;
    }
  }
  .right {
    min-height: 250px;
    padding: 10px 0 50px 50px;
    width: calc(100% - 260px);
    overflow: hidden;
    background-color: #fff;
    float: right;
    .flow {
      ul {
        li {
          display: inline-block;
          margin-top: 33px;
          .node {
            position: relative;
            width: 150px;
            height: 150px;
            border-bottom: 7px solid #ddd;
            border-left: 1px solid #e7e7e7;
            .title {
              background-color: #e7e7e7;
              width: 130px;
              color: #999;
              display: block;
              text-align: center;
              height: 47px;
              line-height: 47px;
              font-size: 18px;
            }
            .cicle {
              display: block;
              width: 20px;
              height: 20px;
              position: absolute;
              bottom: -10px;
              left: -10px;
              background-color: #e7e7e7;
              border-radius: 50%;
              i {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                display: block;
                background-color: #fff;
                position: absolute;
                top: 5px;
                left: 5px;
              }
            }
            .file {
              display: block;
              position: absolute;
              bottom: 5px;
              left: 40px;
              font-size: 14px;
              cursor: pointer;
            }
          }
          .date {
            font-size: 12px;
            color: #666;
            position: absolute;
            bottom: -30px;
          }

          // 已完成状态
          &.done {
            .node {
              border-left: 1px solid $main-color;
              .title {
                background-color: $main-color;
                color: #fff;
              }
              .cicle {
                background-color: $main-color;
              }
            }
          }

          &.doing {
            .node {
              border-left: 1px solid #f47475;
              .title {
                background-color: #f47475;
                color: #fff;
              }
              .cicle {
                background-color: #f47475;
              }
            }
          }
        }
      }
    }
  }
}
</style>
