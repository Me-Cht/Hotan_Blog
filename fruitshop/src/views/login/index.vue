<template>
  <div id="app">
    <div id="admin">
      <div class="pos" v-loading="loading">
        <h1 class="adminh1">用户登录</h1>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名：" prop="pass">
            <el-input
              prefix-icon="el-icon-user"
              style="width: 250px"
              type="text"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="checkPass">
            <el-input
              prefix-icon="el-icon-menu"
              style="width: 250px"
              show-password
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <router-link to="/register">
              <el-button type="success" style="float: left; margin-left: 50px">注册</el-button>
            </router-link>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

const API_LOGIN = 'http://localhost:8088/api/user/login';

export default {
  name: 'app',
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else if (value.length < 4 || value.length > 12) {
        callback(new Error('密码长度必须在4-12之间'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {
        pass: 'John',
        checkPass: 'password123',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    ...mapActions(['saveToken']),
    async submitForm(formName) {
      try {
        const response = await axios.post(API_LOGIN, {
          name: this.ruleForm.pass,
          password: this.ruleForm.checkPass,
        });
        const data = response.data;
        console.log(response.data);
        if (data.code === '0') {
          const token = response.data.data;
          localStorage.setItem('token', token);
          alert('登录成功');
          await this.$router.push('/home');
        } else {
          console.log('登录失败');
          alert('账号或密码错误');
        }
      } catch (error) {
        console.error('登录错误：', error);
      }
    },
  },
};
</script>
<style scoped>



</style>

