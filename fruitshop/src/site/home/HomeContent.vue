<template>
  <div class="content">
    <div class="text">
      <h1>
        Deck Liza
      </h1>
      <span>
        致力于前端网页设计及后台开发，享受开发过程
    </span>
      <div class="account">
        <span><a href="" target="_blank">社媒账号：Me-Cht</a>
        </span>
      </div>
      <div class="communicate">
        <ul>
          <li><a href="https://github.com"><img src="../../img/icon/github.png" alt=""></a></li>
          <li><a href=""></a><img src="../../img/icon/QQ.png" alt=""></li>
          <li><a href=""></a><img src="../../img/icon/微信.png" alt=""></li>
          <li><a href=""></a><img src="../../img/icon/facebook.png" alt=""></li>
        </ul>

      </div>
    </div>
    <div class="logo">
      <img src="../../img/logo/DeckLiza.png" alt="">
    </div>

  </div>

</template>

<script>
export default {
name: "HomeContent"
}
</script>

<style scoped>
/*DeckLiza*/
.content {
  width: 1200px;
  height: 500px;
  border: 1px solid black;
  clear: both;
  margin: 50px auto;
}

.content .text {
  float: left;
}

/*DeckLiza*/
.text h1 {
  padding: 0;
  font-size: 80px;
  margin: 20px 0 20px 40px;
}

/*社媒账号*/
.text span {
  font-size: 30px;
  margin-left: 40px;

}

.text span a {
  text-decoration: none;
  color: rgb(48, 100, 104);
}

.text .account span {
  width: 400px;
  height: 50px;
  position: relative;
  top: 150px;
  font-size: 20px;
}

.content .text .communicate {
  width: 100px;
  height: 150px;
  position: relative;
  top: 156px;
  left: 40px;
}

.content .text .communicate ul li {
  flex: 1;
}

.content .text .communicate ul {

  display: flex;
  list-style: none;
  padding: 0;

}

/*DeckLiza logo*/
.content .text .communicate img {

  width: 50px;
  height: 50px;
}

.content .logo {
  width: 500px;
  height: 500px;
  float: right;

}

.content .logo img {
  margin: 20px;
  float: right;
  width: 460px;
  height: 460px;

}

</style>
