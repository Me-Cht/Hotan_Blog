<template>
  <div class="mostBig-Blog">
    <div class="sidebar">
      <h2>博客概览</h2>
      <ul class="blog-titles">
        <li v-for="blog in blogs" :key="blog.id" @click="selectBlog(blog)">
          {{ blog.title }}
        </li>
      </ul>
    </div>    <div class="back-to-top" style="position: fixed;bottom: 100px;right: 20px;z-index: 999">
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
            <button class="category-detail" v-for="(category, index) in categories" :key="index"
                    @click="get_category(category)">
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
      <el-button type="primary" @click="handleAdd">写博客<i class="el-icon-circle-plus-outline"></i></el-button>

      <!--    <el-table :data="blogs" >-->
      <!--      <template slot-scope="scope">-->
      <!--        <el-button type="success" @click="handleEdit(scope.row)" >编辑 <i class="el- -->
      <!--            icon-edit"></i>-->
      <!--        </el-button>-->
      <!--      </template>-->
      <!--    </el-table>-->

      <!--    弹出新增博客编辑框-->
      <el-dialog title="文章信息" :visible.sync="dialogFormVisible" width="60%">
        <el-form label-width="80px" size="small">
          <el-form-item label="文章标题">
            <el-input v-model="blog.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章内容">
            <mavon-editor  ref="md" v-model="blog.content" :ishljs="true" @imgAdd="imgAdd"/>
          </el-form-item>
          <el-form-item label="类别">

            <el-select v-model="blog.category" clearable placeholder="请选择" >
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
          <el-row class="markdown-body">
            <vue-markdown :source="blog.content" v-highlight></vue-markdown>
          </el-row>
          <el-row>
            <div class="create_time">{{ formatDateTime(blog.create_time) }}</div>
            <div class="auth_name" style="color: #475669"><span style="color: gray">from:</span>{{ blog.auth_name }}
            </div>
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
import MyComponent from "@/components/Blog/MyBlog";

export default {
  components: {
    // ...
  },
  mixins: [MyComponent], // 引入逻辑部分
  // ...
};
</script>

<style scoped>
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

.blog-write .el-card:hover {
  width: calc(100%)

}

.blog-write button {
  background: linear-gradient(200deg, #44986e, #326cc0);
  width: 80px;
  height: 50px;
  transition: 0.3s;
  border: none;
  border-radius: 3px;
  cursor: pointer;

}

.blog-write button:hover {
  transform: rotateY(25deg);
  width: 100px;
  height: 70px;
  box-shadow: -15px 0 25px rgba(120, 175, 229, 0.56);
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

.blog-text {
  border-radius: 2%;
  transition: 3s all ease-in;
}

.blog-text :hover {

}


.blog-card {
  text-align: left;
  margin-top: 20px;
  transition: 0.5s all ease-in;
}

.blog-card:hover {
  /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);*/
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2),
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
  text-align: center;
}

.blog-titles li {
  margin-bottom: 10px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  text-align: left;

}

.blog-titles li:hover {
  text-decoration: underline;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1),
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

.detail_topic {
  display: flex;

}

.category-detail {
  color: #ffffff;
  margin: 0 20px;
  padding: 8px;
  border-radius: 10px;
  background-color: #5a9cf8;
}


.el-icon-delete-solid:hover {
  color: red;
}

/*编辑已发表博客的内容*/
.changeContext {
  display: flex;

}

.confirmOrCancel {
  margin-top: 10px;
  display: flex;
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
