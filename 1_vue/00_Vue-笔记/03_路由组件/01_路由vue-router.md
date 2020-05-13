# vue路由
库: vue-router 
路由使用方法:
  1. 声明式 
     1. <router-link :to="/home">
     2. <router-link :to="{name:'index',query:{id:'xxx',name:'xxx'}}">
  2. 编程式 router.push('/home')
     * 资料: https://router.vuejs.org/zh/guide/essentials/navigation.html
     1. this.$router.push({path:"路径"})
     2. this.$router.push({name: "组件"})
     3. this.$router.push({path:'xxx',query:{aa:xx, bb: xx}});   //带查询参数，类似于 “？” 的形式传值
     4. this.$router.push({path:'xxx',params:{aa:xx, bb: xx}}); 

     组件内部绑定事件跳转
      <span @click="$router.push('/search')">搜索</span>

     跳转并传值：this.$router.push({path:'index',query:{id:'123'});  // 带查询参数，变成/index?id=123
     取值：this.$route.query.id ;

router-view
router-link 
  默认渲染a标签，如果希望渲染其他标签，使用tag="li"
  通过 to属性指定跳转链接，不用带上 #  号

## 路由样式
单个router-link样式:
  active-class
动态全局样式:
  linkActiveClass
## 官网API:
  https://router.vuejs.org/zh/api/#router-link

props
  传递路由相关属性和数据
props的数据类型
- 布尔值
- 对象
- 函数 
  props(route){
    return {id:route.params.id}
  }

router的方法:
  this.$router

# axios:
基本的请求语法：
  axios({config})
axios实例
  axios.create({config})
  config配置对象
    1. 全局配置
    2. 实例配置
    3. 发送请求配置
axios拦截器

简单的if-else都可以换成三元表达式
三元表达式可以使用()包着单个表达式

FormData:MDN


## 路由
路由懒加载
库: axios库
方法：
1. 实例
2. 拦截器

同时发送并发请求:
传统方法：
  promise.all([promise1,promise2...])
  返回是一个数组
axios.all()
.then()

<div v-if="isOpen">内容1 <i @click="Open">按钮</i></div>
<div v-if="isOpen">内容2 <i @click="Open">按钮</i></div>
export default = {
   methods: {
    open() {
      console.log("111");
      this.isOpen = !this.isOpen;
    }
  }
}