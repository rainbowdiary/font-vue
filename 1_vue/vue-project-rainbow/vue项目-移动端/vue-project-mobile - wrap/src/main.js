import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import api from "./api";
import { Toast,Button } from 'vant'
// 引入vant轻提示插件
Vue.use(Toast);
Vue.use(Button);
//  引入表单校验
import "./validate";

Vue.prototype.$http = api;
// this.$http.login. 
Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

