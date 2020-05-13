// 表单校验
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
 
//  本地化
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '该手机号',   // 修改显示信息 {name}不是一个有效的邮箱 --> 该邮箱不是一个有效的邮箱
    code: '该验证码',
    username: "用户名",
    password:"密码",
    captcha:"验证码"
  }
})
//  自定义规则
VeeValidate.Validator.extend('mobile', {
  validate: value => {
    return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)
  },
  getMessage: field => field + '必须是11位的有效号码'
})