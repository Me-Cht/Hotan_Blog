<template>
  <div class="container-AddTopic">
    <div class="topic">
      <!-- 添加按钮 -->
      <el-button type="primary" icon="el-icon-edit" circle @click="showAddCategoryDialog">添加分类</el-button>

      <!-- 显示分类 -->
      <button class="category-detail" v-for="(category, index) in categories" :key="index"
              @click="get_category(category)">
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
import AddTopic from "@/components/Blog/AddTopic";

export default {
  name: "AddTopic",
  components: {
    AddTopic

  }
}
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
