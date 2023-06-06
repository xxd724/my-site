<template>
  <div class="toc-container">
    <h2>目录</h2>
    <Cataloglist :list="tocWithSelect" @select="handleSelect"/>
  </div>
</template>

<script>
import Cataloglist from './CataloglistView';
import { debounce } from '@/utils';
export default {
    props:{
        toc:{
            type:Array
        }
    },
    data(){
        return{
            activeAnchor:""
        }
    },
    components:{
        Cataloglist
    },
    created(){
        this.setSelectDebounce=debounce(this.setSelect,50);
        this.$bus.$on('mainScroll',this.setSelectDebounce);
    },
    destroyed(){
        this.$bus.$off("mainScroll",this.setSelectDebounce);
    },
    computed:{
        tocWithSelect(){
            // 根据toc属性以及activeAnchor得到带有isSelect属性的toc数组
            const getToc=(toc=[])=>{
               return toc.map((t)=>({
                ...t,
                isSelect:t.anchor === this.activeAnchor,
                children:getToc(t.children)
               }))
            }
            return getToc(this.toc);
        },
        // 根据toc得到它们对应的元素数组
        doms(){
            const doms=[];
            const addDoms=(toc)=>{
                for (const t of toc) {
                    doms.push(document.getElementById(t.anchor));
                    if(t.children && t.children.length){
                        addDoms(t.children);
                    }
                }
            }
            addDoms(this.toc);
            return doms;
        }
    },
    methods:{
        handleSelect(item){
            location.hash=item.anchor;
        },
        setSelect(scrollDom){
            if(!scrollDom){
                return;
            }
             // 设置activeAnchor为正确的值
             this.activeAnchor="";   // 由于后续要重新设置，先清空之前的状态
             const range=150; //某一范围的值
             for (const dom of this.doms) {
                if(!dom){
                    continue;
                }
                 // 得到元素离视口顶部的距离
                 const top =dom.getBoundingClientRect().top;
                 if(top >= 0 && top <= range){
                    // 在规定的范围内
                    this.activeAnchor=dom.id;
                    return;
                 }else if(top > range){
                    //在规定范围的下方
                    return;
                 }else{
                    //在规定范围的上方
                    this.activeAnchor=dom.id;
                 }
             }
        }
    }
}
</script>

<style lang="scss" scoped>
.toc-container{
    h2{
      font-weight: bold;
      letter-spacing: 3px;
    }
}
</style>