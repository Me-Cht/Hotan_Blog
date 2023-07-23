<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    const token = localStorage.getItem('token'); // 从LocalStorage中获取Token
    if (token) {
      this.$store.commit('setToken', token); // 将Token设置到Vuex的store中
    }
    // ...其他逻辑
  }


}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
