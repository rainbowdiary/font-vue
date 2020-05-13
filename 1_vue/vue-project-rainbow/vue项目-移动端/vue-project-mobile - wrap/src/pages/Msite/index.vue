<template>
  <section class="content">
    <div class="on">
      <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
          <template slot="left">
            <span class="header_search">
              <i class="iconfont icon-sousuo"></i>
            </span> 
          </template>
          <template slot="right">
            <span class="header_login">
              <span class="header_login_text">登录|注册</span>
            </span>
          </template>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" :key="index" v-for="(categoriesItem,index) in categoriesArr">
                <a href="javascript:" class="link_to_food" :key="index" v-for="(category,index) in categoriesItem">
                  <div class="food_container">
                    <img :src="baseImgUrl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <!--首页附近商家-->
        <ShopList/>
      </section>
    </div>
  </section>
</template>
 
<script>
import HeaderTop from "../../components/HeaderTop"
import ShopList from "../../components/ShopList"
import _ from "lodash";
import Swiper from "swiper"
import "swiper/css/swiper.min.css"

import {mapActions,mapState} from "vuex"
export default {
  name: 'Msite',
  data(){
    return {
        categories1:[],
        categories2:[]
    }
  },
  components:{
    HeaderTop,
    ShopList,
  },
  computed:{
    ...mapState(["address","categories","baseImgUrl"]),
    categoriesArr(){
        return  _.chunk(this.categories, 8);
    }
  },
  methods:{
    ...mapActions(["getAdress","getCategories"]),
    swiperRender(){
      new Swiper('.swiper-container', {
        autoplay: true,//可选选项，自动滑动
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        })
    }
  },
  async created(){
    this.getAdress() 
    await this.getCategories()    
    this.swiperRender()    
  },
}
</script>
 
<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
.content  //每个页面的内容
  width 100%
  height 100%
  >div //决定哪个页面显示
    display none
    &.on
      width 100%
      height 100%
      display block
    >section
      &.msite  //首页
        position relative   //为了实现shopLists滑屏，shopLists尺寸需要固定，所有父元素使用相对定位
        width 100%
        height 100%
        .msite_nav
          bottom-border-1px(#e4e4e4)
          // margin-top 45px  //会导致app margin穿透
          padding-top 45px
          height 200px
          background #fff
          .swiper-container
            width 100%
            height 100%
            .swiper-wrapper
              width 100%
              height 100%
              .swiper-slide
                display flex
                justify-content center
                align-items flex-start
                flex-wrap wrap
                .link_to_food
                  width 25%
                  .food_container
                    display block
                    width 100%
                    text-align center
                    padding-bottom 10px
                    font-size 0
                    img
                      display inline-block
                      width 50px
                      height 50px
                  span
                    display block
                    width 100%
                    text-align center
                    font-size 13px
                    color #666
            .swiper-pagination
              >span.swiper-pagination-bullet-active
                background #02a774
</style>