<template>
    <div class="goods">
		<div class="side-wrap" ref='sideWrap'>
			<ul class="side">
				<li class="side-item" v-for="(goods, index) in goodsList" :class="{'current': currentIndex === index}" @click="toggleSide(index)">
					<span>{{goods.name}}</span>
				</li>
			</ul>
		</div>
		<div class="content-wrap"></div>
    </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
    name: 'goods',
    data () {
    	return {
    		goodsList: [],
    		currentIndex: 0
    	}
    },
    methods: {
    	toggleSide (index) {
    		this.currentIndex = index;
    	}
    },
    created (){
    	this.$http.get('/api/goods').then( (response) => {
			if( response.data.errno === 0) {
				this.goodsList = response.data.data;
			}
		})
    },
    mounted () {
    	this.$nextTick(() => {
    		this.$refs.sideWrap,{
	    		click: true
	    	}
    	});
    }
}
</script>

<style lang="scss" scoped>
.goods {
	.side-wrap {
		width: 80px;
		display: inline-block;
		overflow: hidden;
		.side {

			.side-item {
				width: 100%;
				display: table;
				padding: 0 12px;
				box-sizing: border-box;
				background-color: #f3f5f7;
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

	}
}
</style>

