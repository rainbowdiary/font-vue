<template>
  <div id="app">
    <!-- <Header/> -->
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Footer from "./components/Footer/index.vue";
export default {
  name: "app",
  components: { 
    Footer,
  }
};
</script>

<style>
</style>
