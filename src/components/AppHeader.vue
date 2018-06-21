<template>
  <header>
    <div class="logo"><img src="../assets/img/logo.png" alt=""></div>
    <nav>
      <ul>
        <li id="project" :class="{act: isActive.project}">
          <router-link to="/project" exact><i></i> 项目管理</router-link>
        </li>
        <li id="dev" :class="{act: isActive.dev}">
          <router-link to="" exact><i></i> 设备管理</router-link>
        </li>
        <li id="repos" :class="{act: isActive.repos}">
          <router-link to="" exact><i></i> 态势报表</router-link>
        </li>
        <li id="manage" :class="{act: isActive.manage}">
          <router-link to="/manage" exact><i></i> 系统管理</router-link>
        </li>
      </ul>
    </nav>
    <div class="right">
      <ul>
        <li><img src="../assets/img/portrait.jpg" class="portrait"></li>
        <li><span class="name">{{ staff.staff_name }} &nbsp;&nbsp;&nbsp;</span></li>
        <li><el-button size='mini' plain @click='quit'>退出</el-button></li>
      </ul>
      

    </div>
  </header>
</template>

<script>
export default {
  name: 'app-header',
  data () {
    return {
      staff:{},
      isActive:{}
    }
  },
  methods:{
    quit(){  
      localStorage.removeItem('Authorization')  //清除Token            
      localStorage.setItem('isLogin', 'false')  //设置登陆状态为false
      this.$router.push({name:'loginLink'})     //导航至登陆页
    }
  },
  created(){
    //获取用户信息
    this.staff = this.$store.getters['user/getStaff']
    //获取导航状态
    this.isActive = this.$store.getters['nav/getNavStatus']
  }  
}
</script>

<style lang="scss" scoped>
header{
  position: fixed;
  top:0;
  left:0;
  z-index: 777;
  height: $header-height;
  width: 100%;
  background-color:$second-color;
  .logo{
    position: relative;
    height: $header-height;
    width:168px;
    float: left;
    text-align: center;
    img{
      max-width: 75px;
      position: absolute;
      top:0;
      bottom:0;
      left: 0;
      right:0;
      margin:auto;
    }
  } 
  nav{
    float: left;
    ul{
      padding:0;
      li{
        display: inline-block;
        line-height:$header-height;
        cursor: pointer;
        a{
          display: block;
          color:#fff;
          text-decoration: none;
          padding:0 20px;
        }
        i{
          width:20px;
          height:20px;
          display: inline-block;
          position: relative;
          top:4px;
          transition: 0.3s;
        }
        &:hover, &.act{
          background-color: #fff;
          a{
            color:$main-color;
          }
        }
      }
      #project{
        i{
          background-image: url("../assets/img/header_ico.png");
          background-position: 0px 20px;
        }
        &:hover, &.act{
          i{
            background-position: 0px 0px;
          }
        }
      }
      #dev{
        i{
          background-image: url("../assets/img/header_ico.png");
          background-position: 60px 20px;
        }
        &:hover, &.act{
          i{
            background-position: 60px 0px;
          }
        }
      }
      #repos{
        i{
          background-image: url("../assets/img/header_ico.png");
          background-position: 40px 20px;
        }
        &:hover, &.act{
          i{
            background-position: 40px 0px;
          }
        }
      }
      #manage{
        i{
          background-image: url("../assets/img/header_ico.png");
          background-position: 20px 20px;
        }
        &:hover, &.act{
          i{
            background-position: 20px 0px;
          }
        }
      }
    }
  }
}

.right{
  max-width: 200px;
  height: $header-height;
  float:right;
  color:#fff;
  margin-right: 30px;
  ul{
    li{
      display: inline-block;
      line-height: $header-height;
      padding:0 2px;
      img.portrait{
        max-width: 30px;
        border-radius: 50%;
        position: relative;
        top:10px;
      }
      .name{
        font-size: 14px;
      }
    }
  }
}
</style>
