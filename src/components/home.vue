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
            <li v-for="item in common_cates" :key="item.id">
              <router-link :to="{path: `/cates/list_qas/${item.id}`}" v-once>{{item.name}}</router-link>
            </li>
          </ul>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/search';

export default {
  name: 'home',
  data () {
    return {
      common_cates: null,
      loading: true
    };
  },
  watch: {
    $route: 'getData'
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
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
