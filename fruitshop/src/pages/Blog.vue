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

    <el-button type="primary" @click="handleAdd" >写博客<i class="el-icon-circle-plus-outline"></i></el-button>

    <el-table :data="blogs" >
      <template slot-scope="scope">
        <el-button type="success" @click="handleEdit(scope.row)" >编辑 <i class="el-
            icon-edit"></i>
        </el-button>
      </template>
    </el-table>

    <el-dialog title="文章信息" :visible.sync="dialogFormVisible" width="60%" >
      <el-form label-width="80px" size="small">
        <el-form-item label="文章标题">
          <el-input v-model="blog.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <mavon-editor ref="md" v-model="blog.content" :ishljs="true" @imgAdd="imgAdd"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveBlog">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 博客内容 -->
    <div class="blog-text">

    <el-card v-for="blog in blogs" :key="blog.id" class="blog-card" :id="'blog-' + blog.id">
      <el-row>
        <div class="blog-title" style="font-size: 30px;font-weight: bold;">{{ blog.title }}</div>
      </el-row>
      <el-row>
        <vue-markdown :source="blog.content" ></vue-markdown>
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
import VueMarkdown from 'vue-markdown'; // 引入 vue-markdown

export default {
  components:{
    // VueMarkdown,
    VueMarkdown, // 注册 vue-markdown 组件


  },


  data() {
    return {
      tableData: [],

      showEditor: false,
      markdownContent: '# 你好，*Vue-Markdown*！',
      form:{},
      dialogFormVisible:false,
      viewDialogVis:false,

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

    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
// 绑定@imgAdd event
    imgAdd(pos, $file) {
      let $vm = this.$refs.md
      // 第一步.将图片上传到服务器.
      const formData = new FormData();
      formData.append('file', $file);
      axios({
        url: `http://${serverHost}/file/upload`,
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      }).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，
         * `$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，
         * `$vm`为 `this.$refs.md`
         */
        $vm.$img2Url(pos, res.data);
      })
    },



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

            // 更新 blogs 数组，将新发表的博客添加到数组开头
            this.blogs.unshift({
              id: response.data.data.id,
              title: this.blog.title,
              content: this.blog.content, // 可能需要将 this.blog.content 转换为 Markdown 格式
              author_id: this.blog.author_id,
              create_time: createTime,
              auth_name: temp.name, // 假设 temp 中有博客作者的姓名
            });

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
