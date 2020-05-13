import axios from "axios";
import store from "../../store"
import router from "../../router"
import { Toast } from "vant"

const AxiosInstance = axios.create({
  // baseURL: "http://localhost:8080",  //脚手架做了代理转发到真是接口地址
  timeout: 15000
})
let CorsUrl = "/4000"
AxiosInstance.interceptors.request.use(function (config) {
  //  特殊请求参数处理
  if (config.url === "/4000/position") {
    config.url = `${config.url}/${config.params.latitude},${config.params.longitude}`
    config.params = {}
  }
  //判断出哪些接口是需要携带token
  if (config.headers.needToken) {
    config.headers.Authorization = localStorage.getItem("ele-token");
  }
  delete config.headers.needToken  
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {
  //  如果没有token不会发送请求，并跳转登录页
  if(!localStorage.getItem("ele-token")){
    Toast({
      type: "loading",
      message: "没有token，请重新登录",
      duration: 3000,
      onClose() {   //关闭时的回调函数
        router.replace("/login")
      }
    })
  }
  return response;
}, function (error) {
  //  请求失败逻辑
  Toast({
    type: "fail",
    message: (error.response&&error.response.data&&error.response.data.message)?
    error.response.data.message : "错了",
    duration: 3000,
    onClose() {   //关闭时的回调函数
      router.replace("/login")
    }
  })
  return Promise.reject(error);
});

export default AxiosInstance;