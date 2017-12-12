<template>
  <div id="app">
    <div class="off-canvas position-right" id="offCanvas" data-off-canvas>
      <ul class="sidebar-menu" data-close="offCanvas">
        <li>
          <router-link to="/" exact>{{$t('support_home')}}</router-link>
        </li>
        <li>
          <router-link to="/cates/list_qas/all">{{$t('all_qa')}}</router-link>
        </li>
        <li>
          <router-link to="/new_ticket">{{$t('submit_ticket')}}</router-link>
        </li>
        <li>
          <router-link to="/my_tickets">{{$t('my_tickets')}}</router-link>
        </li>
      </ul>
    </div>
    <div class="off-canvas-content grid-container full" data-off-canvas-content>
      <div class="top-bar grid-x">
        <div class="cell small-6 shrink">
          <ul class="menu">
            <li class="logo">
              <router-link to="/"><img src="./assets/img/ww_logo.png" alt="wars mobile"></router-link>
            </li>
          </ul>
        </div>
        <div class="cell small-6 shrink">
          <ul class="menu toggle_menu">
            <li>
              <a class="button secondary menu-button  small" data-toggle="offCanvas">{{$t('menu')}}</a>
            </li>
            <li>
              <ul class="dropdown menu" data-dropdown-menu data-close-on-click="true">
                <li>
                  <a href="#">{{$t('language')}}</a>
                  <ul class="menu vertical">
                    <li v-for="(lan, index) in languages" :key="index">
                      <a href="#" @click="change_language(lan[0])">{{lan[1]}}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="grid-container pt">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  // props: ['ccn'],
  mounted () {
    this.offCanvas = new Foundation.OffCanvas($('#offCanvas'));
    this.select_lan = new Foundation.DropdownMenu($('.dropdown'), {
      disableHover: true,
      clickOpen: true,
      alignment: 'right'
    });
  },
  methods: {
    change_language: function (curLan) {
      if (this.$i18n.locale === curLan) {
        return;
      }
      this.$i18n.locale = curLan;
      this.global.user_cates = null;
      this.global.common_cates = null;
      if (this.$route.name === 'home') {
        console.log('current page');
        // this.global.getCommonCates();
        this.$router.push({
          name: 'home',
          query: { rt: new Date().getTime() }
        });
      } else {
        this.$router.push({ name: 'home' });
      }
      // this.global.getUserCates();
    }
  },
  computed: {
    languages: function () {
      return Object.keys(this.$i18n.messages).map(function (item) {
        return [item, this.$t('display_name', item)];
      }, this);
    }
  }
};
</script>

<style lang="scss">
@import "./styles/global";

// Chrome Reset
a:focus {
  outline: none;
}
.logo,
.logo a {
  color: $white;
  font-weight: normal;
  background-color: inherit;
  padding: 0;
}
.top-bar,
.top-bar ul {
  background-color: #333;
}

.toggle_menu {
  flex-direction: row-reverse;
}
.pt {
  padding-top: 0.75rem;
}
.sidebar-menu {
  @include menu-base();
  @include menu-direction(vertical);
  a {
    color: $secondary-color;
    font-weight: normal;
    &.router-link-exact-active {
      font-weight: bold;
      color: #333;
    }
  }
  a.active {
    font-weight: 600;
    color: $primary-color;
  }
}

.dropdown.menu {
  li.is-active {
    a {
      color: #ccc;
    }
  }
  a {
    color: #fff;
  }
  .menu li {
    color: #fff;
    font-size: 14px;
  }
}
</style>
