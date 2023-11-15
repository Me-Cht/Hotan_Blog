<template>
  <div class="headBack">
    <el-row>
      <el-col>
        <!--    PC端导航   -->
        <div class="pcBox">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#222334"
            text-color="#fff"
            active-text-color="#ffd04b">

            <el-menu-item >
              <router-link to="/firstpages">首页</router-link>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <router-link to="/about">
                  个人简介

                </router-link>
              </template>
              <el-menu-item index="2-1" disabled="">作者简历</el-menu-item>
              <el-menu-item index="2-2" disabled="">留言板</el-menu-item>
              <el-menu-item index="2-3">
                <router-link to="/aboutProduct">
                  关于本项目
                </router-link>
              </el-menu-item>
              <el-menu-item>
                <router-link to="/aboutOtherProduct">
                  关于其他项目
                </router-link>
              </el-menu-item>

            </el-submenu>
            <el-menu-item index="3">
              <router-link to="/blog">
                博客中心
              </router-link>
            </el-menu-item>
            <el-menu-item index="3" disabled="">disable</el-menu-item>
            <el-menu-item index="4"><a href="">
              <router-link to="/info">
                个人中心
              </router-link>
            </a></el-menu-item>
            <div index="" class="PCSearch">
              <i class="el-icon-search PCSearchIcon"></i>
              <div class="PCSearchInput" :class="input?'hasSearched':''">
                <el-input placeholder="搜索" icon="search" v-model="input" :on-icon-click="searchEnterFun"
                          @keyup.enter.native="searchEnterFun" @change="searchChangeFun">
                </el-input>
              </div>
            </div>
            <el-submenu index="3" class="myInfo">
              <template slot="title">
                <router-link to="/about">
                  {{ user.name }}

                </router-link>
              </template>
              <el-menu-item index="2-1">
                <router-link to="/info">
                  个人信息
                </router-link>
              </el-menu-item>
              <el-menu-item index="2-2" @click="switchToForgetPassword">修改密码</el-menu-item>
              <el-menu-item index="2-3" disabled="">帮助中心</el-menu-item>
              <el-menu-item index="2-3" @click="switchToLogin">退出登陆</el-menu-item>

            </el-submenu>

          </el-menu>
        </div>
        <!--    移动端导航  -->
        <div class="mobileBox">
          <div class="hideMenu">
            <i @click="pMenu=!pMenu" class="el-icon-menu"></i>
            <el-collapse-transition>
              <el-menu :default-active="activeIndex" class="mlistmenu" v-show="!pMenu" theme="dark" @open="handleOpen"
                       @close="handleClose" :unique-opened="true" :router="true">
                <el-menu-item>
                  <router-link to="/firstpages"><i class="fa fa-wa fa-home"></i>首页</router-link>

                </el-menu-item>
                <el-submenu index="/resume">
                  <template slot="title"><i class="fa fa-wa fa-archive"></i> 作者简历</template>
                  <el-menu-item v-for="(item,index) in classListObj" :key="'class1'+index"
                                :index="'/Share?classId='+item.class_id">{{ item.cate_name }}
                  </el-menu-item>
                </el-submenu>
                <el-menu-item index="/blog"><i class="fa fa-wa fa-cny"></i> 博客中心</el-menu-item>

                <el-menu-item index="/info"><i class="fa fa-wa fa-cny"></i> 个人中心</el-menu-item>
                <el-menu-item index="/login"><i class="fa fa-wa fa-cny"></i> 退出登陆</el-menu-item>

              </el-menu>
            </el-collapse-transition>
            <div class="searchBox">
              <el-input placeholder="" icon="search" v-model="input" @keyup.enter.native="searchEnterFun"
                        :on-icon-click="searchEnterFun" @change="searchChangeFun">
              </el-input>
            </div>
          </div>
        </div>

      </el-col>
    </el-row>
    <div class="container-head-img">
      <div class="inner">
        <img src="../../assets/logo/DeckLiza.png" alt="">
        <img src="../../assets/logo/留言板.png" alt="">
        <img src="../../assets/logo/DeckLiza.png" alt="">
        <img src="../../assets/logo/留言板.png" alt="">
        <img src="../../assets/logo/DeckLiza.png" alt="">
        <img src="../../assets/logo/留言板.png" alt="">
      </div>
<!--      <img src="../assets/header/headBackground.png" alt="" style="width: 100%; height: 100%;">-->

    </div>


  </div>


</template>
<script>
import ElCollapseTransition from "@/components/ElCollapseTransition.vue";
import api from "@/api/api";

export default {
  data() { //选项 / 数据
    return {
      log: '',
      reg: '',
      userInfo: '', //用户信息
      haslogin: false, //是否已登录
      classListObj: '', //技术分类
      activeIndex: '/', //当前选择的路由模块
      state: '', //icon点击状态
      pMenu: true, //手机端菜单打开
      // path:'',//当前打开页面的路径
      input: '', //input输入内容
      headBg: 'url(static/img/headbg05.jpg)', //头部背景图
      headTou: '', //头像
      projectList: '', //项目列表
      user: {name: '登陆', email: ''}//用户信息

    }//博客列表


  },

  methods: { //事件处理器
    handleOpen(key, keyPath) { //分组菜单打开
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) { //分组菜单关闭
      // console.log(key, keyPath);
    },
    searchChangeFun(e) { //input change 事件
      // console.log(e)
      if (this.input == '') {
        this.$store.state.keywords = '';
        this.$router.push({path: '/'});
      }
    },
    switchToForgetPassword() {
      this.$router.push('/changePass');
    },
    switchToLogin(){
      localStorage.removeItem('token')

      this.$router.push('/login')
    },
    switchToFirstPages() {
      this.$router.push('/firstpages')
    },
    searchEnterFun: function (e) { //input 输入 enter
      var keyCode = window.event ? e.keyCode : e.which;
      // console.log('CLICK', this.input, keyCode)
      //  console.log('回车搜索',keyCode,e);
      if (this.input) {
        this.$store.state.keywords = this.input;
        this.$router.push({path: '/Share?keywords=' + this.input});
      }
    },
    handleSelect(key, keyPath) { //pc菜单选择
      //    console.log(key, keyPath);
    },
    logoinFun: function (msg) { //用户登录和注册跳转
      // console.log(msg);
      localStorage.setItem('logUrl', this.$route.fullPath);
      // console.log(666,this.$router.currentRoute.fullPath);
      if (msg == 0) {
        this.$router.push({
          path: '/Login?login=0'
        });
      } else {
        this.$router.push({
          path: '/Login?login=1'
        });
      }
    },
    // 用户退出登录
    userlogout: function () {
      var that = this;
      this.$confirm('是否确认退出?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(that.$route.path);
        LoginOut(localStorage.getItem('accessToken'), function (result) {
          //    console.log(result);
          if (localStorage.getItem('userInfo')) {
            localStorage.removeItem('userInfo');
            that.haslogin = false;
            //    that.$router.replace({path:that.$route.fullPath});
            window.location.reload();
            that.$message({
              type: 'success',
              message: '退出成功!'
            });
          }
          if (that.$route.path == '/UserInfo') {
            that.$router.push({
              path: '/'
            });
          }
        })
      }).catch(() => {
        //
      });

    },
    routeChange: function () {
      var that = this;
      that.pMenu = true
      this.activeIndex = this.$route.path == '/' ? '/Home' : this.$route.path;
      if (localStorage.getItem('userInfo')) { //存储用户信息
        that.haslogin = true;
        that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        // console.log(that.userInfo);
      } else {
        that.haslogin = false;
      }


      if ((this.$route.name == "Share" || this.$route.name == "Home") && this.$store.state.keywords) {
        this.input = this.$store.state.keywords;
      } else {
        this.input = '';
        this.$store.state.keywords = '';
      }
    }
  },
  components: {
    ElCollapseTransition //定义组件

  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange'
  },
  created() { //生命周期函//判断当前页面是否被隐藏
    var that = this;
    var hiddenProperty = 'hidden' in document ? 'hidden' :
      'webkitHidden' in document ? 'webkitHidden' :
        'mozHidden' in document ? 'mozHidden' :
          null;
    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    var onVisibilityChange = function () {
      if (document[hiddenProperty]) { //被隐藏
        document.title = 'Blog-Hotan被缩小了';
      } else {
        document.title = 'Blog-Hotan'; //当前窗口打开
        if (that.$route.path != '/DetailShare') {
          if (localStorage.getItem('userInfo')) {
            that.haslogin = true;
          } else {
            that.haslogin = false;
          }
        }
      }
    }
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    // console.log();
    this.routeChange();
    //设置主题

  },
  mounted() { //页面元素加载完成
    const token = localStorage.getItem('token')

    var that = this;
    var timer = setTimeout(function () {
      clearTimeout(timer);
    }, 500);
    api.getDetailInfo().then(data => {
      this.user = data
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }
}
</script>


<style lang="scss">
@use "sass:math";

body {
  //background: linear-gradient(to bottom, #FFA07A, #FFC0CB, #DA70D6, #4B0082);
  background-color: #35495E;

}

/*旋转图片效果*/
$size : 250px;
$r : $size / 2;
$n : 6;
$pDeg : 360deg / $n;
$R : $r /math.sin($pDeg / 2);
$innerSize : $R * 2;

.container-head-img {
  width: $size;
  height: $size;
  border-radius: 50%;
  outline:5px solid #fff;
  margin: 50px auto;
  display:flex;
  justify-content: center;
  overflow: hidden;
}
.inner {
  width: $innerSize;
  height: $innerSize;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: $r;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: rotation 10s ease-in-out infinite;
  img {
    width: $size;
    height: $size;
    flex-shrink: 0;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    margin-left: -$r;
    top:-$r;
    transform-origin: center #{$R +$r};
    @for $i from 1 through $n {
      &:nth-child(#{$i}){
        transform:rotate($pDeg*($i - 1))
      }
    }

  }
}
$u : 1 /$n * 100%;
$rotateDuration: 1.5s;
$stopDuration:1s;
$duration:($rotateDuration+$stopDuration) * $n;
$backPercent:$stopDuration / ($rotateDuration + $stopDuration) * $u;
@keyframes  rotation{
  @for $i from 1 through $n {
    $p:$u * $i;
    $deg:$pDeg * $i;
    #{$p - $backPercent},#{$p}{
      transform:rotate(-$deg)
    }
  }


}


/*旋转图片效果*/


.pcBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  z-index: 999;
}

.pcBox el-menu {
  margin-left: 50px;

}

.PCSearch i.PCSearchIcon {
  color: #fff;
  padding-left: 10px;
  position: fixed;
  right: 100px;
  top: 20px;
}

.pcBox .PCSearchInput {
  width: 180px;
  padding: 10px 20px 10px 20px;
  background: rgba(40, 42, 44, 0.6);
  border-radius: 0 0 2px 2px;
  position: absolute;
  right: 0;
  top: 38px;
  opacity: 0;
  visibility: hidden;
  /*transform: scaleX(0);*/
  transform-origin: right;
  transition: all 0.3s ease-out;
}

.myInfo {
  position: fixed;
  right: 50px;
}


.mobileBox {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 38px;
  line-height: 38px;
  background-color: #222333;
  z-index: 99;
}

.hideMenu {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 38px;
}

.hideMenu ul.mlistmenu {
  width: 100%;
  position: absolute;
  left: 0;
  top: 100%;
  box-sizing: border-box;
  z-index: 999;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12), 0 0 8px 0 rgba(0, 0, 0, .04);
  background: #48456C;
  color: #fff;
  border-right: none;
}

.hideMenu .el-submenu .el-menu {
  background: #64609E;
}

.hideMenu .el-menu-item,
.hideMenu .el-submenu__title {
  color: #fff;
}

.hideMenu > i {
  position: absolute;
  left: 10px;
  top: 12px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

.hideMenu .el-menu-item,
.el-submenu__title {
  height: 40px;
  line-height: 40px;
}

.mobileBox {
  height: 60px;
}

.mobileBox .searchBox {
  margin-top: 10px;
  padding-left: 40px;
  width: 100%;
  box-sizing: border-box;
}

.mobileBox .searchBox .el-input__inner {
  display: block;
  border-radius: 2px;
  border: none;
  height: 25px;
}

.hideMenu ul.mlistmenu.pshow {
  display: block;
}

.hideMenu ul.mlistmenu .el-submenu__icon-arrow,
.mobileBox li.el-menu-item a {
  color: #fff;
}

.hideMenu > ul li.el-menu-item:hover,
.hideMenu > ul li.el-menu-item.is-active {
  background: #48576a;
}

a {
  text-decoration: none;
}

/*媒体查询设置移动端的显示和隐藏*/
@media (max-width: 768px) {
  .pcBox {
    display: none;
  }

  .mobileBox {
    display: block;
  }

  //.headImgBox img {
  //  width: 100%;
  //  height: 100px;
  //}


}

@media (min-width: 768px) {
  .pcBox {
    display: block;
  }

  .mobileBox {
    display: none;
  }

}

.pcBox .userInfo {
  position: fixed;
  right: 150px;
  top: 18px;

}

.pcBox .userInfo a {
  text-decoration: none;
  color: #ffffff;
}

.pcBox .userInfo a:hover {

}

.headBox .haslogin:hover ul {
  visibility: visible;
  opacity: 1;
}

.headBox .haslogin ul {
  padding: 5px 10px;
  position: absolute;
  right: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-out;
}

.headBox .haslogin ul li {
  border-bottom: 1px solid #48456C;
}

.headBox .haslogin ul li:last-child {
  border-bottom: 1px solid transparent;
}


/*顶部背景图*/
//.headImgBox {
//  width: 100%;
//}

//.headImgBox img {
//  width: 100%;
//  height: 100%;
//  transition: 2s all ease-in;
//  border-radius: 20%;
//  opacity: 0.8;
//
//}
//
//.headImgBox img:hover {
//  border-radius: 5%;
//  opacity: 1;
//
//}

.headBox,a {
  color: white;
}
.headBox,a:focus {
  color: orange;
}



</style>
