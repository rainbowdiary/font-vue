import Msite from '../pages/Msite'
import Search from '../pages/Search'
import Order from '../pages/Order'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import UserDetail from '../pages/UserDetail'

export default [
  {
    path: '/',
    redirect: '/msite'
  },
  {
    path: '/msite',
    component: Msite,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/order',
    component: Order,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/userDetail',
    component: UserDetail,
  }
]