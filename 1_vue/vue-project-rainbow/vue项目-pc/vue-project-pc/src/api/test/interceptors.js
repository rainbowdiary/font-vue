import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "http://localhost:8080",  //脚手架做了代理转发到真是接口地址
  timeout: 15000
})
let CorsUrl = "/4000"
AxiosInstance.interceptors.request.use(function (config) {
  //  特殊请求参数处理
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  //  请求失败逻辑
  return Promise.reject(error);
});

export default AxiosInstance;