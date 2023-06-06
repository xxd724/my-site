<template>
  <div class="loading-container">
    <!-- <img src="@/assets/loading.svg" alt=""> -->
    <img :src="loadingUrl" alt="">
  </div>
</template>

<script>
import loadingUrl from '@/assets/loading.svg';
export default {
    data(){
        return{
            loadingUrl
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.loading-container{
    @include self-center();
}
</style>