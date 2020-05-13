import {GET_ADDRESS,GET_CATEGORIES,GET_SHOPS,GET_USER,RESET_USER,AUTO_LOGIN} from "./mutations-type";
export default {
  [GET_ADDRESS](state,address){
    state.address = address
  },
  [GET_CATEGORIES](state,categories){
    state.categories = categories
  },
  [GET_SHOPS](state,shops){
    state.shops = shops
  },
  [GET_USER](state,user){
    state.user = user
    state.token = user.token
  },
  [RESET_USER](state){
    state.user = {};
    // 清空vuex中token和localStorage中token信息
    state.token = "";
    localStorage.removeItem("ele-token")
  },
  [AUTO_LOGIN](state,user){
    state.user = user;
  },
}