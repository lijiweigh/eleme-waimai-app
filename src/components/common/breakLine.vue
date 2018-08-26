<template>
    <div class="breakLine"></div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "../../common/style/mixin.scss";
.breakLine {
    width: 100%;
    height: 16px;
    background-color: #f3f5f6;
    @include border-1px(rgba(7, 17, 27, .1), top);
     @include border-1px(rgba(7, 17, 27, .1), bottom);
}
</style>
