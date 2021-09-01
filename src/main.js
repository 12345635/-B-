import Vue from 'vue'
// import VCharts from 'v-charts'
import App from './App.vue'
import store from './store'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "@/styles/reset.less";
import cookie from "@/utils/cookie"
store.dispatch("isLogin/howMI");

Vue.use(Antd);
// Vue.use(VCharts);
import API from "@/api"
Vue.prototype.$api = API;
Vue.prototype.$cookie = cookie;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
