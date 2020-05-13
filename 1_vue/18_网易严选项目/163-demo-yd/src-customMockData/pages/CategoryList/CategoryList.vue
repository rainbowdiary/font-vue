<template>
  <div class="categoryList-container">
    <div class="searchInput">
      <i class="iconfont icon-search"></i>
      <span class="placeholder">搜索商品，共xxxxx款好物</span>
    </div>
    <section class="categoryList-main">
      <div class="line"></div>
      <ul class="categoryList-left">
        <li :class="{active: currentIndex === index}" v-for="(category, index) in filterCategoryList" :key="index" @click="toggleActive(index)">
          <a href="javascript:void(0);">{{category.name}}</a>
        </li>
      </ul>
      <router-view :filterCategoryList="filterCategoryList"/>
    </section>
    <Footer />
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import Category from './Category/Category.vue';
  export default {
    data () {
      return {
        isActive: true
      }
    },
    computed: {
      ...mapState({
        categoryList: state => state.categoryList.categoryList,
        currentIndex: state => state.categoryList.currentIndex
      }),
      filterCategoryList () {
        return this.categoryList.filter((category, index) => (index + 1) % 5 !== 0)
      }
    },
    mounted () {
      this.$store.dispatch('getCategoryList');
    },
    methods: {
      toggleActive (index) {
        this.$store.dispatch('updateIndex', index);
        this.$router.replace({
          url: '/categoryList/category',
          query: {
            index
          }
        });
      }
    },
    components: {
      Category
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl";
  .categoryList-container
    padding-bottom 100px
    .searchInput
      height 56px
      width 90%
      margin 20px auto
      border-radius 10px
      background-color rgba(0,0,0,.1)
      text-align center
      line-height 56px
      i
        font-size 30px
      .placeholder
        font-size 30px
        color #666
    .line
      width 100%
      height 2px
      background-color #eee
    .categoryList-main
      display flex
      .categoryList-left
        flex 3
        display flex
        flex-direction column
        li
          width 160px
          height 50px
          line-height 50px
          text-align center
          font-size 28px
          margin 20px 0
          border-left 6px solid #fff
          &.active
            border-left 6px solid $red
            a
              color $red
</style>
