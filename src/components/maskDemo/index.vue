<template>
  <div id="maskDemo" v-if="isShow">
    <div class="maskContent">
      <slot name="content"></slot>
    </div>
    <div class="mask" @click="close()"></div>
  </div>
</template>

<script>
export default {
  name: 'maskDemo',
  data() {
    return {
      isShow: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === 27) {
          this.close();
        }
      });
    });
  },
  methods: {
    close() {
      this.isShow = false;
    },
    show() {
      this.isShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
