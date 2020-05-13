import VueRouter from "vue-router";
import Vue from "vue";
import routes from "../routes";

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
export default new VueRouter({
  mode: "history",
  routes,
})