/**
 * Created by Administrator on 2017/8/4.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        userInfo : {
            userName : '',
            albumNames : '',
        },
        images : [],
        baseUrl : 'http://59.110.160.110:9990',
    },
    getters :{

    },
    mutations : {

    }

})
export default store;