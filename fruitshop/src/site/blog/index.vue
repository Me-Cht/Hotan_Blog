<template>
  <div class="blog-container">
<!--    博客内容撰写    -->
    <div class="blog-write">
      <el-card v-if="!showEditor">
        <el-button type="primary" @click="showEditor = true">写博客</el-button>
      </el-card>

    <el-card v-else>
      <el-form label-position="top">
        <el-form-item label="标题">
          <el-input v-model="blog.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="blog.content"></el-input>
        </el-form-item>
        <div class="editor-actions">
          <el-button type="primary" @click="saveBlog">保存</el-button>
          <el-button @click="cancelBlog">取消</el-button>
        </div>
      </el-form>
    </el-card>
    </div>


<!--    博客内容    -->
    <el-card v-for="blog in blogs" :key="blog.id" class="blog-card">
      <el-row>
        <div class="blog-title">{{ blog.title }}</div>
      </el-row>
      <el-row>
        <div v-html="blog.content"></div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  data() {
    return {
      showEditor: false,
      blog: {
        title: '',
        content: '',
      },
      blogs: []
    };
  },
  methods: {
    saveBlog() {
      // console.log('this.blog:',this.blog)
      api.writeArticle(this.blog)
        .then(response=>{
          console.log(response)
          this.cancelBlog();
        })

    },
    cancelBlog() {
      this.showEditor = false;
      this.blog.title = '';
      this.blog.content = '';
    }
  },

  mounted() {
    console.log("token:", this.$store.state.token);
    api.getArticle().then((response) => {
      console.log(response.data);
      this.blogs = response.data;
    });
  }};
//TODO 新增博客作者、ID及创建时间。
</script>

<style scoped>
.blog-container {
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
}

.editor-actions {
  margin-top: 10px;
}

.blog-card {
  width: 400px;
}

.blog-title {
  font-size: 18px;
  font-weight: bold;
}

.blog-write {
  width: 1000px;
  border-radius: 100px;
}
.blog-card {
  width: 1000px;
}

</style>
