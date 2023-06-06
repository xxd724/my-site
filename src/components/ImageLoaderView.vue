<template>
  <div class="imageloader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" alt="">
    <img class="origin" :src="src" alt="" :style="{opacity:originOpacity,transition:`${duration}ms`}" @load="handleLoad">
  </div>
</template>

<script>
export default {
    props:{
        src:{
            type:String,  //原始图片路径
            require:true
        },
        placeholder:{
            type:String, //占位图片路径
            require:true
        },
        duration:{
            type:Number, //原图加载完后切换到原图经过的毫秒数
            default:500
        }
    },
    data(){
        return{
            originLoaded:false, //原图是否加载完成
            everythingDone:false, //是否一切完成了
        }
    },
    methods:{
        handleLoad(){
            this.originLoaded=true;
            setTimeout(() => {
                this.everythingDone=true;
                this.$emit('load');
            }, this.duration);
        }
    },
    computed:{
        originOpacity(){
            return this.originLoaded ? 1 : 0;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.imageloader-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    img{
        @include self-fill();
        object-fit: cover;
    }
    .placeholder{
        filter: blur(2vw);
    }
}
</style>