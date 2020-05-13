const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 选项...
  lintOnSave: false,
  devServer: {
    open: true,
    port: 8888,
    proxy: {
      // '/dev-api': {  // /4000开头的为止请求转发  //http://localhost:8080/4000/position/40.10038,116.36867
      [process.env.VUE_APP_BASE_API]: {   //使用环境变量文件
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true,   //开启代理
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''  //将/4000开头的重写为""
        }
      },
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'components': resolve('src/components'),
      }
    }
  }
}