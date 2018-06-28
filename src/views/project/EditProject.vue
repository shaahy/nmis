<template>
  <div class="edit-project">
    <app-tag title="项目编辑"></app-tag>
    <el-button @click='handle'>测试</el-button>
    <div class="title">
      <i class="device"></i>&nbsp;
      <span class="text">设备申请明细</span> 
    </div>
    <div class="row1">
      <el-table 
        :data="project.ordered_devices"
        style="width: 100%">
        <el-table-column type="index" label="序号" width="80" header-align='center' align='center' sortable></el-table-column>
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="type_spec" label="型号" ></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="measure" label="单位"></el-table-column>
        <el-table-column prop="planned_price" label="预计单价"></el-table-column>
        <el-table-column prop="purpose" label="用途"></el-table-column>        
      </el-table>
    </div> 
    <div class="title">
      <i class="flow"></i>&nbsp;
      <span class="text">流程管理</span> 
    </div> 
    <div class="row2">
      <div class="info">
        <span class="project-name">{{ project.title }}</span>
        <span>协助办理人员：张小刚</span>
        <span>项目启动时间：{{ project.startup_time | format-date }}</span>
        <span>项目截止时间：{{ project.expired_time | format-date }}</span>
      </div>
      <div class="flow">
        <el-steps :active="getActiveMilestones()" finish-status="success" align-center space='150px'>
          <el-step 
            v-for="milestone in project.attached_flow.milestones"
            :key="milestone.id" 
            :title="milestone.title" 
            :description="getStepDate(milestone.id) | format-date"
          >
          </el-step>
        </el-steps> 
        <el-button type="primary" class="setMilestone" @click="setMilestone">完结当前里程碑</el-button>
      </div>
    </div>       
  </div>
</template>

<script>
import AppTag from "@/components/AppTag";
export default {
  name: "edit-project",
  data() {
    return {
      staff: {},
      project: {}
    };
  },
  components: {
    "app-tag": AppTag
  },
  methods: {
    handle() {
      this.updateProject()
    },
    setMilestone(){
      this.$confirm(
          `请确定是否要完结 <strong style="color:#f47475;font-size:14px;">
          ${this.project.attached_flow.milestones[this.getActiveMilestones()].title}
          </strong> 里程碑？`,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      )
        //点击确定
        .then(() => {
          var current_stone_index = this.getActiveMilestones();
          var milestones = this.project.attached_flow.milestones;
          if(current_stone_index >= milestones.length-1){
            this.$message.error('无法完结当前里程碑')
          }else{
            this.$axios
              .post(this.$api.change_project_milestone(this.project.id), {
                milestone_id:milestones[current_stone_index+1].id
              })
              .then(res=>{
                this.$checkResData(res);
                this.$message({type: 'success', message:'操作成功'})
                this.updateProject();
              })
              .catch(err=>{
                this.$message.error('操作失败');
                console.log(err);
              })
          }
        })
        //点击取消
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });            

    },
    getActiveMilestones() {
      if (this.project.attached_flow.id) {
        let milestones = this.project.attached_flow.milestones;
        for (let i = 0; i < milestones.length; i++) {
          if (this.project.current_stone_id === milestones[i].id) {
            return i;
          }
        }
      } else {
        return -1;
      }
    },
    getStepDate(milestone_id) {
      var flow_id = this.project.attached_flow.id;
      var records = this.project.milestone_records;
      if (flow_id) {
        for (let j in records) {
          if (milestone_id === records[j].milestone_id) {
            return records[j].created_time;
          }
        }
      }
      //当前没有分配项目
      return "";
    },
    //更新项目数据 
    updateProject(){
      this.$axios
        .get(`${this.$api.get_project_detail(this.project.id)}?organ_id=${this.staff.organ_id}`)
        .then(res=>{
          this.$checkResData(res);
          this.project = res.data.project;
        })
        .catch(err=>{
          console.log(err);
        })
    }

  },
  created() {
    this.staff = this.$store.getters["user/getStaff"];
    this.project = this.$store.getters["project/getProjectData"];
  }  
};
</script>

<style lang="scss" scoped>
.row1 {
  background-color: #fff;
  padding: 10px 30px 20px 30px;
  margin-top: 2px;
}
.title {
  padding: 10px;
  margin-top: 20px;
  span.text {
    font-size: 18px;
    color: #333;
    font-weight: 600;
  }
  i {
    display: inline-block;
    width: 22px;
    height: 22px;
    position: relative;
    top: 3px;
    background-image: url("../../assets/img/icons2.png");
    &.device {
      background-position: -66px 0px;
    }
    &.flow {
      background-position: -66px -44px;
    }
  }
}
.row2 {
  .info {
    background-color: #fff;
    padding: 20px 30px 20px 30px;
    span {
      display: inline-block;
      color: #666;
      margin-right: 5%;
      &.project-name {
        color: $third-color;
        font-size: 24px;
      }
    }
  }
  .flow {
    margin-top: 16px;
    position: relative;
    padding: 30px;
    background-color: #fff;
    .el-steps {
      width: calc(100% - 250px);
    }
    .setMilestone {
      position: absolute;
      display: block;
      right: 20px;
      top: 35%;
    }
  }
}
</style>

