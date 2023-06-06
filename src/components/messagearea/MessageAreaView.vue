<template>
    <div class="message-area-container">
      <DataForm v-on="$listeners" />
      <h3>
        {{ title }}
        <span>{{ subTitle }}</span>
      </h3>
      <DataList :list="list"/>
      <div class="loading" v-loading="isListLoading"><span v-if="!isListLoading">没有更多数据</span></div>
    </div>
  </template>
  
  <script>
  import DataForm from "./DataFormView";
  import DataList from "./DataListView";
  export default {
    props: {
      title: {
        type: String,
        default: "",
      },
      subTitle: {
        type: String,
        default: "",
      },
      list: {
        type: Array,
        default: () => [],
      },
      isListLoading: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      DataForm,
      DataList
    },
  };
  </script>
  
  <style scoped lang="scss">
  .loading {
    position: relative;
    height: 100px;
    span{
    font-size: 16px;
    color: #aea9a9;
    padding: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  }
  
  </style>
  