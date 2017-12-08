// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import './foundation';
import App from './App';
import router from './router';
import VueI18n from 'vue-i18n';
import messages from './locales.yml';
import axios from 'axios';
import VueAxios from 'vue-axios';

import _global from './global_config';

Vue.prototype.global = _global;
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: _global.getLanguage(), // set locale
  fallbackLocale: 'en',
  missing: (locale, key, vm) => {
    console.log(`${locale} 中 ${key} 不存在`);
  },
  messages // set locale messages
});
// intercepte request
axios.interceptors.request.use((config) => {
  if (!/locale=/.test(config.url)) {
    config.url += ((config.url.indexOf('?') === -1 ? '?' : '&') + 'locale=' + i18n.locale);
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  template: '<App></App>',
  components: { App },
  created: function () {
    console.log('app 创建 成功');
    console.log(this.$i18n.locale);
    this.axios.defaults.baseURL = this.global.BaseUrl;
  },
  mounted: function () {
    console.log('载入成功');
  }
});
