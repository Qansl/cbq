import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: false,
        userInfo: {
            icon: '//pic.iidingyun.com/file/2778/top_head portrait_default@2x-2.png',
            phone: '',
            user_name: '',
        }
    },
    mutations: {
        //修改用户信息
        changeUserInfo(state, info) {
            state.userInfo = Object.assign(state.userInfo, info);
        },
        //修改登录状态(true/false)
        changeLogin(state, v) {
            state.login = v;
        },
    }
})