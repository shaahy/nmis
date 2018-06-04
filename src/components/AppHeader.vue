<template>
  <nav>
    <ul>
      <li><router-link to="/" exact>首页</router-link></li>
      <li><router-link to="/add-blog" exact>子页面一</router-link></li>
      <li><router-link to="/show-blog" exact>子页面二</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "app-header", 
}
</script>


<style scoped>
nav {
  background-color: crimson;
  padding:20px 0;
}
ul{
  list-style-type: none;
  text-align: center;
}
ul li{
  display: inline-block;
  margin:0 15px;
}
ul li > a{
  padding:12px;
  color:#fff;
  text-decoration: none;
}
.router-link-active{
  background-color: rgba(255,255,255,0.9);
  color:rgb(49, 49, 49);
  font-weight: bold;
}

</style>
