<template>
  <div class="container" :style="{'background-image': `url(${require('@/assets/header/headBackground.png')})`, 'background-size': 'auto 100%'}">

  <div class="registration-container">
    <div class="registration-content">
      <h1>Welcome</h1>
      <p>Join Us!</p>
      <div class="logo">
        <img src="@/assets/logo/DeckLiza.png" alt="Logo">
      </div>
      <h2 class="form-title">注册</h2>
      <form ref="ruleForm" @submit.prevent="reg_submitForm('ruleForm')">
        <div class="form-group">
          <input type="text" placeholder="用户名" v-model="ruleForm.name">
        </div>
        <div class="form-group">
          <input type="password" placeholder="密码" v-model="ruleForm.password">
        </div>
        <div class="form-group">
          <input type="password" placeholder="确认密码" v-model="ruleForm.checkPass">
        </div>
        <div class="form-group">
          <input type="email" placeholder="邮箱" v-model="ruleForm.email">
        </div>
        <button type="submit">注册</button>
      </form>
      <p class="switch-link" @click="switchToLogin">已有账号？去登录</p>
    </div>
  </div>
    <Footer></Footer>

  </div>
</template>

<script>
import api from "@/api/api";
import { required, email, minLength } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import Footer from "@/components/Footer/Footer.vue";

export default {
  name: 'RegistrationPage',
  components: {Footer},
  data() {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        callback(new Error('年龄不能为空'));
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else if (value < 15) {
        callback(new Error('必须年满15岁'));
      } else {
        callback();
      }
    };

    const checkEmail = (rule, value ,callback) => {
      if (!value) {
        callback(new Error("邮箱不能为空"));
      } else {
        const emailPattern = /^[\w-]+(.[\w-]+)*@[\w-]+(.[\w-]+)+$/; // 正则表达式匹配电子邮箱格式
        if (!emailPattern.test(value)) {
          callback(new Error("请输入正确的邮箱格式"));
        } else {
          callback();
        }
      }
    };

    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else if (this.ruleForm.checkPass !== '') {
        this.$refs.ruleForm.validateField('checkPass');
        callback();
      } else {
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        name: '',
        email: '',
        age: '',
        password: '',
        checkPass: ''
      },
      rules: {
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async reg_submitForm(formName) {
      try {
        const response = await api.register(this.ruleForm);
        if (response.data.code === '0') {
          alert('注册成功!');
          await this.$router.push('/login');
        } else if (response.data.code === '10000') {
          alert('该用户已存在');
        }
      } catch (error) {
        console.log(error);
      }
    },


    switchToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
body {
  position: relative;
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /*background: linear-gradient(to right, #f7d1d7, #bfe3f1);*/
}

.registration-content {
  width: 400px;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.logo {
  text-align: center;
  margin-bottom: 20px;
}

.logo img {
  width: 100px;
  height: 100px;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #69b3f0;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
}

.switch-link {
  color: #888;
  cursor: pointer;
}

.switch-link:hover {
  text-decoration: underline;
}
</style>
