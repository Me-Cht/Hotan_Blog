<template>
  <div class="container-AddTopic">
    <div class="topic">
      <!-- 添加按钮 -->
      <el-button type="primary" icon="el-icon-edit" circle @click="showAddCategoryDialog">添加分类</el-button>

      <!-- 显示分类 -->
      <button class="category-detail" v-for="(category, index) in categories" :key="index" @click="get_category(category)">
        {{ category }}
      </button>
    </div>

    <!-- 添加分类对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="添加分类">
      <el-input v-model="newCategory.name" placeholder="请输入分类名称"></el-input>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addCategory">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddTopic",
  data() {
    return {
      dialogVisible: false,
      newCategory: {
        name: "", // 新分类的名称
      },
      categories: [], // 分类列表
    };
  },
  methods: {
    showAddCategoryDialog() {
      // 显示添加分类对话框
      this.dialogVisible = true;
    },
    addCategory() {
      // 确定添加分类
      if (this.newCategory.name) {
        // 将新分类名称添加到分类列表中
        if(this.categories.includes(this.newCategory.name)){
          alert("不允许同名分类")
        }else {
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
      axios.get('http://localhost:8088/api/article/category')
        .then(response => {
          if (response.data.code === "0") {
            this.categories = response.data.data;
            // 将分类列表保存到 localStorage 中
            localStorage.setItem('categories', JSON.stringify(this.categories));
            console.log("this.categories", this.categories);
            console.log("接口返回数据：", response.data);
          } else {
            alert("获取分类数据失败：", response.data.msg);
          }
        })
        .catch(error => {
          alert("获取数据失败", error);
        });
    },
    get_category(category){
      console.log("category:",category)
    }
  },
  created() {
    // 从 localStorage 中恢复分类列表
    const categoriesStorage = localStorage.getItem('categories');
    if (categoriesStorage) {
      this.categories = JSON.parse(categoriesStorage);
    } else {
      // 如果 localStorage 中没有分类列表，则从接口获取
      this.fetchCategories();
    }
  }
};
</script>




<style scoped>
.container-AddTopic {
  width: 100%;
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
.topic button {
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

.category-detail {
  color: #ffffff;
  margin: 0 20px;
  padding: 8px;
  border-radius: 10%;
  background-color: #5a9cf8;
}
</style>
