<template>
  <div class="login-container">
<<<<<<< HEAD
    <el-form ref="form" :model="form">
      <el-form-item label="用户名" >
        <el-input type="text" v-model="form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>

        <router-link to="/register">
          <el-button style="margin-left: 50px">注册</el-button>
        </router-link>
      </el-form-item>
    </el-form>

  </div>
=======
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
>>>>>>> master
</template>



<script>

import axios from "axios";
<<<<<<< HEAD

const API_URL = "http://localhost:8088/api/user/login";

// 登录成功
const CODE_SUCCESS = 0;

// 用户名或密码错误
const CODE_LOGIN_FAIL = 10000;

// 其他错误
const CODE_ERROR = 9999;


=======
>>>>>>> master

export default {
  name: "Login",

  data(){
    return {
<<<<<<< HEAD
      form:{
        name:"test",
        password:"test"
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度至少为6个字符", trigger: "blur" }
            ]

      },


      /*为 password 字段定义了两个验证规则，required 规则确保输入不为空，
      min 规则确保密码长度至少为6个字符。我们还为这些规则定义了触发器类型，
      即 blur，这意味着当输入框失去焦点时会触发验证。*/

    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.$refs.form.validate();
        await axios.post('http://localhost:8088/api/user/login', {
          name: this.form.name,
          password: this.form.password
        }).then(response =>{
          const data = response.data;
          if (data.code === '0') {
            this.$router.push('/');
            this.$message(
                {
                  type:"success",
                  message:"登录成功！"
                }
            )
            console.log(data.msg);
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            });
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '网络错误，请稍后重试！'
          });

        });



      } catch (error) {
        console.error(error);
        this.$message.error("网络或服务器错误，请稍后再试。");
      }
    },
  },
};
=======
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
            this.$router.push('/')
            localStorage.setItem('user', JSON.stringify(response.data));

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
>>>>>>> master
</script>

<style lang="scss">

</style>
