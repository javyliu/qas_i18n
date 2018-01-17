<template>
  <div id="app">
    <div class="grid-container full">
      <div class="grid-container pt">
        <h4 class="news_title text-center">{{$t(`news_title.${init_data.game_id}`)}}</h4>
        <p></p>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {},
  methods: {},
  computed: {
    init_data() {
      return this.$localStorage.news_data;
    }
  }
};
</script>

<style lang="scss">
@import '../../styles/global';
a:focus {
  outline: none;
}

.pt {
  padding-top: 0.75rem;
}
</style>
