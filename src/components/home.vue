<template>
  <div>
    <search></search>
    <div class="grid-x">
      <div class="cell">
        <fieldset class="field_cates">
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
.field_cates {
  border: 1px solid #dddddd;
  padding: 1.25rem;
  margin: 0;
  legend,
  h5 {
    margin-bottom: 0;
  }
}
</style>
