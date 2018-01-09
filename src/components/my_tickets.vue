<template>
  <div class="grid-x">
    <div class="cell">
      <fieldset class="fieldset">
        <legend>
          <strong>{{$t('my_tickets')}}</strong>
        </legend>
        <ul class="common_qas">
          <li v-for="(item,index) in qas" :key="item.id">
            <p class="title">
              <span class="badge" :class="item.css_class">{{index + 1}}</span>
              <span class="label" :class="item.css_class">{{item.state_des}}</span>
              {{item.question}}
            </p>
            <div class="indent_2em">{{item.answer}}</div>
            <div class="time text-right">--{{item.created_at}}</div>
            <hr v-if="index !== last_index">
          </li>
        </ul>
      </fieldset>
      <a class="button success expanded mt_8 text-center" v-if="this.current_page" @click="list">{{$t('next_page')}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list_qas',
  data() {
    return {
      qas: [],
      last_index: 0,
      current_page: 1
    };
  },
  created() {
    this.list();
  },
  methods: {
    list() {
      this.$http
        .get('/en_qas/my_qas', {
          params: {
            game_id: this.$localStorage.init_data.game_id,
            game_role_id: this.$localStorage.init_data.id,
            page: this.current_page
          }
        })
        .then(res => {
          this.qas.push(
            ...res.data.en_qas.map(item => {
              if (item.answer) {
                item.css_class = 'success';
                item.state_des = this.$i18n.t('completed');
              } else {
                item.css_class = 'warning';
                item.state_des = this.$i18n.t('pending');
              }
              return item;
            })
          );
          this.last_index = this.qas.length - 1;
          this.current_page = res.data.meta.page;
        });
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


