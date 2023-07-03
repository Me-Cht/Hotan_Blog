<template>
  <div class="edit-fruit-view">
    <el-form :model="form" label-width="80px" ref="form">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model.number="form.price" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name:"EditFruitView",


  data() {
    return {
      form: {
        id: '',
        name: '',
        price: ''
      }
    }
  },
  mounted() {
    const id = this.$route.params.id;
    axios.get(`http://localhost:8088/api/product/findById/${id}`)
        .then(response => {
          this.form = response.data
          console.log("获取成功！")
        })
        .catch(error => {
          console.log('error!', error)
        })
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios.put(`http://localhost:8088/api/product/update/${this.form.id}`, this.form)
              .then(response => {
                console.log('修改成功！')
                this.$router.push('/')
              })
              .catch(error => {
                console.log('error!', error)
              })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
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
