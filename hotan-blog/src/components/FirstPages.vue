<template>
  <div class="container">
    <div class="content">
      <div class="text">
        <h1>Deck Liza</h1>
        <span>致力于前端网页设计及后台开发，享受开发过程</span>
        <div class="account">
          <span><a href="" target="_blank">社媒账号：Me-Cht</a></span>
        </div>
        <div class="communicate">
          <ul>
            <li><a href="https://github.com"><img src="../img/icon/github.png" alt=""></a></li>
            <li><a href=""><img src="../img/icon/QQ.png" alt=""></a></li>
            <li><a href=""><img src="../img/icon/微信.png" alt=""></a></li>
            <li><a href=""><img src="../img/icon/facebook.png" alt=""></a></li>
          </ul>
        </div>
      </div>
      <div class="logo">
        <img src="../img/logo/DeckLiza.png" alt="">
      </div>
    </div>
    <div class="message_box">
      <div class="message_img">
        <img src="../img/logo/留言板.png" alt="">
      </div>
      <div class="message_board">
        <h2>请写下你的留言～</h2>
        <form class="message_form">
          <textarea type="text" id="message_input" placeholder="请输入留言内容" maxlength="200"></textarea>
          <button type="submit" id='sub' onclick="return false;"><img src="../img/icon/发送-提交.png" alt=""></button>
        </form>
        <div class="wrapper">
          <span class="total">0/200字</span>
        </div>
        <div class="my_message">
          <span>我的留言：</span>
          <ul id="my_message"></ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  padding: 30px;
  border: 1px solid #333333;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text h1 {
  font-size: 4rem;
  margin: 20px 0;
}

.text span {
  font-size: 1.5rem;
}

.account {
  margin-top: 150px;
}

.communicate ul {
  display: flex;
  list-style: none;
  padding: 0;
}

.communicate ul li {
  flex: 1;
}

.communicate img {
  width: 50px;
  height: 50px;
}

.logo img {
  width: 100%;
  max-width: 460px;
  height: auto;
}

.message_box {
  display: flex;
  padding: 30px;
  border: 1px solid #333333;
}

.message_img img {
  width: 100%;
  max-width: 460px;
  height: auto;
}

.message_board {
  flex: 1;
  margin-left: 20px;
}

.message_board h2 {
  font-size: 2.5rem;
  margin: 40px 0;
}

.message_form {
  display: flex;
  align-items: center;
  margin-top: 40px;
}

.message_form textarea {
  flex: 1;
  height: 30px;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ffffff;
}

.message_form button {
  height: 30px;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #007bff;
  width: 50px;
}

.message_form button img {
  height: 30px;
  margin-right: 5px;
}

.wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.total {
  margin-right: 100px;
}

.my_message {
  width: 100%;
  max-width: 500px;
  background-color: rgb(48, 100, 104);
  margin-top: 20px;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
  color: wheat;
  text-align: justify;
  word-break: break-all;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: center;
    padding: 30px;
    border: 1px solid #333333;
  }

  .text {
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
  }

  .text h1 {
    font-size: 3rem;
  }

  .account {
    margin-top: 0;
    text-align: center;
  }

  .communicate {
    justify-content: center;
    margin-top: 20px;
  }

  .logo img {
    margin-top: 20px;
  }

  .message_box {
    flex-direction: column;
    padding: 30px;
    border: 1px solid #333333;
  }

  .message_img img {
    margin-bottom: 20px;
  }

  .message_board {
    margin-left: 0;
  }

  .message_form {
    flex-direction: column;
  }

  .message_form textarea {
    margin-bottom: 10px;
  }

  .total {
    margin-right: 0;
  }
}
</style>
