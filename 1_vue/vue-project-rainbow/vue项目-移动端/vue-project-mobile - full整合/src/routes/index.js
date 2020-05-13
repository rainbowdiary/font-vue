import Msite from '../pages/Msite'
import Search from '../pages/Search'
import Order from '../pages/Order'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import UserDetail from '../pages/UserDetail'
// import GoodsEle from "../pages/GoodsEle"
// import RatingsEle from "../pages/RatingsEle"
// import SellerEle from "../pages/SellerEle"
import Shop from "../pages/Shop"
// 做成路由懒加载(代码分割，用到哪个组件才会加载哪个组件，并且不会多次加载)
const GoodsEle = () => import(/* webpackChunkName: "goodsEle" */ "../pages/GoodsEle")
const RatingsEle = () => import(/* webpackChunkName: "ratingsEle" */ "../pages/RatingsEle")
const SellerEle = () => import(/* webpackChunkName: "sellerEle" */ "../pages/SellerEle")

const Test = () => import("../components/Test")
export default [
  {
    path: '/',
    redirect: '/msite',
  },
  {
    path: '/msite',
    component: Msite,
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      console.log("路由自己的守卫钩子")
      next()
    }
  },
  {
    path: '/search',
    component: Search,
    meta: { showFooter: true }
  },
  {
    path: '/order',
    component: Order,
    meta: { showFooter: true }
  },
  {
    path: '/profile',
    component: Profile,
    meta: { showFooter: true }
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/userDetail',
    component: UserDetail,
  },
  {
    path: '/shop/:id',
    component: Shop,
    props: true,
    children: [
      { path: "goods", component: GoodsEle },
      { path: "ratings", component: RatingsEle },
      { path: "sellers", component: SellerEle },
      { path: "/", redirect: "goods" },
    ]
  },
  {
    path: "/test",
    component: Test
  }
]

