<template>
  <div class="app">
    <Layout>
      <template #left>
        <div class="left">
          <SiteAside/>
        </div>
      </template>
      <template #default>
        <router-view/>
      </template>
    </Layout>
    <ToTop/>
  </div>
</template>
<script>
import Layout from '@/components/LayoutView'
import SiteAside from '@/components/siteaside/SiteAsideView'
import ToTop from '@/components/ToTopView'
export default{
  data(){
    return{

    }
  },
  components:{
    Layout,
    SiteAside,
    ToTop
  },
  methods:{

  }
}
</script>
<style scoped lang="scss">
@import '~@/styles/mixin.scss';
*{
  margin: 0;
  padding: 0;
}
.app{
  @include self-fill(fixed);
  .left{
    width: 250px;
    height: 100%;
  }
}
</style>
