<template>
  <div class="n_detail callout warning">
      <div class="loading" v-if="!detail">
        Loading...
      </div>
      <div v-if="detail" class="content">
        <h4>{{ detail.title }}</h4>
        <div class="c_time">{{detail.create_time}}</div>
        <hr>
        <div v-html="detail.content"></div>
      </div>
      <reveal ref="reveal"></reveal>
  </div>
</template>

<script>
import Reveal from '@/components/Reveal';

export default {
  name: 'news_detail',
  data() {
    return { detail: null };
  },
  props: ['id'],
  created() {
    this.get_detail();
  },
  mounted() {
    let that = this;
    $('.n_detail').on('click', 'a.need_cb', function(e) {
      e.preventDefault();
      console.log($(this).text());
      that.$http
        .post(this.href, that.$parent.init_data)
        .then(function(res) {
          console.log(res.data);
          that.$refs.reveal.openReveal(res.data);
        })
        .catch(function(res) {
          console.log('----------------------');
          that.$refs.reveal.openReveal(res.response.data.error, that.$i18n.t('err'));
        });
    });
  },
  watch: {
    $route: 'get_detail'
  },
  methods: {
    get_detail() {
      let that = this;
      console.info('get detail');
      this.$http.get(`/news/detail/${this.$props.id}?user_id=${that.$parent.init_data.user_id}`).then(function(res) {
        res.data.content = res.data.content.replace(/rsh_link:(\d+)/g, that.$i18n.t('rsh_link', Object.assign({ rsh_id: '$1' }, that.$parent.init_data)));
        that.detail = res.data;
      });
    }
  },
  computed: {},
  components: {
    Reveal
  }
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
