<template>
  <div id="app" >
    <div class="grid-container full">
      <div class="grid-x news_title">
        <div class="cell small-1"><img src="../../assets/img/back.png" v-show="$route.name !== 'home'" @click="$router.go(-1)"></div>
        <div class="cell auto">
        <h4 class="text-center">{{$t(`news_title.${init_data.game_id}`)}}</h4>
        </div>
      </div>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    go_back() {
      if (this.$route.name === 'home') {
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    get_news() {
      console.info('==================involked');
      let that = this;
      return new Promise(function(resolve, reject) {
        if (that.global.news) {
          resolve(that.global.news);
        } else {
          console.info('get news');
          that.$http
            .get('/news/list', {
              params: {
                game_id: that.init_data.game_id,
                cate_id: null
              }
            })
            .then(function(res) {
              that.global.news = res.data;
              resolve(res.data);
            });
        }
      });
    }
  },
  computed: {
    init_data() {
      return this.$localStorage.news_data;
    }
  }
};
</script>

<style lang="scss" scopted>
@import '../../styles/global';
body {
  background-color: rgb(91, 96, 109);
}
.news_title {
  background: rgb(39, 39, 66);
  color: white;
  padding: 5px;
  h4 {
    margin: 0;
    margin-left: -20px;
  }
}
a:focus {
  outline: none;
}

.pt {
  padding-top: 0.75rem;
}
</style>
