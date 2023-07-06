import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        userInfo: null,
    },
    getters:{
        //获取器
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUserInfo(state,userInfo){
            state.userInfo = userInfo
        }
    },
    actions: {
        saveToken({commit,state}){

        }
    //     fetchUserInfo({commit, state}) {
    //         // 发送请求到后端API，传递Token进行验证并获取用户信息
    //         // 示例使用axios发送请求
    //         axios.get('/api/user/login', {
    //             headers: {
    //                 Authorization: `Bearer ${state.token}` // 在请求头中添加Token
    //             }
    //         })
    //             .then(response => {
    //                 commit('setUserInfo', response.data); // 将获取到的用户信息保存到状态中
    //             })
    //             .catch(error => {
    //                 // 处理错误
    //             });
    //     },
    //     modules: {}
    }
});
