<template>
   
    <div class="seller-wrap" ref="seller">
        <div class="seller">
            <div class="desc" v-if="seller.score">
                <div class="collect" @click="toggleCollect">
                    <span class="icon-favorite" :class="{'active':isCollect}"></span>
                    <div class="text" v-if="isCollect">已收藏</div>
                    <div class="text" v-else>收藏</div>
                </div>
                <div class="name">
                    {{seller.name}}
                </div>
                <div class="star-wrap">
                    <Star :size="36" :score="seller.score"></Star>
                    <span class="ratingCount">
                    ({{seller.ratingCount}}) 
                    </span> 
                    <span class="sellCount">
                        月售{{seller.sellCount}}单
                    </span>
                    <i></i>
                </div>
                <div class="bottom">
                    <div class="minPrice">
                        <div class="text">
                            起送价
                        </div>
                        <div class="price">
                            <span class="value">{{seller.minPrice}}</span>元
                        </div>
                    </div>
                    <div class="delivery">
                        <div class="text">
                            商家配送
                        </div>
                        <div class="price">
                            <span class="value">{{seller.deliveryPrice}}</span>元
                        </div>
                    </div>
                    <div class="deliveryTime">
                        <div class="text">
                            平均配送时间
                        </div>
                        <div class="price">
                            <span class="value">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </div>
                </div>
            </div>
            <BreakLine></BreakLine>

            <div class="bulletin">
                <div class="name">公告与活动</div>
                <p class="content">
                    {{seller.bulletin}}
                </p>
                <div class="list">
                    <div class="listItem" v-for="(item, index) in seller.supports" :key="index">
                        <span :class="iconlist[item.type]"></span>
                        <i>{{item.description}}</i>
                    </div>
                </div>
            </div>

            <BreakLine></BreakLine>

            <div class="imgs">
                 <div class="name">商家实景</div>
                <div ref="imgWrap">
                     <div class="imgWrap" :style="imgWrapWidth">
                        <img class="imgItem" :src="img" width="120" height="90" alt=""  v-for="(img, index) in seller.pics" :key="index">
                    </div>
                </div>
            </div>

            <BreakLine></BreakLine>

            <div class="msg">
                 <div class="name">商家信息</div>
                 <div class="infos">
                     <div class="infoItem" v-for="(info, index) in seller.infos" :key="index">
                         {{info}}
                     </div>
                 </div>
            </div>

        </div>
    </div>
    
</template>

<script>
import Star from "@/components/common/star/star"
import BreakLine from "@/components/common/breakLine"
import BScroll from "better-scroll"
const imgwidth = 126;
export default {
    name: 'seller',
    data () {
        return {
            isCollect: false,
            iconlist: ['decrease_2','discount_2','special_2','invoice_2','guarantee_2']
            
        }
    },
    computed: {
        imgWrapWidth () {
            if(this.seller.pics) {
                return {"width":imgwidth * this.seller.pics.length + "px"};
            }
            
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
        BScroll
    },
    methods: {
        toggleCollect () {
            this.isCollect = !this.isCollect;
        }
    },
    mounted() {
        this.$nextTick(() => {
           if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.seller,{
                    click: true
                })
           } else {
               this.scroll.refresh();
           }

            if (!this.imgScroll) {
               
                 this.imgScroll = new BScroll(this.$refs.imgWrap,{
                    click: true,
                    freeScroll: true,
                    scrollX: true,
                    eventPassthrough: 'vertical'
                })
           } else {
              
               this.imgScroll.refresh();
           }

        })
    },
}
</script>

<style lang="scss" scoped>
@import "../common/style/mixin";
.seller-wrap {
    position: fixed;
    top: 175px;
    left: 0;
     bottom: 56px;
     width: 100%;
    overflow: hidden;
}
.seller {
     .name{
            font-size: 14px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-weight: bold;
        }
    .desc {
        position: relative;
        padding: 18px;
        padding-bottom: 0;
        .collect {
            position: absolute;
            top: 18px;
            right: 18px;
            padding: 5px;
            text-align: center;
            .icon-favorite {
                font-size: 24px;
                line-height: 24px;
            }
            .active {
                color: rgb(240, 20, 20)
            }
            .text {
                color: rgb(77, 85, 93);
                font-size: 10px;
                line-height: 10px;
                margin-top: 4px;
            }
        }
        
        // .name{
        //     font-size: 14px;
        //     line-height: 14px;
        //     color: rgb(7, 17, 27);
        // }

        .star-wrap {
            padding: 8px 0 18px;
            @include border-1px(rgba(7,17,27,.1), bottom);

            i {
                height: 100%;
                width: 0;
                vertical-align: middle;
            }
            .star {
                display: inline-block;
                vertical-align: middle;
                // line-height: 18px;  
            }
            .ratingCount {
                margin: 0 12px  0 8px;
                 
            }
            .ratingCount,
            .sellCount {
                font-size: 10px;
                // line-height: 18px;  
                color: rgb(77, 85, 93);
                //  vertical-align: middle;
            }
        }

        .bottom {
            display: flex;

            .minPrice,
            .delivery,
            .deliveryTime {
                flex: 1;
                text-align: center;
                margin: 18px 0;

                .text{
                    font-size: 10px;
                    line-height: 10px;
                    color: rgb(147, 153, 159);
                    margin-bottom: 8px;
                }

                .price {
                    font-size: 10px;
                    line-height: 24px;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                    .value {
                        font-size: 24px;
                    }
                }
            }

            .minPrice,
            .delivery {
                @include border-1px(rgba(7,17,27,.1), right);
            }

            
            
        }
    }

    .bulletin {
        padding: 18px;

        .content {
            
            padding: 8px 12px 16px;
            color: rgb(240, 20, 20);
            font-size: 12px;
            line-height: 24px;
            font-weight: 200;
        }

        .listItem {
            @include border-1px(rgba(7,17,27,.1), top);
            padding: 16px 12px;
            font-size: 12px;
            line-height: 16px;
            // font-weight: 200;
            color: rgb(7,17,27);
            &>span {
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 6px;
                background-size: 16px 16px;
                vertical-align: middle;
            }
            &>i{
                font-style: normal;
                vertical-align: middle;
            }
            .decrease_2 {
                @include bg-img("../components/seller/decrease_2");
            }
            .discount_2 {
                @include bg-img("../components/seller/discount_2");
            }
            .special_2 {
                @include bg-img("../components/seller/special_2");
            }
            .invoice_2 {
                @include bg-img("../components/seller/invoice_2");
            }
            .guarantee_2 {
                @include bg-img("../components/seller/guarantee_2");
            }
        }
    }

    .imgs {
        padding: 18px;
        .imgWrap {
            height: 90px;
            min-width: 100%;
            // width: 1000px;
            margin-top: 12px;
            font-size: 0;
            .imgItem {
                // display: inline-block;
                margin-right: 6px;
                float: left;
            }
        }
    }

     .msg {
        padding: 18px;

        .infos {
            margin-top: 12px;
        }

        .infoItem {
            padding: 16px 12px;
            @include border-1px(rgba(7,17,27,.1),top);
            font-size: 12px;
            line-height: 16px;
            color: rgb(7, 17, 27);
        }
    }

}
</style>

