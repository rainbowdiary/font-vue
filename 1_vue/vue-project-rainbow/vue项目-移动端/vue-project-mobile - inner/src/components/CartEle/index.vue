<template>
  <div class="cart">
    <div class="shop-cart">
      <div class="left" @click="flodFn">
          <div class="shop-wrap" :class="{highLight:totalPrice >0}">
              <div class="logo">
                  <i class="shopping_cart icon-shopping_cart"></i>
              </div>
              <span class="qipao" v-show="totalCount >0">{{totalCount}}</span>
          </div>
          <div class="totalPrice">
              <span :class="{highLight:totalPrice >0}">￥{{totalPrice}}</span>
          </div>
          <div class="deliveryPrice">
              <span>另需配送费¥{{deliveryPrice}}</span>
          </div>
      </div>
      <div class="right" :class="{highlight:this.totalPrice >= this.minPrice}">
          <span>{{payText}}</span>
      </div>
      <div class="balls">
        <div class="ball-wrap" :key="index" v-for="(ball,index) in balls">
          <transition 
            name="drop"
            @before-enter="beforeDrop"
            @enter="dropping"
            @after-enter="afterDrop"
          >
            <i class="ball" v-show="ball.show"></i>
          </transition>
        </div>
      </div>
    </div>
    <transition name="showCartLists">
      <div class="cart-lists" v-show="showCartLists">
        <div class="header">
          <span class="header-left">购物车</span>
          <span @click="clearAll" class="header-right">清空</span>
        </div>
        <div class="content" ref="cartListsContent">
          <ul class="content-lists">
            <li class="food" :key="index" v-for="(food,index) in selectedFoods">
              <div class="food-left">
                {{food.name}}
              </div>
              <div class="food-right">
                <span class="price-icon">¥</span>
                <span class="food-price">{{food.price*food.count}}</span>
                <ControlEle 
                  :food="food"
                  class="control"
                  @addCount="addCount"
                  @removeCount="removeCount"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="mask" v-show="showCartLists" @click="flod=true"></div>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import PubSubConfig from "@/config/pubsubConfig.js";
import {transform} from "@/util"
import ControlEle from "../ControlEle";
import BScroll from "better-scroll"
    export default {
        name: "CartEle",
        props:{
            selectedFoods:Array,
            deliveryPrice:Number,
            minPrice:Number
        },
        components:{
          ControlEle
        },
        data(){
            return {
              balls:[
                {show:false},
                {show:false},
                {show:false},
                {show:false},
                {show:false}
              ],
              dropBalls:[],
              flod:true  //list清单折叠
              }
        },
        computed:{
          showCartLists(){
            if(this.totalCount<=0){
              this.flod = true
              return false
            }

            // 滑屏逻辑
            if(this.$refs.cartListsContent && !this.scroll){
              this.scroll = new BScroll(this.$refs.cartListsContent,{click:true});
            }else{
              // 作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
              this.scroll.refresh()
            }
            


            return !this.flod
          },
          totalPrice(){
            let price = 0
            this.selectedFoods.forEach((food)=>{
              food.count && (price+=(food.price*food.count))
            })
            return price;
          },
          totalCount(){
            let count = 0;
            this.selectedFoods.forEach((food)=>{
              food.count && (count+=(food.count))
            })
            return count
          },
          payText(){
            if(this.totalCount===0){
              return `¥${this.minPrice}起送`
            }else if(this.totalPrice<this.minPrice){
              return `还差¥${this.minPrice - this.totalPrice}起送`
            }else{
              return `去结算`
            }
          }
        },
        methods:{
          addCount(food){
            console.log(food);
            this.$emit("addCount",food)
          },
          removeCount(food){
            console.log(222);
            this.$emit("removeCount",food)
          },
          clearAll(){
            this.$emit("clearAll")
          },
          flodFn(){
            if(this.totalCount<=0){
              return ;
            }
            this.flod=!this.flod
            },
          drop(target){
              for(let i=0;i<this.balls.length;i++){
                  let ball = this.balls[i]
                  if(!ball.show){
                      ball.show = true;
                      ball.target = target;
                      this.dropBalls.push(ball)
                      return;
                  }
              }
          },
          beforeDrop(el){
              //计算小球一开始的位置
              let count = this.balls.length;
              while (count--){
                  let ball = this.balls[count]
                  if(ball.show){
                      let viewH= document.documentElement.clientHeight;
                      let targetRect = ball.target.getBoundingClientRect()
                      var translateX = targetRect.left - 32;
                      var translateY = viewH - targetRect.top - 22;
                      //1. transition 在元素初次渲染还没有成功的情况下是不会触发的
                      //2. 当transfrom的变换函数位置 顺序变换不一致时 transition也不会触发
                      //3. 我们是没有办法在transition过渡的过程中 拿到每一帧的状态
                      transform(el,"translateX",translateX + 3)
                      transform(el,"translateY",-translateY + 20)
                  }
              }
          },
          dropping(el){
              //让浏览器清空整个渲染队列
              let hook = el.offsetHeight;
              this.$nextTick(()=>{
                  transform(el,"translateX",0)
                  transform(el,"translateY",0)
              })
          },
          afterDrop(el) {
              const ball = this.dropBalls.shift();
              if(ball.show){
                  ball.show = false;
                  el.style.display="none"
              }
          }
        },
        mounted(){
          PubSub.subscribe(PubSubConfig.ballAnimation,(msg,target)=>{
            this.drop(target)
          });
        },
    }
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
.cart
  position relative
  .shop-cart
      display flex
      position fixed
      z-index 4
      bottom 0
      left 0
      width 100%
      height 48px
      background #141d27
      .left
          display flex
          flex 1
          .shop-wrap
              display flex
              align-items center
              justify-content center
              position relative
              top -10px
              width 56px
              height 56px
              margin-left 12px
              margin-right 12px
              border-radius 50%
              background #141d27
              &.highLight
                  .logo
                      background rgba(0,160,220,1)
                      .shopping_cart
                          color rgba(255,255,255,1)
              .logo
                  display flex
                  align-items center
                  justify-content center
                  width 44px
                  height 44px
                  border-radius 50%
                  background rgba(255,255,255,.4)
                  .shopping_cart
                      font-size 24px
                      line-height 24px
                      color rgba(255,255,255,.6)
              .qipao
                  position absolute
                  right 0
                  top 0
                  width 24px
                  height 16px
                  background rgba(240,20,20,1)
                  color white
                  text-align center
                  border-radius 6px
                  box-shadow 0px 4px 8px 0px rgba(0,0,0,.4)
                  font-size 9px
                  line-height 16px
          .totalPrice
              display flex
              align-items center
              justify-content center
              span
                  display inline-block
                  border-right 1px solid rgba(255,255,255,.5)
                  padding-right 12px
                  font-size 16px
                  line-height 24px
                  color rgba(255,255,255,.4)
                  font-weight 700
                  &.highLight
                      color rgba(255,255,255,1)
          .deliveryPrice
              display flex
              align-items center
              justify-content center
              padding-left 12px
              span
                  font-size 16px
                  line-height 24px
                  color rgba(255,255,255,.4)
                  font-weight 200

      .right
          flex 0 0 105px
          background rgba(255,255,255,.4)
          display flex
          align-items center
          justify-content center
          &.highlight
              background green
              span
                  font-weight 800
                  color rgba(255,255,255,1)
          span
              color rgba(255,255,255,.6)
      .balls
        .ball-wrap
          .ball
            position absolute
            left: 32px;
            top: 10px;
            width 16px
            height 16px
            background deeppink
            border-radius 50%
            transition .3s transform linear
  .cart-lists
    position absolute
    z-index 3
    left 0 
    right 0
    // max-height 218px
    bottom 48px
    box-sizing border-box
    background-color #fff
    .header
      padding 0 18px
      display flex
      justify-content space-between
      align-items center
      height 40px
      background-color #f3f5f7
      .header-left
        font-size 14px
        font-weight 200
        color rgba(7,17,27,1)
      .header-right
        font-size 12px
        color rgba(0,160,220,1)
    .content
      overflow hidden
      max-height 218px
      .content-lists
        padding 0 18px
        .food 
          display flex
          justify-content space-between
          align-items center
          height 48px
          one-px(rgba(7,17,27,.1))
          .food-left
            font-size 14px
            color rgba(7,17,27,1)
            line-height 24xp
          .food-right
            color rgba(240,20,20,1)
            .price-icon
              font-size 12px
              margin-right 1.5px
              font-weight 700
            .food-price
              font-size 14px
              color rgba(240,20,20,1)
              line-height 24px
              margin-right  12px
              font-weight 700
            .control
                font-size 24px
  .mask
    position fixed
    z-index 2
    left 0 
    top 0
    width 100%
    height 100%
    background-color rgba(7,17,27,0.6)
    backdrop-filter blur(10px)

</style>