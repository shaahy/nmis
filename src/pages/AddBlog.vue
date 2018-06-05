<template>
  <div class="add-blog">
    <h1>欢迎写博客</h1>
    <form v-if="!submited">
      <label>标题：</label>
      <input type="text" v-model="blog.title"><br />
      <label>内容：</label>
      <textarea v-model="blog.content"></textarea>
      <div class="checkboxs">
        <span>分类：</span>
        <input type="checkbox" value="Vue" v-model="blog.categories"><label>Vue</label>
        <input type="checkbox" value="Node" v-model="blog.categories"><label>Node</label>
        <input type="checkbox" value="React" v-model="blog.categories"><label>React</label>
        <input type="checkbox" value="Angular" v-model="blog.categories"><label>Angular</label>
      </div>
      <div><br>
        <span>作者：</span>
        <select v-model="blog.author">
          <option v-for="author in authors" :key="author">{{ author }}</option>
        </select>
      </div><br>
      <button @click.prevent="postData()">发布文章</button>
    </form>
    
    <!-- 发布成功提示 -->
    <div v-if="submited">
      <h2>发布成功！</h2>
    </div>

    <!-- 内容展示  -->
    <br>
    <div class="blog-show">
      <p>标题：{{ blog.title }}</p>
      <p>内容：{{ blog.content }}</p>
      <div>
        <p>所选分类：</p>
        <ul>
          <li v-for="category in blog.categories" :key="category"> 
            {{ category }}
          </li>
        </ul>
      </div>
      <div>
        <p>The author is: {{ blog.author }}</p>                
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-blog",
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      authors: ["zhang", "wang", "jiang", "zhao"],
      submited: false
    };
  },
  methods: {
    postData(){
      //利用axios来实现
      this.$axios.post("/blogs",this.blog)
          .then( res => {
            console.log(res);
            this.submited = true;
          })
          .catch( err => {
            console.log("提交失败")
            this.submited = false;
          })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-blog *{
  box-sizing: border-box;
}
.add-blog {
  max-width: 640px;
  margin: 20px auto;
}
.add-blog label {
  display: block;
}
.add-blog button {
  background-color: crimson;
  padding:10px 20px;
  border:none;
  color:#fff;

}
input[type="text"], textarea {
  display: block;
  width:100%;
  padding:15px; 
}
textarea {
  height: 100px;
}
.checkboxs {
  margin-top: 10px;
}
.checkboxs label, .checkboxs input{
  display: inline;
}
select {
  padding: 5px 10px;
}
select option{
  padding:10px;
  text-align: center;
  
}
.blog-show {
  padding:20px;
  border: 1px solid #000;
}
</style>
