**项目架构须知**
	怎么发请求
	怎么存数据
	路由设计
	

# wrap
- 静态文件
- 编程式路由 a标签内有内容
- 请求数据
- 跨域 
  - http://localhost:4000/position/40.10038,116.36867
    - 出现跨域
      - 方法
        - 1. vue.config.js配置代理
          ```
          proxy: {
            '/4000': {  // /4000开头的为止请求转发  //http://localhost:8080/4000/position/40.10038,116.36867
              target: 'http://localhost:4000',
              changeOrigin: true,
              pathRewrite: {
                '^/4000': ''  //将/4000开头的重写为""
              }
            },
          }
          ```
        - 2.axios配置
          - interface.js 接口请求以/4000开头进行分类
            ```
            getGeohash: {
              url: "/4000/position",
              method: "get",
            }
            ```
          - interceptors.js 请求拦截特殊api请求
          ```
          let CorsUrl = "/4000"
          if(config.url==="/4000/position"){
            config.url = `${config.url}/${config.params.latitude},${config.params.longitude}`
            config.params={}
            CorsUrl=""
          }
          ```
- vuex
-   展示数据

## 菜单
轮播 swiper 
  引入样式和js
  定义位置: （在mounted中调用：菜单修改会，渲染还没成功就被调用，导致失效）
    1. 计算属性中 + $nextTick
    2. watch监听菜单改变
    3. 在store数据请求后 + cb + $nextTick
    4. promise + 函数调用 (最佳)
       - 方法 定义swiperRender方法
          ```
          async created(){
            this.getAdress() 
            await this.getCategories()    
            this.swiperRender()    
          },
          ```
       - 原理: 每一个action执行后，返回一个promise，vue数据更新完成之后，渲染成功后次确认状态
  this.$nextTick : 下次dom修改的时候才被调用
将请求的大数组，分为小数组，每组8个，lodashjs
插件
  lodashjs
    封装ES超级
    _开头
  Jquery
    封装DOM超级
    $开头
## 登录
- 静态页面
  1. 登录方式的切换
  2. 获取验证码点亮
     1. 输入的是一个正确的电话号码才点亮
  3. 倒计时
     1. 验证码倒计时之后还能点击:
        1. :disabled="!isRightPhoneNum || times>0"  
        2. 不是一个正确的电话号码或者当times>0的时候说明验证码已发送不能点击
     2. 第二遍越点越快
        1. 因为没有清除定时器
  4. 密码的显示隐藏

- 表单验证
  - 表单验证: vee-validate（Vue插件）
  - 文档: https://logaretm.github.io/vee-validate/guide/basics.html#registering-the-validation-provider


  1. 两种登录方式LoginWay
     1. sms
     2. pwd
  2. 登录的时候验证表单
     1. vee-validate提供promise的方式检验校验后的数据
     2. const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证

## 登录需求
1. 一次性图片验证码
  - 不发ajax请求
  - 发http请求，src中
  - 点击的时候重新请求 ref
    - 1. 如果没效，禁用缓存
    - 2. 加时间戳避免缓存
2. 一次性短信验证码
   1. 不需要存储（敏感）
   2. 点击发送请求
      1. 倒计时要停，times设为0
      2. vant提示发送验证码成功/失败
3. 两种登录方式
 - sms
 - pwd
	1. 登录成功之后要将用户信息保存
    - 将请求的用户数据放在vuex中
	2. 登录成功之后要跳转到个人中心
    - router可以直接被import引入,然后使用router相关属性
    - 登录成功跳转主页"/msite"
    - Profile页显示对应的登录后信息
      - 用户名密码登录显示用户名信息
      - 短信验证码登录显示手机号登录信息
	3. 登录失败之后提示失败
		- 登录失败之后要更新验证码
		- 清空用户输入信息resetData()方法
4. 跳转个人中新页
   1. 点击.profile-link如果有用户信息user._id跳转个人中心"/userDetail",
      没有跳转"/login"登录页
   1. 定义userDetail路由和组件
5. 退出登录
   1. 点击userDetail页推出登录按钮
   2. 定义resetUser的action进行推出登录逻辑
6. 携带token登录
	- 登录成功后将token存入到localStorage中
	- 登录成功后将token交给vuex来管理
	- 退出时 将user 和 token清除 并将localStorage清除token清除
	- 处理一些请求时需要携带token的接口(msite,shoplist)
  	- Msite和ShopList需要token才能显示
    	- 发送请求配置化，加上needToken字段，通过headers传递字段给请求拦截器
    	- 请求拦截器给需要token的带上token
		- 没有token 请求进入失败流程 跳转回登录页
  		- 响应拦截器判断失败请求
    		- 请求失败
  		- tonken过期测试
    		- 修改后端接口测试 const token = jwt.sign({ id }, 'secret', { expiresIn: '6 s' })
		- 拥有token token没有失效 则携带上token(Authorization)
		- 拥有token 可是token已经失效 跳转回登录页
7. 自动登录
  - 自动登录接口
  - app中判断如果有token发送自动登录请求并直接跳转主页

8. 测试
   1. 没有token 也显示token过期重新登录
   2. 原因后台代码问题:
      1. http传输的都是字符串，等于字符串null

## shopLists滑屏
确保外层结构正确
解决:
1）app上面空了一段
	原因：margin穿透
	解决bfc
2）section/div/.on/.msite
	width: 100%
	height: 100%
	overflow: hidden
3）滑屏的wrap尺寸定死
app/msite:高宽屏幕100%
msite:相对定位
msite_shop_list：尺寸定死，绝对定位
	混合写了定位，顶头写
.msite_shop_list:尺寸定时
	position:absolute
	left:0
	right:0 
	top:30px
	bottom:0
.shop_container
  绝对定位

数据渲染完，再做滑屏特效
	
总结：外层尺寸定死，里层靠内容撑开

## 请求拦截
  utils
  拦截器
  组件
# 项目中遇到问题
本地测没问题，公测没问题，用户那边有问题
  排查后：渲染的时机不对，
  解决：action调用返回一个promise,页面渲染完成后状态才会成功，在那之后在做UI效果
  总结：需要页面数据渲染完成后在做UI效果

# 问题
1. 点击获取验证码的时候，为什么isdisabled不是一直为false
  而是需要判断 :disabled="!isRightPhoneNum || times>0"  

2. 点击获取验证码第二遍越点越快
   1. clearInterval(this.timer)
   2. console.log(this.times,"clearInterval");  //还是被调用很多次，怀疑定时器没有清除成功
   3. 可能是缓存问题，代码没有问题
3. 如果包没有问题，但是无法启动项目
   1. 使用npm清除缓存