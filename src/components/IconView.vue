<template>
  <div>
     <i class="iconfont icon-container" :class="fontClass"></i>
  </div>
</template>

<script>
const classMap={
    home:"iconzhuye",
    success:"iconzhengque",
    error:"iconcuowu",
    close:"iconguanbi",
    warn:"iconjinggao",
    info:"iconxinxi",
    blog:"iconblog",
    code:"iconcode",
    about:"iconset_about_hov",
    weixin:"iconweixin",
    mail:"iconemail",
    github:"icongithub",
    qq:"iconsign_qq",
    arrowUp:"iconiconfonticonfonti2copy",
    arrowDown:"iconiconfonticonfonti2",
    empty:"iconempty",
    chat:"iconliuyan"
};
export default {
    props:{
        type:{
            type:String,
            require:true
        }
    },
    computed:{
        fontClass(){
            return classMap[this.type];
        }
    }
}
</script>

<style scoped lang="scss">
@import '~@/styles/font.css';
.icon-container{
    color: inherit;
    font-size: inherit;
}
</style>