<template>
  <div class="siteaside-container">
    <div class="avatar-container" v-if="data">
      <Avatar
        :url="data.avatar"
        :size="150"
      />
    </div>
    <div class="subtitle" v-if="data">{{ data.siteTitle }}</div>
    <div>
        <Menuview />
    </div>
    <div v-if="data">
        <Contact />
    </div>
    <p class="footer" v-if="data">
        {{ data.icp }}
    </p>
  </div>
</template>

<script>
import Avatar from "@/components/AvatarView";
import Menuview from "@/components/siteaside/MenuView";
import Contact from "@/components/siteaside/ContactView";
import {mapState} from 'vuex';
export default {
  data() {
    return {};
  },
  components: {
    Avatar,
    Menuview,
    Contact,
  },
  computed:{
    ...mapState('setting',['data'])
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.siteaside-container{
    width: 100%;
    height: 100%;
    background: $dark;
    padding: 20px 0;
    overflow-x:hidden;
    overflow-y: auto;
    box-sizing: border-box;
    &::-webkit-scrollbar{
        display: none;
    } 
    .avatar-container{
        display: flex;
        justify-content: center;
    }
    .subtitle{
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-wrap: wrap;
      color: #fff;
      font-size: 20px;
      margin-top: 10px;
    }
    .footer{
        color: darken(#fff, 50%);
        text-align: center;
    }
}
</style>