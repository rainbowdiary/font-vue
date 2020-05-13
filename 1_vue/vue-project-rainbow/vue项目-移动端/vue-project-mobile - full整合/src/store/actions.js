import { GET_ADDRESS, GET_CATEGORIES, GET_SHOPS, GET_USER, RESET_USER, AUTO_LOGIN } from "./mutations-type";
import { Toast } from "vant"
import $http from "../api";
import router from "../router"
const OK = 0;
const ERROR = 1;

function loginSuccess(commit, user, resetData) {
  commit(GET_USER, user)
  Toast.success("登录成功~")
  // 登录成功跳转主页
  router.replace("/msite")
  // 清空页面用户输入数据 
  resetData()
  // token持久化存储
  localStorage.setItem("ele-token", user.token)
}
function loginFail(error, loginWay, getCaptcha, resetData) {
  Toast.fail("登录失败 请检验参数", {
    duration: 3000 // 显示时常
  })
  // 登录失败更新图片验证码
  loginWay === "pwd" && getCaptcha()
  // 重置页面数据
  resetData()
}


export default {
  async getAdress(store) {
    const body = await $http.msite.getPosition({
      "latitude": store.state.latitude,
      "longitude": store.state.longitude
    })
    if (body.code === OK) {
      store.commit(GET_ADDRESS, body.data)
    }
  },
  async getCategories(store) {
    const body = await $http.msite.getCategories()
    if (body.code === OK) {
      store.commit(GET_CATEGORIES, body.data)
    }
  },
  async getShops(store) {
    const body = await $http.msite.getShops({
      "latitude": store.state.latitude,
      "longitude": store.state.longitude
    })
    if (body.code === OK) {
      store.commit(GET_SHOPS, body.data)
    }
  },
  //  获取用户信息
  async getUser({ commit }, { loginWay, phone, code, name, pwd, captcha, getCaptcha, resetData }) {
    let body = ""
    switch (loginWay) {
      case "sms":
        body = await $http.login.loginSms({
          phone,
          code
        })

        break;
      case "pwd":
        body = await $http.login.loginPwd({
          name,
          pwd,
          captcha
        })
        break;
      default:
        break;
    }
    body.code === OK && loginSuccess(commit, body.data, resetData)
    body.code === ERROR && loginFail(body.msg, loginWay, getCaptcha, resetData)
  },
  //  重置用户信息
  resetUser({ commit }) {
    commit(RESET_USER)
    router.replace("/login")
  },
  async autoLogin({ commit }) {
    try {
      const body = await $http.msite.autoLogin();
      if (body.code === OK) {
        commit(AUTO_LOGIN, body.data)
      } else if (body.code === ERROR) {
        Toast({
          type: "fail",
          message: body.msg,
          duration: 2000
        })
      }
    } catch (error) {
      //代表进入的时候Token过期 之前的登录信息应该清除
      commit(RESET_USER)
      localStorage.removeItem("ele-token")
      Toast({
        type: "fail",
        message: error.response.data.message,
        duration: 2000
      })
    }
  }
}
