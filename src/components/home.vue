<template>
  <div>
    <search></search>
    <div class="grid-x">
      <div class="cell">
        <fieldset class="fieldset">
          <legend>
            <h5>Hot Issues</h5>
          </legend>
          <div class="loading" v-if="loading">
            Loading...
          </div>
          <ul v-if="common_cates">
            <li v-for="item in common_cates" :key="item.id">
              <router-link :to="{path: `/cates/list_qas/${item.id}`}">{{item.name}}</router-link>
            </li>
          </ul>
        </fieldset>
        </ul>
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
  created () {
    this.global.getCommonCates().then(
      function (res) {
        this.common_cates = res;
        this.loading = false;
      }.bind(this)
    );
  },
  components: {
    Search
  }
};
</script>

<style lang="scss">

</style>
