import api from "@/api/api";
import moment from 'moment';
import VueMarkdown from 'vue-markdown';
// import MarkdownPro  from 'vue-meditor'
import "highlight.js/styles/github.css"; // 引入 highlight.js 的样式，这里使用的是 GitHub 风格的样式
import hljs from 'highlight.js';


import AddTopic from "@/components/Blog/AddTopic.vue";
import axios from "axios";
import edit from "@/views/fruit/edit/index.vue";
import {req} from "vuelidate/lib/validators/common";
import SideBar from "@/components/Blog/SideBar.vue"; // 引入 vue-markdown
export default {
  components: {
    AddTopic,
    SideBar,
    VueMarkdown,
    // VueMarkdown,


  },

  data() {
    return {
      value: '',


      //编辑博客id
      editingBlogId: null,

      //实现可以编辑的博客的内容和标题
      editingBlog: {
        title: '',
        content: '',
        category: '',
      },
      editBlogFromVisible: false, //编辑框是否可视
      isEditing: false,//是否处于编辑状态
      articles: [],//从findAll里获取到所有的文章会存储在这里
      tableData: [],//初始化时没有选择特定的分类
      selectedCategory: "",//是否选中了分类
      // showEditor: false, //是否显示编辑框
      dialogVisible: false, //是否显示新增博客编辑框
      newCategory: {
        name: "", // 新分类的名称
      },
      categories: [], // 分类列表

      form: {},
      dialogFormVisible: false,
      viewDialogVis: false,

      blog: {
        id: '',
        title: '',
        content: '',
        author_id: '',
        create_time: '',
        auth_name: '',
        category: '未分类',
      },
      selectedBlog: '',
      blogs: [],
      markdownContent: `
\`\`\`javascript
// 这是一个 JavaScript 代码块
const message = "Hello, world!";
console.log(message);
\`\`\`
      `,

    };
  },
  methods: {
    initHighlighting() {
      // 初始化代码高亮
      hljs.initHighlightingOnLoad();
    },

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
      const targetBlog = this.articles.find(blog => blog.id === this.editingBlogId)
      console.log("targetBlog", targetBlog)
      if (targetBlog) {
        this.editingBlog.title = targetBlog.title
        this.editingBlog.content = targetBlog.content
        this.editingBlog.category = this.selectedCategory
      } else {
        console.log("Article not found for the given id:", this.editingBlogId);
      }


      console.log("editingBlog", this.editingBlog)
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

    submitForm() {

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
    testClickCategory(){

      console.log(this.blog.category)
      console.log("this.selectedCategory",this.selectedCategory)
    },
    saveBlog() {
      this.blog.category = this.selectedCategory
      console.log("saveblog")
      api.getUserInfo().then(response => {
        const temp = JSON.parse(response.data.msg)
        this.blog.author_id = temp.id
        this.blog.auth_name = temp.name
        console.log(this.blog.auth_name, this.blog.author_id)
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
    deleteBlog(id) {
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
  computed: {
    reversedItems() {
      return this.blogs.slice().reverse();

    }

  },

  mounted() {

    // 在组件挂载时初始化 highlight.js
    hljs.initHighlightingOnLoad(); // 或者使用你特定的方法初始化 hljs
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

