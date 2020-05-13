## 代码仓库：https://github.com/rainbowdiary/vue-project-ele
## 项目环境:
  vue脚手架4.1.1版本:
    npm install -g @vue/cli 
    启动脚手架: yarn serve
## 字体图表制作?
1. AI：做svg矢量图,只能做色彩单一的
2. fontLab：做字体，让字体和矢量图关联，导出字体即可生成ttf字体
3. fontsquirredl.com：生成字体兼容的包
  生成样式表，包含自定义字体，html可直接使用

### svg矢量图如何生成字体图表?
  1. 矢量图查找: iconfont.cn,下载svg矢量图
  2. svg矢量图生成字体图表:icomoon.io
    icommon App -> 上传矢量图 -> 选中所有适量图 -> fonts和style.css -> html使用icon-开始即可使用字体图标
  3. 用法: 查看下载下来的demo
   
## mork数据（模拟后端api请求的数据，后端提供）
src/data.json
1. vue.config.js配置devServer路由
  - webpack的开发服务器
  - before(app)=>{app.get(url,(req,res)=>{res.json({数据})})}
2. mockjs拦截ajax请求
  - yarn add mock.js 
  - const Mock = require("mock.js)
  - Mock.mock(url,template)
  - template写死的数据；但是可以使用mock生成随机数
  - 在main.js引入mockjs
  - 发ajax请求测试数据
  ```
    (async () => {
    const data = await axios({
      method: 'get',
      url: '/api/seller',
    })
      // console.log(data);
    })()
  ```
## 拆组件，配置路由
共5个组件，3个路由组件
src
  componens:静态组件
    HeaderEle
  pages:路由组件
    GoodsEle
    SellerEle
    RatingsEle

## 写样式
### 预处理器stylus
   - npm install stylus stylus-loader
   - 脚手架已经集成loader只需下载
   - 配置:
    ``` <style lang="stylus" scoped></style>

#### 样式
1. 导航栏
a:display:block 让a标签与父元素div大小一致
所有设计图应该参考iphone6设计，所有尺寸都是iPhone6          750*1336物理像素  
  图片上都是物理像素
  /2是css像素
一个位图像素:一个物理像素=1：才不会失真

2. 头部
src/common工具类
混合:
  1物理像素/媒体查询
  背景图片实现2x 3x图转换

- 品牌图片:使
  - 用mixins，定义2x3x图

- i与span对其:
  - vertical-align:middile
  - 写样式：关于他的数据全部写下来

- btn距离是可控的
    流体布局，中间内容尺寸固定，间隔可控

- 元素模糊（背景图片）:
    filter blur(10px)
    印出来的干掉：overflow:hidden
    height:高一点就是

- 文字省略
    - 尺寸必须固定
    - overflow:hidden
    - text-overflow:es
    - white-space: nowrap

- 大小与父元素一样
  - position
  - left:0
  - right:0
  - top:0
  - bottom:0

##### 遮罩层:
  背景模糊
  footer:粘连布局,按钮随文字移动到下面
  content:min-height:100%
  footer:margn-top: -高度
  content和footer有冲突
    content再包一层div
- 让line拆分为组件
  - 组件样式应该干净，并是inline-block
  - 有三种尺寸
- 星星
  - 定义为组件

- 手写的布局:
  - footer布局(遮罩层布局，footer随内容长度变化)
      ```
        <div class="mask">
        <div class="wrap">     //min-height:100%
            <div class="content">  //padding-bottom: footer高度
            </div>
        </div>
        <div class="footer">        //margin-top:-自身高度
            <i class="close icon-close"></i>
        </div>
        </div>
      ```
  - 双飞翼布局
  - 圣杯布局
  - 等高
  - 两列，三列布局

- content-line拆成组件
  - 拆成组件建议暴露成行内块元素
  - 引用组件的时候自己改布局
  
- 解决文字和图片都垂直对其问题
  - vertical-align middle
- 星星拆成组件
  - 星星的大小由父组件传递过来
#### 动态数据
- transition相关的定义为组件
  - 包裹<transition name="mask">...</transition>
  - 写common/stylus/transitions.styl 写mask为开头命名的transition特定样式
  - main.js全局引入

- seller.supports
  - 需要加上v-if，如果数据没请求回来会报错
  
### GoodsELe静态页面
- 内容高度自适应布局
  - 不同设备上高度自动适应
  ```
  .content
    display flex
    position absolute  
    left 0
    right 0
    top 174px
    bottom 48px
    .content-child
        flex 0 0 80px  //宽度初始大小
  ```
- 两栏布局
  - flex 参数为3个值
    - flex-grow, flex-shrink 与 flex-basis（元素在主轴方向的初始大小）。
- 滑屏
  - better-scroll
  - 1. 使用方法
    - 文档: https://better-scroll.github.io/docs/en-US/guide/#getting-started
    - yarn add --dev better-scroll
    - import BScroll from 'better-scroll'
      - 第一个参数为包裹的dom元素;ref拿dom
      - 第二个参数为配置对象，点击的时候可以触发绑定的事件（默认不触发）
        ```
          methods: {
            _initScroll(){
              this.menuScroll = new BScroll(this.$refs.menuWrap,{
                click:true  
              })
              this.mainScroll = new BScroll(this.$refs.mainWrap,{
                click:true
              })
            }
          },
        ```
      - mounted中调用滑屏方法
- 2. 左右滑屏联动
  - 功能1:滚动位置与选中menu联动
      1. 得到this.ScrollY： this.mainScroll.on    ("scroll",()={y}) 滑动的实时坐标
      2. 得到this.tops数组： 存放每个foodLiNode的高度:
        1. mounted中定义_initFoodLiTops函数拿到所有foodLiNode的高度并组成一个数组tops
        2. 使用vue $nextTick()方法触发_initFoodLiTops方法（将回调延迟到下一次DOM更新循环之后执行 ）
      3. 使用ScrollY和tops数组,计算当前滑动的currentIndex
         1. 实现当前滚动位置与选中menu联动
         2. 滑动mainfood区域左侧menu列表到置顶
            1. 使用better-scroll方法scrollToElement(el, time, offsetX, offsetY, easing)
            2. 作用：滚动到指定的目标元素。
  - 功能2: 点击menu-item联动mainfood区域
    1. 定义handldMenu计算属性
    2. 使用better-scroll的scrollTo方法（用：betterScroll事件:滚动到指定的位置）
    3. click默认不触发，需要添加better-scroll配置配置选项
**图标设计成组件**
  - IconEle
  - 图片大小
  - 4种类型的图片
  - 传递type和size 
**ControlELe组件封装**
  - 添加商品个数的图标和图标功能
**GoodsELe购物车组件封装**
- 数据传递
  - 父组件添加food.count属性
  - 传递food,goodIndex,foodIndex
    - emit


购物车是否显示:
  有数据购物车才显示:
    showLists计算属性
      titalCount
    flod计算行为

1. 背景模糊
    backdrop-filter blur(10px)
    折叠fold数据
2. 清空
    slectedFoods的所有count设置为0
    父组件GoodsEle
      @clearAll="clearAll" 
    子组件CartEle
      this.emit("clearAll")
3. 购物车加减
  control组件中的数据
    1. control子组件传递food出去，触发
       1. this.$emit("addCount",food)
       2. this.$emit("removeCOunt",food)
    2. Goods父组件传递自定义事件@addCount@removeCOunt
       1. 修改food实现加减food.count逻辑
    3. Cart父组件逻辑
       1. Goods父组件传递自定义事件@addCount@removeCOunt给Cart
       2. Cart子组件emit触发Goods父组件addCount和removeCOunt事件
       3. Cart子组件再传递传递自定义事件@addCount@removeCOunt给自己的子组件control
4. 小球动画
  1). 快速点击加号有问题
    1. 因为点的太快减号出来，覆盖了加号
    2. 点击加号的时候只能执行加号的逻辑，不能执行减号
    3. 解决: 加号层级问题
    ```
    .add 
        position relative
        z-index 1
    ```
  2). 减号文字是横着回去的
    1. 因为transition enter动画执行完成之后，这个class类会消失，
    2. leave又不会被渲染/添加 
    3. 所以到leave动画执行的时候:导致浏览器没有transform到transform的过渡,导致leave时的过渡失效
    解决:
      添加cartControlRemove-leave的样式为元素css初始样式
      ```
      .remove
        opacity 1
        transform translate3d(0,0,0) rotate(-720deg)
      ```

# 项目中遇到的问题:
  transition渲染问题
  position:fixed问题
    动画优先级问题:导致transition无法生效
    导致样式被覆盖
- 给foods对象添加属性，只能使用emit，不然会失去响应式
- z-index无效
  - 浏览器渲染模型
    - layers图层
    - 原因:position:fixed问题导致错误层级
- 本地测没问题，公测没问题，用户那边有问题
  排查后：渲染的时机不对，
  解决：action调用返回一个promise,页面渲染完成后状态才会成功，在那之后在做UI效果
  总结：需要页面数据渲染完成后在做UI效果
# 问题
1. header-btn right 30px才可以达到效果
2. content-stars 
   1. 父元素text-align:center stars:inline-flex
      无法水平居中
      - 上下的结构html应该写div而不是span行内元素
      - 总结移动端尽量不用fixed定位
3. footer-icon/header-btn
   1. cursor pointer无效
   2. 因为是移动端 

4. IconEle已经设置样式 display inline-block；引用的还是需要写inline-block
  - 不然会单独成行
  - .menu-icon: display inline-block

5. 购物车滚轮没有出现
  content高度设置问题；设置max-height

6.  混合中的样式必须加上 !important
    1.  不然会被其他样式覆盖导致过渡不生效 

7. 购物车加减一点回调会调用很多次
   1. 原因:数据没有渲染完成，导致new BScroll UI效果被调用多次
   2. 解决使用refresh()方法
   3. 总结：等页面和数据渲染完成之后在做滑屏等UI效果
  ```
  // 滑屏逻辑放在计算属性的showCartLists
    if(this.$refs.cartListsContent && !this.scroll){
      this.scroll = new BScroll(this.$refs.cartListsContent,{click:true});
    }else{
      // 作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      this.scroll.refresh()
    }
  ```
8. 小球过渡结束动画没生效