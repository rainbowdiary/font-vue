## Vue源码
参考资料:
  https://www.jianshu.com/p/d33c16075c88
## Vue源码三个版本
1.0 ES5 
2.0 ES6 
3.0 TS 
### 文档碎片documentframent
template是原生html标签
  里面的内容不会被渲染
  类似一个小型document
用法：
  作为参数
  插入的不是文档碎片，而不是文档碎片的子节点
使用:
  真实DOM剪切到文档碎片，再把文档碎片的东西插入父元素中
  重绘重排只会发生两次

### 数据代理data，数据劫持v-model，模板解析
- **数据代理**
  data中的属性一个个拿出来，给vm属性重新定义
  数据：存属性，存变量
- **数据劫持**
  data中的数据，自己重新定义访问描述符
    数据劫持:
      将data中的属性从一个数据描述符 转为一个 访问描述符*/
    数据劫持的顺序:
      damuname damuage sonname sonage wifename wifeage  sonwife damuson damu a b
    dep分配的顺序
      damu damuname damuage damuson sonname sonage sonwife wifename wifeage a b*/
     每一个data中属性都会对应上一个dep闭包!!!!
- 模板解析
  - $1匹配正则第一个分组(.*)
**Observe（监听器）**是递归
  把对象平铺
**Object.defineProper**
数据劫持的顺序:

双向绑定:
Dep: 消息订阅器
Watcher: 订阅者

构建dep和watch:多对多的关系
  每一个指令都要调用bind，都new一个watcher
  一个dep是一个属性，可以对应多个watcher

dep.target = this =>watcher 一对多的关系
watcher中有depIds放着dep的id
dep有subs属性放着watcher
dep.addSub(this=>watcher) dep和watcher 一对多的关系
多对多:
  value=this

dep-watcher-Updater
三者之间的关系构建了响应式；