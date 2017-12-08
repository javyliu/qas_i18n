<template>
  <div>
    <search></search>
    <div class="grid-x">
      <div class="cell">
        <fieldset class="fieldset">
          <legend>
            <h5>Hot Issues</h5>
          </legend>
          <ul>
            <li v-for="(item,index) in cates" :key="index">
              <router-link :to="{path: `/cates/list_qas/${item}`}">{{item}}</router-link>
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
  props: ['cates'],
  components: {
    Search
  }
};
</script>

<style lang="scss">

</style>
