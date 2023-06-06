<template>
  <div class="carouselitem-container" ref="container" 
  @mousemove="handleMouseMove"
  @mouseleave="handleMouseLeave">
    <div class="imageloader-container" ref="image" :style="imagePosition">
      <ImageLoader @load="showWords" :src="carousel.bigImg" :placeholder="carousel.midImg"/>
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from '@/components/ImageLoaderView';
export default {
  props:['carousel'],
  data(){
    return{
      titleWidth:0,
      descWidth:0,
      containerSize:0, //外层容器的尺寸
      innerSize:0, //里层图片的尺寸
      mouseX:0, //鼠标的横坐标
      mouseY:0 //鼠标的纵坐标
    }
  },
  components:{
    ImageLoader
  },
  mounted(){
    this.titleWidth=this.$refs.title.clientWidth;
    this.descWidth=this.$refs.desc.clientWidth;
    this.setSize();
    this.mouseX=this.mousecenter.x;
    this.mouseY=this.mousecenter.y;
    window.addEventListener("resize",this.setSize);
  },
  destroyed(){
    window.removeEventListener("resize",this.setSize)
  },
  methods:{
    //调用该方法显示文字
    showWords(){
      //标题
      this.$refs.title.style.opacity=1;
      this.$refs.title.style.width=0;
      //强制渲染一次
      this.$refs.title.clientWidth; //reflow
      this.$refs.title.style.width=this.titleWidth + 'px';
      this.$refs.title.style.transition="1s";
      //描述
      this.$refs.desc.style.opacity=1;
      this.$refs.desc.style.width=0;
      //强制渲染一次
      this.$refs.desc.clientWidth; //reflow
      this.$refs.desc.style.width=this.descWidth + 'px';
      this.$refs.desc.style.transition="1s 1s";
    },
    setSize(){
      this.containerSize={
        width:this.$refs.container.clientWidth,
        height:this.$refs.container.clientHeight
      },
      this.innerSize={
        width:this.$refs.image.clientWidth,
        height:this.$refs.image.clientHeight
      }
    },
    //鼠标移动事件
    handleMouseMove(e){
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX=e.clientX - rect.left;
      this.mouseY=e.clientY - rect.top;
    },
    //鼠标离开事件
    handleMouseLeave(){
      this.mouseX=this.mousecenter.x;
    this.mouseY=this.mousecenter.y;
    }
  },
  computed:{
    //得到图片的坐标
    imagePosition(){
      if(!this.innerSize || !this.containerSize){
        return;
      }
      const extraWidth=this.innerSize.width - this.containerSize.width;//多出的宽度
      const extraHeight=this.innerSize.height - this.containerSize.height;//多出的高度
      const left = -extraWidth / this.containerSize.width * this.mouseX;
      const top=-extraHeight / this.containerSize.height * this.mouseY;
      return {
        transform:`translate(${left}px,${top}px)`
      };
    },
    mousecenter(){
      return{
        x:this.containerSize.width / 2,
        y:this.containerSize.height / 2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.carouselitem-container{
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
  
  .imageloader-container{
    width: 110%;
    height: 110%;
    position: absolute;
    top: 0;
    left:0;
    transition: .3s;

  }
  .title,.desc{
    position: absolute;
    left: 30px;
    letter-spacing: 3px;
    text-shadow: 1px 0 0 rgba(0,0,0,.5),-1px 0 0 rgba(0,0,0,.5),0 1px 0 rgba(0,0,0,.5),0 -1px 0 rgba(0,0,0,.5);
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .title{
    top:calc(50% - 40px);
    font-size: 2em;
  }
  .desc{
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten($gray, 20%);
  }
}
</style>>