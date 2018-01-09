<template>
  <div class="grid-x">
    <div class="cell">
      <ul class="common_qas" v-if="common_qas && common_qas.length > 0">
        <li v-for="(item,index) in common_qas" :key="item.id">
          <p class="title">
            <span class="primary badge">{{index + 1}}</span>
            {{item.question}}
          </p>
          <div v-html="item.answer"></div>
          <div class="time text-right">--{{item.created_at}}</div>
          <hr>
        </li>
      </ul>
      <div class="callout warning mt_8" v-else>
        <p>{{$t('no_question_tip')}}</p>
        <router-link to="/new_ticket" class="button expanded">{{$t('submit_ticket')}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list_qas',
  data() {
    return {
      common_qas: null
    };
  },
  created() {
    this.list(this.$route.params.cate_id, this.$route.query.keyword);
  },
  beforeRouteUpdate(to, from, next) {
    this.list(to.params.cate_id, to.query.keyword);
    next();
  },

  methods: {
    list(cateId, query = null) {
      this.$http
        .get('/en_qas/list', {
          params: {
            game_id: this.$localStorage.init_data.game_id,
            cate_id: cateId === 'all' ? null : cateId,
            query: query
          }
        })
        .then(
          function(res) {
            this.common_qas = res.data;
          }.bind(this)
        );
    }
  }
};
</script>

<style lang="scss">
.common_qas {
  list-style-type: none;
  margin-left: 0;
  margin-top: 1rem;
  p {
    text-indent: 2em;
    text-align: justify;
    &.title {
      text-indent: 0;
      margin-bottom: 5px;
      font-weight: bold;
    }
  }
}
</style>


