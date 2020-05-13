# 移动端适配
1. 我的尺寸需要在课件尺寸基础上 除以2
   1. 课件使用viewpoint适配方案，initial-scale=0.5 ；为设备宽度/设计稿宽度
   2. 有很多缺点，没有用到完美视口
2. "登录"的border边框比正常的宽一些，如何处理

目前方案:
1. rem适配 + postcss-plugin-px2rem
  在css和预处理器中使用px，让postcss插件自动转换为rem
2. 需要配置vue.config.js


## 显示与影藏
两个内容点击显示与隐藏
  ```
  <div v-if="isOpen">内容1 <i @click="Open">按钮</i></div>
  <div v-if="isOpen">内容2 <i @click="Open">按钮</i></div>
  export default = {
    methods: {
      data(){
        return {isOpen: true}
      },
      open() {
        console.log("111");
        this.isOpen = !this.isOpen;
      }
    }
  }
  ```