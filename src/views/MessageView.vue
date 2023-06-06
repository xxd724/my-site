<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/messagearea/MessageAreaView";
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import { getMessages, postMessage } from "@/api/message";
export default {
  name: "MessageView",
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  components: {
    MessageArea,
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    async fetchData() {
      const res = await getMessages(this.page, this.limit);
      return res;
    },
    async handleSubmit(formData, callback) {
      const res = await postMessage(formData);
      this.data.rows.unshift(res);
      this.data.total++;
      callback("感谢您的留言");
      return res;
    },
    async handleScroll(dom) {
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100;
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        await this.fetchMore();
      }
    },
    //加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        return;
      }
      this.page++;
      this.isLoading = true;
      const res = await this.fetchData();
      this.data.total = res.total;
      this.data.rows = this.data.rows.concat(res.rows);
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  padding: 30px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
  .message-area-container {
    width: 70%;
    margin: 0 auto;
  }
}
</style>