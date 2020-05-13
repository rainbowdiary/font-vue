## Vue特性：
MVVM 数据双向绑定
1. 声明式编程，渲染（数据单向流）：
	只需要声明，不需要我们操作DOM，VUE自己操作DOM；
	数据的单向流
2. 响应式数据(数据单向流)：data(初始化拿一次)
	- data里面的数据都是响应式的
	- 将data转邦给Vue实例里，可以直接通过Vue实例改data数据中的内容
	- 改Vue实例的东西，页面会引发页面的重新绘制
	- 以后项目中所有数据一定要放到data中，不放在data中将失去响应式
	- Vue数据不是局部更新，等数据渲染完成后才能改data的数据
3. 数据双向流
	input框 
	v-model
4. 数据驱动编程思想
	设计数据结构
### vue版本
vue.js: 开发环境
vue.js和vue.runtime.js
  runtime: 没有编译器的内容给你
    不能使用template,el等，只能用render(createVnode){}
  编译器：将模板代码编译成js代码

5. 渐进式js框架
6. 编码简介，体积小，运行效率高



MVP: 服务端渲染