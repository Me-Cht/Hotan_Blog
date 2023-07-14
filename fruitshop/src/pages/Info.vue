<template>
  <div class="personal-center">
    <h1>个人中心</h1>

    <div class="profile">
      <h2>个人资料</h2>
      <div>
        <label>用户名:</label>
        <span>{{ user.name }}</span>
      </div>
      <div>
        <label>邮箱:</label>
        <span>{{ user.email }}</span>
      </div>
      <!-- 更多个人资料信息 -->
    </div>

    <div class="blog">
      <h2>我的博客</h2>
      <el-card v-for="blog in blogs" :key="blog.id" class="blog-card">
        <el-row>
          <div class="blog-title">{{ blog.title }}</div>
        </el-row>
        <el-row>
          <div v-html="blog.content"></div>
        </el-row>
        <el-row>
          <div class="create_time">{{ formatDateTime(blog.create_time) }}</div>
        </el-row>
      </el-card>

    </div>

    <!-- 其他个人中心功能模块 -->

  </div>
</template>

<script>
import api, {getDetailInfo} from "@/api/api";
import moment from "moment/moment";

export default {
  name:'info',
  data() {
    return {
      user: {
        name: 'Example:John Doe',
        email: 'Example:john.doe@example.com',
        id:'',
      },blog: {
        id: '',
        title: '你还没有发布过任何博客',
        content: '',
        author_id: '',
        create_time: '',
      },
      blogs: []
    };
  },
  methods:{
    formatDateTime(dateTime) {
      return moment(dateTime).format('YYYY-MM-DD HH:mm');
    },
  },
  created() {
    api.getDetailInfo().then(data => {
      this.user = data
      api.getSelfArticle(this.user.id)
        .then(response => {
          this.blogs = response.data.data;
          if (response.data.data.length===0){
            this.blog.title="你还没有发布过任何博客"
            console.log("无返回值")
          }
        });
    }).catch(error=>{
      console.log(error)
    });

  },
  mounted() {

  },
};
</script>




<style scoped>
.personal-center {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
}

.profile {
  margin-top: 30px;
}

.profile h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.profile div {
  margin-bottom: 10px;
}

.profile label {
  font-weight: bold;
}
.blog-card {
  text-align: left;
}

.orders {
  margin-top: 30px;
}

.orders h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  text-align: left;
  background-color: #f5f5f5;
  padding: 8px;
}

tbody td {
  padding: 8px;
}
</style>
