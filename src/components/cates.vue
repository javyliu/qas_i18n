<template>
  <div>
    <search></search>
    <div class="grid-x">
      <div class="cell">
        <ul class="inline_cates" v-if="common_cates">
          <li>CATEGORIES:</li>
          <li>
            <router-link :to="{path: `/cates/list_qas/all`}">all</router-link>
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
  data () {
    return {
      common_cates: null
    };
  },
  created () {
    this.global.getCommonCates().then(
      function (res) {
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
    padding-left: 10px;
    a {
      color: #93a8ab;
    }
  }

  .router-link-exact-active,
  .router-link-exact-active:hover,
  .router-link-exact-active:visited {
    color: #333;
    cursor: default;
  }
  .router-link-active,
  .router-link-exact-active:hover,
  .router-link-exact-active:visited {
    color: #222;
    cursor: default;
  }
}
</style>


