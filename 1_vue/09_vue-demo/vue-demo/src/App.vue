<template>
  <div id="app">
    <keep-alive>
      <A/>
      <C/>
    </keep-alive>
    <button @click="handC">修改</button>
  </div>
</template>

<script>
import A from "./components/a";
import B from "./components/b";
import C from "./components/c";
export default {
  name: "App",
  data() {
    return {
      flag: true
    };
  },
  methods: {
    handC() {
      this.flag = !this.flag;
    }
  },
  components: {
    A,
    B,
    C
  }
};
</script>

<style>
</style>
