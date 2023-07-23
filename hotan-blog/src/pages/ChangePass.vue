<template>
<div class="container">
    <div class="login-container">
      <div class="login-content">
        <h1>Welcome</h1>
        <p>Hotan-Blog</p>
        <div class="logo">
          <img src="@/assets/logo/DeckLiza.png" alt="Logo">
        </div>
<!--        <form @submit.prevent="">-->
<!--          <div class="form-group">-->
<!--            <input type="text" placeholder="用户名" v-model="">-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <input type="password" placeholder="密码" v-model="">-->
<!--          </div>-->
<!--          <button type="submit" @click="">登录</button>-->
<!--        </form>-->
<!--        <p class="switch-link" @click="">没有账号？去注册</p>-->
        <form action="">
          <div class="form-group">
            <input type="email" placeholder="邮箱">
            <div class="form-group">
              <button type="submit">发送验证码修改</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ChangePass"
}
</script>
<style>
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
input[type="email"],
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
  margin-top: 20px;
  margin-left: 10px;
}

.switch-link {
  color: #888;
  cursor: pointer;
}

.switch-link:hover {
  text-decoration: underline;
}
</style>

