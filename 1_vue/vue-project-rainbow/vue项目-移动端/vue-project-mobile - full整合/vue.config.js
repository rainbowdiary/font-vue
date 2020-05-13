const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    // proxy:"http://localhost:4000"
    proxy: {
      '/4000': {  // /4000开头的为止请求转发  //http://localhost:8080/4000/position/40.10038,116.36867
        target: 'http://localhost:4000',
        changeOrigin: true,
        pathRewrite: {
          '^/4000': ''  //将/4000开头的重写为""
        }
      },
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'components': resolve('src/components'),
        'pages': resolve('src/pages')
      }
    }
  }
}