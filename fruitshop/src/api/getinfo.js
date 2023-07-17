import api from "@/api/api";

const token = localStorage.getItem('token')
// 获取用户信息
 export const getUserInfo = ()=>{
    if(token){
         api.getUserInfo().then(response => {
             this.user = JSON.parse(response.data.msg)
             return this.user
         })
     }
 }
