<template>
  <div id="app">
    <div class="grid-container full">
      <div class="grid-container pt">
        <h4 class="title text-center">{{rsh.vote_title}}</h4>
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
  // props: ['ccn'],
  mounted() {
    // this.offCanvas = new Foundation.OffCanvas($('#offCanvas'));
    // this.select_lan = new Foundation.DropdownMenu($('.dropdown'), {
    //   disableHover: true,
    //   clickOpen: true,
    //   alignment: 'right'
    // });
  },
  methods: {
    // change_language: function(curLan) {
    //   if (this.$i18n.locale === curLan) {
    //     return;
    //   }
    //   this.$i18n.locale = curLan;
    //   this.global.user_cates = null;
    //   this.global.common_cates = null;
    //   if (this.$route.name === 'home') {
    //     console.log('current page');
    //     // this.global.getCommonCates();
    //     this.$router.push({
    //       name: 'home',
    //       query: { rt: new Date().getTime() }
    //     });
    //   } else {
    //     this.$router.push({ name: 'home' });
    //   }
    //   // this.global.getUserCates();
    // }
  },
  computed: {
    // languages: function() {
    //   return Object.keys(this.$i18n.messages).map(function(item) {
    //     return [item, this.$t(item)];
    //   }, this);
    // },
    rsh: function() {
      console.log('=====计算属性');
      return this.$t('rshs')[this.$localStorage.rsh_data.rsh_id - 1];
    }
  }
};
</script>

<style lang="scss">
@import '../../styles/global';

// Chrome Reset
a:focus {
  outline: none;
}

.pt {
  padding-top: 0.75rem;
}
</style>
