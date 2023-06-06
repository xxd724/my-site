<template>
  <div>
    <div @click="handleClick" v-show="show" class="totop-container">Top</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if(!dom){
        this.show=false;
        return;
      }
        this.show=dom.scrollTop >= 500;
    },
    handleClick(){
      this.$bus.$emit("setMainScroll",0);
    }
  },
};
</script>

<style lang="scss" scoped>
.totop-container {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 99;
  background-color: #6b9eee;
  color: #fff;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 50%;
  flex-wrap: wrap;
  cursor: pointer;
}
</style>