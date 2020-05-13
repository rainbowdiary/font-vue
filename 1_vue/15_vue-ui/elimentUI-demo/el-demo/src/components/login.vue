<template>
  <div>
    <el-form :model="loginForm" ref="loginForm">
      <h2>**科技后台</h2>
      <el-form-item props="username">
        <el-input
          class="login-username"
          auto-complete="off"
          placeholder="账号"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item props="password">
        <el-input
          class="login-password"
          auto-complete="off"
          placeholder="密码"
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="logining" @click.native.prevent="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
/* 
@click.native.prevent多层子组件嵌套使用.native修饰符也可以
*/
const isDev = process.env.NODE_ENV === "development";
console.log(process.env.NODE_ENV);
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: isDev ? "Admin" : "",
        password: isDev ? "111111" : ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.$refs);
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log("1111111111111");
          // await this.$sotre.dispatch("login", this.loginForm);
          this.$router.replace({ path: "/hello" });
        }
      });
      console.log("submit!");
    }
  }
};
</script>
 
<style scoped>
.login-username {
  width: 200px;
}
.login-password {
  width: 200px;
}
</style>