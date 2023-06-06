<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }">|&lt;&lt;</a>
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }">&lt;&lt;</a>
    <a @click="handleClick(n)" v-for="(n, i) in numbers" :key="i" :class="{ active: current === n }">{{
      n
    }}</a>
    <a @click="handleClick(current + 1)" :class="{ disabled: current === pageNumber }">&gt;&gt;</a>
    <a @click="handleClick(pageNumber)" :class="{ disabled: current === pageNumber }">&gt;&gt;|</a>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number, //当前页码
      default: 1,
    },
    total: {
      type: Number, //总数据量
      default: 0,
    },
    limit: {
      type: Number, //每页的数量
      default: 10,
    },
    visibleNumber: {
      type: Number, //可见的页码数
      default: 10,
    },
  },
  methods:{
    handleClick(newPage){
      //抛出一个事件
      if(newPage < 1){
        newPage=1;
      }
      if(newPage > this.pageNumber){
        newPage=this.pageNumber;
      }
      if(newPage === this.current){
        return;
      }
      this.$emit('pageChange',newPage)
    }
  },
  computed: {
    //总页数
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    //得到显示最小数字
    visiableMin(){
      let  min =this.current - Math.floor(this.visibleNumber / 2);
      if(min < 1){
        min =1;
      }
      return min;
    },
    //得到显示最大数字
    visiableMax(){
      let max= this.visiableMin + this.visibleNumber - 1;
      if(max > this.pageNumber){
        max=this.pageNumber;
      }
      return max;
    },
    //显示页码数组
    numbers() {
      let nums=[];
      for(let i =this.visiableMin;i<=this.visiableMax;i++){
        nums.push(i);
      }
      return nums;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variable.scss";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: $primary;
    margin: 0 5px;
    cursor: pointer;
    &.disabled {
      color: $lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: $words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>