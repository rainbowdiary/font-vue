import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
// import router from "@/router"
import "@/mock"

// mork数据请求测试
(async () => {
  const data = await axios({
    method: 'get',
    url: '/api/seller',
  })
  // console.log(data);
})()

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  // router
}).$mount('#app');

