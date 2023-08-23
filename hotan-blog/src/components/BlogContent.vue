<template>
<div class="blog-text">

<el-card v-for="blog in blogs" :key="blog.id" class="blog-card" :id="'blog-' + blog.id">
  <el-row>
    <div class="blog-title" style="font-size: 30px;font-weight: bold;">{{ blog.title }}</div>
  </el-row>
  <el-row>
    <vue-markdown :source="blog.content" ></vue-markdown>
  </el-row>
  <el-row>
    <div class="create_time">{{ formatDateTime(blog.create_time) }}</div>
    <div class="auth_name" style="color: #475669"><span style="color: gray">from:</span>{{ blog.auth_name }}</div>
  </el-row>
</el-card>
</div>

</template>
<script>
import AddTopic from "@/components/AddTopic.vue";
import VueMarkdown from "vue-markdown";
import moment from "moment/moment";

export default {
  components:{
    AddTopic,
    // VueMarkdown,
    VueMarkdown, // 注册 vue-markdown 组件
  },
  name: "BlogContent",
  methods:{
    formatDateTime(dateTime) {
      return moment(dateTime).format('YYYY-MM-DD HH:mm');
    },
  }

}
</script>

<style scoped>

</style>
