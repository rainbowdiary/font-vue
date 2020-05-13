<template>
  <div class="login-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h2 class="login-title">会员管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('ruleForm')" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空" }]
      },
      token: ""
    };
  },

  methods: {
    submitForm(formName) {
      const ERROR = 1;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 登录跳转到主页
          // 获取输入的用户名和密码
          const { username, password } = this.ruleForm;
          const body = await this.$http.login.login({
            name: username,
            password
          });
          if (body.code === ERROR) {
            Message.error({ message: body.message, center: true });
            return;
          }
          // 登录成功提示
          Message.success({ message: body.message, center: true });
          // 跳转主页面
          this.$router.replace("/");
        } else {
          Message.error({ message: "请输入用户名密码~", center: true });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  async mounted() {}
};
</script>

<style lang="scss" scoped>
.login-container {
  text-align: left;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("./login.jpg");
  background-repeat: no-repeat;
  .demo-ruleForm {
    text-align: left;
    width: 350px;
    margin: 160px auto;
    background-color: hsla(0, 0%, 100%, 0.8);
    padding: 28px;
    border-radius: 20px;
    .login-title {
      color: #303133;
      text-align: center;
    }
  }
}
</style>
