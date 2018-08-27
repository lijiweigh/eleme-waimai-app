<template>
    <transition name="goodsDetail">
       
        <div class="goodsDetail" ref="goodsDetail" v-show="showDetail">
           <div class="content">
                <div class="img">
                    <img :src="food.image" alt="">
                </div>

                <div class="msg item">
                    <div class="name">
                        {{food.name}}
                    </div>
                    <div class="sell">
                        <span class="count">
                            月售{{food.sellCount}}份
                        </span>
                        <span class="rate">
                            好评率{{food.rating}}%
                        </span>
                    </div>
                    <div class="price">
                        <span class="cur">
                            &yen;{{food.price}}
                        </span>
                        <span class="old" v-if="food.oldPrice">
                           <del>
                                &yen;{{food.oldPrice}}
                           </del>
                        </span>
                    </div>
                    <div class="add">
                        <span class="addBtn" v-if="!food.count" @click="addFood">
                            加入购物车
                        </span>
                        <CartControl v-else :food="food"></CartControl>
                    </div>
                </div>

                <BreakLine v-if="food.info"></BreakLine>

                <div class="desc item" v-if="food.info">
                    <h2 class="title">
                        商品介绍
                    </h2>
                    <p class="info">
                        {{food.info}}
                    </p>
                </div>
                <div class="ratingListWrap">
                     <h2 class="title">
                        商品评价
                    </h2>
                    <RatingList :ratings="this.food.ratings"></RatingList>
                </div>
                
            </div>
          
             <span class="icon-arrow_lift" @click.stop="toggleShow"></span>
        </div>
       
        
       
    </transition>
</template>

<script>
import BScroll from "better-scroll";
import CartControl from "@/components/common/cartControl/cartControl";
import BreakLine from "@/components/common/breakLine"
import Rating from "@/components/goods/rating"
import RatingList from "@/components/common/ratingList"

export default {
  name: "goodsDetail",
  data() {
    return {
      showDetail: false,
      selectedType: 2,
      POSITIVE: 0,
      NAGETIVE: 1,
      ALL: 2,
      seeIfContent: true
    };
  },
  components: {
    CartControl,
    BreakLine,
    Rating,
    RatingList
  },
  props: {
    food: {
      type: Object
    }
  },
//   computed: {
//       curRating () {
//           if(this.selectedType === this.ALL) {
//               return this.seeIfContent ? this.ratingFilter(this.allRatings) : this.allRatings;
//           } else if (this.selectedType === this.posRatings) {
//               return this.seeIfContent ? this.ratingFilter(this.posRatings) : this.posRatings;
//           } else {
//               return this.seeIfContent ? this.ratingFilter(this.nagRatings) : this.nagRatings;
//           }
//       },
//       allRatings () {
//           return this.food.ratings ? this.food.ratings : [];
//       },
//       posRatings () {
//           let ratings = [];
//           this.food.ratings.forEach(rating => {
//               if ( rating.rateType === this.POSITIVE ) {
//                   ratings.push(rating);
//               }
//           });
//           return ratings;
//       },
//       nagRatings () {
//            let ratings = [];
//           this.food.ratings.forEach(rating => {
//               if ( rating.rateType === this.NAGETIVE ) {
//                   ratings.push(rating);
//               }
//           });
//           return ratings;
//       }
    
//   },
  methods: {
    //   ratingFilter (ratings) {
    //       return ratings.filter( rating => rating.text);
    //   },
    //   toggleSee () {
    //       this.seeIfContent = !this.seeIfContent;
    //       this.$nextTick(() => {
    //         if (! this.scroll ) {
               
    //             this.scroll = new BScroll(this.$refs.goodsDetail, {
    //                 click: true
    //             });
    //         } else {
                
    //             this.scroll.refresh();
    //         }
        
    //     });

    //   },
    //   toggleType (type) {
    //       this.selectedType = type;
    //   },
    toggleShow(event) {
        // this.seeIfContent = !this.seeIfContent;
        
      this.showDetail = !this.showDetail;
        if(this.showDetail) {
            if (!this.seeIfContent) {
                this.seeIfContent = true;
            }
        }
      this.$nextTick(() => {
        if (! this.scroll ) {
           
            this.scroll = new BScroll(this.$refs.goodsDetail, {
                click: true
            });
        } else {
           
            this.scroll.refresh();
        }
     
      });
    },
    addFood(event) {
      if (!event._constructed) {
        return;
      }
      this.$set(this.food, "count", 1);
    }
  },
  mounted() {
    //   console.log("mounted")
    // this.$nextTick(() => {
    //     if (! this.BScroll ) {
    //         this.BScroll = new BScroll(this.$refs.goodsDetail, {
    //             click: true
    //         });
    //     } else {
    //         this.BScroll.refresh();
    //     }
     
    // });
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/style/mixin";

.goodsDetail {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 56px;
  width: 100%;
//   height: 100%;
  background-color: #fff;

  .content {
      .item {
          padding: 18px;
      }
    .img {
      position: relative;
      width: 100%;
      padding-top: 100%;

      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }

    .msg {
      position: relative;

      .name {
        font-size: 14px;
        line-height: 14px;
        font-weight: 700;
      }

      .sell {
        margin: 8px 0 18px 0;

        .count,
        .rate {
          color: rgb(147, 153, 159);
          font-size: 10px;
        }

        .count {
          margin-right: 10px;
        }
      }

      .price {
        .cur {
          font-size: 14px;
          color: rgb(240, 20, 20);
          font-weight: 700;
          line-height: 24px;
        }

        .old {
          font-size: 10px;
          color: rgb(147, 153, 159);
          font-weight: 700;
          line-height: 24px;
        }
      }

      .add {
        position: absolute;
        right: 18px;
        bottom: 18px;

        .addBtn {
          font-size: 10px;
          line-height: 24px;
          box-sizing: border-box;
          color: #fff;
          padding: 0 12px;
          background-color: rgb(0, 160, 220);
          border-radius: 24px;
          height: 24px;
          display: inline-block;
        }
      }
    }

    .desc {
        .title {
            font-weight: bold;
        }

        .info {
            margin-top: 6px;
            padding: 0 8px;
            font-size: 12px;
            line-height: 24px;
            font-weight: 200;
            color: rgb(77, 85, 93);
        }
    }

    .title {
        padding-left: 18px;
        font-weight: bold;
    }


   

  }

  .icon-arrow_lift {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #fff;
  }
}

.goodsDetail-enter,
.goodsDetail-leave-to {
  transform: translateX(100%);
}

.goodsDetail-enter-active,
.goodsDetail-leave-active {
  transition: 0.3s;
}
</style>
