# 标识路由，给路由传递数据

  ```
  const router = new VueRouter({
    routes:[
      {
        path: "/foo",
        component: Foo,
        children: [
          {
            path: "bar",
            component: Bar,
            meta:{requireAuth: true}
          }
        ]
      }
    ]
  })
  ```

如何访问meta字段

通过实例对象中$route.matched数组