// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import '../foundation';
import App from '@/components/news/App';
import router from '../router/news_router';
import VueI18n from 'vue-i18n';
import baseMessages from '../locales/news_locales.yml';
import questions from '../locales/questions/qa_1.yml';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLocalStorage from 'vue-localstorage';
import _global from '../global_config';
const merge = require('webpack-merge');

Vue.use(VueLocalStorage, {
  createComputed: true
});

Vue.prototype.global = _global;
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: _global.getLanguage(baseMessages), // set locale
  fallbackLocale: 'en',
  messages: merge(baseMessages, questions), // set locale messages
  missing: (locale, key, vm) => {
    console.log(`${JSON.stringify(vm.$i18n.messages.en)},${locale} 中 ${key} 不存在`);
  }
});

axios.defaults.baseURL = _global.BaseUrl;

Vue.use(VueAxios, axios);

// Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  template: '<App></App>',
  components: { App },
  created: function() {
    console.log('调查app 创建 成功,获取类别数据');
    // if (this.$route.query.game_id) {
    //   this.global.game_id = this.$route.query.game_id;
    // }
    // 由new_ticket传进来的参数初始化数据
    if (this.$route.name === 'home' && !this.global.isEmpty(this.$route.query)) {
      // this.global.init_data = this.$route.query;
      // this.global.game_id = this.global.init_data.game_id || this.global.game_id;
      this.$localStorage.rsh_data = this.$route.query;
    }
    // console.log(this.$i18n.locale);
  },
  mounted: function() {
    console.log('载入成功');
  },

  localStorage: {
    rsh_data: {
      type: Object,
      default: {
        game_id: 19,
        rsh_id: 1,
        name: 'guest',
        lang: 'en'
      }
    }
  }
});