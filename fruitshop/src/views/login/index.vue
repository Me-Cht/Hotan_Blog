<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="form" label-width="80px">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item prop="username">
        <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
        >


        </el-input>
        <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">

        <span class="show-pwd" @click="showPwd">
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleLogin">Login
      </el-button>
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>
    </el-form>
  </div>
</template>


<script>
import SvgIcon from "@/components/SvgIcon/index.vue";
import axios from "axios";
export default {
  name: "Login",
  components: {SvgIcon},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {

    handleLogin() {
      this.$refs.form.validate(valid => {
        if(valid){
          this.loading = true
          //vuex
          axios.post("http://localhost:8088/api/user/login", {
            username: this.username,
            password: this.password
          })
              .then(response => {
                const token = response.data.token
                localStorage.setItem('token',token)
                this.$router.push('/')
              })
              .catch(error=>{
                console.log(error)
              })
        }
      })
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     // vuex
      //     this.$store.dispatch('user/login', this.loginForm).then(() => {
      //       this.$router.push({path: this.redirect || '/'})
      //       this.loading = false
      //     }).catch(() => {
      //       this.loading = false
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">

</style>
