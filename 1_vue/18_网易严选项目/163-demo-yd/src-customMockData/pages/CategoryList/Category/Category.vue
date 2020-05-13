<template>
  <div class="category-container">
    <img class="category-bigImg" :src="categories.bannerUrl" alt="居家生活大图">
    <div v-for="(subCateList, index) in categories.subCateList" :key="index">
      <p>{{subCateList.name}}</p>
      <div class="line"></div>
      <ul v-if="subCateList">
        <li v-for="(category, index) in subCateList.subCateList" :key="index">
          <img :src="category.wapBannerUrl" :alt="category.name">
          <span>{{category.name}}</span>
        </li>
      </ul>
    </div>
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
    props: {
      filterCategoryList: Array
    },
    computed: {
      ...mapState({
        currentIndex: state => state.categoryList.currentIndex
      })
    },
    mounted () {
      this.categories = this.filterCategoryList[this.currentIndex];
    },
    watch: {
      currentIndex () {
        this.categories = this.filterCategoryList[this.currentIndex];
      }
    /*
    filterCategoryList () {
      const index = this.currentIndex;
      this.categories = this.filterCategoryList[index];
    }
    */
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
    p
      font-size 30px
      font-weight bold
      height 50px
      line-height 50px
      padding 0 0 5px
    .line
      width 100%
      height 2px
      background-color #eee
    ul
      clearFix()
      li
        float left
        margin 10px 30px 20px 0
        text-align center
        img
          width 144px
          height 144px
</style>
