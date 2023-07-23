<template>
  <div class="container" :style="{'background-image': `url(${require('@/assets/header/headBackground.png')})`, 'background-size': 'auto 100%'}">

  <div class="login-container">
    <div class="login-content">
      <h1>Welcome</h1>
      <p>Hotan-Blog</p>
      <div class="logo">
        <img src="@/assets/logo/DeckLiza.png" alt="Logo">
      </div>
      <h2 class="form-title">登录</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input type="text" placeholder="用户名" v-model="ruleForm.name">
        </div>
        <div class="form-group">
          <input type="password" placeholder="密码" v-model="ruleForm.pass">
        </div>
        <button type="submit">登录</button>
      </form>
      <p class="switch-link" @click="switchToRegistration">没有账号？去注册</p>
    </div>

  </div>
    <Footer></Footer>


  </div>

</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import Footer from "@/components/Footer.vue";

const API_LOGIN = 'http://hotan.site:8088/api/user/login';

export default {
  name: 'LoginPage',
  components: {Footer},
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
        name: '',
        pass: '',
      },
      rules: {
        name: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    ...mapActions(['saveToken']),
    async submitForm() {
      try {
        const response = await axios.post(API_LOGIN, {
          name: this.ruleForm.name,
          password: this.ruleForm.pass,
        });
        const data = response.data;
        if (data.code === '0') {
          const token = response.data.data;
          localStorage.setItem('token', token);
          alert('登录成功');
          await this.$router.push('/firstpages');
        } else {
          console.log('登录失败');
          alert('账号或密码错误');
        }
      } catch (error) {
        console.error('登录错误：', error);
      }
    },
    switchToRegistration() {
      this.$router.push('/register');
    },
    LoginNow(){
      this.$router.push('/firstpages')
    }
  },
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
  width: 100%;
  height: 100%;

}

.login-container {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;

  align-items: center;
  height: 100vh;
  /*background: linear-gradient(to right, #f7d1d7, #bfe3f1);*/
}

.login-content {
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
input[type="password"] {
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

/* 添加z-index样式 */
Footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 100; /* 调整此值以确保Footer在其他内容之上 */
}
</style>
