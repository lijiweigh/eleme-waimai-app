<template>
    <div class="rating">
        <div class="top">
            <div class="date">{{rating.rateTime}}</div>
            <div class="user">
                {{rating.username}}
                <img class="avatar" :src="rating.avatar" />
            </div>
        </div>
        <div class="content">
            <span class=" icon-thumb_up" v-if="rating.rateType === POSITIVE"></span>
            <span class=" icon-thumb_down" v-else></span>
            {{rating.text}}
        </div>
    </div>
</template>

<script>
export default {
    name: "rating",
    props: {
        rating: {
            type: Object
        },
        seeIfContent: {
            type: Boolean
        }
    },
    data () {
        return {
            POSITIVE: 0,
            NAGETIVE: 1,
            ALL: 2
            
        }
    },
    computed: {
         curRating () {
            return this.seeIfContent ? this.ratingFilter(this.rating) : this.rating;
         }
    },
    methods: {
         ratingFilter (ratings) {
            return ratings.filter( rating => rating.text);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/mixin";
.rating {
    padding: 16px 18px;
     @include border-1px(rgba(7,17,27,.1), bottom);

    .top {
        display: flex;
        justify-content: space-between; 
        .date,
        .user {
            font-size: 10px;
            line-height: 12px;
            color: rgb(147, 153, 159);  
        }

        .avatar {
            margin-left: 6px;
            display: inline-block;
            width: 12px;
            height: 12px;
        }
    }

    .content {
        margin-top: 6px;
        font-size: 12px;
        line-height: 16px;
        color: rgb(7, 17, 27);
        .icon-thumb_up,
        .icon-thumb_down {
            font-size: 12px;
            line-height: 24px;
            margin-right: 4px;
        }
        .icon-thumb_up {
            color: rgb(0, 160, 220);
        }
         .icon-thumb_down {
            color: rgb(147, 153, 159);  
        }
    }

}
</style>
