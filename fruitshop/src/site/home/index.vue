<template>
  <div>
    <div class="header">
      <div class="title">
        <p>Welcome to DeckLiza</p>
        <div class="login">
          <a href="">
            {{user.name}}⬇
          </a>
          <ul>
            <li><a href="../account/login.html">个人信息</a></li>
            <li><a href="forget.html">忘记密码</a></li>
            <li><a href="help.html">帮助中心</a></li>
            <li><a href="/login">退出</a></li>

          </ul>
        </div>
      </div>
    </div>

    <div class="nev">
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

export default {
  name: "index",
  data(){
    return{
      user:{
        name:'登陆',
      }
    }
  },


  mounted() {
    const token = localStorage.getItem('token')
    if(token){
      api.getUserInfo().then(response => {
        this.user = JSON.parse(response.data.msg)
      })
    }


  },


}

//
// //  留言板样式变化
// // 定义变量
// //留言板ID
// const message_input = document.querySelector('#message_input')
// //提交按钮
// const submit = document.querySelector('#sub')
// //已留言ID
// const my_message = document.querySelector('#my_message')
// //留言内容
// const message01 = document.querySelector('#message01')
// // 字数限制
// const total = document.querySelector('.total')
// //  留言板样式变化
// message_input.addEventListener('focus', function () {
//   console.log('聚焦了')
//   message_input.classList.add('new_board')
//   total.style.opacity = 1;
// })
// //  留言板样式变化
// message_input.addEventListener('blur', function () {
//   console.log('失去了焦点')
//   message_input.classList.remove('new_board')
//
//   total.style.opacity = 0;
//
// })
// // 留言板样式变化
//
//
// //点击提交进行留言
// message_input.addEventListener('submit', function (event) {
//   event.preventDefault(); // 阻止表单默认提交行为
//   const message = message_input.value; // 获取输入框的值
// // 在这里执行提交内容的逻辑，例如发送到服务器或添加到留言列表
// // 清空输入框的值
//   message_input.value = '';
//
// })
//
// //留言字数统计
// message_input.addEventListener('input', function (event) {
//   console.log(message_input.value.length)//得到输入字符串的长度
//   total.innerHTML = `${message_input.value.length}/200`
// })
// // 点击提交进行留言
// submit.addEventListener('click', function (event) {
//   event.preventDefault(); // 阻止表单默认提交行为
//   total.style.opacity = 1;
//   const message = message_input.value; // 获取输入框的值
// // 在这里执行提交内容的逻辑，例如发送到服务器或添加到留言列表
// // 将留言内容显示在留言板上
//   my_message.innerHTML = `我的留言：${message}`;
// // 清空输入框的值
//   message_input.value = '';
// });
// // 回车提交留言
// message_input.addEventListener('keyup', function (event) {
//   if (event.key === 'Enter') {
//     const message = message_input.value; // 获取输入框的值
//     const li = document.createElement('li')
//     li.innerHTML = `${message}`
//     console.log(message.children)
// // 清空输入框的值
//     li.style.width = '430px';
//     li.style.height = '70px'
//     li.style.marginRight = "30px"
//     my_message.appendChild(li)
//     message_input.value = '';
//   }
// })
// $(document).ready(function () {
//   $('.login').hover(function () {
//     $(this).find('ul').show()
//
//   }, function () {
//     $(this).find('ul').hide();
//   });
// });
//

</script>

<style scoped>
body {
  background-color: rgb(230, 223, 217);
}

.header {
  overflow: hidden; /* 清除浮动 */
  background-color: #f1f1f1;
  padding: 20px;
}

.header p {
  color: darkgreen;
  font-size: 50px;
  text-align: center;
  margin: 0;
}

.header img {
  width: 56px;
  height: 56px;
  float: left;
}

.header .login {
  height: 50px;
  width: 100px;
  float: right;
  margin-top: 30px;
  background-color: rgb(48, 100, 104);
}

.header .login a {
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  color: white;
  padding-left: 10px;

}

.header .login ul {
  display: none;
  position: absolute;
  background-color: rgb(48, 100, 104);
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

}

.header .login ul li {
  padding: 10px;
  width: 80px;
  transition: all 0.3s ease-in-out;


}

.header .login:hover ul {
  display: block;
}

/*导航栏目*/
.nev {
  width: 1200px;
  clear: both;
  margin:50px auto;

}

.nev .horizontal-list {

  display: flex;
  list-style: none;
  padding: 0;
  justify-content: space-around;
}

.nev .horizontal-list li {

  font-size: 20px;
}

.horizontal-list li:first-child {

}

.horizontal-list li:last-child {
}


#nav_list {
  color:#eee;
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
