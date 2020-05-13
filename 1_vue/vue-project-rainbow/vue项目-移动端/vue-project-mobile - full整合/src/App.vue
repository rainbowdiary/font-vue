<template>
  <div id="app">
    <!-- <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。 -->
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import FooterGuide from "./components/FooterGuide";

export default {
  name: "app",
  components: {
    FooterGuide
  },
  methods:{
    ...mapActions(["autoLogin"])
  },
  created(){
    localStorage.getItem("ele-token") && this.autoLogin() 
  },
};
</script>

<style lang="stylus">
#app
  // overflow hidden  //app上有一块多出来的区域，原因时nav导航的margin穿透，开启BFC解决；获取mav使用padding-top
  width 100%
  height 100%
  background #f5f5f5
  position relative
</style>
