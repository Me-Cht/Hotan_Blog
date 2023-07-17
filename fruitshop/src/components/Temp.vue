<template>
  <div class="home-container" >
    <div class="header-container">
      <div class="header-left">
      </div>
      <div class="header-center">
        <ul class="horizontal-list">
          <li>
            <img src="../img/logo/DeckLiza.png" alt="">
            <span>DeckLiza</span>
          </li>
          <li>
            <router-link to="/header" id="nav_list">
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
          <li>
            <div class="login">
              <a href="">
                {{user.name}}⬇
              </a>
              <ul>
                <li><router-link to="/">个人中心</router-link></li>
                <li><router-link to="">帮助中心</router-link></li>
                <li><router-link to="">退出</router-link></li>

              </ul>
            </div>

          </li>
        </ul>

      </div>

      <div class="headBack">
        <el-row class="container">
          <el-col :span = "24">
            <div class="headBox">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                  <template>
                    首页
                  </template>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">博客</template>
                  <el-menu-item index="2-1">我的博客</el-menu-item>
                  <el-submenu index="2-4">
                    <template slot="title">我的项目</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
                <el-select
                  v-model="value9"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

                <el-submenu index="2" class="login">
                  <template slot="title">登陆</template>
                  <el-menu-item index="2-1">个人中心</el-menu-item>
                  <el-submenu index="2-4">
                    <template slot="title">帮助</template>
                  </el-submenu>
                </el-submenu>

              </el-menu>
            </div>

          </el-col>
        </el-row>
      </div>
    </div>


    <router-view></router-view>

  </div>

</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
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
      },
      options4: [],
      value9: [],
      list: [],
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"]
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
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });



  },
  methods:{
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    }
  }

}
</script>
<style scoped>

.horizontal-list{
  width: 100%;
  background-color: rgb(240, 242, 245);
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  list-style: none;
  align-items: center;
}
.horizontal-list img{
  width: 50px;
  height: 50px;
}
.horizontal-list span {
  font-size: 20px;
}
.horizontal-list li {
  display: flex;
  align-items: center;
}
.horizontal-list #nav_list {
  background-color: white;
  color: black;
  text-decoration: none;
  /*padding: 10px;*/
}
.header-container .login ul {
  display: none;
  list-style: none;

}
.header-container .login ul li {

  transition: all 0.3s ease-in-out;
  background-color: white;
}
.header-container .login:hover ul {
  display: block;

}


/*Bew Head*/
.headBack {
  width: 100%;
  background-color: rgba(48,42,44,0.6);
  position: fixed;
  left: 0;
  right: 0;
  top: 150px;
  z-index: 100;
}

.headBox .el-menu {
  background: transparent;
  border-bottom: none !important;
}
.headBox .el-menu-demo li.el-menu-item,
.headBox .el-menu--horizontal .el-submenu .el-submenu__title {
  height: 38px;
  line-height: 38px;
  border-bottom: none!important;
}

.headBox .pcsearchbox {
  padding: 0;
  max-width: 170px;
  /*min-width: 30px;*/
  height: 100%;
  line-height: 38px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}







</style>


