<template>
  <div class="blog-container">
    <Layout>
      <Bloglist/>
      <template #right>
        <Blogcategory/>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/LayoutView'
import Bloglist from './BlogListView'
import Blogcategory from './BlogCategoryView'

export default {
    name:'BlogView',
    data(){
        return{
        }
    },
    components:{
      Layout,
      Bloglist,
      Blogcategory
    },
    methods:{
    },
    computed:{

    }
}
</script>

<style lang="scss" scoped>
.blog-container{
  width: 100%;
  height: 100%;
}
</style>