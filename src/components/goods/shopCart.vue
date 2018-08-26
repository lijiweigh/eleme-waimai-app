<template>
	<div class="shopping-cart-wrap">
    	<div class="shopping-cart">
    		<transition name="fade-list">
    			<div class="shopping-list" v-show="isListShow">
	    			<div class="list-header">
	    				<span class="cart">购物车</span>
	    				<span class="clean" @click="clean">清空</span>
	    			</div>
	    			<div class="list-content" ref="listContent">
	    				<ul>
		    				<li class="list-item" v-for="(food, index) in selectedFoods" :key="index">
		    					<span class="item-name">{{food.name}}</span>
		    					<span class="item-price">&yen;{{food.price}}</span>
		    					<div class="control">
		    						<CartControl :food="food"></CartControl>
		    					</div>
		    				</li>
		    			</ul>
	    			</div>
	    		</div>
    		</transition>
    		<div class="inner-wrap" @click="toggleList">
    			<div class="detail">
	    			<span class="cart">
	    				<i class="icon-shopping_cart" v-show="totalMoney === 0"></i>
	    				<i class="icon-shopping_cart" v-show="totalMoney" :style="{'backgroundColor':'#00a0dc','color':'#fff'}"></i>
	    				<i class="foodCount" v-show="selectedFoods.length">{{selectedFoods.length}}</i>
	    			</span>
	    			<span class="money" v-show="totalMoney === 0">
	    				&yen;{{totalMoney}}
	    			</span>
	    			<span class="money" v-show="totalMoney" :style="{'color':'#fff'}">
	    				&yen;{{totalMoney}}
	    			</span>
	    			<span class="delivery-pay">
	    				另需配送费&yen;{{deliveryPrice}}
	    			</span>
	    		</div>
	    		<div class="pay-btn" :class="{'gopay':isGoPay}">
	    			<span v-show="totalMoney === 0">
	    				&yen;{{minPrice}}起送
	    			</span>
	    			<span v-show="totalMoney > 0 && totalMoney < minPrice">
	    				还差&yen;{{minPrice - totalMoney}}起送
	    			</span>
	    			<span v-show="totalMoney >= minPrice" @click.stop="pay">
	    				去支付
	    			</span>
	    		</div>
    		</div>
    		
    	</div>
    	<transition name="fade-mask">
    		<div class="shopping-cart-mask" v-show="isListShow" @click="toggleFold"></div>
    	</transition>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from "@/components/common/cartControl/cartControl"

export default {
	name: "shopcart",
	data () {
		return {
			fold: true
		}
	},
	components: {
		CartControl
	},
	props: {
		totalMoney: {
			type: Number
		},
		selectedFoods: {
			type: Array
		},
		deliveryPrice: {
			type: Number
		},
		minPrice: {
			type: Number
		}
	},
	computed: {
		isGoPay () {
    		if( this.totalMoney >= this.minPrice ) {
    			return true;
    		} 

    		return false;
    	},
    	isListShow () {
    		if( this.totalMoney && !this.fold ) {
    			return true;
    		}

    		return false;
    	}
	},
	methods: {
		clean () {
			this.selectedFoods.forEach( food => food.count = 0 );
			this.fold = true;
		},
		toggleList () {
			if ( !this.totalMoney ) {
				return;
			}

			this.fold = !this.fold;

			this.$nextTick(() => {
				new BScroll(this.$refs.listContent,{
					click: true
				})
			})
		},
		toggleFold () {
			this.fold = !this.fold;
		},
		pay () {
			alert(`支付${this.totalMoney}元！`);
			this.selectedFoods.forEach( food => food.count = 0 );
			this.fold = true;
		},
		testRef () {
			console.log("调用testref");
			console.log(this.fold);
		}
	}

}
</script>

<style lang="scss" scoped>
@import '../../common/style/mixin';
.shopping-cart{
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 50;
	
	height: 56px;
	width: 100%;
	
	
	.inner-wrap {
		display: flex;
		background-color: #141d27;
		.detail{
			flex: 1;
			font-size: 0;

			.cart {
				position: relative;
				bottom: 8px;
				left: 18px;
				display: inline-block;
				width: 56px;
				height: 56px;
				box-sizing: border-box;
				border-radius: 50%;
				background-color: #141d27;
				padding: 6px;
				
				.foodCount {
					position: absolute;
					right: 1px;
					top: 1px;
					width: 20px;
					height: 16px;
					font-size: 10px;
					line-height: 16px;
					text-align: center;
					border-radius: 6px;
					background-color: red;
					font-style: normal;
					font-weight: bold;
					color: #fff;
				}

				.icon-shopping_cart{
					display: inline-block;
					background-color: rgba(255,255,255,.4);
					// background-color: #ccc;
					border-radius: 50%;
					width: 44px;
					height: 44px;
					color: rgba(255,255,255,.4);
					font-size: 24px;
					line-height: 44px;
					text-align: center;

				}
			}

			.money,
			.delivery-pay{
				display: inline-block;
				box-sizing: border-box;
				font-weight: 700;
				color: rgba(255,255,255,.4);
				
			}

			.money {
				bottom: 5px;
				margin: 12px;
				padding: 6px 12px;
				font-size: 18px;
				@include border-1px(rgba(255,255,255,.1),right);
			}

			.delivery-pay{
				position:relative;
				bottom: 5px;
				font-size: 16px;
			}
		}

		.pay-btn{
			flex: 0 0 105px;
			color: rgba(255,255,255,.4);
			font-size: 18px;
			font-weight: 700;
			line-height: 56px;
			text-align: center;
			background-color: rgba(200,200,200,.4);
		}

		.gopay{
			background-color: #00b43c;
			color: #fff;
		}
	}

}

.shopping-list{
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		transform: translate3d(0,-100%,0);
		// transform: translateY(0);

		width: 100%;
		background-color: #fff;

		.list-header {
			padding: 0 18px;
			height: 40px;
			background-color: #f3f5f7;
			@include border-1px(rgba(7,17,27,.1),bottom);

			.cart {
				font-size: 14px;
				line-height: 40px;
				color: rgb(7,17,27);
				font-weight: 200;
				float: left;
			}
			.clean {
				font-size: 12px;
				line-height: 40px;
				color: rgb(0,160,220);
				float: right;
			}
		}

		.list-content {
			overflow: hidden;
			padding: 0 18px;
			max-height: 217px;
			.list-item {
				box-sizing: border-box;
				height: 48px;
				padding: 12px 0;
				@include border-1px(rgba(7,17,27,.1),bottom);

				.item-name {
					font-size: 14px;
					line-height: 24px;
					color: rgb(7,17,27);
				}

				.item-price {
					font-size: 14px;
					line-height: 24px;
					color: red;
					font-weight: 700;
					position: absolute;
					right: 90px;
				}

				.control{	
					position: absolute;
					right: 0;
					bottom: 6px;

				}
			}
		}
	}

.shopping-cart-mask{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 9;
	background-color: rgba(7,17,27,.6);
}

.fade-list-enter,
.fade-list-leave-to {
	// transform: translateY(0) !important;
	transform: translate3d(0,0,0);
}

// .fade-list-enter-to,
// .fade-list-leave {
// 	transform: translateY(-100%);
// }

.fade-list-enter-active,
.fade-list-leave-active {
	transition: .3s;
}

.fade-mask-enter,
.fade-mask-leave-to {
	opacity: 0;
}

.fade-mask-enter-active,
.fade-mask-leave-active {
	transition: .3s;
}
</style>