import axios from "axios";
import { Toast } from "vant";

const AxiosInstance = axios.create({
  // baseURL: "http://localhost:9000/api",
  timeout: 15000
})

// Add a request interceptor
AxiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  Toast.loading({
    message: "加载中....",
    icon: "clock - o",
    forbidClick: true, //loading Toast 设置为背景不可点击 
    duration: 0
  })
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  Toast.clear(); //关闭提示
  Toast.success("success");
  return response;
}, function (error) {
  // Do something with response error
  Toast.clear(); //关闭提示
  Toast.fail("fail");
  return Promise.reject(error);
});

export default AxiosInstance;