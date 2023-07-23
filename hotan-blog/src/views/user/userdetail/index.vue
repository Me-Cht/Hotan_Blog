<template>
  <div>
    <h1>用户管理</h1>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="name"></el-table-column>
      <el-table-column prop="email" label="email"></el-table-column>
      <el-table-column prop="age" label="age"></el-table-column>
      <el-table-column prop="password" label="password"></el-table-column>
      <el-table-column prop="change" label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="handleEdit(scope.row.id)">修改<i class="el-icon-edit"></i></el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)"><i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>



    </el-table>
  </div>

</template>

<script>
import axios from "axios";
import api from "@/api/api";
export default {
  name:'userdetail',
  data(){
    return{
      users:[],

    }
  },
  mounted() {
    api.getUser()
      .then(response=>{
        console.log(response)
        this.users = response.data
      })
  }

}


</script>

<style>

</style>
