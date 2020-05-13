## vm实例（Vue实例对象）配置选项：
	{
	el: "",
	data:{},
	methods: function,
	computed,
  watch,
  render
  filter,        //过滤器
  directives:{}  //自定义指令 
	}
### computed计算属性
场景：
	一个标签数据依赖其他标签数据：放在computed中
使用
  {{fName}}，
  v-model="fName()" 是调用函数，拿到返回值
    页面发生变化，定义的函数就会被调用
    性能低
  交给vue管理的数据
定义：
  computed:{
    fName{
      get(){},
      set(val){}
    }
  }
应用场景1：
  复选框checked 
  结合v-model="fName"
场景2：
  在标签内部定义变量，且变量是函数返回值
### watch
作用：
  如果监听的是数组，并且数组中有对象 [{},{}...]
  修改数组中的对象不会被监听
  解决: deep:true

// 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
c: {
  handler: function (val, oldVal) { /* ... */ },
  deep: true
},


# 全局API

vm.$nexTick(()=>{})