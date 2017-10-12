/**
 * Created by Administrator on 2017/8/4.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        title: "My-Albums",
        userInfo : {
            expire : '',
            token : '',
            userName : '',
            albumNames : [],
        },
        images : [],
        baseUrl : 'http://59.110.160.110:9990',
    },
    getters :{
        getToken(state){
            return state.userInfo.token;
        }
    },
    mutations : {
        // 保存jwt认证后的token和expire
        setToken(state,payload) {
            state.userInfo.expire = payload.expire;
            state.userInfo.token = payload.token;
        },
        // 保存获取的相册数组
        setAlbums (state,payload){
            state.userInfo.albumNames = payload;
        },
        // 保存相册的图片信息
        putImages (state , payload){
            state.images = payload
        }
    }

});
export default store;