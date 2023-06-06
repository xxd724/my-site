<template>
  <div class="home-container" ref="container" @wheel="handleWheel" v-loading="loading">
    <ul class="carousel-container"  :style="{marginTop}" @transitionend="handleTransitioned">
      <li v-for="item in data" :key="item.id">
        <Carouselitem :carousel="item"/>
      </li>
    </ul>
    <div v-show="currentIndex >= 1" class="icon icon-up" @click="switchTo(currentIndex - 1)">
      <Icon type="arrowUp" />
    </div>
    <div v-show="currentIndex < data.length - 1" class="icon icon-down" @click="switchTo(currentIndex + 1)">
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        v-for="(item, index) in data"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="switchTo(index)"
      ></li>
    </ul>
    <!-- <Loading v-if="isLoading"/> -->
  </div>
</template>

<script>
import { getBanners } from "@/api/banner";
import Carouselitem from "./CarouselitemView";
import Icon from "@/components/IconView";
// import fetchData from '@/mixins/fetchData';
import {mapState} from 'vuex'
export default {
  name: "HomeView",
  // mixins:[fetchData([])], //组件混入
  data() {
    return {
      // isLoading:true,
      // banners: [],
      currentIndex: 0, //当前显示的轮播图
      containerHeight:0, //整个容器的高度
      switching:false //是否正在切换中
    };
  },
  components: {
    Carouselitem,
    Icon,
    // Loading
  },
  // async created() {
  //   this.banners = await getBanners();
  //   this.isLoading=false;
  // },
  created(){
    this.$store.dispatch('banner/fetchBanner');
  },
  mounted(){
    //获取整个容器的高度
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize",this.handleResize)
  },
  destroyed(){
    window.removeEventListener("resize",this.handleResize);
  },
  methods: {
    switchTo(i){
      this.currentIndex=i;
    },
    //鼠标滚动事件
    handleWheel(e){
      e.preventDefault();
      if(this.switching){
        return;
      }
      if(e.deltaY < -5 && this.currentIndex > 0){
        //往上滚动
        this.switching=true;
        this.currentIndex--;
      }else if(e.deltaY > 5 && this.currentIndex < this.data.length -1){
        //往下滚动
        this.switching=true;
        this.currentIndex++;
      }
    },
    //过渡效果结束事件
    handleTransitioned(){
      this.switching=false;
    },
    handleResize(){
      this.containerHeight = this.$refs.container.clientHeight;
    },
    async fetchData(){
      return await getBanners();
    }
  },
  computed: {
    //计算滑动到哪张轮播图
    ...mapState('banner',['loading','data']),
    marginTop(){
      return -this.currentIndex * this.containerHeight + 'px';
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variable.scss";
@import "~@/styles/mixin.scss";
.home-container {
  width: 100%;
  height: 100%;
  // background-color: #000;
  position: relative;
  overflow: hidden;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    &.carousel-container {
      width: 100%;
      height: 100%;
      transition: 500ms;
      li{
        width: 100%;
        height: 100%;
      }
    }
    &.indicator {
      @include self-center();
      left: auto;
      right: 20px;
      li {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: $words;
        border: 1px solid #fff;
        cursor: pointer;
        margin-bottom: 10px;
        box-sizing: border-box;
        &.active{
          background-color: #fff;
        }
      }
    }
  }
  .icon {
    @include self-center();
    font-size: 30px;
    color: $gray;
    cursor: pointer;
    $gap: 25px;
    transform: translate(-50%);
    &.icon-up {
      top: $gap;
      animation: jump-up 2s infinite;
    }
    &.icon-down {
      top: auto;
      bottom: $gap;
      animation: jump-up 2s infinite;
    }
    $jump: 5px;
    @keyframes jump-up {
      0% {
        transform: translate(-50%, $jump);
      }
      50% {
        transform: translate(-50%, -$jump);
      }
      100% {
        transform: translate(-50%, $jump);
      }
    }
    @keyframes jump-down {
      0% {
        transform: translate(-50%, -$jump);
      }
      50% {
        transform: translate(-50%, $jump);
      }
      100% {
        transform: translate(-50%, -$jump);
      }
    }
  }
}
</style>