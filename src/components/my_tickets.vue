<template>
  <div class="grid-x">
    <div class="cell">
      <fieldset class="fieldset">
        <legend>
          <strong>{{$t('my_tickets')}}</strong>
        </legend>
        <ul class="common_qas">
          <li v-for="(item,index) in qas" :key="item.id">
            <div class="title">
              <span class="badge" :class="item.css_class">{{index + 1}}</span>
              <span class="label" :class="item.css_class">{{item.state_des}}</span>
              {{item.question}}
              <div class="time text-right"> <span class='cr_time'>--{{item.created_at}}</span></div>
            </div>
            <div class="title" v-for="reply in item.en_qa_feebacks" :key="reply.id">
              {{reply.content}}
              <div class="time text-right"> <span class='cr_time'>--{{reply.created_at}}</span></div>
            </div>
            <div class="pl_1em" v-html="item.answer"></div>
            <div  v-if="item.answer" class="time text-right"><a v-if="item.state !== 0" class="alert badge" @click="showReply(item)">{{$t('reply')}}</a> <span class='cr_time'>--{{item.updated_at}}</span></div>
            <div v-if="item.answer" v-show="item.showFeeback"  class="grid-x mt_8">
              <div class="cell auto">
                <textarea rows="2" v-model="item.content" :class="item.error_class"></textarea>
              </div>
              <div class="cell small-2">
                <button type="submit" @click='askAgain(item)' class="button mt-8 alert">{{$t('reply')}}</button>
              </div>
            </div>
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
    askAgain(_item) {
      if (_item.content.length === 0) {
        _item.error_class = 'border_red';
        return;
      }
      this.$http
        .post('/en_qas/ask_again', {
          en_qa_id: _item.id,
          content: _item.content
        })
        .then(res => {
          _item.en_qa_feebacks.push({content: res.data.content, created_at: res.data.created_at});
          _item.content = '';
          _item.showFeeback = false;
          _item.error_class = '';
          _item.state = 0;
          let st = this.global.states[_item.state];
          _item.css_class = st.css;
          _item.state_des = this.$i18n.t(st.key);
          _item.updated_at = res.data.created_at;
        })
        .catch(res => {
          _item.error_class = 'border_red';
          alert(res.response.statusText);
        });
    },
    showReply(_item) {
      _item.showFeeback = !_item.showFeeback;
    },
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
              let st = this.global.states[item.state];
              item.css_class = st.css;
              item.state_des = this.$i18n.t(st.key);
              item.showFeeback = false;
              item.error_class = '';
              item.content = '';
              item.answer = item.answer.replace(/\r\n/g, '<br>');
              // if (item.answer) {
              //   item.css_class = 'success';
              //   item.state_des = this.$i18n.t('completed');
              // } else {
              //   item.css_class = 'warning';
              //   item.state_des = this.$i18n.t('pending');
              // }
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
  div.title {
    text-indent: 2em;
    text-align: justify;

    position:relative;
    text-indent: 0;
    margin-bottom: 5px;
    font-weight: bold;

  }
}
</style>


