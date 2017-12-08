export default {
  BaseUrl: process.env.NODE_ENV === 'production' ? 'http://m.pipgame.com/en_qas/' : 'http://192.168.0.252:7123/en_qas/',
  getLanguage: function () {
    let reg = /lang=(zh-cn|en|ja)/i;
    let mc = location.href.match(reg);
    if (mc) {
      console.log('get url language');
      return mc[1];
    }
    console.log('get default browser language');
    return navigator.language && navigator.language.toLowerCase();
  }
};
