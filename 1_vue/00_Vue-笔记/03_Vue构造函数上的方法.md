### Vue静态方法
Vue.$set()
Vue.component
Vue.filter    //过滤器，文本格式化：时间格式化,实际上还是调用函数处理数据
Vue.directive
Vue.config.productionTip=false;  //去掉Vue控制台的提示
### Vue构造函数上的事件
Vue.$on("事件名",()=>{})   绑定事件和回调函数
Vue.$emit("事件名",params)  触发事件和回调函数
### 总结：
  1. 方法不要定义在data总
  2. 指令中的数据最好不要来源于方法 
  3. 永远不要把 v-if 和 v-for 同时用在同一个元素上。
    避免渲染隐藏项，性能低
  4. 属性名私有化
  避免冲突，尽量以$_开头
      `var myGreatMixin = {
      // ...
      methods: {
        $_myGreatMixin_update: function () {
          // ...
        }
      }
    }`