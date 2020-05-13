<template>
  <div class="category-container">
    <img class="category-bigImg" :src="categories.bannerUrl" alt="居家生活大图" v-if="categories">
      <ul v-if="categories">
        <li v-for="(category, index) in categories.subCateList" :key="index">
          <img :src="category.bannerUrl" :alt="category.name">
          <span>{{category.name}}</span>
        </li>
      </ul>
    </div>
</template>
<script>
  import {mapState} from 'vuex';
  export default{
    data () {
      return {
        categories: []
      }
    },
    computed: {
      ...mapState({
        currentIndex: state => state.categoryList.currentIndex,
        categoryList: state => state.categoryList.categoryList
      })
    },
    mounted () {
      this.categories = this.categoryList[this.currentIndex];
    },
    watch: {
      currentIndex () {
        this.categories = this.categoryList[this.currentIndex];
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl";
  .category-container
    padding 0 20px
    .category-bigImg
      width 528px
      height 192px
      margin-bottom 30px
    ul
      clearFix()
      li
        float left
        width 144px
        font-size 28px
        margin 0 30px 10px 0
        text-align center
        img
          width 144px
          height 144px
</style>
