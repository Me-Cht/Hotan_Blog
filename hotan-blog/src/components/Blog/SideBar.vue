<template>
  <div class="sidebar">
    <h2>博客概览</h2>
    <ul class="blog-titles">
      <li v-for="blog in blogs" :key="blog.id" @click="selectBlog(blog)">
        {{ blog.title }}
      </li>
    </ul>
  </div>

</template>

<script>
import MyBlog from "@/components/Blog/MyBlog";
export default {
  // mixins: [MyComponent], // 引入逻辑部分
  name: "SideBar",
  mixins: [MyBlog], // 引入逻辑部分

}
</script>

<style scoped>

</style>
