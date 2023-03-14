<template>
  <div class="login-container">
    <el-form>
      <el-form-item label="用户名">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
</div>
</template>



<script>

import axios from "axios";

export default {
  name: "Login",

  data(){
    return {
      name:"test",
      password:"test"
    }
  },
  methods:{
    handleLogin(){
      axios.post('http://localhost:8088/api/user/login',{
          name:this.name,
          password:this.password,

      })
          .then(response => {
            this.$router.push('/home')
            console.log("登录成功！")
          })
          .catch(error=>{
            this.$message({
              type:'error',
              message:'用户名或密码错误！'
            });
          })
    }
  }

}
</script>

<style lang="scss">

</style>
