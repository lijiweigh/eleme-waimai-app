<template>
	<div class="cart-control">
		<transition name='decrease'>
			<div class="decrease icon-remove_circle_outline" v-show='food.count' @click.stop='decrease'></div>
		</transition>
		<div class="count" v-show='food.count'>
			{{food.count}}
		</div>
		<div class="increase icon-add_circle" @click.stop="increase"></div>
	</div>
</template>

<script>
export default {
	name: 'cartControl',
	props: {
		food: {
			type: Object
		}
	},
	methods: {

		increase (event) {
			// console.log(123)
			if(!event._constructed) {
				return;
			}

			if (!this.food.count) {
				this.$set(this.food,'count',1);
			} else {
				this.food.count++;
			}
		},
		decrease (event) {
			if(!event._constructed) {
				return;
			}
			if( this.food.count ) {
				this.food.count--;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.cart-control {
		font-size: 0;

		.decrease, .increase{
			display: inline-block;
			font-size: 24px;
			line-height: 24px;
			color: rgb(0,160,240);
			padding: 5px;
		}

		.count{
			display: inline-block;
			font-size: 10px;
			line-height: 24px;
			color: rgb(147,153,159);
			padding-top: 5px;
			vertical-align: top;
		}

		.decrease-enter,
		.decrease-leave-to {
			opacity: 0;
			transform: translateX(30px) rotate(360deg);
		}

		.decrease-enter-active,
		.decrease-leave-active {
			transition: all .3s;
		}
	}
</style>