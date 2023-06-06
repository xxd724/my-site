<template>
  <div class="home-container" v-loading="loading || (data && !srcLoaded)">
    <iframe v-if="data" :src="data" frameborder="0" class="iframe-container" @load="srcLoaded = true"></iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:'AboutView',
    data(){
        return{
          srcLoaded:false
        }
    },
    created(){
      this.$store.dispatch('about/fetchAbout');
    },
    components:{

    },
    methods:{

    },
    computed:{
      ...mapState('about',['loading','data'])
    }
}
</script>

<style lang="scss" scoped>
.home-container{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .iframe-container{
    width: 100%;
    height: 100%;
    display: block;
    box-sizing: border-box;
  }
}
</style>