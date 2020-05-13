<template>
  <div>
    <div class="goods">
      <div class="menu-wrap" ref="menuWrap">
        <ul class="menu-lists" ref="menuLists">
          <li class="menu-item" @click="handldMenu(index)" :class="{active: currentIndex===index}" :key="index" v-for="(good,index) in goods">
            <IconEle class="menu-icon" :size="3" :type="good.type" v-show="good.type>=0" />
            <span class="menu-name">{{good.name}}</span>
          </li>
        </ul>
      </div>
      <div class="main-wrap" ref="mainWrap">
        <ul class="main-lists" ref="mainFoodLists">
          <li class="main-item" :key="goodIndex" v-for="(good,goodIndex) in goods">
            <div class="main-name">{{good.name}}</div>
            <ul class="food-lists"  >
              <li class="food-item" :key="foodIndex" v-for="(food,foodIndex) in good.foods" v-show="good.foods">
                <div class="food-left">
                  <img class="food-img" :src="food.image"/>
                </div>
                <div class="food-right">
                  <div class="food-name">{{food.name}}</div>
                  <div class="food-description" v-show="food.description">{{food.description}}</div>
                  <div class="food-others">
                    <span class="sellCount" v-show="food.sellCount">月售{{food.sellCount}}份</span>
                    <span class="rating" v-show="food.rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="prices">
                    <span class="now-price">¥{{food.price}}</span>
                    <span class="old-price" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                  </div>
                  <ControlEle 
                    :food="food" class="control"
                    @addCount="addCount"  
                    @removeCount="removeCount"
                    :goodIndex="goodIndex" 
                    :foodIndex="foodIndex" />
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <CartEle  
        class="goods-cart" 
        :selectedFoods="selectedFoods" 
        :deliveryPrice="seller.deliveryPrice"
        :minPrice="seller.minPrice"
        @clearAll="clearAll"
        @addCount="addCount" 
        @removeCount="removeCount"
      />
    </div>
  </div>
</template>
 
<script>
import BScroll from 'better-scroll'
import IconEle from "components/IconEle";
import ControlEle from "components/ControlEle";
import CartEle from "components/CartEle";
const OK = 0
export default {
  name: "GoodsEle",
  props:{
    seller:Object
  },
  components:{
    IconEle,
    ControlEle,
    CartEle
  },
  data() {
    return {
      goods: [],
      scrollY:0,
      tops:[]
    };
  },
  computed: {
    selectedFoods(){
      // 当前选择的食品:如果食品有count属性说明被选中了
      let selectedFoods = [];
      this.goods.forEach((good)=>{
        if(good.foods){
          good.foods.forEach((food)=>{
            if(food.count){
              selectedFoods.push(food)
            }
          })
        }
      })
      return selectedFoods
    },
    currentIndex(){
      // 依赖于右侧列表的滑动位置
      let {tops,scrollY} = this;
      let index = tops.findIndex((top,index)=>{
        return scrollY >= top && scrollY < tops[index+1] 
      });

      // 左侧列表到置顶
      //  作用：滚动到指定的目标元素。
      // scrollToElement(el, time, offsetX, offsetY, easing)
      if(index!=this.oldIndex){
        this.oldIndex = index;
        let liNode = this.$refs.menuLists.children[index];
        this.menuScroll.scrollToElement(liNode,300);
      }
      return index
    },

  },
  methods: {
    clearAll(){
      this.selectedFoods.forEach((food)=>{
        food.count=0;
      })
    },
    addCount(food){
      if(!food.count){
        this.$set(food,"count",1)   //给对象food添加count属性，并具有响应式
      }else{
        food.count++
      }
    },
    removeCount(food){
      if(food.count>0){
        food.count-- 
      }
    },
    _initScroll(){
      this.menuScroll = new BScroll(this.$refs.menuWrap,{
        click:true
      })
      this.mainScroll = new BScroll(this.$refs.mainWrap,{
        click:true,
        probeType:3//当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
      })
      //https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/events.html
      this.mainScroll.on("scroll",({x, y})=>{  //定义触发的事件得到{Object} {x, y} 滚动的实时坐标
          this.scrollY = Math.abs(y)
      })
    },
    // 拿到所有foodNodes的高度，组成一个数组
    _initFoodLiTops(){  
      let foodNodes = this.$refs.mainFoodLists.children;
      let top = 0;
      let tops = [top]; 
      Array.from(foodNodes).forEach((liNodes)=>{
        top += liNodes.offsetHeight;
        tops.push(top)
      })
      this.tops = tops
    },
    handldMenu(menuIndex){
      const foodTop = this.tops[menuIndex]
      // 作用：betterScroll事件:滚动到指定的位置
      this.mainScroll.scrollTo(0, -foodTop, 300)
    }
  },
  async mounted() {
    const data = await this.$http.getGoods();
    if(data.data.errno===OK){
      this.goods = data.data.body;
    };

    // 触发滑屏方法
    this._initScroll()
    // 用vue $nextTick()方法触发_initFoodLiTops方法（将回调延迟到下一次DOM更新循环之后执行 ）
    this.$nextTick(()=>{
    this._initFoodLiTops()
    })
  },
};
</script>
 
<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl";
.goods
  display flex
  position absolute
  left 0 
  right 0 
  top 172px
  bottom 48px
  overflow hidden
  .menu-wrap
    flex 0 0 80px
    .menu-lists
      .menu-item
        one-px(rgba(7,17,27,0.1))
        background-color #f5f3f7
        height 54px
        width 100%
        display flex
        align-items center
        padding-left 12px
        padding-right 12px
        box-sizing border-box
        &::after
          width 56px
        &.active
          background-color rgba(255,255,255,1)
          .menu-name
            font-size 12px
            line-height 14px
            font-weight 700
            // color rgba(240,20,20,0)
          
        .menu-icon
          display inline-block
          vertical-align middle
          margin-right 2px
        .menu-name
          font-size 12px
          // color rgba(240,20,20,1)
          font-weight 200
          line-height 14px
          vertical-align middle
  
  .main-wrap
    flex 1
    .main-lists
      .main-item
        .main-name
          font-size 12px
          color rgba(147,153,159,1)
          line-height 26px
          width 100%
          background-color #f3f5f7
          padding-left 14px
          box-sizing border-box
          border-left 4px solid #d9dde1
        .food-lists
          .food-item
            display flex
            padding 18px
            one-px(rgba(7,17,27,0.3))
            &:after
              width 88%
            .food-left
              flex 0 0 80px
              margin-right 10px
              .food-img
                width 92%
                height 89%
            .food-right
              flex 1
              .food-name
                font-size 14px
                line-height 14px
                color rgba(7,17,27,1)
                margin-top 2px
                margin-bottom 8px
                font-weight 500
              .food-description
                font-size 10px
                line-height 10px
                color rgba(147,153,159,1)
              .food-others
                font-size 14px
                line-height 14px
                color rgba(147,153,159,1)
                margin-top 8px
                margin-bottom 8px
                .sellCount
                  zoom 1
                .rating
                  zoom 1
              .prices
                .now-price
                  margin-right 8px
                  font-size 14px
                  font-weight 700
                  line-height 24px
                  color rgba(240,20,20,1)
                .old-price
                  font-size 10px
                  color rgba(147,153,159,1)
                  line-height 24px
                  font-weight 700
                  text-decoration line-through
              .control
                position absolute
                right 18px
                bottom 18px

  .goods-cart
    position fixed
    height 48px
    width 100%
    bottom 0

</style>