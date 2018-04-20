<template>
  <div>
    <search></search>
    <div class="grid-x">
      <div class="cell">
        <fieldset class="fieldset">
          <legend>
            <h5>{{$t('hot_issues')}}</h5>
          </legend>
          <div class="loading" v-if="loading">
            Loading...
          </div>
          <ul v-if="common_cates">
            <li v-for="item in common_cates" :key="item.id" :class="{spec: item.ord===1000}">
              <router-link :to="{path: `/cates/list_qas/${item.id}`}" v-once>{{item.name}}</router-link>
            </li>
          </ul>
        </fieldset>
      </div>
    </div>
    <div class="grid-x">
      <div class="cell  small-6 text-center">
        <br>
        <router-link to="/new_ticket" class="button alert">{{$t('submit_ticket')}}</router-link>
      </div>
      <div class="cell  small-6 text-center">
        <br>
        <router-link to="/my_tickets" class="button alert">{{$t('my_tickets')}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/search';

export default {
  name: 'home',
  data() {
    return {
      common_cates: null,
      loading: true
    };
  },
  watch: {
    $route: 'getData'
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      console.log('watch common cates');
      this.global.getCommonCates().then(res => {
        this.common_cates = res;
        this.loading = false;
      });
    }
  },
  components: {
    Search
  }
};
</script>

<style lang="scss">

</style>
