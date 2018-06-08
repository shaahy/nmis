<template>
  <el-row>
    <h1>这是测试页面</h1>
    <el-button type="primary" @click="onClick">请求http，并设置缓存</el-button>
    <el-button type="success" @click="onClick2">读取缓存</el-button>
    <el-button type="delete" @click="clearCookies">清除Cookie中Token缓存</el-button>
    <ul>
      <li v-for="(value,key) in data" :key="key"> {{key}} : {{value}} </li>
    </ul>
    <h2>本地保存的Cookie中的token为：{{ token }}</h2>
  </el-row>

</template>

<script>
export default {
  name: "test",
  data() {
    return {
      data:{},
      token:""
    }
  },
  methods: {
    onClick(){
      //获取数据 ，并设置cookie
      this.$axios.get("/token")
          .then(res=> {
            this.data = res.data;
            console.log(res.data.token)

            //设置cookie
            this.$cookies.set("Authentication","Token "+res.data.token)
          })
    },
    onClick2(){
      //查看cookie
      this.token = this.$cookies.get("Authentication")
    },
    clearCookies(){
      this.$cookies.remove("Authentication");
      console.log('本地token缓存已经清除')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-row{
  text-align: center;
  h1{
  margin-bottom: 20px; 
  }
  ul{
    margin-top: 30px;
    li{
      color:#222;
      font-size: 18px;
      padding: 10px auto;
    }
  }

}
</style>
