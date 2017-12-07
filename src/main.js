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

Vue.use(VueI18n);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: getLanguage(), // set locale
  fallbackLocale: 'en',
  missing: (locale, key, vm) => {
    console.log(`${locale} 中 ${key} 不存在`);
  },
  messages // set locale messages
});
function getLanguage () {
  let reg = /lan=(zh-cn|en|ja)/i;
  let mc = location.href.match(reg);
  if (mc) {
    console.log('get url language');
    return mc[1];
  }
  console.log('get default browser language');
  return navigator.language && navigator.language.toLowerCase();
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  template: '<App/>',
  components: { App },
  created: function () {
    console.log('app 创建 成功');
    console.log(this.$i18n.locale);
    this.axios.defaults.baseURL = 'http://m.pipgame.com/en_qas/' + this.$i18n.locale;
  }
});
