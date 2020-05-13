
export default {
  login: {
    url: "/login",
    method: "post",
    corsUrl: process.env.VUE_APP_BASE_API,  //接口可配置化
    // needToken: true
  }
}