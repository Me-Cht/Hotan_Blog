<template>
  <div class="mostBig-Blog">
      <div class="sidebar">
        <h2>博客概览</h2>
        <ul class="blog-titles">
          <li v-for="blog in blogs" :key="blog.id" @click="selectBlog(blog)">
            {{ blog.title }}
          </li>
        </ul>
      </div>
      <div class="back-to-top" style="position: fixed;bottom: 100px;right: 20px;z-index: 999">
        <button @click="scrollToTop">返回顶部</button>
      </div>
      <div class="blog-container">
    <!-- 博客内容撰写 -->
    <div class="container-AddTopic">
<!--      博客的分类-->
      <div class="topic">
        <!-- 添加按钮 -->
        <el-button type="primary" icon="el-icon-edit" circle @click="showAddCategoryDialog">添加分类</el-button>
        <!-- 显示分类 -->
        <div class="detail_topic">
          <button class="category-detail" v-for="(category, index) in categories" :key="index" @click="get_category(category)">
            {{ category }}
            <i class="el-icon-delete-solid" @click.stop="deleteTopic(category)"></i>
          </button>

        </div>


      </div>

      <!-- 添加分类对话框 -->
      <el-dialog :visible.sync="dialogVisible" title="添加分类">
        <el-input v-model="newCategory.name" placeholder="请输入分类名称"></el-input>
        <div class="confirmOrCancel">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addCategory">确定</el-button>
        </div>

      </el-dialog>
    </div>
<!--    写博客按钮-->
    <el-button type="primary" @click="handleAdd" >写博客<i class="el-icon-circle-plus-outline"></i></el-button>

<!--    <el-table :data="blogs" >-->
<!--      <template slot-scope="scope">-->
<!--        <el-button type="success" @click="handleEdit(scope.row)" >编辑 <i class="el- -->
<!--            icon-edit"></i>-->
<!--        </el-button>-->
<!--      </template>-->
<!--    </el-table>-->

<!--    弹出新增博客编辑框-->
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
        <el-button type="primary" @click="saveBlog()">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 弹出修改博客编辑框 -->
    <el-dialog title="编辑文章" :visible.sync="editBlogFromVisible" width="80%">
      <el-form label-width="80px" size="small">
        <el-form-item label="编辑文章">
          <el-input v-model="editingBlog.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编辑内容">
          <mavon-editor ref="md" v-model="editingBlog.content" :ishljs="true" @imgAdd="imgAdd"/>
        </el-form-item>
        <el-form-item label="类别">

          <el-select v-model="editingBlog.category" clearable placeholder="请选择">
            <el-option
              v-for="(category, index) in categories"
              :key="index"
              :label="category"
              :value="category"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editBlogFromVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditedBlog()">确 定</el-button>
      </div>
    </el-dialog>




    <!-- 通过findAll来渲染所有博客内容 -->
    <div class="blog-text">

    <el-card v-for="blog in reversedItems" :key="blog.id" class="blog-card" :id="'blog-' + blog.id">
      <el-row>
        <div class="blog-title" style="font-size: 30px;font-weight: bold;">{{ blog.title }}</div>
      </el-row>
      <el-row>
        <vue-markdown :source="blog.content" ></vue-markdown>
      </el-row>
      <el-row>
        <div class="create_time">{{ formatDateTime(blog.create_time) }}</div>
        <div class="auth_name" style="color: #475669"><span style="color: gray">from:</span>{{ blog.auth_name }}</div>
        <div class="changeContext">
        <el-button type="primary" @click="handleEdit(blog)">修改</el-button>
        <el-button type="danger" @click="deleteBlog(blog.id)">删除</el-button>
        </div>

      </el-row>
    </el-card>
    </div>
  </div>
  </div>

</template>

<script>
import api from "@/api/api";
import moment from 'moment';
import VueMarkdown from 'vue-markdown';
import AddTopic from "@/components/AddTopic.vue";
import axios from "axios";
import edit from "@/views/fruit/edit/index.vue";
import {req} from "vuelidate/lib/validators/common"; // 引入 vue-markdown

export default {
  components:{
    AddTopic,
    // VueMarkdown,
    VueMarkdown, // 注册 vue-markdown 组件


  },


  data() {
    return {
      //选择器
      options: [{
        label: '黄金糕'
      }, {
        label: '双皮奶'
      }, {
        label: '蚵仔煎'
      }, {
        label: '龙须面'
      }, {
        label: '北京烤鸭'
      }],
      value: '',


      //编辑博客id
      editingBlogId: null,

      //实现可以编辑的博客的内容和标题
      editingBlog: {
        title: '',
        content: '',
        category:'',
      },
      editBlogFromVisible:false, //编辑框是否可视
      isEditing:false,//是否处于编辑状态
      articles:[],//从findAll里获取到所有的文章会存储在这里
      tableData: [],//初始化时没有选择特定的分类
      selectedCategory: null,//是否选中了分类
      // showEditor: false, //是否显示编辑框
      dialogVisible: false, //是否显示新增博客编辑框
      newCategory: {
        name: "", // 新分类的名称
      },
      categories: [], // 分类列表
      markdownContent: `
        # 标题

        这是一段 **加粗** 文本，还有 *斜体*。

        ## 列表

        - 列表项1
        - 列表项2
        - 列表项3

        ## 代码块

        \`\`\`javascript
        function helloWorld() {
          console.log('Hello, World!');
        }
        \`\`\`
      `,

      form:{},
      dialogFormVisible:false,
      viewDialogVis:false,

      blog: {
        id: '',
        title: '',
        content: '',
        author_id: '',
        create_time: '',
        auth_name: '',
        category:'未分类',
      },
      selectedBlog:'',
      blogs: []
    };
  },
  methods: {

    //滚回顶部
    scrollToTop() {
      // 使用原生的scrollTo方法来滚动到顶部
      window.scrollTo({
        top: 0,
        behavior: "smooth" // 添加这个参数以实现平滑滚动效果
      });
    },
    handleChange(value) {
      console.log(value);
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(blog) {
      this.editingBlogId = blog.id;
      this.editBlogFromVisible = true;
      const targetBlog = this.articles.find(blog => blog.id ===this.editingBlogId)
      console.log("targetBlog",targetBlog)
      if(targetBlog){
        this.editingBlog.title = targetBlog.title
        this.editingBlog.content = targetBlog.content
        this.editingBlog.category = this.selectedCategory
      }else {
        console.log("Article not found for the given id:", this.editingBlogId);
      }



      console.log("editingBlog",this.editingBlog)
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
        $vm.$img2Url(pos, res.data);
      })
    },


    formatDateTime(dateTime) {
      return moment(dateTime).format('YYYY-MM-DD HH:mm');
    },

    submitForm(){

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
      this.blog.category = this.selectedCategory
      api.getUserInfo().then(response => {
        const temp = JSON.parse(response.data.msg)
        this.blog.author_id = temp.id
        this.blog.auth_name = temp.name
        console.log(this.blog.auth_name,this.blog.author_id)
        this.blog.category = this.selectedCategory
        console.log(this.blog)
        axios.post("http://hotan.site:8088/api/article/write", this.blog)
          .then(response => {
            this.refreshBlogs();
            this.cancelBlog();


          })

      })



    },
    refreshBlogs() {
      if (this.selectedCategory) {
        this.get_category(this.selectedCategory);
      } else {
        api.getArticle().then((response) => {
          this.blogs = response.data;
          // 在获取到数据后，按照时间降序排序
          this.blogs.sort((a, b) => new Date(b.create_time) - new Date(a.create_time));
        });
      }
    },
    cancelBlog() {
      this.dialogFormVisible = false;
      this.blog.title = '';
      this.blog.content = '';
    },
    showAddCategoryDialog() {
      // 显示添加分类对话框
      this.dialogVisible = true;
    },
    addCategory() {
      // 确定添加分类
      if (this.newCategory.name) {
        // 将新分类名称添加到分类列表中
        if (this.categories.includes(this.newCategory.name)) {
          alert("不允许同名分类")
        } else {
          this.categories.push(this.newCategory.name);
          localStorage.setItem('categories', JSON.stringify(this.categories));
        }
        // 将分类列表保存到 localStorage 中
        // 清空输入框
        this.newCategory.name = "";
        // 隐藏对话框
        this.dialogVisible = false;
      }
    },
    fetchCategories() {
      axios.get('http://hotan.site:8088/api/article/category')
        .then(response => {
          if (response.data.code === "0") {
            this.categories = response.data.data;
            console.log(this.categories)
            console.log(this.categories)
            // 将分类列表保存到 localStorage 中
            localStorage.setItem('categories', JSON.stringify(this.categories));
          } else {
            alert("获取分类数据失败：", response.data.msg);
          }
        })
        .catch(error => {
          alert("获取数据失败", error);
        });
    },
    get_category(category) {
      this.selectedCategory = category;
      // console.log(this.selectedCategory)
      this.blog.category = category; // 将选定的分类值赋给博客的category字段
      const encodedCategory = encodeURIComponent(category)

      axios.get(`http://hotan.site:8088/api/article/searchByCate?category=${encodedCategory}`)
        .then(response => {
          this.blogs = response.data.data
        }).catch(error => {
      })
    },
//删除topic
    deleteTopic(category) {
      this.$confirm("警告！确定删除该分类吗？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'custom-confirm-box'

      }).then(() => {
        axios.delete(`http://hotan.site:8088/api/article/deletecategory/${category}`)
          .then(response => {
            // 从分类列表数组中移除被删除的分类
            const index = this.categories.indexOf(category);
            if (index !== -1) {
              this.categories.splice(index, 1);
            }
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(error => {
            // 处理删除失败情况
            this.$message({
              type: 'error',
              message: '删除失败: ' + error.message
            });
          });
      }).catch(() => {
        // 用户点击了取消按钮
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 删除博客
    deleteBlog(id){
      this.$confirm("警告！确定删除该分类吗？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(`http://hotan.site:8088/api/article/delete/${id}`)
          .then(response => {
            // 从分类列表数组中移除被删除的分类
            const index = this.blogs.indexOf(id);
            if (index !== -1) {
              this.blogs.splice(index, 1);
            }
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          this.refreshBlogs()
          })
          .catch(error => {
            // 处理删除失败情况
            this.$message({
              type: 'error',
              message: '删除失败: ' + error.message
            });
          });
      }).catch(() => {
        // 用户点击了取消按钮
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    saveEditedBlog() {
      const requestBody = {
        title: this.editingBlog.title,
        content: this.editingBlog.content,
        category: this.editingBlog.category,
      };

      axios.put(`http://hotan.site:8088/api/article/edit/${this.editingBlogId}`, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // 更新成功后的处理逻辑
          this.dialogFormVisible = false;
          this.refreshBlogs()
          // ...
        })
        .catch(error => {
          // 更新失败的处理逻辑
          console.error('Error editing blog:', error);
        });
    }



  },
  computed:{
    reversedItems(){
      return this.blogs.slice().reverse();

    }

  },

  mounted() {
    if (this.selectedCategory) {
      this.get_category();
    } else {
      api.getArticle().then((response) => {
        this.blogs = response.data;
        this.articles = response.data;

        this.blogs.forEach(item => {
          console.log("item:", item);
        });

        // 获取 URL 中的锚点，并滚动到对应的博客内容
        const hash = window.location.hash;
        if (hash) {
          const blogId = hash.slice(1); // 去除 '#' 符号
          this.scrollToBlog(blogId);
        }

        // 在数据加载完成后滚动到指定位置（例如 400px）
        setTimeout(() => {
          window.scrollTo({
            top: 340,
            behavior: "smooth"
          });
        }, 0);
      });
    }
  },
  created() {
    this.fetchCategories()
    // 从 localStorage 中恢复分类列表
    const categoriesStorage = localStorage.getItem('categories');
    if (categoriesStorage) {
      this.categories = JSON.parse(categoriesStorage);
    } else {
      // 如果 localStorage 中没有分类列表，则从接口获取
      this.fetchCategories();
      console.log(this.categories)
    }


  },

};

</script>

<style>
.mostBig-Blog {
  display: flex; /* 让两个子元素并排显示 */

}


.sidebar {
  width: 300px;
  max-height: 85vh; /* 设置最大高度为视口高度的 85% */
  overflow-y: auto; /* 启用垂直滚动条 */
  border-right: 1px solid #ccc; /* 添加右边框分隔 */
  padding: 20px;
  position: sticky; /* 使用粘性定位 */
  top: 70px; /* 顶部位置 */
  left: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-top: 20px;
}


.blog-container {
  flex: 1; /* 占满剩余宽度 */
  height: 100%; /* 设置为撑满容器的高度 */
  overflow-y: auto; /* 启用垂直滚动条 */
  padding: 20px;
  box-sizing: border-box;
  margin-left: 20px;

}
/*@media (max-width: 768px) {*/

/*  .headImgBox img{*/
/*    width: 100%;*/
/*    height: 100px;*/
/*  }*/
/*  .blog-container {*/
/*    gap: 20px;*/
/*    width: 100%;*/
/*    margin: 0 auto;*/
/*  }*/


/*}*/
/* 在窗口宽度小于 768px 时应用的样式 */
@media (max-width: 768px) {
  .mostBig-Blog {
    flex-direction: column; /* 在小屏幕上将元素垂直排列 */
    margin: 0; /* 去除默认的外边距 */
  }

  .sidebar {
    width: 100%; /* 占满宽度 */
    height: auto; /* 高度自适应 */
    border: none; /* 去除边框 */
    padding: 10px; /* 调整内边距 */
    position: static; /* 取消定位 */
    background-color: #f5f5f5;
    border-radius: 0; /* 去除圆角 */
  }

  .blog-container {
    width: 100%; /* 占满宽度 */
    margin: 0; /* 去除默认外边距 */
    padding: 10px; /* 调整内边距 */
    box-sizing: border-box;
  }

  .blog-card {
    margin-top: 10px; /* 调整博客卡片的外边距 */
    border-radius: 0; /* 去除圆角 */
  }

  .auth_name,
  .create_time {
    text-align: left; /* 文字向左对齐 */
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
/*.sidebar {*/
/*  width: 200px;*/
/*  background-color: #f0f0f0;*/
/*  padding: 20px;*/
/*  border-radius: 5px;*/
/*  position: fixed;*/
/*  left: 20px;*/
/*  top: 70px;*/

/*}*/


.blog-titles {
  list-style-type: none;
  padding: 0;
  text-align:center;
}

.blog-titles li {
  margin-bottom: 10px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  text-align:left;

}

.blog-titles li:hover {
  text-decoration: underline;
  box-shadow:
    0 2px 2px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1),
    0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.1);
  border-color: #ff9900; /* 改变边框颜色 */
}


/*markdown解析样式*/
.markdown-container {
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  line-height: 2.0;

}

h1 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

p {
  margin-bottom: 16px;
  line-height: 2.0;
}

strong {
  font-weight: bold;
}

em {
  font-style: italic;
}

ul, ol {
  margin-left: 30px;
}

pre {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 16px;
}

code {
  font-family: Consolas, monospace;
}
li {
  line-height: 1.6;
}

/*分类样式*/

 .container-AddTopic {

   width: 100%;
   height: 100%;
   box-sizing: border-box;
   background-color: #f5f5f5;
   margin-bottom: 20px;
   padding: 10px;
   border-radius: 10px;
 }

.topic {
  display: flex;
  justify-content: center;
  align-items: center;
}

.topic .el-button {
  width: 100px;
  border-radius: 5px;
}

.category {
  padding: 5px 10px;
  margin-right: 10px;
  background-color: #409EFF;
  color: #fff;
  border-radius: 5px;
}

.dialog-buttons {
  text-align: right;
  margin-top: 20px;
}

.el-dialog__body {
  padding: 20px;
}
.detail_topic{
  display:flex;

}

.category-detail {
  color: #ffffff;
  margin: 0 20px;
  padding: 8px;
  border-radius: 10px;
  background-color: #5a9cf8;
}


.el-icon-delete-solid:hover{
  color: red;
}

/*编辑已发表博客的内容*/
.changeContext {
  display:flex;

}
.confirmOrCancel {
  margin-top: 10px;
  display:flex;
}

.custom-confirm-box {
  position: absolute;
  left: 30%;
  top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


</style>
