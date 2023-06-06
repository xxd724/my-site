<template>
  <div class="blogcategory-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <Cataloglist :list="list" @select="handleSelect"/>
  </div>
</template>

<script>
import Cataloglist from './CataloglistView';
import fetchData from '@/mixins/fetchData';
import blogs from "@/api/blog";
export default {
  mixins:[fetchData([])],
  components:{
    Cataloglist
  },
  computed:{
    categoryId(){
      return +this.$route.params.categoryId || -1;
    },
    limit(){
      return +this.$route.query.limit || 10;
    },
    list(){
      const total=this.data.reduce((a,b)=>a + b.articleCount,0);
      const result=[
        {name:"全部",id:-1,articleCount:total},
        ...this.data
      ];
      return result.map(item=>({
        ...item,
        isSelect:item.id === this.categoryId,
        aside:`${item.articleCount}篇`
      }));
    }
  },
  methods:{
    async fetchData(){
      return await blogs.getBlogTypes();
    },
    handleSelect(item){
      const query={
        page:1,
        limit:this.limit
      };
      if(item.id === -1){
        this.$router.push({
          name:"BlogView",
          query
        })
      }else{
        this.$router.push({
            name:"CategoryBlogView",
            query,
            params:{
              categoryId:item.id
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.blogcategory-container{
    width: 300px;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    overflow-y: auto;
    &::-webkit-scrollbar{
      display: none;
    }
    h2{
      font-weight: bold;
      letter-spacing: 3px;
    }
}
</style>