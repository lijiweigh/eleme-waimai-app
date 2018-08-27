<template>
     <div class="ratings">
       

        <div class="type" v-if="this.ratings">
            <span class="all normal" :class="{'active':selectedType===ALL}" @click="toggleType(ALL)">
                {{textList[ALL]}}
                <span class="count">
                    {{this.allRatings.length}}
                </span>
            </span>
            <span class="positive normal" :class="{'active':selectedType===POSITIVE}" @click="toggleType(POSITIVE)">
                {{textList[POSITIVE]}}
                <span class="count">
                    {{this.posRatings.length}}
                </span>
            </span>
            <span class="nagetive normal" :class="{'active':selectedType===NAGETIVE}" @click="toggleType(NAGETIVE)">
                {{textList[NAGETIVE]}}
                <span class="count">
                    {{this.nagRatings.length}}
                </span>
            </span>
        </div>

        <div class="seeContent">
            <div class="inner" @click="toggleSee">
                <span class="icon-check_circle" :class="{'active':seeIfContent}"></span>只看有内容的评价
            </div>
        </div>

        <div class="ratingsList">
            <Rating :rating="rating" :seeIfContent="seeIfContent" v-for="(rating, index) in curRating" :key="index"></Rating>
        </div>

    </div>
</template>

<script>
import Rating from "@/components/goods/rating"
// import BScroll from "better-scroll";
export default {
    name: "ratingList",
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
      Rating
  },
  props: {
      ratings: {
          type: Array
      },
      textList: {
          type: Array,
          default () {
              return ["推荐","吐槽","全部"];
          }
      }
  },
   computed: {
      curRating () {
          if(this.selectedType === this.ALL) {
              return this.seeIfContent ? this.ratingFilter(this.allRatings) : this.allRatings;
          } else if (this.selectedType === this.POSITIVE) {
              return this.seeIfContent ? this.ratingFilter(this.posRatings) : this.posRatings;
          } else {
              return this.seeIfContent ? this.ratingFilter(this.nagRatings) : this.nagRatings;
          }
      },
      allRatings () {
          return this.ratings ? this.ratings : [];
      },
      posRatings () {
          let ratings = [];
          this.ratings.forEach(rating => {
              if ( rating.rateType === this.POSITIVE ) {
                  ratings.push(rating);
              }
          });
          return ratings;
      },
      nagRatings () {
           let ratings = [];
          this.ratings.forEach(rating => {
              if ( rating.rateType === this.NAGETIVE ) {
                  ratings.push(rating);
              }
          });
          return ratings;
      }
    
  },
  methods: {
       ratingFilter (ratings) {
          return ratings.filter( rating => rating.text);
      },
      toggleSee () {
          this.seeIfContent = !this.seeIfContent;
        //   this.$nextTick(() => {
        //     if (! this.scroll ) {
               
        //         this.scroll = new BScroll(this.$refs.goodsDetail, {
        //             click: true
        //         });
        //     } else {
                
        //         this.scroll.refresh();
        //     }
        
        // });

      },
      toggleType (type) {
          this.selectedType = type;
      },
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/mixin.scss";
 .ratings {
    
    .type {
        // display: inline-block;
        padding: 12px 18px 18px 18px;
        @include border-1px(rgba(7,17,27,.1), bottom);
        font-size: 0;
        .normal {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            border-radius: 2px;
            color: rgb(77, 85, 93);
            font-size: 12px;
            line-height: 16px;
            vertical-align: bottom;
            .count {
                font-size: 8px;
                    color: rgb(77, 85, 93);
            }

            &.active {
                color: #Fff;
                .count {
                    color: #fff;
                }
            }
        }
        .all,
        .positive {
            background-color: rgba(0, 160, 220, .2);
                &.active {
                background-color: rgb(0, 160, 220);
            }
        }
        .nagetive {
            background-color: rgba(77, 85, 93, .2);
                &.active {
                background-color: rgb(77, 85, 93);
            }
        }
    }

    .seeContent {
        @include border-1px(rgba(7,17,27,.1), bottom);
        .inner{
            padding: 12px 0 12px 18px;
            color: rgb(147, 153, 159);
            font-size: 12px;
            line-height: 24px;
        
            .icon-check_circle {
                color: rgb(147, 153, 159);
                font-size: 24px;
                line-height: 24px;
                margin-right: 4px;
                vertical-align: middle;
                &.active {
                    color: #00c850;
                }
            }
        }
        

    }
}
</style>
