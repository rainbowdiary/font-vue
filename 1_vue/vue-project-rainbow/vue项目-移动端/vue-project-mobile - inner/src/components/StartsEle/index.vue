<template>
  <div class="stars" :class="`stars-${size}`">   <!--根据传过来的数据指定不同大小的星星-->
  <div class="star" :class="star" :key="index" v-for="(star,index) in starArr"></div>
 </div>
</template>
 
<script>
const length = 5;
const ON = "on";
const OFF = "off";
const HALF = "half";
export default {
 name: 'StartsEle',
 props:{
   size: String,
   score: Number
 },
 computed: {
   starArr(){
     let arr = [];
     // 0.3 0.6  0.9  1.2  2.6  3.7  4.1
     const score = Math.floor((this.score*2))/2;
     const needHalf = score%1===0 ? false : true
     for(let i = 0; i < Math.floor(score) ;i++){
       arr.push(ON)
     }
     if(needHalf){
       arr.push(HALF)
     }
     while(arr.length<length){
       arr.push(OFF)
     }
     return arr
   }
 },
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
.stars
  display inline-flex
  justify-content center
  .star
    background-size 100% 100%
    background-repeat no-repeat
  &.stars-48
    .star 
      width 20px
      height 20px
      margin-right 20px
      &:last-child
        margin-right 0px
      &.on
        bg-image(star48_on)
      &.half
        bg-image(star48_half)
      &.off
        bg-image(star48_off)
  &.stars-36
    .star 
      width 15px
      height 15px
      margin-right 15px
      &:last-child
        margin-right 0px
      &.on
        bg-image(star36_on)
      &.half
        bg-image(star36_half)
      &.off
        bg-image(star36_off)
  &.stars-24
    .star 
      width 10px
      height 10px
      margin-right 10px
      &:last-child
        margin-right 0px
      &.on
        bg-image(star24_on)
      &.half
        bg-image(star24_half)
      &.off
        bg-image(star24_off)

</style>