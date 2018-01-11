<template>
  <div class="grid-x">
    <div class="cell">
      <fieldset class="fieldset pr">
        <legend>
          {{voteDetail.title}}
        </legend>
        <ul class="list_rsh">
          <li v-for="(item,index) in voteDetail.selects" :key="index" :class="{other_input: Array.isArray(item)}">
            <input :id="index" type='radio' v-model="values.selected" :value='first(item)'  @change='setWidth' v-if="voteDetail.type === 0">
            <input :id="index" type='checkbox' v-model="values.selected" :value='first(item)' @change='setWidth' v-else>
            <label :for="index">{{first(item)}}</label>
            <input type='input' v-model="values.other" @focus="setSelected(item[0])" v-if="Array.isArray(item)">
          </li>
        </ul>
        <router-link :to="{path: `/vote/${prev_id}`}" v-if="prev_id" class="orbit-previous">{{$t('prev_title')}}</router-link>
        <router-link :to="{path: `/vote/${next_id}`}" v-if="next_id" class="orbit-next">{{$t('next_title')}}</router-link>
        <div class="step"><div :style="{width}"></div></div>
        <div class="grid-x">
          <div class="cell small-4">
            <router-link :to="{path: `/vote/${prev_id}`}" v-if="prev_id" class="button success small">{{$t('prev_title')}}</router-link>
          </div>
          <div class="cell small-4">
            <button class="button success small expanded" @click="submit" v-show="show_btn">{{$t('submit')}}</button>
          </div>
          <div class="cell small-4 text-right">
            <router-link :to="{path: `/vote/${next_id}`}" v-if="next_id" class="button success small">{{$t('next_title')}}</router-link>
          </div>
        </div>
      </fieldset>
    </div>
    <reveal ref="reveal" :close_cb="onClose"></reveal>
  </div>
</template>

<script>
import Reveal from '@/components/Reveal';

export default {
  name: 'vote',
  data() {
    return {
      voteDetail: null,
      next_id: null,
      prev_id: null,
      values: null,
      width: 0,
      show_btn: false
    };
  },
  props: ['vote_id'],
  created() {
    this.setVoteDetail();
    this.setWidth();
  },
  watch: {
    $route: 'setVoteDetail'
  },
  methods: {
    setVoteDetail() {
      this.prev_id = this.$props.vote_id === 1 ? false : +this.$props.vote_id - 1;
      this.next_id = this.$props.vote_id >= this.questions.length ? false : +this.$props.vote_id + 1;
      this.voteDetail = this.questions[this.$props.vote_id - 1];
      this.global.rsh_values || (this.global.rsh_values = {});

      if (!this.global.rsh_values[this.vote_id - 1]) {
        let obj = {};
        obj.title = this.voteDetail.title;
        obj.selected = this.voteDetail.type === 0 ? '' : [];
        this.global.rsh_values[this.vote_id - 1] = obj;
      }
      this.values = this.global.rsh_values[this.vote_id - 1];
    },
    first(item) {
      return Array.isArray(item) ? item[0] : item;
    },
    setSelected(_item) {
      if (Array.isArray(this.values.selected)) {
        if (this.values.selected.indexOf(_item) === -1) {
          this.values.selected.push(_item);
        }
      } else {
        this.values.selected = _item;
      }
    },
    submit() {
      let _values = this.global.rsh_values;

      let notSelected = [];

      this._notSelected().forEach(_key => {
        notSelected.push(this.$i18n.t('rsh_not_selected', { count: _key }));
      });

      if (notSelected.length > 0) {
        this.$refs.reveal.openReveal(notSelected.join(' '), this.$i18n.t('err'));
      } else {
        this.$http
          .post('/rsh_vote', Object.assign({ research_id: this.rsh.rsh_id, game_id: this.rsh_data.game_id, game_name: this.rsh_data.name }, _values))
          .then(res => {
            this.$refs.reveal.openReveal(this.$i18n.t('success_rsh'));
          })
          .catch(error => {
            let _msg = '';
            if (error.response.data.error === 'voted') {
              _msg = this.$i18n.t('voted');
            } else {
              _msg = this.$i18n.t('net_error');
            }
            this.$refs.reveal.openReveal(_msg, this.$i18n.t('err'));
          });
      }
    },
    setWidth() {
      let len = this.all_keys.length;
      let nlen = this._notSelected().length;
      this.width = (len - nlen) * 100 / len + '%';
      this.show_btn = !nlen;
    },
    _notSelected() {
      let notSelectedKeys = [];
      let _values = this.global.rsh_values;
      this.all_keys.forEach(_key => {
        if (_values[_key] === undefined || _values[_key] === null || _values[_key].selected === '' || _values[_key].selected.length === 0) {
          notSelectedKeys.push(_key);
        }
      });
      // console.log(notSelectedKeys);
      return notSelectedKeys;
    },
    onClose() {
      this.global.rsh_values = {};
      this.show_btn = false;
      this.width = 0;
      this.$router.push({ name: 'vote', params: { vote_id: 1 } });
    }
  },
  computed: {
    questions: function() {
      return this.$parent.rsh.questions;
    },
    rsh: function() {
      return this.$parent.rsh;
    },
    rsh_data: function() {
      return this.$localStorage.rsh_data;
    },
    all_keys: function() {
      return Object.keys(this.questions);
    }
  },
  components: {
    Reveal
  }

  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     vm.id = +(to.name === 'home' ? 1 : to.params.id) + 1;
  //   });
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log('beforeRouteUpdate', this.id);
  //   this.id = +to.params.id + 1;
  //   console.log(to, from);
  //   next();
  // }
};
</script>

<style lang="scss" scoped>
.list_rsh {
  list-style-type: none;
  margin: 0;
}
.other_input {
  label {
    margin-right: 0;
  }
  [type='input'] {
    border: none;
    border-bottom: solid 1px #ccc;
    outline: none;
    font-size: 14px;
    color: green;
  }
}
.orbit-previous {
  left: -10px;
}
.orbit-next {
  right: -10px;
}
.orbit-previous,
.orbit-next {
  background-color: rgba(10, 10, 10, 0.1);
  padding: 1rem 0.2rem;
  word-wrap: break-word;
  letter-spacing: 20px;
  width: 24px;
  font-size: 14px;
  border-radius: 1000px;
}
.orbit-previous:hover,
.orbit-next:hover,
.orbit-previous:active,
.orbit-next:active,
.orbit-previous:focus,
.orbit-next:focus {
  background-color: rgba(10, 10, 10, 0.5);
  color: #000;
}
fieldset {
  .button {
    margin-bottom: 0;
  }
}
.step {
  margin-bottom: 10px;
  background: rgba(159, 160, 159, 0.678);
  div {
    height: 3px;
    background-color: #e78318a8;
  }
}
</style>

