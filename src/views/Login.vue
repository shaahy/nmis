<template>
  <div class="login">
    <header>
      <div class="clearfix"><img src="../assets/img/logo.png" alt=""><h1>医疗设备管理系统</h1></div>
    </header>
    <form class="login-box">
      <h2>登陆</h2> 
      <el-alert
          :title="errMessage"
          type="error"
          show-icon
          :closable="false"
          v-if="isError">
      </el-alert>        
      <el-input v-model="userName" placeholder="请输入用户名/手机/邮箱/email">
        <template slot="prepend"><img src="../assets/img/input_user_icon.png" alt=""></template>
      </el-input>        
      <el-input v-model="passWord" placeholder="请输入密码" type="password">
        <template slot="prepend"><img src="../assets/img/input_pwd_icon.png" alt=""></template>
      </el-input>         
      <el-button type="primary" @click="onSubmit" class="btn-login">登&nbsp;&nbsp;&nbsp;&nbsp;陆</el-button>
      <el-row><a href="#" class="btn-forget">忘记密码？</a></el-row>
    </form>

    <!-- <el-button @click="test">读取Vuex与localStorage数据</el-button>
    <el-button @click="test2">删除localStorage中的数据</el-button> -->
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userName:"",
      passWord:"",
      isError:false,
      errMessage:""
    }
  },
  methods: {
    onSubmit(){
      
      //登陆请求
      this.$axios.post("/nmis/v1/users/login",{
        authkey:"username",
        username:this.userName,
        password:this.passWord
      })
          .then(res=>{
            //判断登陆是否成功
            if(res.data.code === 11009){
              //登陆错误
              this.isError = true;
              this.errMessage = "";
              for (const key in res.data.errors) {
                this.errMessage += res.data.errors[key]
              }
            }else{
              //登陆成功
              this.isError = false;
              this.errMessage = "";
              this.$router.push({name:'projectIndexLink'}) 
            }            
            // console.log(res);
            this.$store.commit('user/addLoginUser', res.data);        
          })
          .catch(err=>{
            console.log(err);
          })
    }

  },
  created(){

  }
};
</script>

<style lang="scss" scoped>
header{
  background-color: $main-color; 
  height: 150px;
  div{
    width:414px;    
    margin: 0 auto;
    padding-top:50px;
    text-align: center;
  }
  img{
    max-width: 105px;
    display: inline;
  }
  h1{
    display: inline;
    color:#fff;
    font-size: 36px;
    margin-left: 15px;
    position: relative;
    top:-5px;
  }
}
.login-box{
  position: relative;
  width:400px;
  height: auto;
  padding:33px;
  background-color:$bg-color;
  margin: 0 auto;
  margin-top:15vh;
  h2{
    color:$font-color-cz2;
    letter-spacing: 5px;
    font-size: 20px;
    margin-bottom: 15px;
  }
  .el-input{
    margin-top: 15px;
    img{
      max-width:20px;
    }
  }
  .btn-login{
    margin-top: 30px;
    width:100%;
    font-size: 16px;
  }
  .btn-forget{
    float:right;
    color:crimson;
    margin-top:20px;
  }
}
</style>
