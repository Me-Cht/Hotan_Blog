<template>

  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>商品管理</template>
          <el-menu-item-group>
            <template slot="title">商品分类</template>
            <el-menu-item index="1-1">
                <el-dropdown-item>
                水果
                </el-dropdown-item>

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
            <el-menu-item index="2-1">选项1</el-menu-item>
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
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
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
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>陈河天</span>
      </el-header>
      <!--<template> 标签在 Vue.js 中是用来定义可复用的模板的，可以在不同的组件中引用。

      slot-scope 是用于传递作用域的一种技术，它允许父组件向子组件中插入内容，
      并且同时让这些内容可以访问到父组件的数据和方法。

      在你的代码示例中，使用了 <template slot-scope="scope"> 标签来定义一个插槽，将子组件的数据和方法暴露给父组件。
      通过这种方式，你可以在父组件中访问子组件的数据和方法，并使用它们来实现一些功能。

      例如，在你的代码示例中，使用了 scope.row 来访问子组件中的 row 数据，deleteProduct(scope.row.id)
      来调用子组件中的 deleteProduct 方法，这些都是通过 slot-scope 传递的。-->
      <el-main>
        <div>
          <h1>商品管理</h1>
          <el-table :data="fruits" style="width: 100%">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="change" label="操作">

<!--              <template slot-scope="scope">-->

<!--                <router-link :to="{ path: '/edit/:id', params: { id: scope.row.id } }">-->
<!--                  <el-button type="warning" size="small">修改</el-button>-->
<!--                </router-link>-->

<!--                <el-button type="danger" @click="deleteProduct(scope.row.id)">删除</el-button>-->
<!--              </template>-->
              <template slot-scope="scope">
                <el-button type="warning" size="small" @click="handleEdit(scope.row.id)">修改<i class="el-icon-edit"></i></el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.row.id)"><i class="el-icon-delete"></i>
                </el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
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
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    },
  },
  name: 'FruitsView',
  data() {
    return {
      fruits: [],
      selectedFruit: null

    }
  },
  mounted() {
    axios.get('http://localhost:8088/api/product/findAll')
        .then(response => {
          this.fruits = response.data
          console.log(this.data().fruits)
        })
        .catch(error => {
          console.log(error)
        })

    // axios.post('http://localhost:8088/api/product/add',product)
    //     .then(response =>{
    //       console.log("添加数据成功！")
    // }).catch(error => {
    //   console.log("添加数据失败！")
    // })




  },
  methods:{
    deleteProduct(id){

    },
    handleEdit(id) {
      this.$router.push({ path: `/edit/${id}` })
    },
    handleDelete(id) {
      axios.delete(`http://localhost:8088/api/product/delete/${id}`)
          .then(response=>{
            console.log("删除成功！")
            axios.get('http://localhost:8088/api/product/findAll').then(response=>{
              this.fruits = response.data
            })

          }).catch(error=>{console.log('error!',error)})

      // ...
    }


  }

}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 32px;
}
</style>
