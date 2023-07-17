<template>

  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>商品管理</template>
          <el-menu-item-group>
            <template slot="title">商品分类</template>
            <el-menu-item index="1-1">
                  <router-link to="/detail">
                    <el-dropdown-item>
                    水果
                    </el-dropdown-item>
                  </router-link>

            </el-menu-item>
            <el-menu-item index="1-2">生鲜</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="商品管理">
            <router-link to="/add">

              <el-menu-item index="1-3">添加商品</el-menu-item>

            </router-link>
            <router-link to="/search">

            <el-menu-item index="1-3">查询商品</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
              <router-link to="/userdetail">
                <el-menu-item index="2-1">
                用户明细
                </el-menu-item>
              </router-link>

            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        水果商城后台管理系统

        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
            <router-link to="/register">
              注册
            </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/login">
              退出
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{}}</span>
      </el-header>
      <!--<template> 标签在 Vue.js 中是用来定义可复用的模板的，可以在不同的组件中引用。

      slot-scope 是用于传递作用域的一种技术，它允许父组件向子组件中插入内容，
      并且同时让这些内容可以访问到父组件的数据和方法。

      在你的代码示例中，使用了 <template slot-scope="scope"> 标签来定义一个插槽，将子组件的数据和方法暴露给父组件。
      通过这种方式，你可以在父组件中访问子组件的数据和方法，并使用它们来实现一些功能。

      例如，在你的代码示例中，使用了 scope.row 来访问子组件中的 row 数据，deleteProduct(scope.row.id)
      来调用子组件中的 deleteProduct 方法，这些都是通过 slot-scope 传递的。-->
      <el-main>
        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>
<script>

import axios from 'axios'
// const product = {
//   name: '芒果',
//   description: '这是一个芒果',
//   category: 'fruit',
//   price: 6.5
//
// }
export default {

  name: 'FruitsView',
  data() {
    return {
      fruits: [],
      selectedFruit: null,
      delete:false,

    }
  },


// axios.post('http://localhost:8088/api/product/add',product)
//     .then(response =>{
//       console.log("添加数据成功！")
// }).catch(error => {
//   console.log("添加数据失败！")
// })




}

</script>
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
<script src="../../api/api.js"></script>
<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 32px;
}
</style>
