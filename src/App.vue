<template>
  <div id="app">
    <div class="top-bar">
      <div class="top-bar-left text-left">
        <img src="./assets/img/ww_logo.png">
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <li>
            <a href="#">One</a>
          </li>
          <li>
            <a href="#">One</a>
          </li>
          <li>
            <a href="#">One</a>
          </li>
        </ul>
      </div>
    </div>
    <router-view/>
    <!-- <div class="grid-x">
      <div class="cell">full width cell</div>
      <div class="cell">full width cell</div>
    </div>
    <div class="grid-x">
      <div class="small-6 cell">6 cells</div>
      <div class="small-6 cell">6 cells</div>
    </div>
    <div class="grid-x">
      <div class="medium-6 large-4 cell">12/6/4 cells</div>
      <div class="medium-6 large-8 cell">12/6/8 cells</div>
    </div>
    <div class="grid-x ">
      <div class="medium-6 large-4 cell">12/6/4 cells</div>
      <div class="medium-6 large-8 cell">12/6/8 cells</div>
    </div>
    <div class="grid-x grid-padding-x">
      <div class="medium-6 large-4 cell">12/6/4 cells</div>
      <div class="medium-6 large-8 cell">12/6/8 cells</div>
    </div>
    <div class="grid-container">
      <div class="grid-x grid-margin-x">
        <div class="cell small-4">cesdfadfa l</div>
        <div class="cell small-4">cell</div>
        <div class="cell small-4">cell</div>
      </div>
    </div>
    <div class="grid-container full">
      <div class="grid-x grid-padding-x">
        <div class="cell small-4">cadfasdasdf sadfasdfasdf sadfasdfasdf asdfasdfasdfell</div>
        <div class="cell small-4">cell</div>
        <div class="cell small-4">cell</div>
      </div>
    </div>
    <div class="grid-container">
      <div class="grid-x">
        <div class="small-4 cell">4 cells</div>
        <div class="auto cell">Whatever's left!</div>
        <div class="auto cell">Whatever's leftWhatever's leftWhatever's leftWhatever's leftWhatever's leftWhatever's left!</div>
      </div>
    </div>
    <div class="grid-x">
      <div class="medium-auto cell">One</div>
      <div class="medium-auto cell">Two</div>
      <div class="medium-auto cell">Three</div>
      <div class="medium-auto cell">Four</div>
      <div class="medium-auto cell">Five</div>
      <div class="medium-auto cell">Six</div>
    </div>
    <div class="grid-x grid-margin-x medium-margin-collapse">
      <div class="small-6 cell">
        Gutters at small no gutters at medium.
      </div>
      <div class="small-6 cell">
        Gutters at small no gutters at medium.
      </div>
    </div>
    <div class="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6">
      <div class="cell">cell</div>
      <div class="cell">cell</div>
      <div class="cell">cell</div>
      <div class="cell">cell</div>
      <div class="cell">cell</div>
      <div class="cell">cell</div>
    </div>
    <div class="grid-y" style="height: 500px;">
      <div class="cell small-6 medium-8 large-2">
        <p v-t="{path:'hello', args:{name: 'hahaha'}}"></p>
      </div>
      <div class="cell small-6 medium-4 large-10" @click="getName">
        版本： {{ $t("display_name") }}, {{ $t("hello") }}
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    getName: function () {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'ja' : 'en';
      this.$http
        .get('http://121.201.1.92:8080/dsx/dsxrollingnotice')
        .then(response => {
          console.log(response.data);
        });
    }
  }
};
</script>

<style lang="scss">
@import "./styles/global";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.grid-x div {
  background: #ccc;
}
</style>
