<template>
  <div class="detail-container">
    <Layout>
        <div class="main-container" ref="mainContainer" v-loading="isLoading">
            <BlogDetail :blog="data" v-if="data"/>
            <BlogComment v-if="!isLoading"/>
        </div>
        <template #right>
            <div class="right-container" v-loading="isLoading">
                <BlogToc :toc="data.toc" v-if="data"/>
            </div>
        </template>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/LayoutView';
import BlogDetail from './BlogDetailView';
import BlogToc from './BlogTOCView';
import fetchData from '@/mixins/fetchData';
import mainScroll from '@/mixins/mainScroll';
import blogs from '@/api/blog';
import BlogComment from './BlogCommentView';
import { titleController } from '@/utils';
export default {
    mixins:[fetchData(null),mainScroll('mainContainer')],
    components:{
        Layout,
        BlogDetail,
        BlogToc,
        BlogComment
    },
    // mounted(){
    //     this.$bus.$on("setMainScroll",this.handlersetScroll);
    //     this.$refs.mainContainer.addEventListener("scroll",this.handlerscroll);
    // },
    // destroyed(){
    //     this.$refs.mainContainer &&  this.$refs.mainContainer.removeEventListener("scroll",this.handlerscroll);
    //     this.$bus.$off("setMainScroll",this.handlersetScroll);
    //     this.$bus.$emit("mainScroll");
    // },
    updated(){
        const hash=location.hash;
        location.hash='';
        setTimeout(()=>{
            location.hash=hash;
        },50)
    },
    methods:{
        async fetchData(){
            const res= await blogs.getBlog(this.$route.params.id);
            if(!res){
                this.$router.push("/404");
                return;
            }
            titleController.setRouteTitle(res.title);
            return res;
        },
        // handlerscroll(){
        //     this.$bus.$emit('mainScroll',this.$refs.mainContainer);
        // },
        // handlersetScroll(data){
        //     this.$refs.mainContainer.scrollTop=data;
        // }
    }

}
</script>

<style lang="scss" scoped>
.detail-container{
    width: 100%;
    height: 100%;
    .main-container{
        position: relative;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        scroll-behavior: smooth;
        box-sizing: border-box;
        padding: 20px;
        // &::-webkit-scrollbar{
        //     display: none;
        // }
    }
    .right-container{
        position: relative;
        width: 300px;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        box-sizing: border-box;
        padding: 20px;
        scroll-behavior: smooth;
        // &::-webkit-scrollbar{
        //     display: none;
        // }
    }
}
</style>