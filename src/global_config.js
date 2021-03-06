// import messages from './locales.yml';
export default {
  BaseUrl: process.env.API_URL,
  UploadUrl: process.env.upload_url,
  game_id: 19,
  getLanguage: function(messages) {
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
  },
  isEmpty: function(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) { return false; }
    }
    return true;
  },
  states: {0: {key: 'pending', css: 'warning'}, 1: {key: 'pending', css: 'warning'}, 2: {key: 'completed', css: 'success'}}
};
