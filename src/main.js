// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.css'
import Vuex from 'vuex';
Vue.use(Vuex);
import store from './vuex/store.js';
Vue.config.productionTip = false;
Vue.config.devtools = true;

// router.beforeEach((to,from,next) => {
//     if(to.meta.requireAuth){
//         if (this.$store.state.userInfo.token != ''){
//             next();
//         }else {
//             next({
//                 path : '/login',
//                 query : {redirect : to.fullPath}
//             })
//         }
//     }
// });
/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
