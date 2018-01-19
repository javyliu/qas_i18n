<template>
  <div class="n_detail callout alert">
      <div class="loading" v-if="!detail">
        Loading...
      </div>
      <div v-if="detail" class="content">
        <h4>{{ detail.title }}</h4>
        <div class="c_time">{{detail.create_time}}</div>
        <hr>
        <div v-html="detail.content"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'news_detail',
  data() {
    return { detail: null };
  },
  props: ['id'],
  created() {
    this.get_detail();
  },
  watch: {
    $route: 'get_detail'
  },
  methods: {
    get_detail() {
      let that = this;
      console.info('get activity detail');
      this.$http.get(`/acts/detail/${this.$props.id}`).then(function(res) {
        res.data.content = res.data.content.replace(/rsh_link:(\d+)/g, that.$i18n.t('rsh_link', Object.assign({ rsh_id: '$1' }, that.$parent.init_data)));
        that.detail = res.data;
      });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.n_detail {
  margin-bottom: 0;
  h4 {
    text-shadow: rgb(255, 255, 255) 1px 1p;
  }
}
.c_time {
  color: #ccc;
  font-size: 14px;
}
</style>
