// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import './foundation';
import App from './App';
import router from './router';
import VueI18n from 'vue-i18n';
import messages from './locales/qas_locales.yml';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLocalStorage from 'vue-localstorage';
import _global from './global_config';

Vue.use(VueLocalStorage, {
  createComputed: true
});

Vue.prototype.global = _global;
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: _global.getLanguage(messages), // set locale
  fallbackLocale: 'en',
  missing: (locale, key, vm) => {
    console.log(`${locale} 中 ${key} 不存在`);
  },
  messages // set locale messages
});

axios.defaults.baseURL = _global.BaseUrl;

// intercepte request
axios.interceptors.request.use((config) => {
  if (!/locale=/.test(config.url)) {
    config.url += ((config.url.indexOf('?') === -1 ? '?' : '&') + 'locale=' + i18n.locale);
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});

// get cates

_global.getCommonCates = function() {
  return new Promise(function(resolve, reject) {
    if (_global.common_cates) {
      console.log('common_cates 存在');
      resolve(_global.common_cates);
    } else {
      console.log('common_cates 不存在');
      axios.get('en_qas/common_cates').then(function(res) {
        console.log('common_cates 返回');
        _global.common_cates = res.data;
        resolve(res.data);
      });
    }
  });
};

_global.getUserCates = function() {
  return new Promise(function(resolve, reject) {
    if (_global.user_cates) {
      console.log('user_cates 存在');
      resolve(_global.user_cates);
    } else {
      console.log('user_cates 不存在');
      axios.get('en_qas/user_cates').then(function(res) {
        console.log('user_cates 返回');
        _global.user_cates = res.data;
        resolve(res.data);
      });
    }
  });
};

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  template: '<App></App>',
  components: { App },
  created: function() {
    console.log('app 创建 成功,获取类别数据');
    // if (this.$route.query.game_id) {
    //   this.global.game_id = this.$route.query.game_id;
    // }
    // 由new_ticket传进来的参数初始化数据
    if ((this.$route.name === 'new_ticket' || this.$route.name === 'home') && !this.global.isEmpty(this.$route.query)) {
      // this.global.init_data = this.$route.query;
      // this.global.game_id = this.global.init_data.game_id || this.global.game_id;
      this.$localStorage.init_data = this.$route.query;
    }
    console.log(this.$i18n.locale);
  },
  mounted: function() {
    console.log('载入成功');
  },
  localStorage: {
    init_data: {
      type: Object,
      default: {
        game_id: 26
      }
    }
  }
});
