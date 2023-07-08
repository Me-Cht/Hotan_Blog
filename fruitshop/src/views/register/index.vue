<template>
  <div id="app">
    <div id="admin">
      <div class="pos">
        <h1 class="adminh1">用户注册</h1>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="请输入账户名" prop="name">
            <el-input
              type="text"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="email"
              v-model="ruleForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input
              v-model.number="ruleForm.age"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button><router-link to="/login">返回登陆</router-link></el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/api/api";

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 15) {
            callback(new Error('必须年满15岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var checkEmail = (rule, value ,callback) => {
      if (!value){
        return callback(new Error("邮箱不能为空"));
      }else{
        var emailPattern =  /^[\w-]+(.[\w-]+)*@[\w-]+(.[\w-]+)+$/; // 正则表达式匹配电子邮箱格式
        if(!emailPattern.test(value)){
          return callback(new Error("请输入正确的邮箱格式"))
        }else{
          callback();
      }

      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        name:'吴秉坤',
        email:'232313232@qq.com',
        age: 21,
        pass: '',
        checkPass: ''
      },
      rules: {
        email: [
          { validator: checkEmail, trigger: "blur" }
        ],
        pass: [
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        age: [
          { validator: checkAge, trigger: "blur" }
        ]
      }

    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await api.register(this.ruleForm)

            if (response.data.code === '0'){
              alert('注册成功!');
              await this.$router.push('/login')
            }else if(response.data.code === '10000') {
              alert('该用户已存在');
            }

          }catch (error){
            console.log(error)
          }


        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
body {
  background: rgb(135, 206, 235);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#admin {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -250px;
  width: 500px;
  height: 550px;
  background: #fff;
  border-radius: 10%;
  box-shadow: 8px 10px 10px rgb(177, 223, 242);
}
.adminh1 {
  margin: 20px 0;
  text-shadow: 10px 13px 3px rgb(207, 207, 207);
  text-align: center;
}
.pos {
  width: 450px;
  height: 350px;
  position: absolute;
  top: 25px;
  left: 25px;
}
</style>
