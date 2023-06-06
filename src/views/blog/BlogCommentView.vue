<template>
  <div class="blog-comment-container">
    <MessageArea title="评论列表" :subTitle="`(${data.total})`" :list="data.rows" :isListLoading="isLoading" @submit="handleSubmit"/>
  </div>
</template>

<script>
import MessageArea from '@/components/messagearea/MessageAreaView';
import fetchData from '@/mixins/fetchData';
import blogs from '@/api/blog';
export default {
  mixins:[fetchData({total:0,rows:[]})],
  data(){
    return{
      page:1,
      limit:10
    }
  },
  components:{
    MessageArea
  },
  created(){
    this.$bus.$on("mainScroll",this.handleScroll);
  },
  destroyed(){
    this.$bus.$off("mainScroll",this.handleScroll);
  },
  computed:{
    hasMore(){
      return this.data.rows.length < this.data.total;
    }
  }, 
  methods:{
    async fetchData(){
      return  await blogs.getComments(this.$route.params.id,this.page,this.limit);
    },
    async handleScroll(dom){
      if(this.isLoading || !dom){
        return;
      }
      const range=100;
      const dec=Math.abs((dom.scrollTop + dom.clientHeight) - dom.scrollHeight);
      if(dec <= range){
        await this.fetchMore();
      }
    },
    //加载下一页
    async fetchMore(){
      if(!this.hasMore){
        return;
      }
      this.page++;
      this.isLoading=true;
      const res=await this.fetchData();
      this.data.total=res.total;
      this.data.rows=this.data.rows.concat(res.rows);
      this.isLoading=false;
    },
    async handleSubmit(formData,callback){
        const result=await blogs.postComment({
          blogId:this.$route.params.id,
          ...formData
        });
        this.data.rows.unshift(result);
        this.data.total++;
        callback('评论成功');
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-comment-container{
  margin: 30px 0;
}
</style>