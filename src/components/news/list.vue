<template>
  <ul class="list_news">
    <router-link :to="{name: 'news_detail', params: {id: item.id }}" tag="li" v-for="item in news" class="grid-x grid-padding-x" :class="[(item.hot || item.ord > 10000) ? 'red_bg' : 'blue_bg' ]"  :key="item.id">
      <div class="cell small-2 border-right"><img :src="item.dis_img" alt="" class="img"></div>
      <div class="cell auto"><div class="news_title">{{item.title}}</div>
        <div class="g_line"></div>
        <div class="c_time">{{item.create_time}}</div>
        <div class="pa tags"><span :class="{new: item.is_new}"></span> <span :class="{top: item.ord > 10000}"></span> <span :class="{hot: item.hot}"></span></div>
      </div>
    </router-link>

  </ul>
</template>

<script>
export default {
  name: 'list',
  data() {
    return { news: null };
  },
  created() {
    this.$parent.get_news().then(
      function(data) {
        this.news = data;
      }.bind(this)
    );
  },

  computed: {}
};
</script>

<style lang="scss" scoped>
.img {
  text-shadow: 2px 2px #ff0000;
}
.border-right {
  border-right: solid 1px rgba(228, 213, 11, 0.2);
}
.list_news {
  margin: 0;
  li {
    margin: 5px;
    border-radius: 5px;
    position: relative;
    border: solid 1px rgba(255, 255, 0, 0.164);
    padding: 5px 0;
    .news_title {
      color: yellow;
    }
    .pa {
      top: -2px;
      right: 30px;
    }
    .c_time {
      font-size: 12px;
      color: #888;
      padding-left: 20px;
      background: url(../../assets/img/icon_time.png) no-repeat left center;
    }
  }
}

.hot,
.new,
.top {
  margin-right: -30px;
  display: inline-block;
  width: 54px;
  height: 41px;
  background-repeat: no-repeat;
  background-position: left center;
}
.hot {
  background-image: url(../../assets/img/hot.png);
}
.new {
  background-image: url(../../assets/img/new.png);
}
.top {
  background-image: url(../../assets/img/top.png);
}
</style>
