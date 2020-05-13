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