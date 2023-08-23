import router from "@/router/router";

const baseURL = 'http://hotan.site:8088';
import store from "@/store/store";
import axios from 'axios'
axios.defaults.baseURL = baseURL;
const request = (method,url,data)=>{
    return axios({
        method,
        url,
        data
    });
};

const requestWithParams = (method, url, params) => {
    return axios({
        method,
        url,
        params,
    });
};

// UserAPI
export const login = (name, password) => {
    return axios.post('/api/user/login', {name, password})
        .then(response => response.data.token)
}


export const getToken = (name,password)=> {
    return login(name,password);
}


export const getUser = () => {
    return request('get', '/api/user/getAllData')
}

export  const register = (ruleForm) => {
    return request('post','/api/user/register',ruleForm)
}


export const getDetailInfo = () => {
    const token = localStorage.getItem('token');
    if (!token) {

        // Promise.reject 是 Promise 对象的一个静态方法，
        // 用于返回一个被拒绝（rejected）的 Promise 实例。
        // Promise.reject 返回的 Promise 实例会以指定的理由（reason）被拒绝，
        // 可以在后续的 catch 方法中捕获并处理该拒绝。
        return Promise.reject("Missing the token!");
    }

    return new Promise((resolve, reject) => {
        axios.get('/api/user/info', {
            params: {
                token: token
            }
        }).then(response => {
            resolve(JSON.parse(response.data.msg));
        }).catch(error => {
            reject(error);
        });
    });
};


export const getUserInfo = () => {
    const token = localStorage.getItem('token')

    if (!token){
        router.push('/login')
        return "Missing token"
    }
    return axios.get('/api/user/info/',{
        params:{
            token:store.state.token
        }
    })
    };

export const testlogin = () => {
    const data = {
        name:'',
        password:''
    }
    const response = axios.get('/api/user/login',data)
    const result =response.data;
        if(result.code === '0'){
            const token = response.data.data;
            localStorage.setItem('token',token)
        }else {
            alert("账号或密码错误！")
        }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.$store.commit('setToken', null);
    this.$router.push('/login');
    return axios.get('/api/user/logout')
}

//productAPI

export const getFruit = () => {
    return axios.get('/api/product/findAll')


}
export const addFruit = () => {
    return request('post','/add')
}

// articleAPI
export const getArticle=()=>{
    return request('get','/api/article/findAll')
}


export const writeArticle = (blog) =>{
    return axios.post('/api/article/write', blog, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

}

export const getSelfArticle = (id) => {
    return axios.get(`/api/article/myblog/${id}`);
}

// export const getArticleCategory = () => {
//     return
// }



export default {
    getFruit,
    login,
    getUser,
    register,
    getArticle,
    writeArticle,
    getToken,
    getUserInfo,
    requestWithParams,
    logout,
    getDetailInfo,
    getSelfArticle,
    testlogin
    // 导出其他接口函数...
};
