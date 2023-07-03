<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import FruitsView from "@/views/fruit/Dashboard.vue";
import EditFruitView from "@/views/fruit/edit/index.vue";
export default {
  name: 'App',

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
