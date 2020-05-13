<template>
<div class="on">
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a @click="loginWay=`sms`" href="javascript:;" :class="{on:loginWay===`sms`}">短信登录</a>
          <a @click="loginWay=`pwd`" href="javascript:;" :class="{on:loginWay===`pwd`}">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <!-- 验证码登录 -->
          <div :class="{on:loginWay===`sms`}">
            <section class="login_message">
              <!-- 使用vee-validate进行表单校验 -->
              <input 
                name="phone" 
                v-validate="'required|mobile'"
                v-model.trim="phoneNum"
                type="tel" 
                maxlength="11" 
                placeholder="手机号"
              >
              <!-- 表单校验的提示 -->
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <button 
                @click.prevent="getVerificationCode"
                :class="{isHightLight: isRightPhoneNum}"
                :disabled="!isRightPhoneNum || times>0" 
                class="get_verification"
              >
              {{times>0?`验证码已发送(${times}s)`:"获取验证码"}}
              </button>
            </section>
            <section class="login_verification">
              <input 
                name="code"
                v-validate="{required: true,regex: /^\d{6}$/}"
                v-model="code"
                type="tel" 
                maxlength="8" 
                placeholder="验证码"
              >
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 用户名密码登录 -->
          <div :class="{on:loginWay===`pwd`}">
            <section>
              <section class="login_message">
                  <input  
                    name="username"
                    v-validate="'required'"
                    v-model="username"
                    type="tel" 
                    maxlength="11" 
                    placeholder="手机/邮箱/用户名"
                  >
              <span style="color: red;" v-show="errors.has('username')">{{ errors.first('username') }}</span>
              </section>
              <section class="login_verification">
                <input 
                  name="password"
                  v-validate="'required'"
                  v-model="password"
                  :type="isRightPoint?`text`:`password`" 
                  maxlength="8" 
                  placeholder="密码"
                >
              <span style="color: red;" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                <div 
                  @click="isRightPoint=!isRightPoint"
                  :class="isRightPoint ? `on` : `off`"
                  class="switch_button" 
                >
                  <div class="switch_circle" :class="{right:isRightPoint}"></div>
                  <span class="switch_text">{{isRightPoint ? `abc`: ""}}</span>
                </div>
              </section>
              <section class="login_message">
                <input 
                  name="captcha"
                  v-validate="'required'"
                  v-model="captcha"
                  type="text" 
                  maxlength="11" 
                  placeholder="验证码"
                >
              <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                <img class="get_verification" @click="getCaptcha" ref="captcha" src="http://localhost:4000/captcha" alt="captcha">
              </section>
            </section>
          </div>
          <button @click.prevent="login" class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a @click="goto(`/profile`)" href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</div>
</template>
 
<script>
/*
  1. 登录方式的切换
  2. 获取验证码点亮
  3. 倒计时
  4. 密码的显示隐藏
  5. 表单验证
*/
import {mapActions} from "vuex";
import { Toast } from 'vant';
const OK = 0;
const ERROR = 1;

export default {
 name: 'Login',
 data () {
  return {
      loginWay:"sms",
      phoneNum:"",
      code:"",
      reg_phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
      times: 0,
      isRightPoint: false,
      username:"",
      password:"",
      captcha:""
    }
 },
 computed:{
  //  手机号码验证
  isRightPhoneNum(){
    return this.reg_phone.test(this.phoneNum)
  }
 },
 methods: {
   ...mapActions(["getUser"]),
   resetData(){
      this.phoneNum = "";
      this.code = "";
      this.username = "";
      this.password = "";
      this.captcha="";
   },
   getCaptcha(){
    //  加上时间戳避免浏览器缓存
     this.$refs.captcha.src=`http://localhost:4000/captcha?time=${new Date().getTime()}`
   },
   async login(){
     let validateSuccessFlag = "";
     const {phoneNum,code,loginWay,username,password,captcha} = this
     switch (loginWay) {
       case "sms":
        validateSuccessFlag = await this.$validator.validateAll(["phone","code"])
        if(validateSuccessFlag){
          this.getUser({
            loginWay: "sms",
            phone:phoneNum,
            code
          })
        }
         break;
       case "pwd":
        validateSuccessFlag = await this.$validator.validateAll(["username","password","captcha"])
        if(validateSuccessFlag){
          this.getUser({
            loginWay: "pwd",
            name: username,
            pwd: password,
            captcha,
            getCaptcha: this.getCaptcha, //登录失败更新验证码使用
            resetData: this.resetData
          })
        }
         break;
       default:
         break;
     }
   },
   async getVerificationCode(){
      clearInterval(this.timer)
      this.times = 10;
      this.timer = setInterval(()=>{
        if(this.times>0){
          this.times--
        }else{
          clearInterval(this.timer)
        }
      },1000)
      // 发送获取验证码请求
        const body = await this.$http.login.getVerification({
          phone:this.phoneNum
        })
        
        // 发送成功/失败提示
        if(body.code === OK){
          Toast.success("验证码发送成功")
        }else if(body.code === ERROR){
          Toast.fail("验证码发送失败")
        }
        this.times = 0;
   },
   goto(path){
     this.$router.replace(path)
   }
 },
 destroyed(){
    clearInterval(this.timer)
    }
}
</script>
 
<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
#app
  >.on
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      z-index 200
      .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
          padding-top 60px
          width 80%
          margin 0 auto
          .login_header
            .login_logo
              font-size 40px
              font-weight bold
              color #02a774
              text-align center
            .login_header_title
              padding-top 40px
              text-align center
              >a
                color #333
                font-size 14px
                padding-bottom 4px
                &:first-child
                  margin-right 40px
                &.on
                  color #02a774
                  font-weight 700
                  border-bottom 2px solid #02a774
          .login_content
            >form
              >div
                display none
                &.on
                  display block
                input
                  width 100%
                  height 100%
                  padding-left 10px
                  box-sizing border-box
                  border 1px solid #ddd
                  border-radius 4px
                  outline 0
                  font 400 14px Arial
                  &:focus
                    border 1px solid #02a774
                .login_message
                  position relative
                  margin-top 16px
                  height 48px
                  font-size 14px
                  background #fff
                  .get_verification
                    position absolute
                    top 50%
                    right 10px
                    transform translateY(-50%)
                    border 0
                    color #ccc
                    font-size 14px
                    background transparent
                  .isHightLight
                    color green
                    font-weight 700
                .login_verification
                  position relative
                  margin-top 16px
                  height 48px
                  font-size 14px
                  background #fff
                  .switch_button
                    font-size 12px
                    border 1px solid #ddd
                    border-radius 8px
                    transition background-color .3s,border-color .3s
                    padding 0 6px
                    width 30px
                    height 16px
                    line-height 16px
                    color #fff
                    position absolute
                    top 50%
                    right 10px
                    transform translateY(-50%)
                    &.off
                      background #fff
                      .switch_text
                        float right
                        color #ddd
                    &.on
                      background #02a774
                    >.switch_circle
                      // transform translateX(27px)  //点击小圆点到右边
                      position absolute
                      top -1px
                      left -1px
                      width 16px
                      height 16px
                      border 1px solid #ddd
                      border-radius 50%
                      background #fff
                      box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                      transition transform .3s
                      &.right 
                        transform translateX(27px)  //点击小圆点到右边
                .login_hint
                  margin-top 12px
                  color #999
                  font-size 14px
                  line-height 20px
                  >a
                    color #02a774
              .login_submit
                display block
                width 100%
                height 42px
                margin-top 30px
                border-radius 4px
                background #4cd96f
                color #fff
                text-align center
                font-size 16px
                line-height 42px
                border 0
            .about_us
              display block
              font-size 12px
              margin-top 20px
              text-align center
              color #999
          .go_back
            position absolute
            top 5px
            left 5px
            width 30px
            height 30px
            >.iconfont
              font-size 20px
              color #999
</style>