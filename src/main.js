import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './bus';
import currency from './filter/currency';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

Vue.component('loading', Loading);

Vue.filter('currency', currency);

router.beforeEach((to, from, next) => {
  // console.log('to:',to,'from:', from,'next:', next);

  if(to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if(response.data.success) {
        next();
      }
      else{
        next({
          path: '/login',
        })
      }
    })
  }
  else{
    next();
  }
})
