import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import "./mock"
import axios from "axios"
import api from "./api"

// mork数据请求测试
//#region 
// (async () => {
//   const data = await axios({
//     method: 'get',
//     url: '/api/homeData',
//   })
//   console.log(data);
// })()
//  结合封装的axios测试
// (async () => {
//   const data = await api.homeDataApi.getHomeData()
//   console.log(data);
// })()
//#endregion
Vue.prototype.$http = api;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
