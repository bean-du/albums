// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-default/index.css'
import Vuex from 'vuex';
import axios from  'axios';
Vue.use(Vuex);
Vue.use(Element);
import store from './vuex/store.js';
Vue.config.productionTip = false;
Vue.config.devtools = true;
axios.defaults.baseURL = 'http://59.110.160.110:9990';
axios.interceptors.request.use(function (config) {
    if (localStorage.token) {
        config.headers.Authorization = `Bearer ${localStorage.token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
router.beforeEach((to,from,next) => {
    if(to.meta.requireAuth){
        console.log(store.getters.isLogin);
        if (store.getters.isLogin){
            next();
        }else {
            next({
                path : '/login',
                query : {redirect : to.fullPath}
            })
        }
    }else {
        next()
    }
});
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
