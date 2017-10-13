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
        currentAlbum : '',
        images : [],
    },
    getters :{
        getCurrentAlbum : state => {
            return state.currentAlbum;
        },
        getToken(state){
            return state.userInfo.token;
        },
        getAlbumsName (state){
            return state.userInfo.albumNames;
        },
        getImagesList(state){
            let images = state.images;
            images.forEach(function (item) {
                item.url = 'http://' + item.url;
            });
            return images;
        },
        isLogin() {
            let  token_expire = Date.parse(new Date(store.state.userInfo.expire  || localStorage.token_expire));
            let now_time = Date.parse(new Date());
            console.log('now_time : ',now_time,'expire : ',token_expire);
            if (localStorage.token != '' && token_expire > now_time){
                return true;
            }else {
                return false;
            }
        }
    },
    mutations : {
        // 保存jwt认证后的token和expire
        setToken(state,payload) {
            state.userInfo.expire = payload.expire;
            state.userInfo.token = payload.token;
        },
        // 保存获取的相册名称数组
        setAlbums (state,payload){
            state.userInfo.albumNames = payload;
        },
        // 保存相册的图片信息
        putImages (state , payload){
            state.images = payload;
        },
        setCurrentAlbum : (state , payload) => {
            state.currentAlbum = payload;
        }
    }

});
export default store;