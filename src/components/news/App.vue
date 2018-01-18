<template>
  <div id="app" >
    <div class="grid-container full">
      <div class="grid-x title">
        <div class="cell small-2"><img src="../../assets/img/back.png" v-show="$route.name !== 'home'" @click="$router.go(-1)"></div>
        <div class="cell auto">
        <h4 class="text-center">{{$t(`news_title.${init_data.game_id}`)}}</h4>
        </div>
        <div class="cell small-2 text-right u_name">{{init_data.name}}</div>
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
                cate_id: 9
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
.g_line {
  height: 1px;
  background-image: linear-gradient(left, rgba(228, 213, 11, 0.5), rgba(0, 0, 0, 0));
}
.red_bg {
  background-image: linear-gradient(0deg, #7d0707, #70052c 60%, #610612);
}
.blue_bg {
  background-image: linear-gradient(0deg, #07447d, #054e70 60%, #062361);
}
#app {
  padding-top: 45px;
}
a:focus {
  outline: none;
}
.u_name {
  color: #ccc;
}

.pt {
  padding-top: 0.75rem;
}
</style>
