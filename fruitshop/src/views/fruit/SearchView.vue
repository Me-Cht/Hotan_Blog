<template>
  <div>
    <h2>水果商品查询</h2>
    <el-form :inline="true" :model="queryForm" class="query-form">
      <el-form-item label="名称">
        <el-input v-model="queryForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="queryForm.category" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="水果" value="水果"></el-option>
          <el-option label="蔬菜" value="蔬菜"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="queryForm.minPrice" placeholder="最低价"></el-input>
        <span> - </span>
        <el-input v-model="queryForm.maxPrice" placeholder="最高价"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doQuery">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="fruitList" style="width: 100%">
      <el-table-column prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="category" label="分类"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="price" label="价格" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FruitQuery',
  data() {
    return {
      queryForm: {
        name: '',
        category: '',
        minPrice: '',
        maxPrice: ''
      },
      fruitList: []
    }
  },
  methods: {
    doQuery() {
      axios.post('http://localhost:8088/api/product/search',
          this.queryForm,

          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
      ).then(res => {
        this.fruitList = res.data
      })
    }
  }
}
</script>

<style scoped>
.query-form {
  margin-bottom: 20px;
}
</style>
