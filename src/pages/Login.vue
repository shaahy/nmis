<template>
  <div class="login">
    <header>
      <div class="clearfix"><img src="../assets/img/logo.png" alt=""><h1>医疗设备管理系统</h1></div>
    </header>
    <form class="login-box">
      <h2>登陆</h2>
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
            //添加登陆用户
            //console.log(res);
            this.$store.commit('user/addLoginUser', res.data);
            this.$router.push('/home')           
          })
          .catch(err=>{
            console.log(err);
          })
    },
/*     test(){
      console.log('保存在Vuex中的数据')
      console.log(this.$store.state.user.user)
      console.log(this.$store.state.user.staff)
      console.log('保存在localStore中的数据')
      console.log(JSON.parse(localStorage.getItem('user')))
      console.log(JSON.parse(localStorage.getItem('staff')))

    },
    test2(){
       localStorage.removeItem('user');
       localStorage.removeItem('staff');
    } */
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
  height: 310px;
  padding:33px;
  background-color:$bg-color;
  margin: 0 auto;
  margin-top:15vh;
  h2{
    color:$font-color-cz2;
    letter-spacing: 5px;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .el-input{
    margin-top: 15px;
    img{
      max-width:20px;
    }
  }
  .btn-login{
    margin-top: 20px;
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
