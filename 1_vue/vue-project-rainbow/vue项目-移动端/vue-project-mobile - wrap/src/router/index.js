import VueRouter from "vue-router";
import Vue from "vue";
import routes from "../routes"
Vue.use(VueRouter);
 
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

export default new VueRouter({
  routes,
})