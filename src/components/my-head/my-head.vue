<template>
    <div class="myheader" v-if="seller">
			<div class="avatar-wrap">
				<img width="64" height="64" :src="seller.avatar" alt="">
			</div>
			<div class="content-wrap">
				<div class="name-wrap">
					<i class="brand"></i>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="distribute-wrap">
					{{seller.description}}/{{seller.deliveryTime}}
				</div>
				<div v-if="seller.supports">
					<div class="discount-wrap">
						<i class="discount-icon"></i>
						<span class="discount-content">{{seller.supports[0].description}}</span>
					</div>
				</div>
			
			</div>
			<div class="notice-count" v-if="seller.supports"  @touchstart="showDetail">
				<span class="number">{{seller.supports.length}}个</span><span class="icon-keyboard_arrow_right"></span>
			</div>
			<div class="notice-wrap" @touchstart="showDetail">
				<i class="notice-bg"></i>
				<span class="text">
					{{seller.bulletin}}
				</span>
				<span class="icon-keyboard_arrow_right"></span>
			</div>
			<div class="bg" :style="{'background-image':'url('+seller.avatar+')'}"></div>
			<div class="detail-wrap" v-show="isShow">
				<div class="detail-main clearfix">
					
					<div class="detail-content">
						<h1>{{seller.name}}</h1>
						<div class="star-wrap">
							<Star v-if="seller.score" :size='48' :score="seller.score"></Star>
						</div>
						
					</div>
					
				</div>
				<div class="detail-close">
					<i class="icon-close" @touchstart="hideDetail"></i>
				</div>
			</div>
    </div>
</template>

<script>
import Star from '../common/star/star'
export default {
	name: "myheader",
	data() {
		return {
			isShow: false,
			classlist: ['decrease_1','discount_1','special_1','invoice_1','guarantee_1']
		}
	},
  props: {
    seller: {
			type: Object,
			required: true
    }
	},
	components: {
		Star
	},
	methods: {
		showDetail() {
			this.isShow = true;
		},
		hideDetail() {
			this.isShow = false;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../common/style/mixin.scss';
@import '../../common/style/base.scss';

.myheader {
	position: relative;
	padding-top: 24px;
	color: #fff;
	// background-color: #ccc;
	.avatar-wrap{
		width: 64px;
		height: 64px;
		margin: 0 12px 18px 24px;
		display: inline-block;
		vertical-align: top;
	}
	.content-wrap{
		position: relative;
		display: inline-block;
		.name-wrap{
			font-size: 0;
			margin-top: 2px;
			.brand{
				display: inline-block;
				width: 30px;
				height: 18px;
				@include bg-img('brand');
				background-size: 30px 18px;
				background-repeat: no-repeat;
				margin-right: 6px;
				vertical-align: top;
			}
			
			.name{
				font-size: 16px;
				line-height: 18px;
				font-weight: bold;
				vertical-align: top;
			}
		}
		.distribute-wrap{
			font-size: 12px;
			line-height: 12px;
			margin-top: 8px;
		}
		.discount-wrap{
			font-size: 0;
			
			margin-top: 10px;
			.discount-icon{
				display: inline-block;
				width: 12px;
				height: 12px;
				@include bg-img('decrease_1');
				background-size: 12px 12px;
				background-repeat: no-repeat;
				margin-right: 4px;
				vertical-align: top;
			}
			.discount-content{
				font-size: 10px;
				line-height: 12px;
				font-weight: 200;
				vertical-align: top;
			}
		}
	
		
	}
	.notice-count{
		position: absolute;
		right: 12px;
		// bottom: 8px;
		top: 60px;
		padding: 7px 8px;
		border-radius: 8px;
		display: inline-block;
		background-color: rgba(0,0,0,.2);
		vertical-align: middle;
		.icon-keyboard_arrow_right{
			display: inline-block;
			width: 16px;
			height: 16px;
			// vertical-align: top;
			vertical-align: middle;
		}
		.number {
			font-size: 10px;
			line-height: 12px;
			font-weight: 200;
			// margin-right: 2px;
			// vertical-align: top;
			vertical-align: middle;
		}
	}

	.bg{
		position: absolute;
		z-index: -1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.2);
		filter: blur(10px);
	}

	.notice-wrap{
		position: relative;
		display: flex;
		align-items: center;
		// width: 100%;
		// padding: 0 12px;
		padding-left: 12px;
		padding-right: 24px;
		// margin-top: 14px;
		height: 28px;
		line-height: 28px;
		background-color: rgba(7, 17, 27, .2);
		
		.notice-bg{
			display: inline-block;
			flex-basis: 22px;
			// width: 22px;
			height: 12px;
			margin-right: 4px;
			@include bg-img('bulletin');
			background-size: 22px 12px;
			// vertical-align: middle;
		}
		.text{
			display: inline-block;
			flex: 1;
			font-size: 10px;
			font-weight: 200;
			margin-right: 4px;
			// width: 80%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.icon-keyboard_arrow_right{
			position: absolute;
			right: 12px;
			top: 50%;
			transform: translateY(-50%);
			display: inline-block;
			width: 16px;
			height: 16px;

		}
	}

	.detail-wrap{
		position: fixed;
		z-index: 100;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: rgba(7, 17, 27, .8);
		// filter: blur(10px);
		// backdrop-filter: blur(10px);
		color: #fff;
		overflow: auto;

		.detail-main{
			overflow: hidden;
			min-height: 100%;
			.detail-content{
				padding-bottom: 64px;
				margin-top: 64px;
				
				h1{
					font-size: 16px;
					line-height: 16px;
					font-weight: 700;
					text-align: center;
				}

				.star-wrap{
					margin-top: 16px;
					margin-bottom: 28px;
					text-align: center;
				}
			}
			
		}

		.detail-close{
			position: relative;
			margin-top: -60px;
			line-height: 32px;
			text-align: center;
			clear: both;
			// vertical-align: middle;

			.icon-close{
				font-size: 32px;
			}
		}
	}
}
</style>

