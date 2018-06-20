<template>
  <div class="manage-staff">
    <app-tag title="人员管理"></app-tag>
    <div class="row1">
      <div class="header">
        <span class="title"><i></i> 数据列表</span>
        <el-button type="primary" @click="handleAdd">+ 添加员工</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="primary" @click="handlePermission">分配角色</el-button>
      </div>
      <div class="list">
        <el-table :data="tableData" style="width: 100%" @select='handleSelect' @select-all='handleSelectAll'>
          <el-table-column type="selection" porp='group' width="55"></el-table-column>          
          <el-table-column type="index" label="序号" width="80" sortable></el-table-column>
          <el-table-column prop="username" label="成员账号" width="150"></el-table-column>
          <el-table-column prop="staff_name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="260"></el-table-column>
          <el-table-column prop="contact_phone" label="手机号" width="150"></el-table-column>
          <el-table-column prop="group_name" label="角色" width="150"></el-table-column>
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
    <el-dialog title="添加员工" :visible.sync="addVisible" width="600px" @close="addClose('addForm')">
      <el-form :model="addData" :rules="rules" ref="addForm">      
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
        <el-button type="primary" @click="confirmAdd('addForm')">确 定</el-button>
        <el-button @click="cancelAdd('addForm')" type="info">取 消</el-button>
      </div>
    </el-dialog>  


    <!-- 编辑员工信息窗体 -->
    <el-dialog title="修改员工信息" :visible.sync="editVisible" width="600px"  @close="editClose('editForm')">
      <el-form :model="editData" :rules="rules" ref="editForm">      
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
        <el-button type="primary" @click="confirmEdit('editForm')">确 定</el-button>
        <el-button @click="cancelEdit('editForm')" type="info">取 消</el-button>
      </div>
    </el-dialog>   

    <!-- 分配权限窗体 -->
    <el-dialog title="分配角色" :visible.sync="permVisible" width="600px"  @close="permClose('permForm')">
      <el-form :model="permData" :rules="rules" ref="permForm">
        <el-form-item label="分配员工：">
        {{selectedStaffNames}}
        </el-form-item>      
        <el-form-item label="角色选择" label-width='80px' prop='selectedRole'>
          <el-select v-model="permData.selectedRole" placeholder="请选择角色">
            <el-option label="项目分配者" value="1"></el-option>
            <el-option label="普通员工" value="2"></el-option>
            <el-option label="系统管理员" value="3"></el-option>
          </el-select>
        </el-form-item>          
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmPerm('permForm')">确 定</el-button>
        <el-button @click="cancelPerm('permForm')" type="info">取 消</el-button>
      </div>
    </el-dialog>  

  </div>
</template>

<script>
import AppTag from "@/components/AppTag";
export default {
  name: "manage-staff",
  data() {
    return {
      tableData: [],
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
      addVisible: false,
      editVisible: false,
      permVisible: false,
      depts: [],
      editData: {},
      addData: {},
      permData: {
        selectedRole: "" //角色分配
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "请填写正确的邮箱格式",
            trigger: "blur"
          }
        ],
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" }
        ],
        staff_name: [
          { required: true, message: "请填写姓名", trigger: "blur" }
        ],
        contact_phone: [
          { required: true, message: "必填项，不能为空", trigger: "blur" },
          {
            type: "string",
            len: 11,
            message: "请填写11号电话号码",
            trigger: "blur"
          }
        ],
        dept: [
          { required: true, message: "请选择所属部门", trigger: "change" }
        ],
        selectedRole: [
          { required: true, message: "请选择角色", trigger: "change" }
        ]
      },
      selection: [] //已选中的行数据集合
    };
  },
  computed: {
    //已选中的名字集合
    selectedStaffNames: function() {
      var list = "";
      for (let index in this.selection) {
        list += this.selection[index].staff_name + ", ";
      }
      list = list.trim().substring(0, list.length - 2);
      return list;
    },
    selectedStaffIDs: function() {
      var list = "";
      for (let index in this.selection) {
        list += this.selection[index].id + ", ";
      }

      list = list.substring(0, list.length - 2);
      return list;
    }
  },
  components: {
    "app-tag": AppTag
  },
  methods: {
    /* 查看员工详情 */
    handleInfo(index, row) {
      console.log(row);
    },

    /* 添加员工 */
    handleAdd() {
      this.addVisible = true;
    },
    cancelAdd(addForm) {
      this.addData = {};
      this.$refs[addForm].clearValidate();
      this.addVisible = false;
    },
    addClose(addForm) {
      this.addData = {};
      this.$refs[addForm].clearValidate();
      this.addVisible = false;
    },
    confirmAdd(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          //表单验证成功
          this.$axios
            .post(
              "/hospitals/" +
                this.$store.getters["user/getStaff"].hospital +
                "/staffs/create",
              {
                username: this.addData.username,
                dept_id: this.addData.dept,
                staff_name: this.addData.staff_name,
                contact_phone: this.addData.contact_phone,
                email: this.addData.email,
                password: "111111"
              }
            )
            .then(res => {
              this.$checkResData(res); //先检查返回数据，若有错误则会抛出错误信息，此函数封闭在http/index.js中
              this.addVisible = false;
              this.$message({ type: "success", message: "员工添加成功!" });
              this.getStaffList();
            })
            .catch(err => {
              this.$message.error(err);
              console.log(err);
            });
          this.addVisible = false;
          this.addData = {};
        } else {
          //表单验证失败
          console.log("表单验证失败！");
          return false;
        }
      });
    },

    /* 编辑员工 */
    handleEdit(index, row) {
      this.editData = JSON.parse(JSON.stringify(row)); //复制对象，需JSON这序列化，否则会赋值引用
      this.editVisible = true;
    },
    cancelEdit(editForm) {
      this.editData = {};
      this.$refs[editForm].clearValidate();
      this.editVisible = false;
    },
    editClose(editForm) {
      this.editData = {};
      this.$refs[editForm].clearValidate();
      this.editVisible = false;
    },
    confirmEdit(editForm) {
      this.$refs[editForm].validate(valid => {
        if (valid) {
          this.$axios
            .put(
              "/hospitals/" +
                this.$store.getters["user/getStaff"].hospital +
                "/staffs/" +
                this.editData.id,
              {
                username: this.editData.username,
                dept_id: this.editData.dept,
                staff_name: this.editData.staff_name,
                contact_phone: this.editData.contact_phone,
                email: this.editData.email
              }
            )
            .then(res => {
              this.$checkResData(res); //先检查返回数据，若有错误则会抛出错误信息，此函数封闭在http/index.js中
              this.editVisible = false;
              this.$message({ type: "success", message: "员工修改成功!" });
              this.getStaffList();
              this.editVisible = false;
              this.editData = {};
            })
            .catch(err => {
              this.$message.error(err);
              console.log(err);
            });
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },

    /* 删除员工 */
    handleDelete(index, row) {
      this.$confirm(
        '此操作将删除员工: <strong style="color:#f47475;font-size:14px;"> 《' +
          row.username +
          "》</strong> , 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      )
        //点击确定
        .then(() => {
          this.$axios
            .delete("/hospitals/" + row.hospital + "/staffs/" + row.id)
            .then(res => {
              this.$checkResData(res);
              this.getStaffList();
              this.$message({ type: "success", message: "员工删除成功!" });
            })
            .catch(err => {
              this.$message({ type: "error", message: err });
            });
        })
        //点击取消
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },

    /* 分配权限 */
    handlePermission() {
      if (this.selectedStaffIDs != "") {
        this.permVisible = true;
      } else {
        this.$message.error("请选择需要分配角色的员工!");
      }
    },
    confirmPerm(permForm) {
      this.$refs[permForm].validate(valid => {
        if (valid) {
          this.$axios
            .put(
              "/hospitals/" +
                this.$store.getters["user/getStaff"].hospital +
                "/staffs/change-permission",
              {
                perm_group_id: this.permData.selectedRole,
                staffs: this.selectedStaffIDs
              }
            )
            .then(res => {
              this.permVisible = false;
              this.getStaffList();
              this.$message({ type: "success", message: "角色分配成功!" });
            })
            .catch(err => {
              this.$message.error("角色分配失败!");
              console.log(err);
            });
        } else {
          //表单验证失败
          console.log("表单验证失败！");
          return false;
        }
      });
    },
    cancelPerm(permForm) {
      this.$refs.permForm.clearValidate();
      this.permVisible = false;
    },
    permClose(permForm) {
      this.$refs.permForm.clearValidate();
    },
    handleSelect(selection, row) {
      this.selection = selection;
    },
    handleSelectAll(selection) {
      this.selection = selection;
    },

    /**从后端API获取数据 */
    //从后端获取员工信息
    getStaffList() {
      this.$axios
        .get(
          "/hospitals/" +
            this.$store.getters["user/getStaff"].hospital +
            "/staffs"
        )
        .then(res => {
          this.$checkResData(res);
          this.tableData = res.data.staff.slice(0);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取部门数据
    getDepartmentList() {
      this.$axios
        .get(
          "/hospitals/" +
            this.$store.getters["user/getStaff"].hospital +
            "/departments"
        )
        .then(res => {
          this.$checkResData(res);
          this.depts = res.data.dept.slice(0);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getStaffList();
    this.getDepartmentList();
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
    .el-button {
      float: right;
      margin-right: 15px;
    }
  }
  .list {
    background-color: #fff;
    padding: 20px 40px 40px 40px;
    margin-top: 2px;
  }
}
</style>
