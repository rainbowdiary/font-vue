import Vue from 'vue'
import App from './App.vue'

import router from "./router"
import store from "./store"
import api from "./api";

import { Toast,Button } from 'vant'
 
import "@/mock";
import "./common/stylus/style.styl";  //字体图标样式
import "@/common/stylus/transitions.styl"
 
//  引入表单校验
import "./validate";
import "./filter";
// mork数据请求测试
//#region 
// (async () => {
//   const data = await axios({
//     method: 'get',
//     url: '/api/seller',
//   })
//   console.log(data);
// })()
//#endregion

// 引入vant轻提示插件
Vue.use(Toast);
Vue.use(Button);


Vue.prototype.$http = api;
// this.$http.login. 
Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

