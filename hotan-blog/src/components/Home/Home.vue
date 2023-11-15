<template>
  <div>
    <header-nav></header-nav>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import {defineComponent} from "vue";


import header from "@/components/Head/Header.vue";

import api from "@/api/api";
import Footer from "@/components/Footer/Footer.vue";

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
  components:{
    Footer,
    "header-nav":header
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

<style>
* {
  padding: 0;
  margin: 0;
}

</style>
