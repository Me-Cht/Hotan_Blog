<template>
  <el-container>
    <el-header>
      <el-tooltip content="Top center" placement="top">
        <el-button>Dark</el-button>
      </el-tooltip>
      <el-tooltip content="Bottom center" placement="bottom" effect="light">
        <el-button>Light</el-button>
      </el-tooltip>
      <el-dropdown>
        <el-button type="primary">
          更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>



    </el-header>
    <el-container>
      <el-aside width="200px">


      </el-aside>
      <el-container>
        <el-main>

          <el-carousel>
            <el-carousel-item v-for="item in imgwrap" :key="item.url">
              <img :src="item.url"/>
            </el-carousel-item>
          </el-carousel>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {

  name: "index.vue",
  data(){
    return {
      imgwrap:[
        {url:("")},
        {url:("../src/images/3.jpg")},
        {url:("../src/images/4.jpg")},
      ]


    }
  },


}
</script>


<style scoped>

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #ffffff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
 .el-dropdown {
   vertical-align: top;
   float: right;
   right: 50px;
 }
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-tooltip{
  float: left;
}
</style>
