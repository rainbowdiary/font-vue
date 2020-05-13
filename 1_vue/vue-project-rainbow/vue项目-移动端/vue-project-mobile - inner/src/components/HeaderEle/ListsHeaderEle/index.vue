<template>
  <ul class="content-lists">
    <li class="content-item" :key="index" v-for="(item,index) in supports">
      <IconEle class="item-icon" :type="item.type" :size="2"/>
      <span class="item-text">{{item.content}}</span>
    </li>
  </ul>
</template>
 
<script>
import IconEle from "../../IconEle"
export default {
 name: 'ListsHeaderEle',
 props:{
   supports:Array
 },
 components:{
   IconEle
 }
}
</script>
 
<style lang="stylus" scoped>
@import "../../../common/stylus/mixin.styl"
.content-lists
  box-sizing border-box
  text-align left
  width 80%
  margin-top 24px
  margin-bottom 28px
  margin 0 auto //水平居中
  padding 0 12px
  .content-item
    margin-bottom 12px
    line-height 12px
    font-size 12px
    color rgba(255,255,255,1)
    &:last-child
      margin-bottom 0px
    .item-icon
      display inline-block
      margin-right 6px
      vertical-align middle
    .item-text
      color white
      vertical-align middle
</style>