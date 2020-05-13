<template>
  <div class="content-line">
    <div class="line"></div>
    <slot>
      <span class="text">优惠信息</span>
    </slot>
    <div class="line"></div>
  </div>
</template>
 
<script>
export default {
  name: "lineEle",
  data() {
    return {};
  }
};
</script>
 
<style lang="stylus" scoped>
.content-line
  width 80%
  height 30px
  display inline-flex  //拆成组件建议暴露成行内块元素
  align-items center
  // margin 0 auto  //水平居中
  .line 
    height 1px
    flex 1 //让两条线随尺寸自动拉伸
    background-color rgba(255,255,255,0.2)
  .text
    margin 0 12px
</style>