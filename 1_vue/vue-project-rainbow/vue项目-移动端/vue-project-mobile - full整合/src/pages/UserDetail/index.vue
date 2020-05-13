<template>
  <div>
    <span class="arrow" @click="goback">
      <i class="iconfont icon-jiantou2"></i>
    </span>
    <div style="text-align: center">
      <Button type="info" class="btn" @click="exit">退出登录</Button>
    </div>
  </div>
</template>
 
<script>
import { Button } from "vant";
export default {
  name: "UserDetail",
  components: {
    [Button.name]: Button
  },
  methods: {
    exit() {
      this.$store.dispatch("resetUser"); // 等同于...mapAction(["resetUser"])
    },
    goback() {
      this.$router.replace("/profile");
    }
  }
};
</script>
 
<style lang="stylus" scoped>
.arrow {
  width: 12px;
  height: 12px;
  position: absolute;
  left: 15px;
}
</style>