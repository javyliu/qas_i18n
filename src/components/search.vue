<template>
  <div class="input-group">
    <input class="input-group-field" type="text" v-model.trim="keyword" :placeholder="$t('search_holder')">
    <div class="input-group-button">
      <input type="submit" class="button alert" :value="$t('btn_search')" @click="query_common_qas">
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      keyword: this.$route.query.keyword
    };
  },
  watch: {
    $route: 'set_keyword'
  },
  methods: {
    query_common_qas () {
      this.$router.push({
        name: 'list_qas',
        params: { cate_id: 'all' },
        query: { keyword: this.keyword }
      });
    },
    set_keyword () {
      this.keyword = this.$route.query.keyword;
    }
  }
};
</script>
<style lang="scss">

</style>

