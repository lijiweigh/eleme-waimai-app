<template>
    <div class="ratings-wrap" ref="ratings">
        <div class="ratings">
            <div class="msg">
                <div class="score">
                    <div class="num">{{seller.score}}</div>
                    <div class="average">综合评分</div>
                    <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="starScore" v-if="seller.serviceScore">
                    <div class="serviceScore">
                        服务态度
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="color">
                            {{seller.serviceScore}}
                        </span>
                    </div>
                    <div class="foodScore">
                        商品质量
                         <star :size="36" :score="seller.foodScore"></star>
                         <span class="color">
                             {{seller.foodScore}}
                         </span>
                    </div>
                    <div class="deliveryTime">
                        送达时间<span class="time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <BreakLine></BreakLine>
            <RatingList :ratings="ratings" :textList="textList" ref="RatingList"></RatingList>
        </div>
        
         <!-- <ShopCart :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"
	    :selectedFoods="selectedFoods" :totalMoney="totalMoney" ref="shopCart">
	    </ShopCart> -->
    </div>
</template>

<script>
import BScroll from "better-scroll"
import Star from "@/components/common/star/star"
import BreakLine from "@/components/common/breakLine"
import RatingList from "@/components/common/ratingList"
// import ShopCart from "@/components/goods/shopCart"

export default {
    name: 'ratings',
    data () {
        return {
            textList: ["满意","不满意","全部"],
            ratings: []
        }
    },
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        Star,
        BreakLine,
        RatingList,
        // ShopCart
    },
    // watch: {
    //     [this.$refs.RatingList] () {
    //         if( !this.scroll ) {
    //             this.scroll = new BScroll(this.$refs.ratings, {
    //                 click: true
    //             });
    //         } else {
    //             this.scroll.refresh();
    //         }
    //     }
    // },
    mounted() {
        this.$nextTick(() => {
            if( !this.scroll ) {
                this.scroll = new BScroll(this.$refs.ratings, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
        })

        this.$http({
            url: "/api/ratings"
        }).then(res => {
            
            this.ratings = res.data.data;
        })
       
    },
};
</script>

<style lang="scss" scoped>
@import "../common/style/mixin";
.ratings-wrap {
    position: fixed;
    top: 175px;
    left: 0;
     bottom: 56px;
     width: 100%;
    overflow: hidden;
}
.ratings {
    
    
    .msg {
        width: 100%;
        padding: 18px 0;
        display: flex;
        .score {
            width: 34.31%;
            // padding: 18px 0;
            @include border-1px(rgba(7,17,27,.1), right);
            text-align: center;

            .num {
                font-size: 24px;
                line-height: 28px;
                color: rgb(255, 153, 0);
            }

            .average {
                font-size: 12px;
                line-height: 12px;
                // color: rgb(7, 17, 27);
                margin: 6px 0 8px;

            }

            .rankRate {
                font-size: 10px;
                line-height: 10px;
                color: rgba(7, 17, 27, .5);  
            }
        }

        .starScore {
            width: 65.69%;
            padding: 0 24px;
            & > div {
                font-size: 12px;
                line-height: 18px;
                color: rgb(7, 17, 27);
                margin-bottom: 8px;
            }

            .star {
                display: inline-block;
                margin: 0 12px;
            }

            .color {
                color: rgb(255, 153, 0);
            }
            .deliveryTime .time {
                font-size: 12px;
                line-height: 18px;
                color: rgb(147, 153, 159);
                margin-left: 12px;
            }
        }
    }
}
</style>

