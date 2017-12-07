<template>
  <div>
    <search></search>
    <div class="grid-x">
      <div class="cell">
        <ul class="inline_cates">
          <li>CATEGORIES:</li>
          <li v-for="(item,index) in cates" :key="index">
            <router-link :to="{path: `/cates/list_qas/${item}`}">{{item}}</router-link>
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
  props: ['cates'],
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
}
</style>


