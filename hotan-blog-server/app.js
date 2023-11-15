const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;


// 创建数据库连接
const connection = mysql.createConnection({
  host:"hotan.site",
  user:"hotan",
  password:"admin",
  database:"fruitshop"
})

//连接数据库
connection.connect((err)=>{
  if(err){
    console.log("连接失败");
  }else{
    console.log("连接成功");
  }
})

// 创建GET请求
app.get('/api/blogs',(req,res)=>{
  connection.query("SELECT * FROM article " ,(err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
})

// 启动Express服务端
app.listen(port,()=>{
  console.log(`Express server listening at http://localhost:${port}`);
})
