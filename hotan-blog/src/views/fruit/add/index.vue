<template>
  <div class="edit-fruit-view">
    <el-form :model="form" label-width="80px" ref="form">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-input v-model="form.category"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model.number="form.price" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="AddProduct">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AddFruit",
  data(){
    return {
      form:{
        name:'',
        description:'',
        category:'',
        price:'',


      }
    }
  },
  methods:{
    AddProduct(){
      this.$refs.form.validate(valid => {
        if(valid){
          axios.post("http://localhost:8088/api/product/add",
              this.form,{
            headers: {"Content-Type": "application/json"}
          }).then(response=>{
                console.log("添加成功！")
              })
              .catch(error => {
                console.log("error!",error)
              })
        }
      })
    }
  },


}

</script>

<style scoped>
.edit-fruit-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  box-shadow: 0 0 5px #d3d3d3;
}

</style>
