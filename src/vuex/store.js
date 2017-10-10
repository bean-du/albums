/**
 * Created by Administrator on 2017/8/4.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        userInfo : {
            expire : '',
            token : '',
            userName : '',
            albumNames : '',
        },
        images : [],
        baseUrl : 'http://59.110.160.110:9990',
    },
    getters :{

    },
    mutations : {
        setToken(state,payload) {
            state.userInfo.expire = payload.expire;
            state.userInfo.token = payload.token;
        }
    }

})
export default store;