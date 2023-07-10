<template>
  <div class="home-container" >
    <div class="header-container">
      <div class="header-left">
        <img src="../../img/logo/DeckLiza.png" alt="">
        <span>DeckLiza</span>
      </div>
      <div class="header-center">
        <ul class="horizontal-list">
          <li>
            <router-link to="/main" id="nav_list">
              首页
            </router-link>
          </li>
          <li>
            <router-link to="/about" id="nav_list">
              个人简介
            </router-link>
          </li>
          <li>
            <router-link to="/github" id="nav_list">
              接口测试
            </router-link>
          </li>
          <li>
            <router-link to="/blog" id="nav_list">
              博客blog
            </router-link>
          </li>
          <li>
            <router-link to="/product" id="nav_list">
              作品集
            </router-link>
          </li>
        </ul>

      </div>
      <div class="login">
        <a href="">
          {{user.name}}⬇
        </a>
        <ul>
          <li><router-link to="/info">个人中心</router-link></li>
          <li><router-link to="">帮助中心</router-link></li>
          <li><router-link to="">退出</router-link></li>

        </ul>
      </div>
    </div>


    <router-view></router-view>

  </div>

</template>

<script>
import {defineComponent} from "vue";
import HomeContent from "@/site/home/HomeContent.vue";

export default defineComponent({
  components: {HomeContent}
})
</script>
<script>


import api from "@/api/api";
import getinfo from "@/api/getinfo";

export default {
  name: "index",
  data(){
    return{
      user:{
        name:'登陆',
        email:''
      }
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    // if(token){
    //   api.getUserInfo().then(response => {
    //     this.user = JSON.parse(response.data.msg)
    //     return this.user
    //   })
    // }
    api.getDetailInfo().then(data => {
      this.user = data
      console.log(data);
    }).catch(error => {
      console.log(error);
    });

    // api.getUserInfo(response=>{
    //   console.log("response:getUserInfo",response)
    //
    // })



  },
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
body {
  margin:0;
}
.home-container {
  position: relative;
}


.header-container {
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  height: 50px;
  margin-top: 0;
  background-color: rgb(240, 242, 245);

}
.header-left {
  position: absolute;
  left: 50px;

}
.header-left img{
  width: 50px;
  height: 50px;

}
.header-left span {
  position: absolute;
  left:60px;
  top:14px;
}

.header-center {
  width: 450px;
  position: absolute;
  left: 300px;
  top:4px;
}
.header-center li{
  padding: 10px;
  background-color: rgb(255, 255, 255);
 }


.header-container .login {
  height: 50px;
  width: 100px;
  background-color: rgb(48, 100, 104);
  position:absolute;
  right: 50px;
  top:0;
  z-index: 99;
}

.header-container .login a {
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  color: white;
  padding-left: 10px;

}

.header-container .login ul {
  display: none;
  position: absolute;
  background-color: rgb(48, 100, 104);
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

}

.header-container .login ul li {
  padding: 10px;
  width: 80px;
  transition: all 0.3s ease-in-out;


}

.header-container .login:hover ul {
  display: block;
}

/*导航栏目*/
.nev {
  width: 1200px;
  clear: both;
  margin:50px auto;

}

.header-center .horizontal-list {

  display: flex;
  list-style: none;
  padding: 0;
  justify-content: space-around;
}

.header-center .horizontal-list li {


}

.horizontal-list li:first-child {

}

.horizontal-list li:last-child {
}


#nav_list {
  color:black;
  text-decoration: none;
}
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

/*留言板块*/
.message_box {
  width: 1200px;
  height: 500px;
  border: 1px solid black;
  margin: 0 auto;

}

.message_img img {
  margin: 20px;
  float: left;
  width: 460px;
  height: 460px;
}

.message_board {
  width: 660px;
  height: 460px;
  background-color: #f2f2f2;
  float: right;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

}

.message_board h2 {
  margin: 40px;
  font-size: 40px;
  color: #333;

}

.message_form {
  margin: 40px 40px 0 40px;
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.message_form textarea {
  flex: 1; /* 填充剩余空间 */
  height: 30px;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ffffff;
  transition: all 0.3s ease-in-out;

}

/*聚焦后留言板更换为该样式*/
.message_form .new_board {
  height: 100px;
  background-color: rgb(245, 245, 245);

  transition: all 0.3s ease-in-out;

}


.message_form button {
  height: 30px;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  padding: 5px 10px;
  background-color: #007bff;
}

.message_form button img {
  height: 100%;
  margin-right: 5px;
}

/*留言字数*/
.message_board .wrapper .total {
  margin: 10px 100px 10px 0;
  float: right;
  opacity: 0;
  transition: all 0.3s;
}

/*本人留言*/

/*.message_board {*/
/*    width: 660px;*/
/*    height: 130px; !* 更新高度为130px *!*/
/*    background-color: #f2f2f2;*/
/*    float: right;*/
/*    margin: 20px 20px 20px 0; !* 添加右边边距 *!*/
/*    border-radius: 5px;*/
/*    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);*/
/*    transition: all 0.3s;*/
/*    overflow: auto; !* 添加滚动条以处理溢出内容 *!*/
/*}*/
.message_box .my_message {
  width: 500px;
  background-color: rgb(48, 100, 104);
  margin-left: 40px;
  margin-top: 20px;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
  color: wheat;
  display: block;
  height: 120px; /* 更新高度为100px */
  text-align: justify;
  word-break: break-all;
  text-overflow: ellipsis; /* 添加省略号 */

}

/*.message_box .my_message {*/
/*    width: 523px;*/
/*    height: 100px;*/
/*    background-color: rgb(48, 100, 104);*/
/*    float: left;*/
/*    margin-left: 40px;*/
/*    border-radius: 5px;*/
/*}*/

/*.message_box .my_message {*/
/*    width: 500px;*/
/*    background-color: rgb(48, 100, 104);*/
/*    margin-left: 40px;*/
/*    border-radius: 5px;*/
/*    overflow: hidden;*/
/*    padding: 10px;*/
/*    color: wheat;*/
/*    display: block;*/
/*    margin-top: 20px;*/
/*    text-align: justify; !* 添加文本对齐样式 *!*/
/*}*/
/*.message_box .my_message {*/
/*    width: 500px;*/
/*    height: 130px;*/
/*    background-color: rgb(48, 100, 104);*/
/*    margin-left: 40px;*/
/*    border-radius: 5px;*/
/*    overflow: hidden;*/
/*    padding: 10px;*/
/*    color: wheat;*/
/*    display: block;*/
/*    margin-top: 20px;*/
/*    text-align: justify; !* 文本对齐样式 *!*/
/*    text-align-last: justify; !* 指定最后一行也适用文本对齐样式 *!*/
/*    word-break: break-all; !* 强制在单词内换行 *!*/
/*}*/


/*留言内容：*/
.message_box .my_message {
  padding: 10px;
  color: wheat;
  display: block;
}

.message_box #message01 {
  display: none;
}


</style>
