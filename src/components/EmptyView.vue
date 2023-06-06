<template>
  <div class="empty-container">
    <Icon type="empty" class="icon-container"/>
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Icon from '@/components/IconView.vue'
export default {
    props:{
        text:{
            type:String,
            default:"无数据"
        }
    },
    components:{
        Icon
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/styles/variable.scss';
    @import '~@/styles/mixin.scss';
    .empty-container{
        @include self-center();
        color:$gray;
        text-align: center;
    }
    .icon-container{
        font-size: 72px;
    }
</style>