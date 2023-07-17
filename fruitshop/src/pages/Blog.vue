<template>
  <div class="blog-container">
<!--    <aside class="sidebar">-->
<!--      <ul class="blog-titles">-->
<!--        <li v-for="blog in blogs" :key="blog.id">-->
<!--          <a :href="'#blog-' + blog.id" @click="selectBlog()">{{ blog.title }}</a>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </aside>-->
    <!-- 博客内容撰写 -->
    <div class="blog-write">
      <el-card v-if="!showEditor" class="blog-write" transition="fade">
        <button type="primary" @click="showEditor = true">写博客</button>
      </el-card>

      <el-card v-else>
        <el-form label-position="top">

          <el-form-item label="标题" class="title">
            <el-input v-model="blog.title" class="custom-input"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <quill-editor v-model="blog.content" class="custom-editor">测试</quill-editor>
          </el-form-item>
          <div class="editor-actions">
            <button type="primary" @click="saveBlog" id="blog-btn">保存</button>
            <button @click="cancelBlog" id="blog-btn">取消</button>
          </div>
        </el-form>
      </el-card>
    </div>

    <!-- 博客内容 -->
    <div class="blog-text">

    <el-card v-for="blog in blogs" :key="blog.id" class="blog-card" :id="'blog-' + blog.id">
      <el-row>
        <div class="blog-title" style="font-size: 30px;font-weight: bold;">{{ blog.title }}</div>
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
      selectedBlog:'',
      blogs: []
    };
  },
  methods: {
    formatDateTime(dateTime) {
      return moment(dateTime).format('YYYY-MM-DD HH:mm');
    },

    selectBlog(blog) {
      this.selectedBlog = blog;
      this.scrollToBlog(blog.id);
    },

    scrollToBlog(blogId) {
      const element = document.getElementById('blog-' + blogId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    },
    saveBlog() {
      api.getUserInfo().then((response) => {
        const temp = JSON.parse(response.data.msg)
        this.blog.author_id = temp.id

        api.writeArticle(this.blog)
          .then(response => {
            const createTime = response.data.data.create_time;
            this.blogs = response.data
            console.log("调用了write方法")

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
      console.log('response.data',response.data)
      this.blogs.forEach(item=>{
        console.log("item.id",item)

      })

      // 获取 URL 中的锚点，并滚动到对应的博客内容
      const hash = window.location.hash;
      if (hash) {
        const blogId = hash.slice(1); // 去除 '#' 符号
        this.scrollToBlog(blogId);
      }
    });
  }
};

</script>

<style >

.blog-container {
  gap: 20px;
  width: calc(100% - 50px);

  margin: 0 auto;
}
@media (max-width: 768px) {

  .headImgBox img{
    width: 100%;
    height: 100px;
  }
  .blog-container {
    gap: 20px;
    width: 100%;

    margin: 0 auto;
  }


}

.editor-actions {
  margin-top: 10px;
}

.blog-write {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  perspective: 200px;
  transition: 1s all ease-in;

}
.blog-write .el-card:hover{
  width: calc(100%)

}
.blog-write button {
  background: linear-gradient(200deg,#44986e,#326cc0);
  width: 80px;
  height: 50px;
  transition: 0.3s;
  border:none;
  border-radius:3px;
  cursor:pointer;

}
.blog-write button:hover{
  transform:rotateY(25deg);
  width: 100px;
  height: 70px;
  box-shadow: -15px 0 25px rgba(120,175,229,0.56);
}
.title {
  font-size: 80px;
  font-weight: 600;
}

.custom-input {
  /* 添加自定义样式 */
  /* 示例：修改输入框的边框颜色和字体颜色 */
  border-radius: 20%;

  color: blue;
}


.custom-editor {
  font-size: 30px;
  color: blue;

}

.editor-actions {
  display: flex;
  justify-content: center;
}
.blog-text{
  border-radius: 2%;
  transition: 3s all ease-in;
}
.blog-text :hover{

}


.blog-card {
  text-align: left;
  margin-top: 20px;
  transition: 0.5s all ease-in;
}
.blog-card:hover{
  /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);*/
  box-shadow:
      0 2px 2px rgba(0, 0, 0, 0.2),
      0 4px 4px rgba(0, 0, 0, 0.2),
      0 8px 8px rgba(0, 0, 0, 0.2),
      0 16px 16px rgba(0, 0, 0, 0.2);

}

/*.blog-text {*/
/*  background-color: green;*/
/*  border-radius: 2%;*/
/*  margin-top: 20px;*/
/*  text-align: left;*/
/*  transition: 0.5s all ease-in;*/
/*  box-shadow:*/
/*    0 2px 2px rgba(0, 0, 0, 0.1),*/
/*    0 4px 4px rgba(0, 0, 0, 0.1),*/
/*    0 8px 8px rgba(0, 0, 0, 0.1),*/
/*    0 16px 16px rgba(0, 0, 0, 0.1);*/
/*}*/

/*.blog-text:hover {*/
/*  box-shadow:*/
/*    0 2px 4px rgba(0, 0, 0, 0.2),*/
/*    0 4px 8px rgba(0, 0, 0, 0.2),*/
/*    0 8px 16px rgba(0, 0, 0, 0.2),*/
/*    0 16px 32px rgba(0, 0, 0, 0.2);*/
/*}*/

.auth_name,
.create_time {
  text-align: right;
}

/* 博客侧边栏 */
.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  position: fixed;
  left: 20px;
  top: 70px;

}


.blog-titles {
  list-style-type: none;
  padding: 0;
}

.blog-titles li {
  margin-bottom: 10px;
  cursor: pointer;
}

.blog-titles li:hover {
  text-decoration: underline;
}

</style>
