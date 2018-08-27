<template>
  <div id="app">
   <myheader :seller="seller"></myheader>

   <div class="tab">
     <router-link :to="{name:'goods'}">商品</router-link>
     <router-link :to="{name:'ratings'}">评价</router-link>
     <router-link :to="{name:'seller'}">商家</router-link>
   </div>
   
   <router-view :seller='seller' :goodsList="goodsList"></router-view>

    <ShopCart :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"
    :selectedFoods="selectedFoods" :totalMoney="totalMoney" ref="shopCart">
    </ShopCart>
  </div>
</template>

<script>
import myheader from '@/components/my-head/my-head'
import ShopCart from "@/components/goods/shopCart"

export default {
  name: 'App',
  data () {
    return {
      seller: {},
      goodsList: []
    }
  },
  components: {
    myheader,
    ShopCart
  },
  computed: {
      selectedFoods () {
    		let selected = [];

    		this.goodsList.forEach((goods) => {
    			goods.foods.forEach((food) => {
    				if(food.count) {
    					selected.push(food);
    				}
    			})
    		})

    		return selected;
    	},
    	totalMoney () {
    		let total = 0;
    		this.selectedFoods.forEach(food => {
    			total += food.price * food.count;
    		})

    		return total;
    	}
  },
  created() {
    this.$http.get('/api/seller').then( (response) => {
      if (response.data.errno === 0) {
        this.seller = response.data.data;
      }
    } );

    this.$http.get('/api/goods').then( (response) => {
        if( response.data.errno === 0) {
            this.goodsList = response.data.data;
        }
    })
        

  },
}
</script>

<style lang="scss">
@import './common/style/icon.css';
@import './common/style/mixin.scss';

.tab {
    display: flex;
    height: 40px;
    line-height: 40px;
    @include border-1px-bot(rgba(7, 17, 27, 0.1));

    a {
        flex: 1;
        display: inline-block;
        text-align: center;
        font-size: 14px;
        color: rgb(77, 85, 93);
    }
    .router-link-active {
        color: rgb(240, 20, 20);
    }
}
</style>
