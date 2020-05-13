const seller = require("./data.json").seller
const goods = require("./data.json").goods
const ratings = require("./data.json").ratings
module.exports = {
  devServer: {
    open: true,
    port: 3000
  },
  configureWebpack: {  //学webpack原生配置
    devServer: {
      //  mork数据方法1
      before(app) {  //webapck传入express的app对象
        app.get("/api/seller", (req, res) => {  //后台路由
          res.json({
            errno: 0,
            data: seller
          })
        }),
          app.get("/api/goods", (req, res) => {  //后台路由
            res.json({
              errno: 0,
              data: goods
            })
          }),
          app.get("/api/ratings", (req, res) => {  //后台路由
            res.json({
              errno: 0,
              data: ratings
            })
          })
      },
    }
  }
}