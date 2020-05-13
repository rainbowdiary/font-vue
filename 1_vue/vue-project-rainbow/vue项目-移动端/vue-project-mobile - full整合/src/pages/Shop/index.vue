<template>
  <div id="app">
    <HeaderEle :seller="seller" />
    <!-- 导航 -->
    <div class="nav">
      <div class="item">
        <router-link :to="`/shop/${id}/goods`">商品</router-link>
      </div>
      <div class="item">
        <router-link :to="`/shop/${id}/ratings`">评价</router-link>
      </div>
      <div class="item">
        <router-link :to="`/shop/${id}/sellers`">商家</router-link>
      </div>
    </div>
    <keep-alive><router-view :seller="seller" /></keep-alive>
  </div>
</template>

<script>
import HeaderEle from "components/HeaderEle/HeaderEle.vue";
import { log } from "util";
const OK = 0;
export default {
  name: "Shop",
  props: {
    id: String //拿到动态路由地址所带的id
  },
  components: {
    HeaderEle
  },
  data() {
    return {
      seller: {}
    };
  },
  async mounted() {
    // console.log(this.id); 
    //可以拿到动态路由地址所带的id，应该按照id请求相应的商家数据，但是目前只有一家数据，所以不测试
    const data = await this.$http.sellers.getSellers();
    if (data.errno === OK) {
      this.seller = data.body;
    }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl';

#app {
  .nav {
    one-px(rgba(7, 17, 27, 0.1));
    width: 100%;
    heihg: 40px;
    display: flex;
    justify-content: center;
    text-align: center;

    .item {
      flex: 1;

      a {
        display: block;
        font-size: 14px;
        line-height: 40px;
        color: rgba(77, 85, 93, 1);

        &.active {
          color: rgba(240, 20, 20, 1);
        }
      }
    }
  }
}
</style>
