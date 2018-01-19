<template>
  <div id="app">
    <div class="grid-container full">
      <div class="grid-x title">
        <div class="cell small-2"><img src="../../assets/img/back.png"  @click="$router.go(-1)"></div>
        <div class="cell auto">
          <h4 class="text-center">{{rsh.vote_title}}</h4>
        </div>
        <div class="cell small-2">&nbsp;</div>
      </div>
      <div class="grid-container pt">
        <p>{{rsh.rsh_des}}</p>
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
  computed: {
    rsh: function() {
      console.log('=====计算属性');
      return this.$t('rshs')[this.$localStorage.rsh_data.rsh_id - 1];
    }
  }
};
</script>

<style lang="scss">
@import '../../styles/global';
#app {
  padding-top: 45px;
}
// Chrome Reset
a:focus {
  outline: none;
}

.pt {
  padding-top: 0.75rem;
}
</style>
