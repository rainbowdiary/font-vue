<template>
  <div>{{message}}</div>
</template>
 
<script>
export default {
  name: "Test",
  data() {
    return {
      message: "123"
    };
  }
};
vm.message = "new message";
vm.$el.textContent === "new message"; //false
Vue.nextTick(function() {
  vm.$el.textContent === "new message"; //false
});
</script>
 
<style scoped>
</style>