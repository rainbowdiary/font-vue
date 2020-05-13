<template>
  <div class="header-container">
    <div class="header">
      <div class="header-top">
        <a href="#" class="logo"></a>
        <div class="top-search">
          <i class="top-icon"></i>
          <span class="top-input" @click="$router.push('/search')">搜索商品, 共19139款好物</span>
        </div>
        <div class="top-btn">登录</div>
      </div>
      <div class="header-tab" v-if="isOpen">
        <div class="tab-left" ref="tabLeft">
          <ul class="tab-ul">
            <li class="active">
              <a>推荐</a>
            </li>
            <li>
              <a>居家生活</a>
            </li>
            <li>
              <a>服饰钱包</a>
            </li>
            <li>
              <a>美食酒水</a>
            </li>
            <li>
              <a>个护清理</a>
            </li>
            <li>
              <a>限时购</a>
            </li>
            <li>
              <a>母婴亲子</a>
            </li>
            <li>
              <a>运动旅行</a>
            </li>
            <li>
              <a>数码家电</a>
            </li>
          </ul>
        </div>
        <span @click="open" class="arrow icon iconfont icon-jiantou-xiao-xia"></span>
      </div>
      <div class="header-mask" v-if="!isOpen">
        <div class="mark-all">
          <span>全部频道</span>
          <i @click="open" class="arrow-shang icon iconfont icon-jiantou-xiao-shang"></i>
        </div>
        <div class="all-ul">
          <li class="active">
            <a>推荐</a>
          </li>
          <li>
            <a>居家生活</a>
          </li>
          <li>
            <a>服饰钱包</a>
          </li>
          <li>
            <a>美食酒水</a>
          </li>
          <li>
            <a>个护清理</a>
          </li>
          <li>
            <a>限时购</a>
          </li>
          <li>
            <a>母婴亲子</a>
          </li>
          <li>
            <a>运动旅行</a>
          </li>
          <li>
            <a>数码家电</a>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import BScroll from "better-scroll";
const ERRNO = 0;
export default {
  name: "Header",
  data() {
    return { isOpen: true };
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    }
  },
  async mounted() {
    this.$nextTick(() => {
      new BScroll(".tab-left", {
        click: true,
        scrollX: true
      });
    });

    // axios请求数据
    const data = await this.$http.homeDataApi.getHomeData();
    if (data.errno === ERRNO) {
      console.log(data.body);
    }
  }
};
</script>
 
<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
@import '../../common/font/iconfont.css';

.header-container {
  .header {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: #fff;

    .header-top {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 30px;

      .logo {
        display: block;
        width: 133px;
        height: 40px;
        background-image: url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/indexLogo-a90bdaae6b.png?imageView&type=webp');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-right: 10px;
      }

      .top-search {
        width: 442px;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0.1);

        .top-icon {
          display: inline-block;
          width: 28px;
          height: 28px;
          background-image: url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-553dba3aff.png?imageView&type=webp');
          background-size: 100% 100%;
          margin-right: 10px;
        }

        .top-input {
          color: #666;
          font-size: 28px;
        }
      }

      .top-btn {
        margin-left: 20px;
        width: 74px;
        height: 40px;
        color: #DD1A21;
        border: 0.5px solid #DD1A21;
        border-radius: 0.10667rem;
        font-size: 24px;
        text-align: center;
        line-height: 40px;
        background-color: #fff;
      }
    }

    .header-tab {
      width: 100%;
      height: 60px;
      position: relative;
    }

    .tab-left {
      overflow: hidden;
      width: 85%;
      height: 100%;

      .tab-ul {
        width: 1530px;
        font-size: 30px;
        height: 60px;

        >li {
          float: left;
          height: 50px;
          margin: 5px 20px;
          padding: 0 10px;
          text-align: center;

          >a {
            color: #333333;
            width: 100%;
            height: 50px;
            display: block;
            line-height: 50px;
          }

          &.active {
            border-bottom: 4px solid $red;

            >a {
              color: $red;
            }
          }
        }
      }
    }

    .arrow {
      width: 15%;
      position: absolute;
      right: 0;
      top: 10px;
      font-size: 60px;
      line-height: 44px;
      text-align: center;
      color: #D8D8D8;
    }

    .header-mask {
      background: #ffffff;
      // background yellow
      position: absolute;
      top: 88px;
      width: 100%;
      font-size: 30px;
      z-index: 100;

      .mark-all {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        margin-bottom: 15px;

        >span {
          margin-left: 30px;
        }

        .arrow-shang {
          font-size: 60px;
          margin-right: 26px;
          color: #D8D8D8;
        }
      }

      .all-ul {
        width: 100%;
        clearFix();

        >li {
          float: left;
          width: 150px;
          height: 56px;
          text-align: center;
          line-height: 56px;
          margin: 0 0 40px 30px;
          background-color: #FAFAFA;
          box-sizing: border-box;
          font-size: 25px;

          >a {
            color: #333333;
          }

          &.active {
            border: 1px solid $red;
          }
        }
      }
    }
  }
}
</style>
