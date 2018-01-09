<template>
  <div>
    <search></search>
    <div class="grid-x">
      <div class="cell">
        <ul class="inline_cates" v-if="common_cates">
          <li>{{$t('category')}}:</li>
          <li>
            <router-link :to="{path: `/cates/list_qas/all`}">{{$t('c_all')}}</router-link>
          </li>
          <li v-for="item in common_cates" :key="item.id">
            <router-link :to="{path: `/cates/list_qas/${item.id}`}">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Search from '@/components/search';

export default {
  name: 'cates',
  data() {
    return {
      common_cates: null
    };
  },
  created() {
    this.global.getCommonCates().then(
      function(res) {
        this.common_cates = res;
      }.bind(this)
    );
  },
  components: {
    Search
  }
};
</script>

<style lang="scss">
.inline_cates {
  list-style-type: none;
  margin: 0;
  li {
    display: inline-block;
  }
  a {
    padding: 2px 5px;
  }
  // .router-link-exact-active,
  // .router-link-exact-active:hover,
  // .router-link-exact-active:visited {

  // }
  .router-link-active,
  .router-link-active:hover,
  .router-link-active:visited {
    color: $white;
    cursor: default;
    background-color: $primary-color;
    border-radius: 1000px;
  }
}
</style>


