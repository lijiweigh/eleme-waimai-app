import Vue from 'vue'
import Router from 'vue-router'

import Goods from '@/pages/goods.vue'
import Seller from '@/pages/seller.vue'
import Ratings from '@/pages/ratings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/',
      redirect: '/goods'
    }
  ]
})
