import GoodsEle from "../pages/GoodsEle"
import RatingsEle from "../pages/RatingsEle"
import SellerEle from "../pages/SellerEle"
export default [
  { path: "/goods", component: GoodsEle },
  { path: "/ratings", component: RatingsEle },
  { path: "/sellers", component: SellerEle },
  { path: "/", redirect: "/goods" },
]