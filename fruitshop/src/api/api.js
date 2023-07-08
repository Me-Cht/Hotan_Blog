
const baseURL = 'http://localhost:8088';
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

export  const register = () => {
    return request('post','/api/user/register')
}

export const getUserInfo = () => {
    console.log("store.state.token",store.state.token)
    return axios.get('/api/user/info/',{
        params:{
            token:store.state.token
        }
    })
    };
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

export const writeArticle = (article) =>{
    return request('post','/api/article/write',article)
}



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
    logout
    // 导出其他接口函数...
};
