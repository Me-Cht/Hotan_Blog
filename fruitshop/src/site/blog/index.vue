<template>
  <div class="blog-container">
    <!-- 博客内容撰写 -->
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
            <quill-editor v-model="blog.content">测试</quill-editor>
          </el-form-item>
          <div class="editor-actions">
            <el-button type="primary" @click="saveBlog">保存</el-button>
            <el-button @click="cancelBlog">取消</el-button>
          </div>
        </el-form>
      </el-card>
    </div>

    <!-- 博客内容 -->
    <el-card v-for="blog in blogs" :key="blog.id" class="blog-card">
      <el-row>
        <div class="blog-title">{{ blog.title }}</div>
      </el-row>
      <el-row>
        <div v-html="blog.content"></div>
      </el-row>
      <el-row>
        <div class="create_time">{{ formatDateTime(blog.create_time) }}</div>
        <div class="auth_name" style="color: #475669"><span style="color: gray">from:</span>{{ blog.auth_name }}</div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import api from "@/api/api";
import moment from 'moment';

export default {
  data() {
    return {
      showEditor: false,
      blog: {
        id: '',
        title: '',
        content: '',
        author_id: '',
        create_time: '',
        auth_name: ''
      },
      blogs: []
    };
  },
  methods: {
    formatDateTime(dateTime) {
      return moment(dateTime).format('YYYY-MM-DD HH:mm');
    },
    saveBlog() {
      api.getUserInfo().then((response) => {
        const temp = JSON.parse(response.data.msg)
        this.blog.author_id = temp.id

        api.writeArticle(this.blog)
          .then(response => {
            const createTime = response.data.data.create_time;
            this.blogs = response.data
            this.cancelBlog();
            this.refreshBlogs(); // 调用刷新博客列表的方法
          })
      })
    },
    refreshBlogs() {
      api.getArticle().then((response) => {
        this.blogs = response.data;
        console.log(response.data)
      });
    },
    cancelBlog() {
      this.showEditor = false;
      this.blog.title = '';
      this.blog.content = '';
    }
  },

  mounted() {
    api.getArticle().then((response) => {
      this.blogs = response.data;
    });
  }
};
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
  text-align: left;

}
.auth_name ,.create_time{
  text-align: right;
}


</style>
