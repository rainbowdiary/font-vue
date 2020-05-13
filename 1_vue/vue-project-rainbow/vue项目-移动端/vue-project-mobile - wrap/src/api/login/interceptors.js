import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "http://localhost:8080",  //脚手架做了代理转发到真是接口地址
  timeout: 15000
})

// Add a request interceptor
AxiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default AxiosInstance;