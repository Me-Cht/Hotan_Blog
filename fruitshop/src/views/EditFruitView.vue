<template>
  <div>
    <el-form :model="form" label-width="80px" ref="form">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model.number="form.price"></el-input>
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
    const id = this.$route.query.id
    axios.get(`http://localhost:8080/api/product/findById/${id}`)
        .then(response => {
          this.form = response.data
        })
        .catch(error => {
          console.log('error!', error)
        })
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios.put(`http://localhost:8080/api/product/update/${this.form.id}`, this.form)
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
