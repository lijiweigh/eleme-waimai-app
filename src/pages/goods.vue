<template>
    <div class="goods-wrap">
    	<div class="goods">
			<div class="side-wrap" ref='sideWrap'>
				<ul class="side">
					<li class="side-item" v-for="(goods, index) in goodsList" :class="{'current': currentIndex === index}" @click="toggleSide(index,$event)" ref="sideItemList">
						<span class="icon" :class="classMap[goods.type]">{{goods.name}}</span>
					</li>
				</ul>
			</div>
			<div class="content-wrap" ref='contentWrap'>
				<ul class="content">
					<li class="content-item" v-for="(goods, index) in goodsList" :key='index' ref="contentItemList">
						<h2 class="item-header">{{goods.name}}</h2>
						<ul class="child-content">
							<li class="child-item" v-for="(food, index) in goods.foods" :key='index'>
								<img class="child-item-icon" :src="food.icon">
								<div class="child-item-content">
									<h2 class="child-header">{{food.name}}</h2>
									<div class="description">{{food.description}}</div>
									<div>
										<span class="sellCount">月售{{food.sellCount}}份</span>
										<span class="rating">{{food.rating}}%</span>
									</div>
									<div>
										<span class="price">&yen;{{food.price}}</span>
										<span class="oldPrice" v-if="food.oldPrice">&yen;{{food.oldPrice}}</span>
									</div>
									<div class="cart-control-wrap">
										<CartControl :food='food'></CartControl>
									</div>
								</div>
							</li>
						</ul>

					</li>
				</ul>
			</div>
	    </div>

	    <ShopCart :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"
	    :selectedFoods="selectedFoods" :totalMoney="totalMoney">
	    </ShopCart>

    </div>
</template>

<script>

import BScroll from 'better-scroll'
import CartControl from '@/components/common/cartControl'
import ShopCart from "@/components/goods/shopCart"

export default {
    name: 'goods',
    components: {
    	CartControl,
    	ShopCart
    },
    data () {
    	return {
    		goodsList: [],
    		
    		classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
    		listHeight: [],
    		curHeight: 0
    	}
    },
    props: {
    	seller: {
    		type: Object
    	}
    },
    computed: {
    	currentIndex () {
    		
    		for (let i =0;i<this.listHeight.length;i++) {

    			let h1 = this.listHeight[i];
    			let h2 = this.listHeight[i + 1];
    			if( (this.curHeight >= h1 && this.curHeight < h2) ) {
    				this.scrollMenu(i);
    				
    				return i;
    			}
    		}

    		return 0;

    	},
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
    methods: {
    	toggleSide (index,event) {
    		if (!event._constructed) {
    			return;
    		}
    		// this.currentIndex = index;
    		let contentItemList = this.$refs.contentItemList;
    		this.contentBS.scrollToElement(contentItemList[index],300);
    	},
    	initListHeight () {
    		let h = 0;
    		const list = this.$refs.contentItemList;
    		
    		this.listHeight.push(h);
    		for (let i=0; i<list.length; i++) {
    			
    			h += list[i].clientHeight;
    			this.listHeight.push(h);
    		}
    	},
    	scrollMenu(i) {
    		const sideItemList = this.$refs.sideItemList;
    		this.sideBS.scrollToElement(sideItemList[i],300);
    	},

    	init() {
    		this.sideBS = new BScroll(this.$refs.sideWrap,{
    			click: true
    		});

    		this.contentBS = new BScroll(this.$refs.contentWrap,{
    			click: true,
    			probeType: 3
    		});

    		this.contentBS.on("scroll", (pos) => {
    			if( pos.y <= 0 ) {
    				this.curHeight = Math.abs( pos.y );
    				
    			}
    		});

    		this.initListHeight();
    	}
    },
    created (){
    	this.$http.get('/api/goods').then( (response) => {
			if( response.data.errno === 0) {
				this.goodsList = response.data.data;

				this.$nextTick(() => {
		    		
					this.init();

		    	});

			}
		})
    },
    mounted () {
    	
    }
}
</script>

<style lang="scss" scoped>

@import '../common/style/mixin';

.goods {
	position: absolute;
	top: 175px;
	bottom: 56px;
	left: 0;
	right: 0;
	overflow: hidden;
	display: flex;
	.side-wrap {
		flex: 0 0 80px;
		display: inline-block;
		background-color: #f3f5f7;
		.side {

			.side-item {
				width: 100%;
				display: table;
				padding: 0 12px;
				box-sizing: border-box;
				
				span {
					display: table-cell;
					vertical-align: middle;
					width: 100%;
					height: 54px;
					text-align: center;
					font-size: 12px;
					line-height: 14px;
					color: rgb(0,20,20);
					border-bottom: 1px solid rgba(7,17,27,.1);
				}

				&.current {
					background-color: #Fff;
				}
			}
		}
	}

	.content-wrap {
		height: 100%;
		flex: 1;

		.item-header{
			@include border-1px-left(#d9dde1);
			height: 26px;
			background-color: #f3f5f7;
			padding-left: 14px;
			color: rgb(147,153,159);
			font-size: 12px;
			line-height: 26px;
		}

		.child-content {
			padding: 0 18px;

		}

		.child-item{
			padding: 18px 0;
			display: flex;
			border-bottom: 1px solid rgba(7,17,27,.1);
		}

		.child-item:last-child{
			border-bottom: 0;
		}

		.child-item-icon{
			margin-right: 10px;
			width: 57px;
			height: 57px;
		}

		.child-item-content {
			flex: 1;
			position:relative;

			.cart-control-wrap{
				position: absolute;
				right: 0;
				bottom: -5px;
			}
		}

		.child-header{
			font-size: 14px;
			line-height: 14px;
			color: rgb(7,17,27);
			margin: 2px 0 8px;
		}

		.description, .sellCount, .rating {
			color: rgb(147,153,159);
			font-size: 10px;
			line-height: 10px;
		}

		.description {
			margin-bottom: 8px;
		}

		.sellCount{
			margin-right: 12px;
		}

		.price{
			color: red;
			font-size: 14px;
			line-height: 24px;
			font-weight: 700;
			margin-right: 8px;
		}

		.oldPrice{
			color: rgb(147,153,159);
			font-size: 10px;
			line-height: 24px;
			font-weight: 700;
		}
	}
}


</style>

