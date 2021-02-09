<template>
  <div id="Home">
    <header>
      <h1>社团管理系统</h1>
    </header>
    <main>
      <div class="card" v-for="(item,index) in entrance" :key="index">
          <el-card class="myCard">
            <img :src="item.img" width="100%">
            <div class="cardText">
              <p>{{item.name}}</p>
            </div>
          </el-card>
      </div>
    </main>
  </div>
</template>

<script>
import HomeImg from '../../assets/home.jpg';

export default {
  name: 'Home',
  data() {
    return {
      entrance: [
        {
          name: '学生会组织',
          router: '',
          img: HomeImg,
        }, {
          name: '社团组织',
          router: '',
          img: HomeImg,
        }, {
          name: '活动汇总',
          router: '',
          img: HomeImg,
        }, {
          name: '后台管理',
          router: '',
          img: HomeImg,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  @import "home";
</style>
