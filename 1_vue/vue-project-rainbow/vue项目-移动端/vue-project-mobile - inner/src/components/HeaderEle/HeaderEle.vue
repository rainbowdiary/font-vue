<template>
  <div class="header">
    <div class="header-top">
      <img class="avatar" :src="seller.avatar" />
      <div class="content">
        <div class="content-title">
          <i class="title-icon"></i>
          <span class="title-text">{{seller.name}}</span>
        </div>
        <div class="content-des">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="content-sale" v-if="seller.supports">
          <IconEle class="sale-icon" :size="1" :type="seller.supports[0].type"/>>
          <span class="sale-text">{{seller.supports[0].content}}</span>
        </div>
      </div>
      <div class="header-btn" @click="maskFlag=true" v-if="seller.supports&&seller.supports.length">
        <span class="btn-text">{{seller.supports.length}}个</span>
        <i class="btn-fontIcon icon-keyboard_arrow_right"></i>
      </div>
      <div class="btn"></div>
    </div>
    <div class="header-bg">
        <img :src="seller.avatar" alt="img" />
    </div>
    <div class="bulletin">
      <div class="bulletin-left">
        <i class="bulletin-icon"></i>
        <span class="bulletin-text">{{seller.bulletin}}</span>
      </div>
      <i @click="maskFlag=true"  class="bulletin-fontIcon icon-keyboard_arrow_right"></i>
    </div>
    <transition name="mask">
      <div class="mask" v-show="maskFlag">
        <div class="mask-wrap">
          <div class="wrap-content">
            <span class="content-title">{{seller.name}}</span>
            <StartsEle :score="seller.score" size="48" class="content-stars"/>
            <LineEle class="line-supports"/>
            <ListsHeaderEle :supports="seller.supports" class="lists-header"/>
            <LineEle class="line-bulletin">
              <span class="text">商家公告</span>
            </LineEle>
            <span class="content-bulletin">{{seller.bulletin}}</span>
          </div>
        </div>
        <div class="mask-footer">
          <i @click="maskFlag=false" class="footer-icon icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
 
<script>
import LineEle from "components/LineEle"
import ListsHeaderEle from "./ListsHeaderEle"
import StartsEle from "components/StartsEle"
import IconEle from "../IconEle"
export default {
  name: "HeaderEle",
  props:{
    seller:Object
  },
  data() {
    return {
      maskFlag: false,
    };
  },
  components:{
    LineEle,
    ListsHeaderEle,
    StartsEle,
    IconEle
  }
};
</script>
 
<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
.header 
  position relative
  font-size 0  //防止图片和文字对其产生3px偏差
  padding-top 24px
  background rgba(7,17,27,.5)
  overflow hidden
  .header-top
    position relative
    padding-left 24px
    .avatar
      vertical-align top
      width 64px
      height 64px
      border-radius 4px
      margin-bottom 18px
      margin-right 16px
    .content
      vertical-align top
      display inline-block
      .content-title
        margin-top 2px
        margin-bottom 8px
        .title-icon
          bg-image(brand)
          background-size 100% 100%
          background-repeat no-repeat
          vertical-align middle
          margin-right 6px
          display inline-block
          width 30px
          height 18px
        .title-text
          vertical-align middle
          font-size 16px
          color rgba(255,255,255,1)
          font-weight bold
          line-height 18px
      .content-des
        font-size 12px
        color rgba(255,255,255,1)
        font-weight 200
        line-height 12px
      .content-sale
        margin-top 10px
        margin-bottom 2px
        .sale-icon
          display inline-block
          vertical-align middle
          margin-right 4px
        .sale-text
          vertical-align middle
          font-size 10px
          color rgba(255,255,255,1)
          font-weight 200
          line-height 12px
    .header-btn
      position absolute
      right 30px
      bottom 35px
      height 28px
      width 48px
      border-radius 13px
      background-color rgba(0,0,0,0.2)
      text-align center
      font-size 10px
      color rgba(255,255,255,1)
      font-weight 200
      line-height 28px
      cursor pointer
      .btn-text
        margin-right 2px
  .header-bg
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background gray
    z-index -1
    filter blur(10px)
    img   
      width 100%
      height 159%
  .bulletin
    position relative
    height 28px
    width 100%
    background-color rgba(7,17,27,0.2)
    line-height 28px
    .bulletin-left
      height 100%
      margin-left 12px
      margin-right 26px
      overflow hidden 
      white-space nowrap //内容太多出现省略号，当前尺寸必须固定
      text-overflow ellipsis  
      font-size 10px
      color rgba(255,255,255,1)
      .bulletin-icon
        bg-image(bulletin)
        background-size 100% 100%
        background-repeat no-repeat
        display inline-block
        width 22px
        height 12px
        margin-right 4px
        vertical-align middle
        margin-bottom 2px
      .bulletin-text
        vertical-align top
    .bulletin-fontIcon
      position absolute
      right 12px
      top 10px
      font-size 12px
      color rgba(255,255,255,1)
  .mask
    position fixed
    left 0 
    right 0 
    top 0 
    bottom 0 
    z-index 9
    background rgba(7,17,27,0.8)
    overflow auto
    font-size 16px
    font-weight 700
    line-height 16px
    color rgba(255,255,255,1)
    .mask-wrap
      min-height 100%  //高度随文字
      .wrap-content
        padding-bottom 96px //高度随文字
        padding-top 64px 
        text-align center  //没有效果
        .content-title
          text-align center
          display block //span行内元素，不能单独成一行
        .content-stars
          margin-top 16px
          margin-bottom 28px 
        .lists-header
          margin-top 24px
        .line-bulletin 
          margin-top 28px
        .content-bulletin
          box-sizing border-box
          display inline-block
          width 80%
          padding 24px 12px 0 12px
          font-size 12px
          text-align left
          font-weight 200
          color rgba(255,255,255,1)
          line-height 24px
    .mask-footer
      height 32px 
      margin-top -96px //高度随文字
      text-align center
      padding-top 32px   //让图标垂直水平居中
      padding-bottom 32px //让图标垂直水平居中
      .footer-icon
        cursor pointer //无效
        font-size 32px
        color rgba(255,255,255,0.5)
</style>

