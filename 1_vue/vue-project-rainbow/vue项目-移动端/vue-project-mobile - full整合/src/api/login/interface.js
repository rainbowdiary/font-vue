export default {
  //  获取短信验证码
  getVerification: {
    url: "/sendcode",
    method: "get",
    corsUrl: "/4000"   //上线就不需要，需要注释掉，dev环境才需要
  },
  // 手机号验证码登陆 
  loginSms: {
    url: "/login_sms",
    method: "post",
    corsUrl: "/4000"
  },
  // 用户名密码登陆
  loginPwd: {
    url: "/login_pwd",
    method: "post",
    corsUrl: "/4000"
  },
}