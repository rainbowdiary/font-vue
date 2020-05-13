import VueRouter from "vue-router";
import Vue from "vue";
import routes from "../routes"
// import store from "../store"
Vue.use(VueRouter);

//消除编程式导航的错误提醒
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes,
  mode: "history"
})

// 路由导航守卫
/* router.beforeEach(async (to, from, next) => {
  //   //不是发请求，而是dispatch一个action，如果失败在action中trycatch
    if (to.path !== "/login") {
      await store.dispatch("autoLogin")
      if (store.state.user._id) {
        next()
      } else {
        next("/login")  //报错runtime.js?96cf:263 Uncaught (in promise) RangeError: Maximum call stack size exceeded
      }
    } else {
      next("/login")
    }
}) */

router.beforeEach((to, from, next) => { console.log("前置路由"); next() })
router.beforeResolve((to, from, next) => { console.log("全局解析守卫"); next() })
router.afterEach((to, from) => { console.log("全局后置路由"); })

export default router