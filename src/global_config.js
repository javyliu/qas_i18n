import messages from './locales.yml';

export default {
  BaseUrl: process.env.NODE_ENV === 'production' ? 'http://m.pipgame.com/api/v1/' : 'http://192.168.0.252:7123/api/v1/',
  game_id: 19,
  getLanguage: function () {
    let langs = Object.keys(messages).join('|');
    let reg = new RegExp(`lang=(${langs})`);
    let mc = location.href.match(reg);
    if (mc) {
      console.log('get url language');
      return mc[1];
    } else {
      let mc1 = navigator.language && navigator.language.toLowerCase().match(langs);
      if (mc1) {
        console.log('浏览器自匹配');
        return mc1[0];
      } else {
        return 'en';
      }
    }
  }
};
