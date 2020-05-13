import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import "@/mock";
import "./common/stylus/style.styl";  //字体图标样式
import api from "./api"
import "@/common/stylus/transitions.styl"
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
Vue.prototype.$http = api;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

