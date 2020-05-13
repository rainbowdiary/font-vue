module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,//启动项目后自动开启浏览器
    // host: 'locahost',//对应的主机名
    port: 8080,//端口号
    // https: false,//是否开启协议名,如果开启会发出警告
    // hotOnly: false,//热模块更新的一种东西,webpack中自动有过配置,但如果我们下载一些新            的模块可以更好的给我更新一些配置
    // proxy: {
    //   //配置跨域
    //   '/api': {//配置跨域的名字
    //     target: 'http//localhost:5000/api',//跨域的地址
    //     ws: true,
    //     changOrigin: true,//是否跨域
    //     pathRewrite: {//当前的名字
    //       '^/api': ''
    //     }
    //   }
    // }
  }
}