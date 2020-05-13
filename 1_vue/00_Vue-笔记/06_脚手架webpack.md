很多脚手架配置都会使用环境变量的内容
一次性环境变量设置：
  set

## 安装
低版本v2:
  npm i -g vue-cli
  vue init "脚手架名称"
高版本:
  yarn global add @vue/cli
  vue --version
创建项目:
  vue create hello-world
  vue create --help 
webpack配置

  set PORT=3000
    npm start
    windows中的环境变量:
        查看所有的环境变量 : set
        查看指定的环境变量 : set 变量名
        设置指定的环境变量 : set 变量名=值 (一次性)
        删除指定的环境变量 : set 变量名=