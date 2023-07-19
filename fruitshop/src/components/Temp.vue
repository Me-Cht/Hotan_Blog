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
    <!-- 将Footer组件放在login-container之后 -->
    <Footer></Footer>
  </div>
</template>

<script>
// 组件逻辑...
</script>

<style>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.login-container {
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
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10; /* 调整此值以确保Footer在其他内容之上 */
}
</style>
