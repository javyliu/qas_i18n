// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

Vue.config.productionTip = false;
const messages = {
  'zh-CN': {
    display_name: '中文',
    hello: '世界，你好 {name}',
    apple: '一个都没有 | 一个苹果 | {count} 个苹果'
  },
  en: {
    display_name: '英文',
    hello: 'hello world {name}',
    apple: 'no apples | one apple | {count} apples'
  },
  ja: {
    display_name: '日文',
    hello: 'こんにちは、世界  {name}',
    apple: 'no apples | one apple | {count} apples'

  }
};
const i18n = new VueI18n({
  locale: navigator.language, // set locale
  fallbackLocale: 'en',
  missing: (locale, key, vm) => {
    console.log(`${locale} 中 ${key} 不存在`);
  },
  messages // set locale messages
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  template: '<App/>',
  components: { App }
});
