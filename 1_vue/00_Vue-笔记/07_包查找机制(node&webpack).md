### node包查找机制
     1. 循环module.paths 找对应的文件夹
     2. 找到文件夹相关的package.json 中的main字段
     3. 如果main字段指向的不是一个有效的文件地址  那么node会继续找当前目录下的index
     4. 如果 2 3都没命中 则找不到包 报错
     
### webpack包的查找机制(有别名)
     找别名指定引入的模块
模块路径的解析流程：
  1. 如果没有resolve.alias,循环resolve.modules中指令的目录，找当前引用的包
    [string]: ['node_modules']
  2. 如果是文件夹
    如果文件夹有package.json看webpack指定的resolve.mainFileds的字段
     mainFields: ['browser', 'module', 'main']
  3. resolve.mainFiles
    [string]: ['index']
  4. resolve.extensions
      resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json']
      }
  5.以上都失败就报错

文档：webpack解析流程
  https://webpack.docschina.org/concepts/module-resolution

### webpack包的查找机制(没有别名)
    1. 循环resolve.modules中指令的目录  找当前引用的包
    2. 找当前包的package.json文件 由resolve.mainFields所指定的字段
    3. 如果第2步没有成功找到一个文件  去找包底下由resolve.mainFiles 指定的文件
    4. 扩展名由resolve.extensions指定
    5. 以上都失败就报错!!!!
