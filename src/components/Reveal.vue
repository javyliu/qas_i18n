
<template>
  <div class="grid-container">
    <div class="x-grid">
      <div id="reveal-dialog" class="reveal small" data-reveal>
        <p class="lead">{{title}}</p>
        <p>{{content}}</p>
        <button class="close-button" data-close aria-label="Close modal" type="button">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reveal',
  mounted() {
    this.reveal = new Foundation.Reveal($('#reveal-dialog'), {
      // These options can be declarative using the data attributes
      animationIn: 'scale-in-up'
    });
    var that = this;
    this.reveal.$element.on('closed.zf.reveal', function() {
      that.$props.close_cb && that.$props.close_cb();
    });
  },
  props: ['close_cb'],
  data() {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    // Added the below openReveal method for two reasons:
    // 1) There was a bug preventing the reveal from working once
    // you navigated away and back to the reveal component.
    // 2) Most dialogs will need to be opened using code.
    openReveal(_content, _title = '') {
      this.title = _title;
      this.content = _content;
      this.reveal.open();
    }
  },
  destroyed() {
    this.reveal.destroy();
  }
};
</script>

<style lang="scss" scoped>

</style>
