<template>
  <div class="grid-x">
    <div class="cell">
      <fieldset class="fieldset pr">
        <legend>
          {{voteDetail.title}}
        </legend>
        <ul class="list_rsh">
          <li v-for="(item,index) in voteDetail.selects" :key="index" :class="{other_input: Array.isArray(item)}">
            <input :id="index" type='radio' v-model="values.selected" :value='first(item)' v-if="voteDetail.type === 0">
            <input :id="index" type='checkbox' v-model="values.selected" :value='first(item)' v-else>
            <label :for="index">{{first(item)}}</label>
            <input type='input' v-model="values.other" v-if="Array.isArray(item)">
          </li>
        </ul>
        <div>{{values}}</div>
        <router-link :to="{path: `/vote/${prev_id}`}" v-if="prev_id" class="orbit-previous">{{$t('prev_title')}}</router-link>
        <router-link :to="{path: `/vote/${next_id}`}" v-if="next_id" class="orbit-next">{{$t('next_title')}}</router-link>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vote',
  data () {
    return {
      voteDetail: null,
      next_id: null,
      prev_id: null,
      values: null
    };
  },
  props: ['vote_id'],
  created () {
    console.log('----------------3-3-3-3-3-');
    this.setVoteDetail();
  },
  watch: {
    $route: 'setVoteDetail'
  },
  methods: {
    setVoteDetail () {
      console.log('---------------set vote detail');
      this.prev_id =
        this.$props.vote_id === 1 ? false : +this.$props.vote_id - 1;
      this.next_id =
        this.$props.vote_id >= this.questions.length
          ? false
          : +this.$props.vote_id + 1;
      this.voteDetail = this.questions[this.$props.vote_id - 1];
      this.global.rsh_values || (this.global.rsh_values = {});

      if (!this.global.rsh_values[this.vote_id]) {
        let obj = {};
        obj.title = this.voteDetail.title;
        obj.selected = this.voteDetail.type === 0 ? '' : [];
        this.global.rsh_values[this.vote_id] = obj;
      }
      this.values = this.global.rsh_values[this.vote_id];
    },
    first (item) {
      return Array.isArray(item) ? item[0] : item;
    }
  },
  computed: {
    questions: function () {
      console.log('=====计算属性');
      return this.$t('questions');
    }
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
  [type="input"] {
    border: none;
    border-bottom: solid 1px #ccc;
    outline: none;
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
</style>

