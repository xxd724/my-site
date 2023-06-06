<template>
  <div class="bloglist-container" ref="blogcontainer" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <router-link :to="{
            name:'DetailView',
            params:{
              id:item.id
            }
          }">
            <img
              v-lazy="item.thumb"
              :alt="item.title"
              :title="item.title"
            />
          </router-link>
        </div>
        <div class="main">
          <router-link :to="{
            name:'DetailView',
            params:{
              id:item.id
            }
          }">
            <h2>{{ item.title }}</h2>
          </router-link>
          <div class="aside">
            <span>日期：{{item.createDate}}</span>
            <span>浏览：{{item.scanNumber}}</span>
            <span>评论: {{ item.commentNumber }}</span>
            <router-link :to="{
              name:'CategoryBlogView',
              params:{
                categoryId:item.category.id
              }
            }" class="">{{ item.category.name }}</router-link>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <EmptyView v-if="data.rows.length === 0 && !isLoading"/>
    <!--分页 -->
    <Pager v-if="data.total" :current="routeInfo.page" :total="data.total" :limit="routeInfo.limit" :visibleNumber="10" @pageChange="handlePageChange"/>
  </div>
</template>

<script>
import Pager from "@/components/PagerView.vue";
import fetchData from "@/mixins/fetchData";
import mainScroll from '@/mixins/mainScroll';
import blogs from "@/api/blog";
import EmptyView from "@/components/EmptyView";
export default {
  mixins: [fetchData({total:0,rows:[]}),mainScroll('blogcontainer')],
  data() {
    return {};
  },
  components: {
    Pager,
    EmptyView
  },
  watch:{
   async $route(){
      this.isLoading=true;
      this.$refs.blogcontainer.scrollTop=0;
      this.data=await this.fetchData();
      this.isLoading=false;
    }
  },
  // mounted(){
  //   this.$bus.$on("setMainScroll",this.setMainScroll);
  //   this.$refs.blogcontainer.addEventListener("scroll",this.handleScroll)
  // },
  // destroyed(){
  //   this.$bus.$off("setMainScroll",this.setMainScroll);
  //   this.$refs.blogcontainer && this.$refs.blogcontainer.removeEventListener("scroll",this.handleScroll);
  //   this.$bus.$emit("mainScroll");
  // },
  computed:{
    routeInfo(){
      const categoryId = +this.$route.params.categoryId || -1;
      const page= +this.$route.query.page || 1;
      const limit= +this.$route.query.limit || 10;
      return{
        categoryId,
        page,
        limit
      }
    }
  },
  methods: {
    async fetchData() {
      return await blogs.getBlogs(this.routeInfo.page,this.routeInfo.limit,this.routeInfo.categoryId);
    },
    handlePageChange(newPage){
      const query={
        page:newPage,
        limit:this.routeInfo.limit
      }
      if(this.routeInfo.categoryId === -1){
          this.$router.push({
            name:'BlogView',
            query
          })
      }else{
          this.$router.push({
            name:"CategoryBlogView",
            query,
            params:{
              categoryId:this.routeInfo.categoryId
            }
          })
      }
    },
    // handleScroll(){
    //   this.$bus.$emit("mainScroll",this.$refs.blogcontainer);
    // },
    // setMainScroll(data){
    //   this.$refs.blogcontainer.scrollTop=data;
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variable.scss";
.bloglist-container {
  width: 100%;
  height: 100%;
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  scroll-behavior: smooth;
  // border-right: 1px solid $gray;
  // &::-webkit-scrollbar{
  //       display: none;
  //   } 
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid $gray;
      .thumb {
        flex: 0 0 auto;
        margin-right: 15px;
        img {
          display: block;
          max-width: 200px;
          border-radius: 5px;
        }
      }
      .main {
        flex: 1 1 auto;
        h2 {
          margin: 0;
        }
      }
      .aside {
        font-size: 12px;
        color: $gray;
        span {
          margin-right: 15px;
        }
      }
      .desc {
        margin: 15px 0;
        font-size: 14px;
      }
    }
  }
}
</style>