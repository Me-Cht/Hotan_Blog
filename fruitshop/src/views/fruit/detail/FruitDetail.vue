<template>
  <div>
    <h1>商品管理</h1>
    <el-table :data="fruits" style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
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
import api, {getFruit} from '@/api/api.js';

import axios from "axios";
// const API_All_Fruit = 'http://localhost:8088/api/product/findAll'

export default{
  computed: {
    username() {
// 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    },
  },
  name:"detail",
  data() {
    return {
      fruits: [],
      selectedFruit: null,
      delete:false,

    }
  },
  mounted() {
    api.getFruit()
  .then(response => {
        this.fruits = response.data
        console.log(this.data().fruits)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods:{
    deleteProduct(id){

    },
    handleEdit(id) {
      this.$router.push({ path:`/edit/${id}` })
    },
    handleDelete(id) {

      this.$confirm('是否删除该数据', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$message({
            type: 'info',
            message: '确认',
          })
          this.distinguishCancelAndClose=true
          axios.delete(`http://localhost:8088/api/product/delete/${id}`)
            .then(response=>{
              axios.get().then(response=>{
                this.fruits = response.data
              })
            }).catch(error=>{console.log('error!',error)})

        } )
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '已取消该操作'
              : '删除成功！'
          })
          this.distinguishCancelAndClose=false
        });






// ...



    }

  }


}
</script>




<style scoped>

</style>
