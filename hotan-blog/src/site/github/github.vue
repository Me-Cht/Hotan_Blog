<template>
<div>
  <el-button @click="getUserInfo">获取用户信息接口测试</el-button>
  <router-link to="/temp">temp</router-link>

</div>

</template>

<script>
import api from "@/api/api";
export default {
  name: "github",
  methods:{
    getUserInfo(){
      const token = localStorage.getItem('token')

      api.getUserInfo(token)
        .then(response => {
          console.log(response)
          console.log(response.data.msg)
        })
    }

  }
}
</script>

<style scoped>

</style>
