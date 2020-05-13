<template>
  <div id="app">
    <HeaderEle :seller="seller"/>
    <!-- 导航 -->
    <div class="nav">
      <div class="item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="item">
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller" />
  </div>
</template>

<script>
import HeaderEle from "components/HeaderEle/HeaderEle.vue";
import { log } from 'util';
const OK = 0;
export default {
  name: "app",
  components: {
    HeaderEle
  },
  data(){
    return {
      seller:{}
    }
  },
  async mounted() {
    const data = await this.$http.getSellers();
    if(data.data.errno === OK){
      this.seller = data.data.body;
      // console.log(data.data.body);
    }
  },
};
</script>

<style lang="stylus">
@import "./common/stylus/mixin.styl" 
#app
  .nav
    one-px(rgba(7,17,27,0.1))
    width 100%
    heihg 40px
    display flex
    justify-content center
    text-align center
    .item
      flex 1
      a
        display block  
        font-size 14px
        line-height 40px
        color rgba(77,85,93,1)
        &.active
          color rgba(240,20,20,1)
</style>
