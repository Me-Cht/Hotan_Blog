const baseURL = 'http://localhost:8088';

import axios from 'axios'
axios.defaults.baseURL = baseURL;

const request = (method,url,data)=>{
    return axios({
        method,
        url,
        data
    });
};
//

export const login = (name, password) => {
    return axios.post('/api/user/login', {name, password})
}

export const getUser = () => {
    return request('get', 'api/user/getAllData')
}

export  const register = () => {
    return request('post','/api/user/register')
}

export const getFruit = () => {
    return axios.get('/api/product/findAll')


}
export const addFruit = () => {
    return request('post','/add')
}
export default {
    getFruit,
    login,
    getUser,
    register
    // 导出其他接口函数...
};
