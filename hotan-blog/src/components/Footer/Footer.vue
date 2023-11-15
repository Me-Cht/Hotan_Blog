<template>
  <div class="footer-container">

    <div class="footer-communicate">
      <span>© 2023 Hotan. 由 Vue 强力驱动.
            <a href="https://beian.miit.gov.cn/" target="_blank">备案号：</a>
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023061766号-1</a>
      </span>
    <div class="footer-chat">
      <span>Made with FrontPrince By Hotan</span>
    </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.footer-container {
  width: 100%;
  background-color: #333333;
  bottom: 0;
  text-align: center;
  color: #5c6b77;
}

.footer-content {
  margin: 0 auto;
  width: 100%;
  padding-top: 20px;

}
.footer-communicate{
  padding: 20px;

}

</style>
