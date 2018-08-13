<template>
  <div class="star">
    <span class="star-item" :class="[`star-${size}`,item]" v-for="(item, index) in classList" :key="index"></span>
  </div>
</template>

<script>
const HALF = '_half';
const ON = '_on';
const OFF = '_off';
const STAR_NUM = 5;
export default {
  props: {
    size: {
      type: Number,
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  },
  computed: {
    classList() {
      const ons = Math.floor(this.score);
      const half = Math.round(this.score - ons);
      
      let list = [];
      for (let i=0;i<ons;i++) {
        list.push(`star${ON}`);
      }
      
      if (half) {
        list.push(`star${HALF}`);
      }
      
      while(list.length < STAR_NUM){
        list.push(`star${OFF}`)
      }
     
      return list;
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../../common/style/mixin.scss';

.star{
  .star-item{
    display: inline-block;
    &.star-48{
      width: 20px;
      height: 20px;
      margin-right: 20px;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      &.star_half{
        @include bg-img('star48_half');
      }
      &.star_on{
        @include bg-img('star48_on');
      }
      &.star_off{
        @include bg-img('star48_off');
      }
    }
     &.star-36{
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      &.star_half{
        @include bg-img('star36_half');
      }
      &.star_on{
        @include bg-img('star36_on');
      }
      &.star_off{
        @include bg-img('star36_off');
      }
    }
     &.star-24{
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      &.star_half{
        @include bg-img('star24_half');
      }
      &.star_on{
        @include bg-img('star24_on');
      }
      &.star_off{
        @include bg-img('star24_off');
      }
    }
  }
}
</style>
