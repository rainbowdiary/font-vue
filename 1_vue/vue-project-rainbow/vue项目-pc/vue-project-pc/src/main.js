import Vue from 'vue'
import ElementUI from "element-ui"
import App from './App.vue'
import router from "./router"
import api from "./api";
// 引入element UI组件库
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 根据当前环境显示控制台提示信息
Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.prototype.$http = api;
// 环境变量文件测试
// console.log(process.env.VUE_APP_BASE_API);  //测试配置的环境变量，dev-api

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
