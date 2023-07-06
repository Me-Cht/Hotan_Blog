<template>
  <div class="message_box">
    <div class="message_img">
      <img src="../../img/logo/留言板.png" alt="">
    </div>
    <div class="message_board">
      <h2>请写下你的留言～</h2>
      <form class="message_form">
        <textarea type="text" id="message_input" placeholder="请输入留言内容" maxlength="200"></textarea>
        <button type="submit" id='sub' onclick="return false;"><img src="../../img/icon/发送-提交.png" alt="">
        </button>
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

</template>

<script>
import '../src/site/home/index.css'

export default {
  name: "HomeMessageBox"
}
</script>

<style scoped>

</style>
