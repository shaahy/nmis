<template>
  <div class="show-blogs" v-theme:bg='"wide"'>
    <h1>博客列表</h1>
    <input type="text" v-model="search" placeholder="请输入搜索的关键词">
    <ul>
      <li v-for="blog in filterBlogs" :key="blog.id">
        <div class="item">
          <h2 v-rainbow>标题：{{ blog.title }}</h2>
          <p>摘要：{{ blog.content }}</p>
          <p>作者：{{ blog.author | to-uppercase }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "show-blogs",
  data() {
    return {
      blogs:[],
      search:""
    };
  },
  methods: {

  },
  created(){
    //获取数据 
    this.$axios.get("http://localhost:3000/blogs")
        .then( res => {
          //console.log(res)
          this.blogs = res.data;
        })
  },
  //计算
  computed:{
    filterBlogs(){
      return this.blogs.filter( blog =>{
        return blog.title.match(this.search);
      })
    }
  },
  //局部指令：只在当前组件使用
  directives:{
    "rainbow": {
      bind(el, binding, vnode){
       el.style.color = "#" + Math.random().toString(16).slice(2,8);
      }
    },
    "theme": {
      bind(el, binding, vnode){
        if(binding.value == 'wide'){
          el.style.maxWidth = "980px";
        }
        if(binding.arg == 'bg'){
          el.style.backgroundColor = 'rgb(199, 215, 231)';
          el.style.borderRadius = '5px';
        }
      }      
    }
  },
  //局部过滤器：只在当前组件使用
  filters:{
    toUppercase(value){
      return value.toUpperCase();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.show-blogs *{
  box-sizing: border-box;
}
.show-blogs{
  max-width: 600px;
  margin: 40px auto;
  box-sizing: border-box;
  padding:40px;
}
h1{
  text-align: center;
}
ul > li {
  text-align: left;
  list-style: none;
  width: 100%;
  padding: 25px;
  margin:8px auto;
  background-color: #f9f9f9;
}
</style>
