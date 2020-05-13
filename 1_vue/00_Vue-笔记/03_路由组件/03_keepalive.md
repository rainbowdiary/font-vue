结合路由组件
页面初始化的时候，每次页面更新不需要重新渲染，控制他重新渲染的
给哪些不需要实时更新的组件加上<keep-alive include="组件名称">组件

```
<keep-alive include="组件名称">
  <router-view>
  </router-view>
</keep-alive>
```