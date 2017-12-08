export default {
  BaseUrl: 'http://m.pipgame.com/en_qas/',
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
