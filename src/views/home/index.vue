<template>
  <div id="Home">
    <header  @click="slide()">
      <h1>社团管理系统</h1>
      <div class="nav">
        <div class="arrow arrow-one"></div>
        <div class="arrow arrow-two"></div>
        <div class="arrow arrow-three"></div>
      </div>
    </header>
    <main v-show="isShow">
      <div :id="'bg'+(index+1)"
           v-for="(item,index) in entrance"
           :key="index"
           class="bg"
           @click="cardEvent(index)"
      >
        <div class="mask"></div>
        <div class="card"
             :style="{background: `url(${item.img})`,
                      backgroundSize:'100% 100%'
        }"
        >
          <div class="card-mask"></div>
          <div class="title">{{ item.name }}</div>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
import P1 from '@/assets/home/p1.jpg';
import P2 from '@/assets/home/p2.png';
import P3 from '@/assets/home/p3.jpg';
import P4 from '@/assets/home/p4.jpg';

export default {
  name: 'Home',
  data() {
    return {
      entrance: [
        {
          name: '社团信息',
          router: '',
          img: P1,
        }, {
          name: '创建社团',
          router: '',
          img: P2,
        }, {
          name: '活动信息',
          router: '',
          img: P3,
        }, {
          name: '登录注册',
          router: '',
          img: P4,
        },
      ],
      isShow: false,
      isMask: false,
    };
  },
  methods: {
    slide() {
      this.isShow = true;
      const header = document.getElementsByTagName('header')[0];
      this.$nextTick()
        .then(() => {
          window.scrollTo({
            top: header.clientHeight,
            behavior: 'smooth',
          });
        });
    },

    cardEvent(index) {

    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
